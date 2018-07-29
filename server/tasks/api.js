const rp = require('request-promise-native');

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
    const res = await rp(url);
    return res;
}

(async () => {
    let movies = [
        {
            doubanId: 2131459,
            title: '机器人总动员',
            rate: 9.3,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1461851991.jpg'
        },
        {
            doubanId: 2129039,
            title: '飞屋环游记',
            rate: 8.9,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2364094053.jpg'
        }
    ];

    movies.map(async movie => {
        let movieData = await fetchMovie(movie);

        try {
            movieData = JSON.parse(movieData);
            console.log(movieData.tags);
            console.log(movieData.summary);
        } catch (err) {
            console.log(err);
        }
    })
})()