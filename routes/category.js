const express = require('express');
const router = express.Router();

const {allCategory} = require('../controller/CategoryController');


//카테고리 전체 목록 조회
router.get('/', allCategory);


module.exports = router;