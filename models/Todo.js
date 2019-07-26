const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  familyMemberId: { type: String, required: true }
});

const Todo = mongoose.model('todo', TodoSchema);
module.exports = { Todo };
