// const express = require("express");
// const app = express();
// const port = 3000;
// app.get("/", (req, res) => {
//   res.send("ok");
// });
// app.get("/test", (req, res) => {
//   res.send({ status: 200, message: "ok" });
// });

// app.get("/time", (req, res) => {
//   res.send({ status: 200, message: Date() });
// });

// app.get("/hello/:id", (req, res) => {
//   const id = req.params.id;
//   res.send({ status: 200, message: `hello, ${id}` });
// });

// app.get("/search", (req, res) => {
//   const search = req.query.s;
//   if (search) {
//     res.send({ status: 200, message: "ok", data: search });
//   } else {
//     res.status(500);
//     res.send({
//       status: 500,
//       error: true,
//       message: "you have to provide a search",
//     });
//   }
// });

// app.get("/movies/create", (req, res) => {
//   res.send({ status: 200, message: "ok" });
// });

// app.get("/movies/read", (req, res) => {
//   res.send({ status: 200, message: movies });
// });

// app.get("/movies/update", (req, res) => {
//   res.send({ status: 200, message: "ok" });
// });

// app.get("/movies/delete", (req, res) => {
//   res.send({ status: 200, message: "ok" });
// });

// app.get("/movies/read/by-date", (req, res) => {
//   const DateSorted = movies.sort((a, b) => a.year - b.year);
//   res.send({ status: 200, message: DateSorted });
// });

// app.get("/movies/read/by-rating", (req, res) => {
//   const ratingSorted = movies.sort((a, b) => b.rating - a.rating);
//   res.send({ status: 200, message: ratingSorted });
// });

// app.get("/movies/read/by-title", (req, res) => {
//   const moviesOrderedByTitle = movies.sort((a, b) => {
//     const X = a.title.toLowerCase();
//     const Y = b.title.toLowerCase();
//     if (X < Y) {
//       return -1;
//     } else if (X > Y) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
//   res.send({
//     status: 200,
//     data: moviesOrderedByTitle,
//   });
// });

// const movies = [
//   { title: "Jaws", year: 1975, rating: 8 },
//   { title: "Avatar", year: 2009, rating: 7.8 },
//   { title: "Brazil", year: 1985, rating: 8 },
//   { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
// ];

// app.get("/movies/read/id/:id", (req, res) => {
//   const idInteger = parseInt(req.params.id);
//   if (idInteger <= movies.length) {
//     res
//       .status(200)
//       .json({ status: 200, message: "OK", data: movies[idInteger] });
//   } else {
//     res.status(404).json({
//       status: 404,
//       error: true,
//       message: `the movie ${idInteger} does not exist`,
//     });
//   }
// });

// app.post("/movies/add", (req, res) => {
//   const { title, year, rating } = req.query;
//   if (!title || !year) {
//     return res.json({
//       status: 403,
//       error: true,
//       message: "You cannot create a movie without providing a title and a year",
//     });
//   }

//   if (year.length !== 4 || isNaN(year)) {
//     return res.json({
//       status: 403,
//       error: true,
//       message: "Year must be a 4-digit number",
//     });
//   }
//   if (!rating) {
//     rating = 4;
//   }
//   const movie = {
//     title,
//     year,
//     rating,
//   };
//   movies.push(movie);
//   res.json(movies);
// });

// app.delete("/movies/delete/:id", (req, res) => {
//   const delet = req.params.id;
//   if (isNaN(delet)) {
//     res.status(404);
//     res.send({
//       status: 404,
//       error: true,
//       message: `please enter a valid id number`,
//     });
//   } else if (delet < 0 || delet > movies.length - 1) {
//     res.status(404);
//     res.send({
//       status: 404,
//       error: true,
//       message: `the movie ${delet} does not exist`,
//     });
//   } else {
//     movies.splice(delet, 1);
//     res.send(movies);
//   }
// });

// app.get("/movies/update/:id", (req, res) => {
//   const update = req.params.id;
//   const tit = req.query.title;
//   if (isNaN(update)) {
//     res.status(404);
//     res.send({
//       status: 404,
//       error: true,
//       message: `please enter a valid id number`,
//     });
//   } else if (update < 0 || update > movies.length - 1) {
//     res.status(404);
//     res.send({
//       status: 404,
//       error: true,
//       message: `the movie ${update} does not exist`,
//     });
//   } else {
//     if (tit !== undefined && tit !== "") {
//       movies[update] = {
//         ...movies[update],
//         title: tit,
//       };
//     }
//     if (
//       !isNaN(req.query.year) &&
//       req.query.year !== "" &&
//       req.query.year.length == 4
//     ) {
//       movies[update] = {
//         ...movies[update],
//         year: parseInt(req.query.year),
//       };
//     }
//     if (
//       !isNaN(req.query.rating) &&
//       req.query.rating !== undefined &&
//       req.query.rating !== ""
//     ) {
//       movies[update] = {
//         ...movies[update],
//         rating: parseFloat(req.query.rating),
//       };
//     }
//     res.send(movies);
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });


const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

mongoose.connect(
  "mongodb+srv://Hassan-3HA:06695103@cluster0.nzyf8ou.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}
);

const DB = mongoose.connection

DB.on("error", (error) => console.log(error))
DB.once("open", () => console.log("Database Connected"))

app.use(express.json())

const moviesRouter = require("./routers/movies");
app.use("/movie", moviesRouter);

app.listen(3000, () => console.log("Server Started"));