const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');

const auth = require('./middleware/auth');

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'client/build',
});
const PORT = process.env.PORT || 5000;
const basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;

let primaveraRequests;

const SalesController = require('./sales');
const FinancialController = require('./financial');
// eslint-disable-next-line no-underscore-dangle
const db = router.db.__wrapped__;

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const loginPrimavera = () => {
  const options = {
    method: 'POST',
    url: 'https://identity.primaverabss.com/connect/token',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'application',
      grant_type: 'client_credentials',
    },
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    const jsonF = JSON.parse(response.body);
    primaveraRequests = request.defaults({
      headers: { Authorization: `Bearer ${jsonF.access_token}` },
    });
  });
};

loginPrimavera();

SalesController(server, db);
FinancialController(server, db);

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

server.get('/api/expenses', auth, (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/invoiceReceipt/expenses/`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(body);
  });
});

// Set static folder in production
if (process.env.NODE_ENV === 'production') {
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

process.on('SIGINT', () => {
  console.log('Bye bye!');
  process.exit();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
