var express = require('express');
var router = express.Router();
const { Todo } = require('../models/Todo');
const { Member } = require('../models/Member');

// router.get('/', async function(req, res, next) {
//   const todos = await Todo.find()
//     .select()
//     .exec();
//   res.send(todos);
// });

router.get('/', async function(req, res, next) {
  let newtodos = [];
  const todos = await Todo.find()
    .select({ description: 1, date: 1, familyMemberId: 1 })
    .exec();
  const members = await Member.find()
    .select({ _id: 1, name: 1 })
    .exec();
  let i = 0;
  todos.map(todo => {
    for (let index = 0; index < members.length; index++) {
      if (todo.familyMemberId == members[index]._id) {
        newtodos = [
          ...newtodos,
          {
            _id: todo._id,
            description: todo.description,
            date: todo.date,
            name: members[index].name
          }
        ];
      }
    }
  });
  res.send(newtodos);
});

router.post('/', async (req, res) => {
  const { description, name } = req.body;
  const date = new Date(Date.now());
  let familyMemberId = '';
  const members = await Member.find()
    .select({
      _id: 1,
      name: 1
    })
    .exec();
  let i = 0;
  members.map(member => {
    if (member.name == name) {
      familyMemberId = member._id;
    }
  });
  const todo = new Todo({
    description,
    date,
    familyMemberId
  });
  try {
    const document = await todo.save();
    res.status(200).send(document);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const todo = await Todo.deleteOne({ _id: id });
    res.send(todo);
  } catch (e) {
    res.status(404).send('not found');
  }
});

module.exports = router;
