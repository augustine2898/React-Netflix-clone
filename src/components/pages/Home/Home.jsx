import React,{useState,useEffect, useContext} from 'react'
import './Home.css'
import Navbar from '../../Navbar/Navbar'
import play_icon from '../../../assets/play_icon.png'
import info_icon from '../../../assets/info_icon.png'
import Titlecards from '../../Titlecards/TitleCards'
import Footer from '../../Footer/Footer';
// import requests from '../../../request'
import { GlobalContext } from '../../../context/GlobalContext'


const Home = () => {

    // const [movie, setMovie] = useState(null);
   

    // useEffect(() => {
    //     async function fetchData() {
    //         const fullURL = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;
    //         console.log("Fetching from:", fullURL); // Check the full URL
    //         const response = await fetch(fullURL);
    //         const data = await response.json();
    //         // console.log("Fetched Movies:", data.results);
            
    //         if (data.results && data.results.length > 0) {
    //             setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
    //         }
    //     }
    //     fetchData();
    // }, []);

    const {movie} =useContext(GlobalContext);
    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1) +"...":str;
    }

    return (
        <div className='home'>
            <Navbar />
            <div className='hero'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt='' className='banner-img' />

                <div className='hero-caption'>
                    <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                    <p>{truncate(movie?.overview,150)}</p>
                    <div className='hero-btns'>
                        <button className='btn'><img src={play_icon} />Play</button>
                        <button className='btn dark-btn'><img src={info_icon} />More Info</button>
                    </div>
                    {/* <div className='title-cards-top'><Titlecards /></div> */}
                </div>
                
            </div>
            <div className='more-cards'>
                <Titlecards title={"Blockbuster Movies"} category={"top_rated"} />
                <Titlecards title={"Only on Netflix"} category={"popular"} />
                <Titlecards title={"Upcoming"} category={"upcoming"} />
                <Titlecards title={"Top Pics for You"} category={"now_playing"} />
            </div>
            <Footer />
        </div >
    )
}

export default Home
