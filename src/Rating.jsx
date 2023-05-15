import React from "react";

function Rating(props) {
    let color = "is-primary"
    switch (props.rating) {
        case "PG-13":
            color = "is-info"
            break;
        case "R":
            color = "is-danger"
            break;
    
        default:
            break;
    }

    return (
        <span className={`tag ${color}`}>{props.rating}</span>
    )
}

export default Rating;