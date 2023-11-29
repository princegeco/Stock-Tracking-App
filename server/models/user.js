const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

class User {
  constructor(name, username, password, email) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findOneByUsername(username) {
    const db = getDb();
    return db.collection('users').findOne({ username });
  }

  static findOneById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }

  static validateEmail(email) {
    const db = getDb();
    return db.collection('users').findOne({ email });
  }
}

module.exports = User;