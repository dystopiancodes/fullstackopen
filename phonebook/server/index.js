require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

var morgan = require("morgan");

morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

const cors = require("cors");

app.use(cors());

app.use(express.static("build"));

const Person = require("./models/person");

let persons = [
  {
    name: "dasdas",
    number: "321123",
    id: 12,
  },
  {
    name: "asddas",
    number: "123321",
    id: 13,
  },
  {
    name: "adsads",
    number: "sadda",
    id: 14,
  },
  {
    name: "asdsad",
    number: "adsdas",
    id: 15,
  },
  {
    name: "a",
    number: "23432423",
    id: 16,
  },
];

app.get("/info", (req, res) => {
  let date = new Date();
  res.send(
    `<p>Phonebook has infos for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
    console.log(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  /*
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  */
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === undefined) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (body.number === undefined) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  /*
  let name = body.name;
  if (persons.find((person) => person.name === name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
    person.id = Math.floor(Math.random() * 10000);
  persons = persons.concat(person);

  response.json(person);
  */

  const person = new Person({ name: body.name, number: body.number });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
