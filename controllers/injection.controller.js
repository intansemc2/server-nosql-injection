const MongoClient = require('mongodb').MongoClient;

//Database function account
function doSomethingAccount(doSomething) {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (err) reject(err);

            const db = client.db('caferia');
            const collection = db.collection('account');
            doSomething(collection, resolve, reject);
        });
    });
}

//Tautology
//Login
module.exports.tautology = {
    login: async (req, res, next) => {
        let submit = req.query.submit;
        if (submit) {
            let { username, password } = req.query;

            let result = await doSomethingAccount((collection, resolve, reject) => {
                collection.find({ username: username, password: password }).toArray((err, docs) => {
                    if (err) reject(err);

                    if (Array.isArray(docs) && docs.length > 0) resolve(docs[0]);
                    else resolve();
                });
            });

            if (result) res.render('tautology/login/login_success', { title: 'Login success' });
            else
                res.render('tautology/login/login', {
                    title: 'Login Fail',
                    action: '',
                    loginFail: true,
                    username: username,
                    password: password,
                });
        } else
            res.render('tautology/login/login', {
                title: 'Login',
                action: '',
            });
        return next();
    },
    resolve_login: async (req, res, next) => {
        let submit = req.query.submit;
        if (submit) {
            let { username, password } = req.query;

            ////////////////////////////////////////////////////
            //Giai phap

            username = `${username}`;
            password = `${password}`;

            //Giap Phap
            ////////////////////////////////////////////////////

            let result = await doSomethingAccount((collection, resolve, reject) => {
                collection.find({ username: username, password: password }).toArray((err, docs) => {
                    if (err) reject(err);

                    if (Array.isArray(docs) && docs.length > 0) resolve(docs[0]);
                    else resolve();
                });
            });

            if (result) res.render('tautology/login/login_success', { title: 'Login success' });
            else
                res.render('tautology/login/login', {
                    title: 'Login Fail',
                    action: '',
                    loginFail: true,
                    username: username,
                    password: password,
                });
        } else
            res.render('tautology/login/login', {
                title: 'Login',
                action: '',
            });
        return next();
    },
    register: async (req, res, next) => {
        let submit = req.query.submit;
        if (submit) {
            let { username, password } = req.query;
            let type = 'user';

            let result = await doSomethingAccount((collection, resolve, reject) => {
                collection.insertOne({ username: username, password: password, type: type }, (err, result) => {
                    if (err) reject(err);

                    if (result && result.result && result.result.ok && result.result.ok == 1) resolve(result.result.ok);
                    else resolve();
                });
            });

            if (result) res.render('tautology/register/register_success', { title: 'Register success' });
            else
                res.render('tautology/register/register', {
                    title: 'Register Fail',
                    action: '',
                    registerFail: true,
                    username: username,
                    password: password,
                });
        } else
            res.render('tautology/register/register', {
                title: 'Register',
                action: '',
            });
        return next();
    },
    resolve_register: async (req, res, next) => {
        let submit = req.query.submit;
        if (submit) {
            let { username, password } = req.query;
            let type = 'user';

            ////////////////////////////////////////////////////
            //Giai phap

            username = `${username}`;
            password = `${password}`;

            //Giap Phap
            ////////////////////////////////////////////////////

            let result = await doSomethingAccount((collection, resolve, reject) => {
                collection.insertOne({ username: username, password: password, type: type }, (err, result) => {
                    if (err) reject(err);

                    if (result && result.result && result.result.ok && result.result.ok == 1) resolve(result.result.ok);
                    else resolve();
                });
            });

            if (result) res.render('tautology/register/register_success', { title: 'Register success' });
            else
                res.render('tautology/register/register', {
                    title: 'Register Fail',
                    action: '',
                    registerFail: true,
                    username: username,
                    password: password,
                });
        } else
            res.render('tautology/register/register', {
                title: 'Register',
                action: '',
            });
        return next();
    },
};
