const API_KEY = '03c4e3dc470296959d6bf68804146538'
const API_LANG = 'pt-br'
const BASE_URL_IMG = {
    original: 'https://image.tmdb.org/t/p/original',
    small: 'https://image.tmdb.org/t/p/w500'
}
const movies = []

const moviesElement = document.getElementById('movies')


function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANG}`
}

function changeButtonMenu() {
    const button = document.querySelector('.button__menu')
    const navigation = document.querySelector('.navigation')


    button.classList.toggle('active')
    navigation.classList.toggle('active')
}



function setMainMovie(movie) {

    const appImage = document.querySelector('.app__image img')

    const title = document.querySelector('.feature__movie h1')
    const description = document.querySelector('.feature__movie p')
    const rating = document.querySelector('.rating strong')
    const info = document.querySelector('.feature__movie span')


    title.innerHTML = movie.title
    description.innerHTML = movie.overview
    rating.innerHTML = movie.vote_average
    info.innerHTML = movie.release + ' - ' + movie.category + ' - Filme'


    appImage.setAttribute('src', movie.image.original)

}

function changeMainMovie(movieId) {
    const movie = movies.find(movie => movie.id == movieId)

    setMainMovie(movie)
    changeButtonMenu()
}


function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute('onclick', `changeMainMovie('${movieId}')`)
    button.innerHTML = `<img src="assets/icon-play-button.png" alt="Icon play button" />`
    return button
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div')
    divImageMovie.classList.add('movie__image')

    const image = document.createElement('img')

    image.setAttribute('src', movieImage)
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    image.setAttribute('loading', 'lazy')

    divImageMovie.appendChild(image)
    return divImageMovie
}

function insertMovieList(movie) {

    const movieElement = document.createElement('li')
    movieElement.classList.add('movie')
    const category = `<span>${movie.category}</span>`
    const title = `<strong>${movie.title}</strong>`


    movieElement.innerHTML = category + title
    movieElement.appendChild(createButtonMovie(movie.id))
    movieElement.appendChild(createImageMovie(movie.image.small, movie.title))


    moviesElement.appendChild(movieElement)

}


function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt2096673', 'tt5109280', 'tt7146812', 'tt2948372', 'tt2953959', 'tt3521164']

    LIST_MOVIES.map((movie, index) => {
        fetch(getUrlMovie(movie)).then(response => response.json()).then(data => {

            const movieData = {
                id: movie,
                title: data.title,
                overview: data.overview,
                vote_average: data.vote_average,
                category: data.genres[0].name,
                release: data.release_date.split('-')[0],
                image: {
                    original: BASE_URL_IMG.original.concat(data.backdrop_path),
                    small: BASE_URL_IMG.small.concat(data.backdrop_path),

                }
            }

            movies.push(movieData)

            if (index === 0) {
                setMainMovie(movieData)
            }

            insertMovieList(movieData)

        })
    })
}

loadMovies()
