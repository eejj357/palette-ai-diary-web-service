const User = require("./../models/User");

const auth = (req, res, next) => {
    // 인증 처리
    // 1. client cookie에서 token을 가져온다
    let token = req.cookies.hasVisited;

    // 2. token이 없으면 인증 X
    if (!token) {
        return res.json({ isAuth: false, error: true});
    }

    // 3. token을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if (err) throw err;

        // 4. user가 없으면 인증 X
        if (!user) return res.json({ isAuth: false, error: true });

        // 5. user가 있으면 인증 O
        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = auth;