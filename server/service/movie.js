const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

export const getAllMovies = async (type, year) => {
    let query = {};
    if (type) {
        query.movieTypes = {
            $in: [type]
        }
    }
    if (year) {
        query.year = year;
    }
    const movies = await Movie.find(query);

    return movies;
}

export const getMovieDetail = async (id) => {

    const movie = await Movie.findOne(id);

    return movie;
}
export const getRelativeMovies = async (movie) => {

    const movies = await Movie.findOne({
        movieTypes: {
            $in: movie.movieTypes
        }
    });

    return movies;
}