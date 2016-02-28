'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.db
  },
  secrets: {
    jwt: process.env.JWT_SECRET || 'secret'
  },
  jwt: {
    audience: 'bills-frontend',
    issuer: 'bills-backend'
  }
};