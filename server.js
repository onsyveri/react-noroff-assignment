const express = require('express');
const app = express();
const packageJson = require('./package.json')

// Middleware
app.use(requireHTTPS);
app.use(express.static('./build/'));

// Redirect app request to build/index.html
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'build'});
});

// Start server
app.listen(process.env.PORT || 8080, () => console.log('Server started...'));

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
