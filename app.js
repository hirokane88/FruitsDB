const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

////////////////////////////////////////////////////////////////////////////////
//ESTABLISH CONNECTION FROM THIS NODE JS PROJECT TO MONGODB VIA PORT 27017
//connection URL
const url = 'mongodb://localhost:27017';
//database dbName
const dbName = 'fruitsDB';
//create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////WHERE EVERYTHING HAPPENS//////////////////////////////////
//////////////use connect method to CONNECT TO SERVER///////////////////////////
client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //create db object
  const db = client.db(dbName);

  // insertDocuments(db, function(){
  // });
  findDocuments(db, function(){
    client.close();
  });
});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//INSERTING DATA INTO THE DATABASE
const insertDocuments = function(db, callback){
  //Get the documents collection
  const collection = db.collection('fruits');
  //insert some insertDocuments
  collection.insertMany([
    {
      name:"Apple",
      score:8,
      review: "Great Fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review:"Great Stuff!"
    }
  ],
    function(err, result){
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
    }
  );
};
////////////////////////////////////////////////////////////////////////////////
//RETRIEVING/FINDING DATA FROM THE DATABASE
const findDocuments = function(db, callback){
  //Get the documents collection
  const collection = db.collection('fruits');
  //Find some documents
  collection.find({}).toArray(function(err,fruits){
    assert.equal(err,null);
    console.log("Here's all the fruits");
    console.log(fruits);
    callback(fruits);
  });
}
