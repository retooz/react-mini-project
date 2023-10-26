import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type }) => {
    return (
        <div
            className='card-item'
            style={{
                backgroundImage:
                    'url(' +
                    `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path}` +
                    ')',
            }}
        >
            <Link to={`/movies/${movie.id}?type=${type}`}>
            <div className='overlay'>
                <h2>{movie.title}</h2>
                <span>
                    {movie.vote_average} ({movie.vote_count})
                </span>{' '}
                {movie.adult 
                ? <Badge bg='danger'>청소년 관람 불가</Badge>
                : <Badge bg='success'>전체관람가</Badge>
            }
            </div>
            </Link>
        </div>
    );
};

export default MovieCard;
