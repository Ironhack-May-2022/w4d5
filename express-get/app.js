const express = require('express')
const app = express()
const hbs = require('hbs')

// this line is needed to be able to use partials
// with handlebars
hbs.registerPartials(__dirname + '/views/partials')

// this sets hbs as the view engine
app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
	res.render('index')
})

// :<name of the param> these are route parameters in express
// you access them via req.params => {}
app.get('/users/:id/products/:number', function (req, res) {
	console.log(req.params)
})

// this route accepts a query string
// to access the value => req.query
app.get('/products', (req, res, next) => {
	console.log(req.query)
});


app.get('/products/:number', function (req, res) {
	const value = req.params.number
	res.render('dashboard', { number: value })
})

app.listen(3000, function () {
	console.log('server listening')
})