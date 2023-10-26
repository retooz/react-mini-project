import Header from './components/Header';
import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies/:id' element={<MovieDetail/>} />
                <Route path='/movieList' element={<Movies/>} />
            </Routes>
        </div>
    );
}

export default App;
