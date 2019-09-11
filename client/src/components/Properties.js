import React from 'react';

const Properties = ({ ingredients, level, preparingTime }) => {
    return (
        <div id="recipe_properties" className="row d-flex justify-content-center">
            <div className="col d-flex flex-column justify-content-center">
                <p>{ingredients.length}</p>
                <p>INGREDIENTS</p>
            </div>

            <div className="col d-flex flex-column justify-content-center">
                <p>{level.toUpperCase()}</p>
            </div>
            <div className="col d-flex flex-column justify-content-center">
                <p>{preparingTime}</p>
                <p>MINUTES</p>
            </div>
        </div>
    )
}


export default Properties;
