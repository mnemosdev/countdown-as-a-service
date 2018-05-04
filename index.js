var express = require('express')
var app = express()

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/countdown/:timeInSeconds', function (req, res) {
  res.render('countdown', { 
    timeInSeconds: req.params.timeInSeconds 
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
