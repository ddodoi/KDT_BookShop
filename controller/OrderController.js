const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');  //status code모듈

//결제하기 
const order = (req, res) => {
    const {items, delivery, total_quantity, total_price, user_id, firstBookTitle} = req.body;

    let delivery_id;
    let order_id;

    let sql = `INSERT INTO Bookshop.delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    conn.query(sql, values, (err, results) => {
        if (err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        
        delivery_id = results.insertId;

        })

        sql = `INSERT INTO Bookshop.orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
        values = [firstBookTitle, total_quantity, total_price, user_id, delivery_id];
        conn.query(sql, values, (err, results) => {
            if (err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            order_id = results.insertId;

        })

        sql = `INSERT INTO Bookshop.orderedBook (order_id, book_id, quantity) VALUES (?, ?, ?)`;
        //items..배열 : 요소들을 하나씩 꺼내서 (foreach문 돌려서) >
        values = [];
        items.forEach((item)=>
            values.push([order_id, item.book_id, item.quantity])
        );
        conn.query(sql, [values], (err, results) => {
            if (err){
                console.log(err)
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        })
};


//주문 목록(내역) 조회
const getOrders = (req, res) => {

};


//주문 상세 조회
const getOrderDetail = (req, res) => {

};



module.exports = {
    order,
    getOrders,
    getOrderDetail
};