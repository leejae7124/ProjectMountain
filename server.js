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

//통신 연습
app.get('/', (req, res) => {
  res.send('hi backend!!!!!!!')
})

//Port
const port = 5000
const server = app.listen(port, () => console.log('Server is running'));


//socket server
const path = require('path');
const morgan = require('morgan');
//const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
//const webSocket = require('./routes/socket');
//const indexRouter = require('./routes');

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

/*const sessionMiddleware = session({ //이런식으로 변수에 담아서 맨 밑에 webSocket의 인자로 넘겨준다.
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});*/

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(sessionMiddleware);

//app.use('/', indexRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

//webSocket(server); //socket.js에 server를 넣었으므로 express 서버와 websocket 서버랑 연결이 된다.
