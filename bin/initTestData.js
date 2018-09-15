"use strict";

const connection = new Mongo();
const db = connection.getDB('checkin');





const firstNames = [
  'Joe',
  'Sue',
  'Betty',
  'Bill',
  'John',
  'Mary',
  'Martha',
  'Suzy',
  'Tommy',
  'Jane',
  'Robert',
  'Jill',
  'Nick',
  'Ellen',
  'Samantha',
  'Evan',
  'Stuart',
  'Nancy',
  'Lucy',
  'James',
  'Linda',
  'Susan',
  'David',
  'Sarah',
  'Chris',
];



const lastNames = [
  'Smith',
  'Jones',
  'Parker',
  'Johnson',
  'Ford',
  'McDonald',
  'Davis',
  'Miller',
  'Lincoln',
  'Holmes',
  'Crosby',
  'Reeves',
  'Williams',
  'Nelson',
  'Brown',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
];

const tags = { };

function makeTag(firstName, lastName) {
  const goal = firstName.substr(0, 1).toLowerCase() + lastName.toLowerCase();
  let tag = goal;
  let count = 1;
  while (tag in tags) {
    tag = goal + (++count);
  }
  tags[tag] = true;
  return tag;
}

db.classes.createIndex({
  tag: 1,
}, {
  unique: 1,
});

let result = db.classes.insertMany([
  {
    tag: 'threes',
    name: 'Three Year Olds',
    color: 'blue',
  },
  {
    tag: 'fours',
    name: 'Four Year Olds',
    color: 'yellow',
  },
  {
    tag: 'kinder',
    name: 'Kindergarten',
    color: 'green',
  }
], {
  ordered: true,
});

if (! result.acknowledged) {
  throw new Error('Failed to insert classes');
}

const classes = result.insertedIds;

const max = firstNames.length * lastNames.length;

let i = Math.floor(Math.random() * 8);
for (; i < max; ++i) {
  const firstIdx = Math.floor(i / lastNames.length);
  const lastIdx = i % lastNames.length;
  const classIdx = Math.floor(Math.random() * classes.length);
  i += Math.floor(Math.random() * 8);

  const firstName = firstNames[firstIdx];
  const lastName = lastNames[lastIdx];
  const clas = classes[classIdx];

  result = db.students.insertOne({
    firstName,
    lastName,
    class: clas,
    status: 'away',
  });

  if (! result.acknowledged) {
    throw new Error('Failed to create student');
  }
}
