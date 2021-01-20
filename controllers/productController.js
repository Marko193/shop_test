const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM goods', (err, products) => {
            if (err) {
                res.json(err);
            }
            res.render('products', {
                data: products
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO goods set ?', data, (err, product) => {
            console.log(product)
            res.redirect('/home/products');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM goods WHERE id = ?", [id], (err, rows) => {
            res.render('products_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE goods set ? where id = ?', [newProduct, id], (err, rows) => {
            res.redirect('/home/products');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM goods WHERE id = ?', [id], (err, rows) => {
            res.redirect('/home/products');
        });
    });
}

module.exports = controller;