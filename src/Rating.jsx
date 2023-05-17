import React from "react";

// A simple component that displays a tag with the given color for 
// each rating. Expandable for more ratings.
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