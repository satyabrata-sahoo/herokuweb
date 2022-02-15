const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000

//model
const user = require('./model/user')

//MONGODB CONNECTION
const database_url = 'mongodb://localhost:27017/ussd';
mongoose.connect(database_url);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('database is running')
})


//BODY PARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('sucess message')
})

app.post('/', (req, res) => {
    //console.log(req.body);
    const { phoneNumber, text, sessionId } = req.body;
    let response;

    if (text === '') {
        console.log('1');
        response = 'CON Enter your First name'
    }
    if (text !== '') {
        let array = text.split('*');
        //console.log(array);
        if (array.length === 1) {
            response = 'CON Enter your id number'
        }
        else if (array.length > 1) {
            if (parseInt(array[1]) > 0) {
                response = 'END your fullname is '+ array[0] + '' + '\n your id number is ' + array[1]
            }



            else {
                response = 'END network error. please try again'
            }
        }
    }



    setTimeout(() => {
        console.log(text)
        res.send(response);
        res.end()
    }, 2000);
})




app.listen(PORT, () => {
    console.log('app is running on port' + PORT)
})