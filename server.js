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

//route handling for mountinit
app.use('/api/mountInit', require('./routes/mountInit'))

//route handling for usermanage
app.use('/api/user', require('./routes/usermanage'))

//route handling for community
app.use('/api/community/free', require('./routes/bordF')) 
app.use('/api/community/certify', require('./routes/bordC')) 
app.use('/api/community/question', require('./routes/bordQ')) 
app.use('/api/community/recruit', require('./routes/bordR'))

//route handling for mountinfo
app.use('/api/mountInfo', require('./routes/mountInfo'))

//route handling for unity
//app.use('/api/unity', require('./routes/unity'))

//통신 연습
app.get('/', (req, res) => {
  res.send('hi backend!')
})

//Port
const port = 5000
server = app.listen(port, () => console.log('Server is running'));

