/*
 * @Author: your name
 * @Date: 2021-11-30 10:19:52
 * @LastEditTime: 2021-11-30 11:45:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \es-project\server\server.js
 */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/api/json", function (req, res) {
  const { loginToken } = req.cookies;
  console.log(" ===> loginToken", loginToken);
  res.json({
    status: 0,
    msg: "请求成功",
  });
});

app.post("/api/bodyjson", function (req, res) {
  const { page, perPage } = req.query;
  console.log(" ===> req.body", req.body);
  res.json({
    status: 0,
    msg: "请求成功",
    page,
    perPage,
  });
});

app.post("/api/login", function (req, res) {
  const { username, password } = req.body;
  res.cookie("loginToken", username, {
    maxAge: 1000 * 60 * 15,
    domain: "localhost",
    httpOnly: true,
  });

  res.json({
    status: 0,
    msg: "登录成功",
    data: {
      username,
    },
  });
});

app.listen(8001, () => {
  console.log(" ===>  start at http:localhost:8001");
});
