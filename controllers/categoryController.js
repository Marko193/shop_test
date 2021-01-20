const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM category', (err, categories) => {
            if (err) {
                res.json(err);
            }
            res.render('categories', {
                data: categories
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO category set ?', data, (err, product) => {
            console.log(product)
            res.redirect('/home/categories');
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM category WHERE id = ?", [id], (err, rows) => {
            res.render('categories_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE category set ? where id = ?', [newProduct, id], (err, rows) => {
            res.redirect('/home/categories');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM category WHERE id = ?', [id], (err, rows) => {
            res.redirect('/home/categories');
        });
    });
}

module.exports = controller;