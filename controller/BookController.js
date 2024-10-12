const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');  //status code모듈


//(카테고리별)전체 도서 조회
const allBooks = (req, res) =>{
    let {category_id} = req.query;

    if (category_id){  //카테고리별 도서 조회
        let sql = `SELECT * FROM books WHERE category_id = ?`;
        conn.query(sql, category_id, (err, results)=>{
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
    }
    else{    //전체 도서 조회
        let sql = `SELECT * FROM books`;
        conn.query(sql, (err, results)=>{
            if (err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            res.status(StatusCodes.OK).json(results);
        })
    }
};

//개별 도서 조회
const bookDetail = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM books WHERE id = ?`;
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