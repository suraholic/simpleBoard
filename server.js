
const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
const data = db.get('board').value()[0]
console.log(data)
console.log(data.title)

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

app.listen(3000, ()=>{
  console.log('server start...')
})