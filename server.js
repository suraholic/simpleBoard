
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views');
app.use('/static', express.static('public'))
app.locals.pretty = true;

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/write', (req,res)=>{
  res.render('write')
})
app.listen(3000, ()=>{
  console.log('Connected to 3000 port...')
})