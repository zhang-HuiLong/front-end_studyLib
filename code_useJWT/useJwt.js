const express = require('express')
const app = express();

// 将
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const secretKey = 'He';

// 用了这个后，就可以在req.user中接受 发送的tokenString了
app.use(expressJwt({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({path: [/^\/api\//]}));

app.use(express.json());
app.use(express.urlencoded({extended: false}))
// app.use()

app.use((err,req,res,next) => {
    if(err.name === 'UnauthorizedError') {
        return res.send({status: 401, message: '无效的token'});
    }
    res.send({status: 500, message: '未知的错误'})
})

// 登录接口
app.post('/api/login', (req, res) => {
    const tokenStr = jwt.sign({student: 'zhl'}, secretKey, {expiresIn: '60s'});
    res.send({
        status: 200,
        message: '登录中...',
        token: tokenStr
    })
})

// 获取信息接口
app.get('/admin/getInfo', (req, res) =>{
    console.log(req.user, req);
    res.send(req.user);
})


app.listen(800, () => {
    console.log('running at http://localhost:800')
})
