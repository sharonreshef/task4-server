const mongoose = require('mongoose');

const FamilyMemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  description: { type: String, required: true }
});

const FamilyMember = mongoose.model('familyMember', FamilyMemberSchema);
module.exports = { FamilyMember };
