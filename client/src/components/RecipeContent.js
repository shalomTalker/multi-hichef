import React from 'react';

const RecipeContent = ({ name, ingredients, level, preparingTime, directions }) => {
    return (
        <div>
            <h2>{name}</h2>
            <span style={{ fontSize: '2.5rem', margin: '2rem' }}>Ingredients</span> <span>Servings: 4</span>
            <ul>
                
                {
                    ingredients.map((ingredient, i) => (
                        <li>{ingredient}</li>
                    ))
                }
            </ul>
            <span style={{ fontSize: '2.5rem', margin: '2rem' }}>Direction</span>
            <ul>
                {directions.split('.').map((direction, i) => {
                    i = i + 1;
                    return (direction !== '' && direction !== ' ') &&
                        (
                            <li>
                                <p style={{ textAlign: 'left' }}> {i}. {direction} </p>
                            </li>
                        )
                })}
            </ul>

        </div>
    );
}

export default RecipeContent;
