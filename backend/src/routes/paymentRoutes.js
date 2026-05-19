const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Lazy-load Razorpay client to prevent startup crashes when keys are not yet configured in env
let razorpayInstance = null;

const getRazorpayInstance = () => {
  if (razorpayInstance) return razorpayInstance;

  const keyId = process.env.TEST_RAZORPAY_KEY;
  const keySecret = process.env.TEST_RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay API keys (TEST_RAZORPAY_KEY and TEST_RAZORPAY_SECRET) are not configured in environment variables.');
  }

  razorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });

  return razorpayInstance;
};

// @route   GET /api/payments/key
// @desc    Get public Razorpay Key ID
router.get('/key', (req, res) => {
  const keyId = process.env.TEST_RAZORPAY_KEY;
  if (!keyId) {
    return res.status(500).json({ detail: 'Razorpay Key ID is not configured on the backend environment variables.' });
  }
  return res.status(200).json({ key: keyId });
});

// @route   POST /api/payments/create-order
// @desc    Create a payment order in Razorpay (INR only, converting from USD if needed)
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in USD
    if (!amount) {
      return res.status(400).json({ detail: 'Payment amount is required' });
    }

    // Get the dynamic Razorpay client
    let razorpay;
    try {
      razorpay = getRazorpayInstance();
    } catch (keyErr) {
      return res.status(500).json({ detail: keyErr.message });
    }

    // Convert USD to INR (e.g., 1 USD = 83 INR)
    // Razorpay requires the final amount in Paise (multiply by 100)
    const amountInINR = amount * 83;
    const amountInPaise = Math.round(amountInINR * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    return res.status(500).json({ detail: 'Failed to initialize payment gateway order' });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify Razorpay payment signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.TEST_RAZORPAY_SECRET;
    if (!secret) {
      return res.status(500).json({ detail: 'Razorpay Key Secret is not configured on the backend' });
    }

    // Verify HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({ verified: true, detail: 'Payment authorized and verified successfully' });
    } else {
      return res.status(400).json({ verified: false, detail: 'Payment verification failed: Signature mismatch' });
    }
  } catch (err) {
    console.error('Razorpay signature verification error:', err);
    return res.status(500).json({ detail: 'Internal server payment verification failure' });
  }
});

module.exports = router;
