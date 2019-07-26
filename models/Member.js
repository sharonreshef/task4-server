const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  description: { type: String, required: true }
});

const Member = mongoose.model('Member', MemberSchema);
module.exports = { Member };
