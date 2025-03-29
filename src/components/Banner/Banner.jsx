import React, { useState, useEffect } from 'react';
import requests from '../../request';
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const fullURL = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;
            console.log("Fetching from:", fullURL); // Check the full URL
            const response = await fetch(fullURL);
            const data = await response.json();
            // console.log("Fetched Movies:", data.results);
            
            if (data.results && data.results.length > 0) {
                setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
            }
        }
        fetchData();
    }, []);
    
    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1) +"...":str;
    }

    // console.log("Selected Movie:", movie);

    return (
        <header 
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: movie?.backdrop_path 
                    ? `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`
                    : "none",
                backgroundPosition: "center center",
            }}
        >
            <div className='banner_contents'>
                <h1 className='banner-title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h1 className='banner_description'>{truncate(movie?.overview,150)}</h1>
            </div>
            <div className='banner_fadeBottom'/>
        </header>
        
    );
}

export default Banner;
