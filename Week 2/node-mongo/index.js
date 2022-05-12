const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');


const url = 'mongodb+srv://ahmed:camara@cluster0.nnme3.mongodb.net/test';
const dbname = 'conFusion';

MongoClient.connect(url,(err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    /*const collection = db.collection('dishes');

    collection.insertOne({"name":"Uthappizza","description":"test"}, (err,result) => {

        assert.equal(err,null);
        console.log(`After Insert : \n ${result.ops}`);

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);

            console.log('Found : \n');

            console.log(docs);

            db.dropCollection('dishes',(err,result) => {
                assert.equal(err,null);
                console.log('dishes collection has successfully been deleted');
                client.close();
            });
        });

    });*/

    dbOper.insertDocument(db,{name:"Vadonut",description:"Test"},'dishes',(result) => {
        console.log(`Insert Document : \n ${result.ops}`);

        dbOper.updateDocument(db,{name:"Vadonut"},{description:"Updated Test"},'dishes',(result) => {

            console.log(`Updated document : \n ${result.result}`);

            dbOper.findDocuments(db,'dishes',(docs) => {
                console.log(`Found updated documents : \n ${docs}`);

                db.dropCollection('dishes',(result) => {
                    console.log("Dropped Collection: ", result);

                    client.close();
                });
            });
        });
    });
});


console.log('***************************************************************************************************************');

// PROMISES

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dbOper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dbOper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dbOper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dbOper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));