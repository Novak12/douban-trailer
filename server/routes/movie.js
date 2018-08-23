import { getAllMovies, getMovieDetail, getRelativeMovies } from '../service/movie';

const { get, post, put, controller } = require('../lib/decorator')

@controller('/api/v0/movies')
export class movieController {
    @get('/')
    async getMovies(ctx, next) {
        console.log("movie api")
        const { type, year } = ctx.query;
        const movies = await getAllMovies(type, year);
        ctx.body = {
            movies
        }
    }

    @get('/:id')
    async getMovieDetail(ctx, next) {
        const id = ctx.params.id;
        const movie = await getMovieDetail(id);
        const relativeMovies = await getRelativeMovies(movie);
        ctx.body = {
            data: {
                movie,
                relativeMovies
            },
            success: true
        }
    }
}
