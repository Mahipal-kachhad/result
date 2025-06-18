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

app.get("/insert/:name/:phys/:chem/:math/:comp/:engl", (req, res) => {
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
    total += num;
    if (num < min) min = num;
    if (num > max) max = num;
    if (num < 33) cnt++;
  });

  pr = parseFloat((total / 5).toFixed(2));
  
  if (cnt > 2) status = "FAIL";
  else if (cnt > 0) status = "ATKT";
  else status = "PASS";

  if (pr > 90) grade = "A";
  else if (pr > 80) grade = "B";
  else if (pr > 70) grade = "C";
  else if (pr > 60) grade = "D";
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

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = "delete from students where id=?";
  con.query(query, [id], (err) => {
    if (err) return err;
    res.redirect("/");
  });
});

app.get("/search/:parameter/:value", (req, res) => {
  const parameter = req.params.parameter;
  let value = req.params.value;
  let query;
  if (parameter === "top") {
    query = "select * from students order by pr desc limit ?";
    value = parseInt(value);
  } else {
    query = `select * from students where ${parameter} = ?`;
  }
  con.query(query, [value], (err, result) => {
    if (err) return err;
    res.status(200).json({
      status: "success",
      result,
    });
  });
});

app.listen(3000);
