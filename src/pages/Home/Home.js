import React, {useEffect, useReducer, useState} from 'react';
import './Home.css';
import searchIcon from "../../icons/search.svg";
import axios from "axios";
import { omit} from 'lodash';
import {Link} from "react-router-dom";
import MovieCard from "../../components/movie-card/movieCard";
import NominationList from "../../components/Nomination-list/nominationList";
import Loader from "../../components/loader/loader";




const Home = () => {

    const initalState = {}

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const [nominationList, setNominationList] = useState(false);
    const [results, setResults] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [searchedMovie, setSearchedMovie] = useState([]);
    const [error, setError] = useState(false);
    const [nominationItems, setNominationItems] = useReducer(reducer, initalState)






    function reducer(state, action) {
        switch (action.type) {
            case 'Add':
                if (action.payload.id in state)
                    return {
                        ...state,
                        [action.payload.imdbID]: {
                            ...state[action.payload.imdbID],
                        },
                    };
            
            case 'Delete':
                return omit(state, [action.imdbID]);
            default:
                throw new Error();
        }
    }





    const openNominationList = ()=>{
        setNominationList(true);
    }
    const closeNominationList = ()=>{
        setNominationList(false)
    }

    // imdbID

    const onNominateMovie = (selected)=>{
        console.log('added');
        setNominationItems({
            type: 'Add',
            payload: selected,
        });
    }

    const items = Object.keys(nominationItems).length;

    console.log(items)





    useEffect(()=>{
        if (searchText){
            axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=d7aba90`)
                .then(response => {
                    const movies = response.data?.Search;
                    setLoading(true)
                    setSearchedMovie(movies);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    return error
                })
            ;
         setResults(true);
        //  setNoResult(false)
        }
        else{
            setResults(false);
            // setNoResult(true)

        }

    }, [searchText]);



    const handleChange = (e)=>{
        const searchTerm = e.target.value
        setSearchText(searchTerm);
    }


    return (
        <>
            <div className="nav">
                <div className="nav-content">
                    <Link to="/">
                        <h3>The Shoppies</h3>
                    </Link>
                    <p onClick={openNominationList}>Nomination List</p>
                </div>
            </div>
            <div className="form-search">

                <img src={searchIcon} className="icon"/>
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
            <div className="movie-grid">


                {
                    loading ? <Loader/> : 
                    searchedMovie?.map((movie, i)=>(
                        <MovieCard
                        key={i}
                        movie={movie}
                        onNominateMovie={onNominateMovie}
                        />
                    ))
                }
            </div>
{
    noResult && 
<div className="no-result">
    <h3>No result found!</h3>
</div>
}


            {
                nominationList &&
                    <NominationList
                        closeNominationList={closeNominationList}
                        nominationItems={nominationItems}
                    />
            }

        </>


    )
}
export default Home;