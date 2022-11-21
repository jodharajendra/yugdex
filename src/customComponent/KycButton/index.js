import React from "react";


const KycButton = (props) => {
    return (
        <button {...props} type="button" className=" mt-7  btn w-100 btn-gradient btn-medium justify-content-center">
            {props.children}
        </button>
    )
}

export default KycButton;