const mongoose = require('mongoose');
const { DB_URI } = require('../../config/env');

class DBServer {
  constructor({ dbURI }) {
    this.dbURI = dbURI || DB_URI;
  }

  async connect() {
    await mongoose.connect(this.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}

module.exports = DBServer;
