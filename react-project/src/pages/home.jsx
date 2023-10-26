import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPopularMovies,
    getTopRatedMovies,
    getUpComingMovies,
} from '../redux/movieSlice';
import Banner from '../components/Banner';
import { HashLoader } from 'react-spinners';
import MovieSlide from '../components/MovieSlide';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(
        (state) => state.movies
    );

    /* 화면이 렌더링 되자마자, API를 가져올 것 */
    useEffect(() => {
        const popularApi = axios.get('/popular?language=ko-KR&page=1');
        const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1');
        const upComingApi = axios.get('/upcoming?language=ko-KR&page=1');

        // Promise.all을 사용하여 여러번의 API 요청을 병렬로 처리
        Promise.all([popularApi, topRatedApi, upComingApi])
            .then((res) => {
                // console.log(res);

                // API에서 받아온 데이터를 store 안에 넣고싶음 => useDispatch
                dispatch(getPopularMovies(res[0].data));
                dispatch(getTopRatedMovies(res[1].data));
                dispatch(getUpComingMovies(res[2].data));
            })
            .then(() => {
                setLoading(false);
            });
    // eslint-disable-next-line
    }, []);

    // store에 값이 잘 들어갔는지 확인해보는 용도
    // useEffect(() => {
    //     console.log('store의 상태', popularMovies, topRatedMovies, upComingMovies)
    // }, [popularMovies, topRatedMovies, upComingMovies]);

    if (loading) {
        return <HashLoader color='#d63636' loading={loading} size={60} />;
    }
    return (
        <div>
            <Banner movie={popularMovies.results[0]} />

            <div className='carousel-wrap'>
                <p className='list-title'>Popular Movies</p>
                {/* 카드슬라이드 */}
                <MovieSlide
                    list={popularMovies.results}
                    type='popularMovies'
                ></MovieSlide>
            </div>

            <div className='carousel-wrap'>
                <p className='list-title'>TopRated Movies</p>
                {/* 카드슬라이드 */}
                <MovieSlide
                    list={topRatedMovies.results}
                    type='topRatedMovies'
                ></MovieSlide>
            </div>

            <div className='carousel-wrap'>
                <p className='list-title'>UpComing Movies</p>
                {/* 카드슬라이드 */}
                <MovieSlide
                    list={upComingMovies.results}
                    type='upComingMovies'
                ></MovieSlide>
            </div>
        </div>
    );
};

export default Home;
