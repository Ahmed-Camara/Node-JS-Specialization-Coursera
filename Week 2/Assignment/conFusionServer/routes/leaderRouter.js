const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get((req,res,next) => {
        
        Leaders.find({}).then((leaders) => {

            if(leaders != null){

                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(leaders);
            
            }else{

                err = new Error('No Leader found in the database');
                err.status = 404;
                return next(err);

            }
        })
    })
    .post((req,res,next) => {
        
        Leaders.create(req.body).then((leader) => {

            console.log(`Leader has been inserted : \n ${leader}`);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);

        },(err) => next(err))
        .catch((err) => next(err));
    })
    .put((req,res,next) => {

        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req,res,next) => {
        
        Leaders.remove({}).then((resp) => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        },(err) => next(err))
        .catch((err) => next(err));
    });


leaderRouter.route('/:leaderId')
    .get((req,res,next) => {

        Leaders.findById(req.params.leaderId).then((leader) => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);

        },(err) => next(err))
        .catch((err) => next(err));

    })
    .put((req,res,next) => {
        
        Leaders.findByIdAndUpdate(req.params.leaderId,{$set : req.body},{new : true}).then((leader) => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);

        }, (err) => next(err))
        .catch((err) => next(err));


    })
    .delete((req,res,next) => {
        
        Leaders.findByIdAndRemove(req.params.leaderId).then((resp) => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);

        },(err) => next(err))
        .catch((err) => next(err));
    });

module.exports = leaderRouter;