import React from 'react'
import './Button.css'

const Button = () => {
    return (
        <div className="wrapper">
            <a className="button" href="#">
                <p>btn</p>
                <span className="button-slide button-slide--left-to-right button-base">
                    <span></span>
                </span>
                <span className="button-slide button-slide--right-to-left button-base">
                    <span></span>
                </span>
                <span className="button-slide button-slide--left-to-right button-cover">
                    <span></span>
                </span>
                <span className="button-slide button-slide--right-to-left button-cover">
                    <span></span>
                </span>
            </a>
        </div>
    )
}

export default Button
