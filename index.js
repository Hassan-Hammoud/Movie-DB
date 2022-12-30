const express = require("express")
const app = express();
const port = 3000;
app.get("/", (req,res) => {
    res.send("ok");
});
app.get("/test", (req,res)=>{
    res.send({status:200, message:"ok"})
})

app.get("/time", (req, res) => {
  res.send({ status:200, message:Date()});
});


app.get("/hello/:id", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

app.get("/search", (req, res) => {
  const search = req.query.s;
  if (search) {
    res.send({ status: 200, message: "ok", data: search });
  } else {
    res.status(500);
    res.send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

app.get("/movies/create", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.get("/movies/read", (req, res) => {
  res.send({ status: 200, message: movies });
});

app.get("/movies/update", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.get("/movies/delete", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.get("/movies/read/by-date", (req, res) => {
    const DateSorted = movies.sort((a, b) => a.year -b.year);
  res.send({ status: 200, message: DateSorted });
});

app.get("/movies/read/by-rating", (req, res) => {
  const ratingSorted = movies.sort((a, b) => b.rating - a.rating);
  res.send({ status: 200, message: ratingSorted });
});

app.get("/movies/read/by-title", (req, res) => {
  const moviesOrderedByTitle = movies.sort((a, b) => {
    const X = a.title.toLowerCase();
    const Y = b.title.toLowerCase();
    if (X < Y) {
      return -1;
    } else if (X > Y) {
      return 1;
    } else {
      return 0;
    }
  });
  res.send({
    status: 200,
    data: moviesOrderedByTitle,
  });
});

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

app.get("/movies/read/id/:id", (req, res) => {
  const idInteger = parseInt(req.params.id);
  if (idInteger <= movies.length) {
    res
      .status(200)
      .json({ status: 200, message: "OK", data: movies[idInteger] });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${idInteger} does not exist`,
    });
  }
});

app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
});