const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes')
const UsersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')


const app = express();

/*converts the data coming from the body to js object - used in post request*/ 
app.use(bodyParser.json());

/*serving static files*/ 
app.use('/uploads/images/', express.static(path.join('uploads', 'images')))

/*-----------middlewares-----------*/
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    next();
})

app.use('/api/places',placesRoutes)
app.use('/api/users', UsersRoutes)

app.use((req,res,next)=>{
    /*if no routes are found*/
    const error = new HttpError('Could not find this route.',404);
    throw error;
})

app.use((error, req, res, next)=>{
    /*error handler middleware*/
    /* if on reaching this point and img file exists that means error has occered*/ 
    /*img file needs to be deleted */ 
        if(req.file){
            fs.unlink(req.file.path, (err)=>{
                console.log(err)
            })
        }
    if(res.headerSent){
        /*is response has already been sent*/
        return next(error);
    }
    /*if response has not been sent*/
    res.status(error.code || 500 );
    res.json({message: error.message || 'An unkown error occurred '})
})


mongoose.connect('mongodb+srv://PrakashMohaldar:connect123@placeofchoicecluster.9bomc.mongodb.net/PlaceOfChoice?retryWrites=true&w=majority')
        .then(()=>{
            app.listen(5000)
        })
        .catch(error => {console.log(error.message)})