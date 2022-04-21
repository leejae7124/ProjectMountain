const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser());

//init Middleware
app.use(express.json({extened: false}))

//connect DB
const connectDB = require('./config/db')
connectDB();

//route handling for mount
app.use('/api/mount', require('./routes/mount'))

//route handling for usermanage
app.use('/api/user', require('./routes/usermanage'))


//통신 연습
app.get('/', (req, res) => {
  res.json({success: true, message: 'welcom to backend'})
})
app.get('/api/hello', (req, res) => {
  res.send('hi backend!!!!!!!')
})


//Port
const port = 5000
app.listen(port, () => console.log('Server is running'));