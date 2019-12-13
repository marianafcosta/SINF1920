const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const auth = require('../middleware/auth');

module.exports = server => {
  // @route   POST api/auth
  // @desc    Auth user
  // @access  Public
  server.post('/api/auth', (req, res) => {
    const { email, password } = req.body;
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const data = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find(usr => usr.email === email);

    // Check for existing user
    if (!user) return res.status(400).json({ msg: 'User Does not exist' });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        },
      );
      return true;
    });

    return true;
  });

  // @route   GET api/auth/user
  // @desc    Get user data
  // @access  Private
  server.get('/api/auth/user', auth, (req, res) => {
    const data = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(data);
    const user = users.find(usr => usr.id === req.user.id);
    delete user.password;
    res.json(user);
  });
};
