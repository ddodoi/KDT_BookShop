const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');  //status code모듈


//(카테고리별, 신간 여부)전체 도서 목록 조회
const allBooks = (req, res) =>{
    //limit : page당 도서 수        ex)3
    //currentPage : 현재 몇 페이지  ex) 1,2,3...
    //offset: 시작점                    0,3,6,9,12... 
    //offset = (currentPage-1)*limit
    let {category_id, news, limit, currentPage} = req.query;
    let offset = limit * (currentPage-1);
    let sql = `SELECT * FROM books`;
    let values = [];

    if (category_id && news){
        sql += ` WHERE category_id = ? AND pub_date BETWEEN 
        DATE_SUB('2023-12-17', INTERVAL 1 MONTH) AND '2023-12-17'`;
        values = [category_id];
    }
    else if (category_id){
        sql  += ` WHERE category_id = ?`;
        values = [category_id];
    }
    else if (news){
        sql += ` WHERE pub_date BETWEEN 
        DATE_SUB('2023-12-17', INTERVAL 1 MONTH) AND '2023-12-17'`;
    }

    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);

    conn.query(sql, values, (err, results)=>{
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.length){
            return res.status(StatusCodes.OK).json(results);
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    })
};


//개별 도서 조회
const bookDetail = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM books 
    LEFT JOIN category ON books.category_id = category.id WHERE books.id = ? ;`;
    conn.query(sql, id, (err, results)=>{
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results[0]){
        res.status(StatusCodes.OK).json(results[0]);
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    })
};



module.exports = {
    allBooks,
    bookDetail
}