const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');  //status code모듈
const jwt = require(('jsonwebtoken'));  //jwt 모듈
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto'); //crpto 내장 모듈 : 암호화

//회원가입
const join = (req, res) => {
    const {email, password} = req.body;

    let sql = `INSERT INTO users(email, password, salt) VALUES(?, ?, ?)`;

    //회원가입시, 비밀번호를 암호화해서 암호화된 비밀번호와 salt값을 db에 같이 저장
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let values = [email, hashPassword, salt];
    conn.query(sql, values,
        (err, results)=>{
            if (err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();  //BAD REQUEST
            }
            return res.status(StatusCodes.CREATED).json(results);
        }
        );
}

//로그인
const login = (req, res)=>{
    const {email, password} = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql, email, 
        (err, results)=>{
            if (err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            const loginUser = results[0];

            //이메일&비밀번호(날 것) => salt값 꺼내서 비밀번호 암호화 해보고 
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

            // DB 비밀번호랑 비교
            if (loginUser && loginUser.password == hashPassword){
                //token 발행
                const token = jwt.sign({
                    email : loginUser.email
                }, process.env.PRIVATE_KEY,{
                    expiresIn : '30m',
                    issuer : "jina"
                });

                //토큰 쿠키에 담기
                res.cookie("token",token,{
                    httpOnly : true
                });
                console.log(token);

                res.status(StatusCodes.OK).json(results);
            }
            else{
                res.status(StatusCodes.UNAUTHORIZED).end();
                //401: Unauthorized(서버가 그 사람이 누군지 모름)  403: Forbidden(접근 권리 없음-서버가 그 사람이 누군지 알고있음)
            }
        })

};

//비밀번호초기화 요청
const passwordResetRequest= (req, res)=>{
    const {email} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, 
        (err, results)=>{
            if (err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            //이메일로 유저가 있는지 찾아본다!
            const user = results[0];
            if (user){
                res.status(StatusCodes.OK).json({
                    email : email
                });
            }
            else{
                res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

//비밀번호 수정
const passwordReset = (req, res)=>{
    const {email, password} = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
    
    let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    let values = [hashPassword, salt, email];
    conn.query(sql, values, (err, results)=>{
        if (err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results.affectedRows == 0){
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        else{
           return res.status(StatusCodes.OK).json(results);
        }
    })
};



module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
}