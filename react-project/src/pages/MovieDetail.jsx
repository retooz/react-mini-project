import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import { Badge } from 'react-bootstrap';
import axios from '../axios';

const MovieDetail = () => {
    // useParams
    // Route 작성부 /:id <<
    const { id } = useParams();

    // useSearchParams
    // url/ ?searchParams <<
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const type = searchParams.get('type');
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(
        (state) => state.movies
    );

    const getMovieData = () => {
        switch (type) {
            case 'popularMovies':
                setMovie(
                    popularMovies.results.find((item, idx) => {
                        return item.id === Number(id);
                    })
                );

                break;
            case 'topRatedMovies':
                setMovie(
                    topRatedMovies.results.find((item, idx) => {
                        return item.id === Number(id);
                    })
                );
                break;
            case 'upComingMovies':
                setMovie(
                    upComingMovies.results.find((item, idx) => {
                        return item.id === Number(id);
                    })
                );
                break;
            default:
                break;
        }
    };

    const getReviewData = () => {
        axios
            .get(`/${id}/reviews?language=en-US&page=1`)
            .then((res) => setReviews(res.data.results))
            .then(() => {
                console.log(reviews);
                setLoading(false);
            });
    };

    useEffect(() => {
        const sessionMovie = JSON.parse(sessionStorage.getItem('movie'));

        if (sessionMovie.id === Number(id)) {
            setMovie(sessionMovie);
        } else {
            getMovieData();
        }

        getReviewData();
        //eslint-disable-next-line
    }, [
        popularMovies.results,
        topRatedMovies.results,
        upComingMovies.results,
        id,
        type,
    ]);

    useEffect(() => {
        if (movie) {
            sessionStorage.setItem('movie', JSON.stringify(movie));
        }
    }, [movie]);
    if (loading) {
        return <HashLoader color='#d63636' loading={loading} size={60} />;
    }
    return (
        <div className='movie-detail'>
            <div className='movie-box'>
                <div
                    className='detail-poster'
                    style={{
                        backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
                    }}
                ></div>
                <div className='detail-item'>
                    {movie.adult ? (
                        <Badge bg='danger'>청소년 관람 불가</Badge>
                    ) : (
                        <Badge bg='success'>전체관람가</Badge>
                    )}

                    <h1>{movie.title}</h1>
                    <div className='detail-rating'>
                        <span>
                            평점{' '}
                            <span style={{ fontWeight: 900 }}>
                                {movie.vote_average}
                            </span>{' '}
                        </span>
                        <span>개봉일 {movie.release_date} </span>
                    </div>
                    <div>{movie.overview}</div>
                </div>
            </div>
            <div className='review'>
                <hr />
                <h2>Review</h2>
                {reviews.length > 1 ?
                reviews.map((item, idx) => {
                    return (
                        <div>
                            <hr />
                            <p>{item.content}</p>
                            <p>작성자 : {item.author} | 작성일 : {item.created_at.slice(0,10)}</p>
                        </div>
                    );
                })
                : <div>등록된 리뷰가 없습니다!</div>}
            </div>
        </div>
    );
};

export default MovieDetail;
