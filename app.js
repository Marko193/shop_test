/**
 * Module dependencies.
 */
const express = require('express'),
    http = require('http'),
    path = require('path'),
    mysql = require('mysql'),
    morgan = require('morgan'),
    session = require('express-session'),
    bodyParser = require("body-parser"),
    myConnection = require('express-myconnection');
const app = express();

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'shop'
}, 'single'));
app.use(express.urlencoded({ extended: false }));


const connection = require('./dbconnect');

//all environments
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
}))


app.get('/', function(req, res, next) {
    var goodsList = [];

    // Do the query to get data.
    connection.query('SELECT * FROM goods', function(err, rows, fields) {
        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        } else {
            // Loop check on each row
            for (var i = 0; i < rows.length; i++) {

                // Create an object to save current row's data
                var goods = {
                        'id': rows[i].id,
                        'name': rows[i].name,
                        'description': rows[i].description,
                        'cost': rows[i].cost,
                        'image': rows[i].image,
                        'category': rows[i].category,
                    }
                    // Add object into array
                goodsList.push(goods);
            }

            // Render index.pug page using array 
            res.render('index.pug', { "goodsList": goodsList });
        }
    });
});

//sort goods by category
app.get('/category', (req, res, next) => {
    let catId = req.query.id;

    let cat = new Promise(function(resolve, reject) {
        connection.query(
            'select * from goods where id =' + catId,
            function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
    });

    let goods = new Promise(function(resolve, reject) {
        connection.query(
            'select * from goods where category =' + catId,
            function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
    });

    Promise.all([cat, goods]).then((value) => {
        res.render('category.pug', {
            cat: JSON.parse(JSON.stringify(value[0])),
            goods: JSON.parse(JSON.stringify(value[1]))
        });
    });
});

//the personal product page

app.get('/product', function(req, res, next) {
    connection.query('SELECT * FROM goods WHERE id=' + req.query.id, function(err, result) {
        if (err) throw err;
        let UserInfo = result;
        UserInfo = JSON.parse(JSON.stringify(UserInfo));
        res.render('product.pug', {
            goods: JSON.parse(JSON.stringify(result))
        });
    })
});

app.post('/get-category-list', function(req, res) {
    connection.query('SELECT id, category FROM category', function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.json(result);
    })
});


//main page of sign in 
app.get('/sign-in', function(req, res, next) {
    res.render('sign-in.ejs');
});

//registration
app.get('/signup', function(req, res, next) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var mob = post.mob_no;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

        var query = connection.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs', { message: message });
            res.render('/sign-in');
        });

    } else {
        res.render('signup');
    }
});

app.post('/signup', function(req, res, next) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var mob = post.mob_no;

        var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

        var query = connection.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs', { message: message });
        });

    } else {

        res.render('signup');
    }
});

//authorization
app.get('/login', function(req, res, next) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
        connection.query(sql, function(err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            } else {
                message = 'Wrong Credentials.';
                res.render('sign-in.ejs', { message: message });
            }

        });
    } else {
        res.render('sign-in.ejs', { message: message });
    }
});


//authorization
app.post('/login', function(req, res, next) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
        connection.query(sql, function(err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            } else {
                message = 'Wrong Credentials.';
                res.render('sign-in.ejs', { message: message });
            }

        });
    } else {
        res.render('sign-in.ejs', { message: message });
    }
});

//the control panel
app.get('/home/dashboard', function(req, res, next) {
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

    connection.query(sql, function(err, results) {
        res.render('dashboard.ejs', { user: user });
    });
});

//the profile
app.get('/home/profile', function(req, res, next) {
    var userId = req.session.userId;
    if (userId == null) {
        res.redirect("/login");
        return;
    }

    var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    connection.query(sql, function(err, result) {
        res.render('profile.ejs', { data: result });
    });
});

//Logout
app.get('/signup', function(req, res, next) {
    res.render('/');
});

app.post('/signup', function(req, res, next) {
    res.render('/');
});

/////-------------------BEGIN-------------------//

// importing routes
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const categoryRoutes = require('./routes/category');


// routes
app.use('/home/products', productRoutes);
app.use('/home/users', customerRoutes);
app.use('/home/categories', categoryRoutes);

// static files

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});