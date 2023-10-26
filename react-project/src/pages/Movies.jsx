import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Movies = () => {
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState([]);

    const search = searchParams.get('search');

    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(
        (state) => state.movies
    );

    useEffect(() => {
        let allMovies = [
            ...popularMovies.results
        ];

        topRatedMovies.map((data, index) => {
            return 
        })
        console.log();
        
        // setResult(allMovies)
        setResult(allMovies.filter((data) => data.title.includes(search)))

        // setResult(popularMovies.results.filter((data) => data.title.includes(search)))
        // setResult([...result, topRatedMovies.results.filter((data) => data.title.includes(search))])
        // setResult([...result, upComingMovies.results.filter((data) => data.title.includes(search))])

        //eslint-disable-next-line
    }, [popularMovies.results, topRatedMovies.results, upComingMovies.results]);

    return (
        <div className='search-result'>
            {result &&
                result.map((data, index) => {
                    return <MovieCard key={data.id} movie={data}></MovieCard>;
                })}
        </div>
    );
};

export default Movies;
