const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator')

const jwt = require(('jsonwebtoken'));
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

//좋아요 추가
router.post('/:id');

//좋아요 취소 
router.delete('/:id');


module.exports = router;