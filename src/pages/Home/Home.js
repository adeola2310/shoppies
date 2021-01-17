import React, {useEffect, useState} from 'react';
import './Home.css';
import searchIcon from "../../icons/search.svg";
import axios from "axios";
import {Link} from "react-router-dom";
import MovieCard from "../../components/movie-card/movieCard";
import NominationList from "../../components/Nomination-list/nominationList";
import Loader from "../../components/loader/loader";
import Banner from '../../components/banner/banner';




const Home = () => {

    const initalState = JSON.parse(localStorage.getItem('nominationItems')) || [];

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const [nominationList, setNominationList] = useState(false);
    const [results, setResults] = useState(false);
    const [searchedMovie, setSearchedMovie] = useState([]);
    const [nominationItems, setNominationItems] = useState(initalState);
    const [noResult, setNoResult] = useState(false);
    const [banner, showBanner] = useState(false);
    // const [error, setError] = useState('')

    // This stores the users nominated movies
    localStorage.setItem('nominationItems', JSON.stringify(nominationItems))



    const openNominationList = ()=>{
        setNominationList(true);
    }
    const closeNominationList = ()=>{
        setNominationList(false)
    }

const onNominateMovie = (selectedItem) => {
    if (nominationItems.length >= 5){
        showBanner(true);
    } else{
        return setNominationItems((currentMovie)=> [...currentMovie, selectedItem])
    }
}


const removeNominatedMovie = (item) => {
    setNominationItems((currentMovie) => {
      const indexOfItemToRemove = currentMovie.findIndex((nominationItems) => nominationItems.imdbID === item.imdbID);

      if (indexOfItemToRemove === -1) {
        return currentMovie;
      }

      return [
        ...currentMovie.slice(0, indexOfItemToRemove),
        ...currentMovie.slice(indexOfItemToRemove + 1),
      ];
    });
  };



    useEffect(()=>{
        if (searchText){
            axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=d7aba90`)
                .then(response => {
                    const movies = response.data?.Search;
                    setLoading(true)
                    setSearchedMovie(movies);
                    setLoading(false);
                })
                .catch((error) => {
                    return error
                })
            ;
         setResults(true);
        }
        else{
            setResults(false);
        }
        if(searchText?.length < 3){
            setNoResult(true)
        }else{
            setNoResult(false)
        }

    }, [searchText]);


  
    const handleChange = (e)=>{
        const searchTerm = e.target.value
        setSearchText(searchTerm);
    }


    return (
        <>
        {
            banner &&
            <Banner/>
        }
            <div className="nav">
                <div className="nav-content">
                    <Link to="/">
                        <h3>The Shoppies</h3>
                    </Link>
                    <p onClick={openNominationList}>Nomination List({nominationItems?.length})</p>
                </div>
            </div>
            <div className="form-search">

                <img src={searchIcon} className="icon" alt="searchIcon"/>
                <input
                    type="text"
                    value={searchText}
                    name="searchText"
                    onChange={handleChange}
                    className="search" 
                    placeholder="Search for movie title..."/>
            </div>

                {
                    results &&
                <div className="result">
                    <h3>Search result for "{searchText}"</h3>
                </div>
                }

                {
                                    noResult && 
                                    <div className="no-result">
                                        <div className="text">
                                            Oops.. no movie found yet! &#129318;&#127998;
                                            </div>
                                        </div>
                                }
                            <div className="movie-grid">
                                {
                                    loading ? <Loader/> : 
                                    searchedMovie?.map((movie, i)=>(
                                        <MovieCard
                                        key={i}
                                        movie={movie}
                                        onNominateMovie={onNominateMovie}
                                        disabled={nominationItems.findIndex((nominationItem) => nominationItem.imdbID === movie.imdbID)}
                                        />
                                    ))
                                }
                            </div>

                            {
                                nominationList &&
                                    <NominationList
                                        closeNominationList={closeNominationList}
                                        nominationItems={nominationItems}
                                        removeNominatedMovie={removeNominatedMovie}
                                    />
                            }

        </>


    )
}
export default Home;