const mysql = require("mysql2");
const express = require("express");
const app = express();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "result",
});

con.connect();

app.get("/", (req, res) => {
  con.query("select * from students", (err, result) => {
    if (err) return err;
    res.status(200).json({
      status: "success",
      result,
    });
  });
});

app.get("/add/:name/:phys/:chem/:math/:comp/:engl", (req, res) => {
  const name = req.params.name;
  const phys = req.params.phys;
  const chem = req.params.chem;
  const math = req.params.math;
  const comp = req.params.comp;
  const engl = req.params.engl;

  const subs = [phys, chem, math, comp, engl];
  let total = 0,
    pr,
    min = 100,
    max = 0,
    cnt = 0,
    status,
    grade;
  subs.map((val) => {
    const num = Number(val);
    total += num
    if (num < min) min = num;
    if (num > max) max = num;
    if (num < 33) cnt++;
  });

  pr = total / 5;

  if (cnt > 2) status = "FAIL";
  else if (cnt > 0) status = "ATKT";
  else status = "PASS";

  if (pr > 90) grade = "A";
  else if (pr > 80) grade = "B";
  else if (pr > 70) grade = "c";
  else if (pr > 60) grade = "d";
  else if (pr > 50) grade = "E";
  else grade = "F";

  const query =
    "insert into students(name, phys, chem, math, comp, engl, total, pr, min, max, grade, status) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  con.query(
    query,
    [name, phys, chem, math, comp, engl, total, pr, min, max, grade, status],
    (err) => {
      if (err) return err;
      res.redirect("/");
    }
  );
});


app.listen(3000)