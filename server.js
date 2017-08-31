
const express = require('express')
const pug     = require('pug')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views');
app.locals.basedir = app.get('views');
app.use('/static', express.static('/public'))

app.get('/', (req,res) => {
  res.render('index')
})

app.listen(3000, ()=>{
  console.log('Connected to 3000 port...')
})