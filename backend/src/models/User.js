const { getDbType, getPool, getMongoDb } = require('../db');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

const User = {
  async findOne({ email }) {
    if (!email) return null;
    const dbType = getDbType();
    const normalizedEmail = email.toLowerCase();

    if (dbType === 'postgres') {
      const result = await getPool().query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
      return result.rows[0] || null;
    } else {
      const user = await getMongoDb().collection('users').findOne({ email: normalizedEmail });
      if (!user) return null;
      // Map MongoDB ObjectId _id to a normalized, compatible id field
      return { ...user, id: user._id.toString() };
    }
  },

  async findById(id) {
    if (!id) return null;
    const dbType = getDbType();

    if (dbType === 'postgres') {
      const result = await getPool().query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } else {
      try {
        const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { id: id };
        const user = await getMongoDb().collection('users').findOne(query);
        if (!user) return null;
        return { ...user, id: user._id.toString() };
      } catch (err) {
        console.error('MongoDB findById error:', err);
        return null;
      }
    }
  },

  async create({ name, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const dbType = getDbType();
    const normalizedEmail = email.toLowerCase();

    if (dbType === 'postgres') {
      const result = await getPool().query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, normalizedEmail, hashedPassword]
      );
      return result.rows[0];
    } else {
      const newUser = {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        created_at: new Date()
      };
      const result = await getMongoDb().collection('users').insertOne(newUser);
      return { ...newUser, id: result.insertedId.toString() };
    }
  },

  async comparePassword(enteredPassword, hashedPassword) {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
};

module.exports = User;
