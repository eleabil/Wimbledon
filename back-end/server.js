var express = require('express'); // connecting express
var bodyParser = require('body-parser'); //add. library to transfer data as json, that makes object from it
var MongoClient = require('mongodb').MongoClient; //DB connection
var ObjectID = require('mongodb').ObjectID; //auto creation id in db

var app = express(); // express object creation (екземпляр експресу, який ми можемо вик через новостворений об'єкт бібліотеки)
var db; // об'єкт бд

app.use(bodyParser.json()); //коли дані перед з фронт енду то завдяки підключ бодіпаресу дані одразу перетвор з json
app.use(bodyParser.urlencoded({extended: true})); //розшивфровує дані

// Rest for news   обмін даними за доп http реквестів між сервером і сторінкою
app.post('/news', function (req, res) { // отримання новини з сервера
    //console.log(req.body.title);
    var news = {
        title: req.body.title,
        text: req.body.text
    };

    db.db().collection('news').insert(news, function (err, result) { //звернення до бд, збереження отриманих даних в базі даних
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(news) //надсилання даних в бд
    });
});


app.put('/news/:id', function (req, res) { //дані отримуються з сайту, сервер отримує дані в req. /щоб оновити дані, потрібно вказати id тєї новини, яку ми хочемо оновити, при створення новини в бд айдішка створюється автоматично
    let news = {                //сторюється новий об'єкт з оновленими даними
        name: req.body.title,
        text: req.body.text
    };

    db.db().collection('news').updateOne(
        {_id: ObjectID(req.params.id)},
        {$set: news},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
});


app.delete('/news/:id', function (req, res) {
    db.db().collection('news').deleteOne(
        {_id: ObjectID(req.params.id)},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
});


app.get('/news', function (req, res) { //req - дані, яку адуть з сайту     docs - дані, які дадуть з бд
    db.db().collection('news').find().toArray(function (err, docs) { //бд дає всі новини, тобто об'єкти з ключем news, воно зберігає об'єкти в список
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs) //відправка даних з сервера на сайт
    })
});


app.get('/news/:id', function (req, res) {
    db.db().collection('news').findOne({_id: ObjectID(req.params.id)}, function (err, doc) { //ObjectID вик для того, щоб в mongoDB ми шукали об'єкт по id
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc)
    });
});


// Rest for appeals
app.post('/appeals', function (req, res) {
    console.log(req.body.title);
    var appeal = {
        appeal: req.body.appeal,
    };

    db.db().collection('appeals').insert(appeal, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(appeal)
    });
});


app.put('/appeals/:id', function (req, res) {
    var appeal = {
        appeal: req.body.appeal,
    };

    db.db().collection('appeals').updateOne(
        {_id: ObjectID(req.params.id)},
        {$set: appeal},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
});


app.delete('/appeals/:id', function (req, res) {
    db.db().collection('appeals').deleteOne(
        {_id: ObjectID(req.params.id)},
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
});


app.get('/appeals', function (req, res) {
    db.db().collection('appeals').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.send(docs)
    })
});


app.get('/appeals/:id', function (req, res) {
    db.db().collection('appeals').findOne({_id: ObjectID(req.params.id)}, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc)
    });

});

app.get('/', function (req, res) {
    res.send('Hello API')
});

MongoClient.connect('mongodb://localhost:27017/wimbledon_site_db', function (err, database) {
    if (err) {
        return console.log(err);
    }

    db = database;
    app.listen(3012, function () {
        console.log('Api app started')
    });
});