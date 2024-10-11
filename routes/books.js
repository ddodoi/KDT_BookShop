const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator')

const jwt = require(('jsonwebtoken'));
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());


//전체 도서 조회
router.get('/')

//개별 도서 조회
router.get('/:id')

//카테고리별 도서 목록 조회
router.get('/:id')

//신간
router.get('/')




module.exports = router;