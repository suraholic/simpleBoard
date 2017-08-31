
const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const app = express()

const adapter = new FileSync('db.json')
const db = low(adapter)
const data = db.get('board').value()
const bodyParserMiddleware = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug')
app.set('views', './views');
app.use('/static', express.static('public'))
app.locals.pretty = true;

app.get('/', (req,res) => {
  res.render('index',{data} )
})

app.get('/write', (req,res)=>{
  res.render('write')
})

app.post('/iProc', bodyParserMiddleware, (req,res)=>{
  let idx
  if(!data.length){
      idx = 1
  } else {
    idx = Math.max(...data.map(item => item.id))+1; 
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

app.listen(3000, ()=>{
  console.log('server start...')
})