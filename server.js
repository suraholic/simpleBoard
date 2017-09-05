require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const cookieSession = require('cookie-session')

const app = express()

const adapter = new FileSync('db.json')
const db = low(adapter)
const data = db.get('board').value()
const repleData = db.get('reply').value()
const bodyParserMiddleware = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug')
app.set('views', './views');
app.set('trust proxy', 1)

app.use('/static', express.static('public'))
app.use(morgan('tiny'))
app.locals.pretty = true;

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET]
}))

function onlyAdminMiddleware(req, res, next) {
  if(req.session.adminname === undefined)  {
    res.redirect('/login')
  } else {
    next()
  }

}

app.get('/', (req,res) => { res.render('index',{data} )})
app.get('/write', (req,res)=>{ res.render('write')})
app.get('/adlogin', (req,res)=>{
  if(req.session.adminname !== undefined) {
    res.render('admin', {data})
  } else {
    res.render('login')
  }

})
app.get('/admin', onlyAdminMiddleware, (req, res) => {
  res.render('admin', {data})
})

app.get('/read/:id', (req,res) => {
  const id = req.params.id
  const board = [...data].find(item=> item.id == id)
  const reply = [...repleData].filter(item=> item.oid == id)

  if(board){
    res.render('read', {
      board : board,
      reply: reply})
  } else {
    res.status(404)
    res.send('삭제된 글입니다.')
  }

})

app.get('/dProc/:id', onlyAdminMiddleware, (req,res)=>{
  const idx = req.params.id
  db.get('board').remove({id:parseInt(idx)}).write()
  db.get('reply').remove({oid:idx}).write()

  res.redirect('/admin')
})

app.post('/iProc', bodyParserMiddleware, (req,res)=>{
  let idx
  if(!data.length){ idx = 1 } else {
    idx = Math.max(...data.map(item => item.id))+1
  }

  db.get('board').push({
    id: idx,
    title: req.body.title,
    auth: req.body.auth,
    cont: req.body.cont,
    date: req.body.date
  }).write()

  res.redirect('/')
})

app.post('/rProc', bodyParserMiddleware, (req, res) => {
  let idx, oidx
  oidx = req.body.oidx

  if(!repleData.length){ idx = 1 } else {
    idx = Math.max(...repleData.map(item=> item.id))+1
  }

  db.get('reply').push({
    id: idx,
    oid: oidx,
    auth: req.body.auth,
    cont: req.body.cont,
    date: req.body.date
  }).write()

  res.redirect('/read/'+oidx)
})

app.post('/adProc', bodyParserMiddleware, (req, res) => {
  const adminID = req.body.adminID
  const adminPWD = req.body.adminPWD

  const chk = db.get('admin').find({adminID:adminID, adminPWD:adminPWD}).value()

  if(chk){
    req.session.adminname = chk.adminName
    res.redirect('/admin')
  } else {
    res.status(403)
    res.send('관리자 계정 오류!!')
  }

})

app.listen(3000, ()=>{
  console.log('simple board server start...')
})
