const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

const { USer } = require("./models/User");
const { Diary } = require("./models/Diary");
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded 이렇게 된 데이터 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 것을 데이터 분석해서 가져올 수 있게
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://svtr357:dudjswn135@cluster0.68cpgoa.mongodb.net/?retryWrites=true&w=majority"
  )
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
  user.save((err, userInfo) => {
    // 저장을 할 때 에러가 있으면 클라이언트한테 에러가 있다고 전달해야 됩니다.
    // 그러므로 성공하지 못했다고 json형식으로 전달해야하며, 에러메시지도 함께 전달해야됩니다.
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});