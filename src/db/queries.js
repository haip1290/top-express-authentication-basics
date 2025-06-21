const pool = require('./pool');
const bcrypt = require('bcryptjs');

const getUserById = async (id) => {
  console.log('Query user with id ');
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.log('Error query user by id', err);
    throw err;
  }
};

const getUserByUsername = async (username) => {
  console.log('Query user with username');
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [
      username,
    ]);
    return rows[0];
  } catch (err) {
    console.log('Error querying user by username', err);
    throw err;
  }
};

const createUser = async ({ username, password }) => {
  console.log('Creating user with username ');
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rowCount } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashedPassword],
    );
    console.log(`create ${rowCount} user`);
  } catch (err) {
    console.log('Error creating user with username ', err);
    throw err;
  }
};

module.exports = { getUserById, createUser, getUserByUsername };
