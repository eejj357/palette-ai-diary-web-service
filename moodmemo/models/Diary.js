const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {  // User 모델을 참조
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {  // 저장 날짜, 시간
    type: Date, 
    default: Date.now
  },
  emotion: {  // 감정 분석 결과 저장
    type: String
  },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;