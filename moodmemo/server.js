const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const User = require("./models/User");
const Diary = require("./models/Diary");
const config = require("./config/dev");
const auth = require("./middleware/auth");

const app = express();
const port = 5000;

const crypto = require('crypto');  // 난수


// Middleware 설정
// application/x-www-form-urlencoded 이렇게 된 데이터 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 것을 데이터 분석해서 가져올 수 있게
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());  // 모든 경로에 대해 CORS를 허용하는 미들웨어 추가


// MongoDB 연결
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


// 로그인 라우터
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // 1. 요청된 email이 DB에 있는지 확인
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {  // email이 DB에 없으면
        return res.json({
          loginSuccess: false,
          message: "이메일을 다시 확인하세요",
        });
      }

    // 2. DB에서 요청한 email이 있다면 password가 같은지 확인
    user.comparePassword(password, (err, isMatch) => {
      // password가 불일치할 경우
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      
      // 3. password가 일치하다면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 4. 생성된 token을 쿠키에 저장
        res
          .cookie("hasVisited", user.token, { httpOnly: true })
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  })
  .catch((err) => {
    return res.status(400).send(err);
  })
});


// Auth (인증) 기능
app.get("/api/user/auth", auth, (req,res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  });
});


// 로그아웃 라우터
app.get("/api/user/logout", auth, (req, res) => {
  // logout 하려는 user를 DB에서 찾아서 데이터 업데이트
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
      return res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, message: "로그아웃에 실패하였습니다" });
    });
});


// 일기 저장 라우터
app.post("/api/diary", auth, async (req, res) => {
  try {
    const { date, title, content } = req.body;

     // 감정 목록
     const emotions = ['happy', 'angry', 'neutral', 'anxiety', 'sad'];

     // 난수 생성
     const randomIndex = crypto.randomInt(0, emotions.length);
     const selectedEmotion = emotions[randomIndex];

    // Diary 모델을 사용하여 새 일기 작성
    const newDiary = new Diary({
      title,
      content,
      user: req.user._id,
      date: date,
      emotion: selectedEmotion,
    });

    // 일기 저장
    const savedDiary = await newDiary.save();

    res.status(201).json(savedDiary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// 모든 일기 가져오기
app.get("/api/get-all-diaries", async (req, res) => {
  try {
    const diaries = await Diary.find();

    res.status(200).json(diaries);
  } catch (err) {
    console.err(err);
    res.status(500).json({ error: "Internal Server Error"});
  }
});


// 내 일기 가져오기
app.get("/api/get-my-diaries", auth, async (req, res) => {
  try {
    // 현재 로그인한 user의 ID를 사용하여 해당 user의 일기를 찾는다
    const userDiaries = await Diary.find({ user: req.user._id });

    res.status(200).json(userDiaries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});