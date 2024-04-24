const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

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
  token: {
    type: String // 유효성 관리
  },
  tokenExp: {// 토큰 유효기간 : 토큰을 사용할 수 있는 유효기간
    type: Number
  }
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


userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    // password가 같지 않으면
    if (err) return cb(err);
    // password가 같으면
    cb(null, isMatch);  // isMatch = true
  });
};


userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 사용해서 token 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;

  return user.save()
    .then (ser => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
};  


userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, "secretToken", function(err, decoded) {
    if (err) {
      console.error(err);
      return cb(err);
    }
    // user id를 이용하여 user를 찾은 후
    // client에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

    user
      .findOne({ _id: decoded, token: token})
      .then(function (user) {
        return cb(null, user);
      })
      .catch(function (err) {
        return cb(err);
      });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;