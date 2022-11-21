import React from "react";


const Button = (props) => {
    return (
        <button {...props} type="button" className="login btn loginmodal-submit btn-theme w-100  mb-3">
            {props.children}
        </button>
    )
}

export default Button;