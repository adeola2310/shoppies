import React from 'react';
import './movieCard.css';
import Button from "../button/button";

const MovieCard = ({ movie, onNominateMovie, disabled})=>{

    const addMovie =()=>{
        onNominateMovie(movie)
    }

    const noImage = "https://m.media-amazon.com/images/M/MV5BNTdmZGI0YmItMjdlNy00MTFhLTg2ZTUtODAxZWRiN2UyYjczXkEyXkFqcGdeQXVyNjcwODg5OTY@._V1_SX300.jpg"

    return (
        <div className="card">
           <div className="card-details">
               <img src={movie.Poster === "N/A" ? noImage : movie.Poster} className="card-image" alt="movieImage"/>
               <div className="card-name">
    <h3>{movie.Title}</h3>
    <p> Year of Release: <strong>{movie.Year}</strong></p>
                   {
                       disabled > -1 ? <Button text="Nominated" style={{backgroundColor: '#f2acb5', color: '#000'}} disabled/> :
                       <Button
                            text="Nominate"
                            onClick={()=>addMovie()}
                        />
                   }
               </div>
           </div>
        </div>

    )
}

export default MovieCard;