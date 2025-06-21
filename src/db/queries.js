const pool = require('./pool');

const getUserById = async (id) => {
  console.log('Query user with id ', id);
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

const createUser = async ({ username, password }) => {
  console.log('Creating user with username ', username);
  const { rowCount } = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2)',
    [username, password],
  );
  console.log(`create ${rowCount} user`);
};

module.exports = { getUserById, createUser };
