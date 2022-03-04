const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Issue = mongoose.model('issue', IssueSchema);
