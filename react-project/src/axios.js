import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTA1YzJmZjE5ZWQ3MWE3NGQzMzVlZjk4M2VlY2IyMCIsInN1YiI6IjY1MTEyYTgyNmY5NzQ2MDBiMThiZTYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.872hDFP_6qUCid7T9gl3Vy6li3kpPIaHFNSlkUoBoPE',
    },
});

export default instance;
