'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
   ACCOUNT SIGNUP: POST /api/account/signup
   BODY SAMPLE: { "userId": "test", "password": "test" }
   ERROR CODES:
      1: BAD USERID
      2: BAD PASSWORD
      3: USERNAM EXISTS
*/
router.post('/signup', function (req, res) {
    // CHECK USERID FORMAT
    var userIdRegex = /^[a-z0-9]+$/;

    if (!userIdRegex.test(req.body.userId) && req.body.userId.length > 4) {
        return res.status(400).json({
            error: "BAD USERID",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    _account2.default.findOne({ userId: req.body.userId }, function (err, exists) {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: "USERID EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        var account = new _account2.default({
            userId: req.body.userId,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);

        // SAVE IN THE DATABASE
        account.save(function (err) {
            if (err) {
                var errorMsg = "error : " + err.message;
                console.log(errorMsg + " / " + err.getLastError());
                response.status(500).send(err);
            }
            return res.json({ success: true });
        });
    });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "userId": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', function (req, res) {

    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERID
    _account2.default.findOne({ userId: req.body.userId }, function (err, account) {
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        var session = req.session;
        session.loginInfo = {
            _id: account._id,
            userId: account.userId
        };

        // RETURN SUCCESS
        return res.json({
            success: true
        });
    });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', function (req, res) {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});
/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) throw err;
    });
    return res.json({ sucess: true });
});

exports.default = router;