const express = require('express')
const app = express()
const hbs = require('hbs')

// this line is needed to be able to use partials
// with handlebars
hbs.registerPartials(__dirname + '/views/partials')

// this sets hbs as the view engine
app.set('view engine', 'hbs')


const movies = require('./movies.json')

app.get('/', function (req, res) {
	console.log(movies)
	res.render('movies', { movieList: movies })
})

// app.get('/godfather', (req, res, next) => {
// 	// get the movie godfather from the movies array
// 	const godfather = movies.find(movie => movie.title === 'The Godfather')
// 	console.log(godfather)
// 	res.render('movieDetails', { movie: godfather })
// });

app.get('/about', (req, res, next) => {
	res.render('about')
});

app.get('/moviesearch', (req, res, next) => {
	// retrieve the query string
	const queryString = req.query.q
	const filteredMovies = movies.filter(movie => {
		return movie.title.toLowerCase().includes(queryString.toLowerCase())
	})
	res.render('movies', { movieList: filteredMovies })
});


app.get('/:movieTitle', (req, res, next) => {
	// get the movie godfather from the movies array
	const title = req.params.movieTitle
	const movie = movies.find(movie => movie.title === title)
	console.log(movie)
	res.render('movieDetails', { movie: movie })
});




app.listen(3000, function () {
	console.log('server listening')
})