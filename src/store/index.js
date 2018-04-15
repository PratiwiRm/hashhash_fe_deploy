if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  module.exports = require('./production');
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./development');
}
