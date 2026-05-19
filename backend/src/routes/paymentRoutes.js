const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay client using TEST_RAZORPAY_KEY and TEST_RAZORPAY_SECRET
const razorpay = new Razorpay({
  key_id: process.env.TEST_RAZORPAY_KEY,
  key_secret: process.env.TEST_RAZORPAY_SECRET
});

// @route   GET /api/payments/key
// @desc    Get public Razorpay Key ID
router.get('/key', (req, res) => {
  const keyId = process.env.TEST_RAZORPAY_KEY;
  if (!keyId) {
    return res.status(500).json({ detail: 'Razorpay Key ID is not configured on the backend' });
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
