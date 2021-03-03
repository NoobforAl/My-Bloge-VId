///===== ---express---
const express = require('express');
const app = express();

///===== ---morgan---
const morgan = require('morgan');

///=====  ---axios---
const axios = require('axios');

///===== ---Mongoose---
const mongoose = require('mongoose');

///=====  ---DB_mog---
const HistorySh = require('./Database/DB_mog');

var Port = process.env.PORT || 3000; ///==========  ---Port3000---
///===== ---concte mongo DB---
mongoose.connect("mongodb+srv://Exam:qwerty12345@exam.a6kza.mongodb.net/History?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(Port) ///==========  ---Port3000---
        console.log('Start Web Port 3000 , Connct DB_Mo')
    })
    .catch((err) => {
        console.log("No Connct To DB_Mo");
    });

///====== ---Public---
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('favicon.ico', express.static('public/favicon.ioc'));

///========== ---dev tools info ---
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///========== ---Get Index Page Data !!!---
app.get('/', (req, res) => {
    res.render('index');
});


///========== ---Get DB Json Fill History---
app.get('/Hismyfindnoneonton', (req, res) => {
    HistorySh.find()
        .then(result => {
            res.send(result);
        })
        .catch(e => {})
});
app.post('/gethis', (req, res) => {
    axios({
            url: 'http://localhost:3000/Hismyfindnoneonton',
            responseType: 'json'
        })
        .then(data => res.json(data.data))
        .catch(e => {
            let me = false;
            res.json(me);
        });
})




///========== ---History Dleted---
app.use('/dlet/:id', (req, res) => {
    const idee = req.params.id;
    console.log(idee);
    HistorySh.findOneAndDelete(idee)
        .then((result) => {
            console.log('History one Dlete!!');
        })
        .catch((err) => {
            console.log(err);
        })
});



///========== ---History Add---
app.use('/HISadd/:id', (req, res) => {
    const id_s = req.params.id;
    const histt = new HistorySh({
        Historyy: id_s
    })
    histt.save()
        .then((result) => {
            console.log('Add History!!');
        })
        .catch((err) => {
            console.log('err');
        })
})




//add oun noun
app.use('/HIS', (req, res) => {
    const histt = new HistorySh({
        Historyy: "london"
    })
    histt.save()
        .then((result) => {
            console.log('Add History!!');
        })
        .catch((err) => {
            console.log('err');
        })
})




///========== ---Api Key---
const apik = '2fee86ffe4ea14310f371d5e9ad0a62b';
const apik1 = 'ef0f8be3258ea1cb26bd0b2fafc2d869';


///========== ---Today ---
app.post('/weather', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.City}&appid=${apik}`;
    axios({
            url: url,
            responseType: 'json'
        })
        .then(data => res.json(data.data))
        .catch(e => {
            let me = false;
            res.json(me);
        })
});


///========== ---UV-index---
app.post('/UV', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.City}&appid=${apik1}`;
    axios({
            url: url,
            method: 'post'
        })
        .then(data1 => {
            var lon = data1.data.coord.lon;
            var lat = data1.data.coord.lat;
            const url = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apik1}`;
            axios({
                    url: url,
                    responseType: 'json'
                })
                .then(data => res.json(data.data))
                .catch(e => {
                    let me3 = false;
                    res.json(me3);
                })
        }).catch(er => {

        })
})


///========== ---5Day---
app.post('/5_Day', (req, res) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${req.body.City}&appid=${apik1}`;
    axios({
            url: url,
            responseType: 'json'
        })
        .then(data => res.json(data.data))
        .catch(e => {
            let me12 = false;
            res.json(me12);
        })
});


///===========================   ---404---
app.use((req, res) => {
    res.render('404');
});