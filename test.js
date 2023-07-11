const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pageRouter = require('pageRouter');
dotenv.config();
const app = express();
app.set('port',process.env.PORT || 8001);
app.set('view engin', 'html');
nunjucks.configure('views',{
    express : app,
    watch: true
})
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly : true,
        secure: false,
    },
}))
app.use('/', pageRouter);
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
})