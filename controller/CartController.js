const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');  //status code모듈


//장바구니 담기
const addToCart = (req, res) =>{
    const {book_id, quantity, user_id} = req.body;
    
    let sql = `INSERT INTO Bookshop.cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
    let values = [book_id, quantity, user_id];
    conn.query(sql, values, (err, results) =>{
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
        })
    };


//장바구니에서 아이템 조회     /선택된 id들이 req.body로 같이 넘어오면..
const getCartItems = (req, res) =>{
    const {user_id, selected} = req.body;

    let sql = `SELECT cartItems.id, book_id, title, quantity, price FROM Bookshop.cartItems 
                LEFT JOIN Bookshop.books ON books.id = cartItems.book_id
                WHERE cartItems.user_id = ? AND cartItems.id IN (?)`;
    let values = [user_id, selected];          
    conn.query(sql, values, (err, results) =>{
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
        })
};


//장바구니 도서 삭제
const removeCartItem = (req, res) =>{
    const {id} = req.params;

    let sql = `DELETE FROM Bookshop.cartItems WHERE id = ?`;
    conn.query(sql, id, (err, results) =>{
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
        })  
};



module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}