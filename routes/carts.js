const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator')

const jwt = require(('jsonwebtoken'));
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());


//장바구니 담기
router.post('/')
    
//장바구니에서 선택한 주문 예상 목록 조회
router.get('/');

//장바구니 도서 삭제
router.delete('/:id');


module.exports = router;