const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/dev");

const User = require("./models/User");
const { Diary } = require("./models/Diary");
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded 이렇게 된 데이터 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 것을 데이터 분석해서 가져올 수 있게
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

// 회원가입 라우터
app.post("/register", async (req, res) => {
  // 인스턴스 만들기
  const user = new User(req.body); // 정보들을 데이터베이스에 넣기
  //save() 몽고디비메서드 -> 정보들이 모델에 저장이 된다.
  
  user.save()
  .then(userInfo => res.status(200).json({ success: true }))
  .catch(err => res.json({ success: false, err }));

});