import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const Titlecards = ({ title, category }) => {

    const [apiData,setApiData] =useState([])
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjBhNmQyOWJmNTU3ZWJkYzMyMjFhNzZkM2Y4MjU4MiIsIm5iZiI6MTc0MjQ2NjY5Ni4xMzYsInN1YiI6IjY3ZGJlZTg4MTg2ZWNhNTdiMmU3YThlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vLislME3Wfy5k2BPSJCU7vDwgiT50eltE81Gm5VX8c0'
        }
      };
      
      



    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, [])
    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            < div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div >
    )
}

export default Titlecards
