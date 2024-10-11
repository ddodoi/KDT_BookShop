const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator')

const jwt = require(('jsonwebtoken'));
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

//회원가입
router.post('/join',
    [
        body('email').notEmpty().isEmail().withMessage(('이메일 확인 필요')),
        body('password').notEmpty().isString().withMessage('비밀번호 확인 필요')
    ],(req, res) => {
        const {email, password} = req.body;
        let sql = `INSERT INTO users(email,password) VALUES(?,?)`;
        let value = [email, password];
        conn.query(sql, value,
            (err, results)=>{
                if (err){
                    console.log(err);
                    return res.status(400).end();
                }
                res.status(201).json(results)
            }
            );

    }
);

//로그인
router.post('/login');

//비밀번호 초기화 요청
router.post('/reset');

//비밀번호 초기화(=수정)
router.put('/reset');



module.exports = router;