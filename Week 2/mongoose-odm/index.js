const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb+srv://<username>:<password>@cluster0.pmrnt.mongodb.net/test';
const connect = mongoose.connect(url);

connect.then((db) => {

    const newDish = Dishes({
        name:'Uthappizza',
        description:'test'
    });

    newDish.save().then((dish) => {

        console.log(dish);
        return Dishes.find({}).exec();
    }).then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
    }).then(() => {
        mongoose.connection.close();
    }).then((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(`Cannot connect to the database : ${err}`);
});