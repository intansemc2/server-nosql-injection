const MongoClient = require('mongodb').MongoClient;

//Login Bypass: Login Page
module.exports.loginBypassLogin = (req, res, next) => {
    res.render('login/login.pug', {
        title: 'Login',
        action: '/injection/login_bypass/auth',
    });
    next();
};

//Login Bypass: Resolve Login Page
module.exports.loginBypassResolveLogin = (req, res, next) => {
    res.render('login/login.pug', {
        title: 'Login',
        action: '/injection/login_bypass/resolve_auth',
    });
    next();
};

//Login Bypass: Login API Auth
module.exports.loginBypassAPIAuth = async (req, res, next) => {
    req.accepts('json');

    let { username, password } = req.body;

    let result = await new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) reject(err);

            const db = client.db('caferia');
            const collection = db.collection('account');
            collection.find({ username: username, password: password }).toArray(function (err, docs) {
                if (err) reject(err);

                if (Array.isArray(docs) && docs.length > 0) resolve(docs[0]);
                else resolve();
            });
        });
    });

    if (result) {
        res.status(200);
        res.send({ result: 'Success' });
    } else {
        res.status(401);
        res.send({ result: 'Fail' });
    }
    next();
};

//Login Bypass: Login Auth
module.exports.loginBypassAuth = async (req, res, next) => {
    let { username, password } = req.query;

    let result = await new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) reject(err);

            const db = client.db('caferia');
            const collection = db.collection('account');
            collection.find({ username: username, password: password }).toArray(function (err, docs) {
                if (err) reject(err);

                if (Array.isArray(docs) && docs.length > 0) resolve(docs[0]);
                else resolve();
            });
        });
    });

    if (result) res.render('login/login_success', { title: 'Login success' });
    else
        res.render('login/login', {
            title: 'Login Fail',
            action: '/injection/login_bypass/auth',
            loginFail: true,
            username: username,
            password: password,
        });

    next();
};
