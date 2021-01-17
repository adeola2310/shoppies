import React from 'react';
import './button.css';

const Button = ({text, ...rest})=>{
    return(
        <button className="button" {...rest}>
            {text}
        </button>
    )
}
export default Button;