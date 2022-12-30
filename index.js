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

// app.get("/hello/:id ", (req, res) => {
//     const id =req.params.id || "Hello user";
//   res.send({ status: 200, message: `Hello, ${id}`});
// });
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


app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
});