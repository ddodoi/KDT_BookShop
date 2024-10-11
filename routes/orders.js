const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator')

const jwt = require(('jsonwebtoken'));
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

//결제하기
router.post('/postorders',
    (req, res)=>{

    }
);

//주문 목록(내역) 조회
router.get('/',
    (req, res)=>{

    }
);

//주문 상세 상품 조회
router.delete('/',
    (req, res)=>{

    }
);



module.exports = router;