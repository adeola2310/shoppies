import React from 'react';
import './movieCard.css';
import Button from "../button/button";

const MovieCard = ({ movie, onNominateMovie})=>{

    const addMovie =()=>{
        console.log('should be added');
        onNominateMovie(movie)
    }

    const noImage = "https://m.media-amazon.com/images/M/MV5BNTdmZGI0YmItMjdlNy00MTFhLTg2ZTUtODAxZWRiN2UyYjczXkEyXkFqcGdeQXVyNjcwODg5OTY@._V1_SX300.jpg"

    return (
        <div className="card">
           <div className="card-details">
               <img src={movie.Poster || noImage} className="card-image"/>
               <div className="card-name">
    <h3>{movie.Title}</h3>
                   <p>Year of Release: <strong>{movie.Year}</strong></p>
                   <Button
                       text="nominate"
                       onClick={()=>addMovie()}
                   />
               </div>
           </div>
        </div>
    )
}

export default MovieCard;