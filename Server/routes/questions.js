var express=require('express');
var router=express.Router();
var sharedObj=require('./shared');
router.post('/insert-que',function(req,res){
        var que=req.body.question;
        var o1=req.body.opt1;
        var o2=req.body.opt2;
        var o3=req.body.opt3;
        var o4=req.body.opt4;
        var ans=req.body.answer;
        var qObj={
            question:que,
            opt1:o1,
            opt2:o2,
            opt3:o3,
            opt4:o4,
            answer:ans
        }
            sharedObj.getMongoCon(
                res,
                function(db){
                    var collection=db.collection('questions');
                    collection.insertOne(qObj,function(e,s){
                        if(e){
                            res.send(e);
                        }else{
                            res.send(s);
                        }
                    })
                }
            )
})

router.get('/get-ques',function(req,res){
    sharedObj.getMongoCon(
        res,
        function(db){
            var collection=db.collection('questions');
            collection.find({}).toArray(function(e,s){
                    if(e){
                        res.send(e);
                    }else{
                        res.send(s);
                    }
            })
        }
    )
})


module.exports=router;