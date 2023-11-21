const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
});

userSchema.pre("save", function (next){
  const user = this;  // userSchema를 가리킴

  // password를 변환할 때만 bcrypt 발동
  if (user.isModified("password")) {
    // password 암호화
    bcrypt.genSalt(saltRounds, function(err, salt){
      if (err) return next(err)
  
      // salt를 제대로 생성했다면
      // user.password라고 하면 userSchema의 password로 넣은 값
      bcrypt.hash(user.password, salt, function(err, hash) {
        // 에러 발생할 경우 server.js에 있는 save로 보내기
        if (err) return next(err);
  
        // 암호화 성공 -> user의 비밀번호를 암호화한 비밀번호로 교체
        user.password = hash;
        next();
      });
    });
  } else {
    next();  // server.js save로 보내기
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;