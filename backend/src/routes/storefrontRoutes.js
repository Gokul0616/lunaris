const express = require('express');
const router = express.Router();
const { getDbType, getPool, getMongoDb } = require('../db');

// Default seed content when the database settings record is not yet initialized
const defaultAboutContent = {
  title: "About LUNARIS",
  story: "Born in the pursuit of absolute athletic innovation, LUNARIS crafts premium, state-of-the-art performance footwear designed to push boundaries. We bridge the gap between high-level engineering and futuristic street aesthetics, creating a silhouette that is built for speed, responsiveness, and pure kinetic energy.",
  mission: "Our mission is simple: to empower athletes, creators, and daily runners with antigravity-class cushioning, responsive propulsion systems, and ultra-breathable materials. We believe every stride should feel like flying.",
  team: "Our team consists of industry-leading materials engineers, award-winning footwear designers, and visionary biomechanics experts dedicated to refining performance standards."
};

// @route   GET /api/storefront/about
// @desc    Get dynamic About Us page content
router.get('/about', async (req, res) => {
  try {
    const dbType = getDbType();

    if (dbType === 'postgres') {
      const result = await getPool().query("SELECT * FROM storefront_settings WHERE key = 'about_page'");
      if (result.rows.length > 0) {
        return res.status(200).json(result.rows[0].value);
      }
    } else {
      const doc = await getMongoDb().collection('storefront_settings').findOne({ _id: 'about_page' });
      if (doc) {
        return res.status(200).json(doc.value);
      }
    }

    // Default fallback to seed data
    return res.status(200).json(defaultAboutContent);
  } catch (err) {
    console.error('Fetch storefront about error:', err);
    return res.status(500).json({ detail: 'Failed to retrieve storefront settings' });
  }
});

// @route   POST /api/storefront/about
// @desc    Update dynamic About Us page content
router.post('/about', async (req, res) => {
  try {
    const { title, tagline, story, mission, team, heroImage, storyImage, customSections } = req.body;

    if (!title || !story || !mission || !team) {
      return res.status(400).json({ detail: 'All fields (title, story, mission, team) are required.' });
    }

    const value = { title, tagline, story, mission, team, heroImage, storyImage, customSections };
    const dbType = getDbType();

    if (dbType === 'postgres') {
      await getPool().query(
        `INSERT INTO storefront_settings (key, value, updated_at) 
         VALUES ('about_page', $1, CURRENT_TIMESTAMP)
         ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = CURRENT_TIMESTAMP`,
        [JSON.stringify(value)]
      );
    } else {
      await getMongoDb().collection('storefront_settings').updateOne(
        { _id: 'about_page' },
        { $set: { value, updated_at: new Date() } },
        { upsert: true }
      );
    }

    return res.status(200).json({ success: true, value });
  } catch (err) {
    console.error('Save storefront about error:', err);
    return res.status(500).json({ detail: 'Failed to save storefront settings' });
  }
});

module.exports = router;
