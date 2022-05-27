const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb+srv://<username>:<password>@cluster0.pmrnt.mongodb.net/test';
const connect = mongoose.connect(url);

// PART 1
/*
connect.then((db) => {
    
    console.log(`Successfully connected to the database`);

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
*/

// Part 2
/*
connect.then((db) => {
    
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'

    }).then((dish) => {

        console.log(dish);

        return Dishes.find({}).exec();

    }).then((dishes) => {

        console.log(dishes);

        return Dishes.remove({});

    }).then(() => {

        return mongoose.connection.close();

    }).catch((err) => {

        console.log(err);
    });

}).catch((err) => {
    console.log(`Cannot connect to the database : ${err}`);
});

*/
// Part 3

connect.then((db) => {
    
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'

    }).then((dish) => {

        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'Updated test'}
        },{new:true}).exec();

    }).then((dish) => {

        console.log(dish);

        dish.comments.push({
            rating:5,
            comment : 'I\m getting a sinking feeling',
            author:'Leonardo di Carpaccio'
        });

        return dish.save();

    }).then((dish) => {

        console.log(dish);

        return Dishes.remove({});
        
    }).then(() => {

        return mongoose.connection.close();

    }).catch((err) => {

        console.log(err);

    });

}).catch((err) => {
    console.log(`Cannot connect to the database : ${err}`);
});
