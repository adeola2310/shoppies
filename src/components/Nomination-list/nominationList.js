import React, { useEffect } from 'react';
import './nominationList.css';
import Close from "../../icons/error.svg"
import Button from "../button/button";


const NominationList = ({closeNominationList, nominationItems, removeNominatedMovie}) => {

    const image = 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg'


useEffect(()=>{

}, [nominationItems])

    return (
        <div className="wrapper">
            <div className="right-wrapper">
                <div className="header">
                    <img src={Close} onClick={closeNominationList} alt="close" className="close"/>
                    <h4>Nomination Lists</h4>
                    <p></p>
                </div>

                <div className="grid">
                    {
                        nominationItems?.length === 0 ?  <h4 className="none">No Movie has been added yet</h4> :

                        nominationItems?.map((item, i)=>(
                            <div className="card-list" key={i}>
                            <div className="details">
                                <img src={item?.Poster === "N/A" ? image : item?.Poster} className="nominate-image" alt=""/>
                        <h4>{item.Title}</h4>
                                <Button
                                onClick={()=>removeNominatedMovie(item)}
                                    text="Remove"/>
                            </div>
                        </div>  
                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default NominationList;