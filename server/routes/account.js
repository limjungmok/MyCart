import express from 'express';
import Account from '../models/account';

const router = express.Router();


/*
   ACCOUNT SIGNUP: POST /api/account/signup
   BODY SAMPLE: { "userId": "test", "password": "test" }
   ERROR CODES:
      1: BAD USERID
      2: BAD PASSWORD
      3: USERNAM EXISTS
*/
router.post('/signup', (req, res) => {
   // CHECK USERID FORMAT
   let userIdRegex = /^[a-z0-9]+$/;
   console.log(req.body.userId.length);
   if(!userIdRegex.test(req.body.userId) || req.body.userId.length < 4) {
      return res.status(400).json({
           error: "BAD USERID",
           code: 1
      });
   }

   // CHECK PASS LENGTH
   if(req.body.password.length < 4 || typeof req.body.password !== "string") {
      return res.status(400).json({
           error: "BAD PASSWORD",
           code: 2
      });
   }

   // CHECK USER EXISTANCE
   Account.findOne({ userId: req.body.userId }, (err, exists) => {
      if (err) throw err;
      if(exists){
           return res.status(409).json({
               error: "USERID EXISTS",
               code: 3
           });
      }

      // CREATE ACCOUNT
      let account = new Account({
           userId: req.body.userId,
           password: req.body.password
      });

      account.password = account.generateHash(account.password);

      // SAVE IN THE DATABASE
      account.save( err => {
           if(err){
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
router.post('/signin', (req, res) => {

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERID
    Account.findOne({ userId: req.body.userId}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
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
router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});
/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

export default router;
