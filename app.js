const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database')

mongoose.connect(config.database);
//onConnection
mongoose.connection.on('connected',()=>{
    console.log('Connected to db'+config.database);
});
//onError
mongoose.connection.on('error',()=>{
    console.log('db error'+err);
});

const app = express();

//where users route cann be found(URI)
const users = require('./routes/users');

//port number
const port=3000;

//CORS middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//users route
app.use('/users',users);
//index route
app.get('/',(req,res)=>{
res.send('Invalid Endpoint');
});
//any other route
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'public/index.html'));
});


app.listen(port,()=>{
    console.log('Server start on port'+port);
});