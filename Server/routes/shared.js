var mongo=require('mongodb');

var sharedObj={};

sharedObj.getMongoCon=function(res,cb){
    var mongoClient=mongo.MongoClient;
    var url="mongodb://localhost:27017";
    mongoClient.connect(url,function(err,cluster){
        if(err){
            res.send('db conn error');
        }
        var db=cluster.db('domesticBanking');
        cb(db);
    })
}

sharedObj.getMysqlCon=function(){

}

module.exports=sharedObj;