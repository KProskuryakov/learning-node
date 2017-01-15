const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const pg = require('pg');
const bodyParser = require('body-parser');

const port = 3000;
const conString = 'postgres://kostya:inferno@localhost/testdb';

const app = express();



app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
// app.configure(() => {
//     app.use(express.bodyParser());
// });

app.listen(port, (err) => {
    if (err) {
        return console.log('Error!', err)
    }

    console.log(`server started on ${port}`);
});

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    })
});


pg.connect(conString, function (err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err)
    }
    client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err, result) {
        done();

        if (err) {
            return console.error('error happened during query', err)
        }
        console.log(result.rows[0]);
        //process.exit(0)
    })
});

app.post('/users', function (req, res, next) {
    const user = req.body;

    pg.connect(conString, function (err, client, done) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
            done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

            if (err) {
                // pass the error to the express error handler
                return next(err)
            }

            res.send(200)
        })
    })
});

app.get('/users.json', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        client.query('SELECT name, age FROM users;', [], function (err, result) {
            done()

            if (err) {
                // pass the error to the express error handler
                return next(err)
            }

            res.json(result.rows)
        })
    })
});

app.get('/users', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        client.query('SELECT name, age FROM users;', [], function (err, result) {
            done()

            if (err) {
                // pass the error to the express error handler
                return next(err)
            }

            // res.json(result.rows)
            res.render('users', {
                users: result.rows
            })
        })
    })
});



