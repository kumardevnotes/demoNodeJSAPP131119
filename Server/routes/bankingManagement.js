var express = require('express');
var router = express.Router();
var sharedObj = require('./shared');

router.post('/user-reg', function (req, res) {
    var uid = req.body.userID;
    var name = req.body.name;
    var email = req.body.mailID;
    var phone = req.body.phoneNum;
    var account = req.body.accNum;
    var pan = req.body.panNum;

    var stdObj = {
        uid: uid,
        name: name,
        email: email,
        phone: phone,
        account: account,
        pan: pan
    }

    console.log('Customer Details: ' + uid + ' ' + name + ' ' + email + ' ' + phone + ' ' + account + ' ' + pan);

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('users');
            collection.insertOne(stdObj, function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        });

})

router.post('/get-details', function (req, res) {
    var uid = req.body.userID;
    var resultObj = {
        'uid': uid
    }
    console.log('uid: '+uid);

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('users');
            collection.findOne(resultObj, function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        }
    )
})

router.post('/login-check', function (req, res) {
    var uid = req.body.uid;
    var pwd = req.body.pwd;
    var dataObj = {
        uid: uid,
        pwd: pwd
    }

    console.log('uid: ' + uid);
    console.log('pwd: ' + pwd);

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('users');
            collection.findOne(dataObj, function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        }
    )
})

router.post('/depost', function (req, res) {
    var accNum = req.body.accNum;
    var transactioType = req.body.transactioType;
    var amount = req.body.amount;

    var depostObj = {
        accNum: accNum,
        transactioType: transactioType,
        amount: amount
    }

    console.log('Deposit Details: ' + accNum + ' ' + transactioType + ' ' + amount);

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('transactions');
            collection.insertOne(depostObj, function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        });

})

router.post('/withdraw', function (req, res) {
    var accNum = req.body.accNum;
    var transactioType = req.body.transactioType;
    var amount = req.body.amount;

    var withdrawObj = {
        accNum: accNum,
        transactioType: transactioType,
        amount: amount
    }

    console.log('Withdraw Details: ' + accNum + ' ' + transactioType + ' ' + amount);

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('transactions');
            collection.insertOne(withdrawObj, function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        });

})

router.post('/balance-check', function (req, res) {
    var accNum = req.body.accNum;
    console.log('accNum: ' + accNum);

    var dataObj = {
        accNum: accNum
    }

    sharedObj.getMongoCon(
        res,
        function (db) {
            var collection = db.collection('transactions');
            collection.find({accNum: accNum}).toArray(function (e, s) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(s);
                }
            })
        }
    )
})


module.exports = router;