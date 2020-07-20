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

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  let date = new Date();
  res.send(
    `<p>Phonebook has infos for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (person.name === undefined) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  if (person.number === undefined) {
    return response.status(400).json({
      error: "number is missing",
    });
  }
  let name = person.name;
  if (persons.find((person) => person.name === name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  person.id = Math.floor(Math.random() * 10000);
  persons = persons.concat(person);

  response.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
