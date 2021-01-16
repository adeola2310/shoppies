import React from 'react';
import './nominationList.css';
import Close from "../../icons/error.svg"
import Button from "../button/button";


const NominationList = ({closeNominationList, nominationItems}) => {

    const image = 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg'

console.log(nominationItems);

    return (
        <div className="wrapper">
            <div className="right-wrapper">
                <div className="header">
                    <img src={Close} onClick={closeNominationList} alt="close" className="close"/>
                    <h4>Nomination Lists</h4>
                    <p></p>
                </div>

                <div className="grid">
                    <div className="card-list">
                        <div className="details">
                            <img src={image} className="nominate-image"/>
                            <Button
                                text="Remove"/>
                        </div>
                    </div>
                    <div className="card-list">
                        <div className="details">
                            <img src={image} className="nominate-image"/>
                            <Button
                                text="Remove"/>
                        </div>
                    </div>
                    <div className="card-list">
                        <div className="details">
                            <img src={image} className="nominate-image"/>
                            <Button
                                text="Remove"/>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default NominationList;