import { useSelector } from "react-redux";
import { useEffect, useState} from "react";

import {Link} from "react-router-dom";

const SearchResults = () => {
    const recipes = useSelector((state) => state.recipes);

    useEffect(() => {
        (async () => {
            
        })();
    }, [recipes]);

    if (!recipes.length) {
        return null;
    }

    return (
        <div>
            {recipes &&
                recipes.map((elem, index) => {
                    return <div key={index}>
                        <img src={elem.image} alt={elem.title}/>
                        <div>
                        <h2>{elem.title}</h2>
                        <span>Match: {elem.match}</span>
                        {elem.missedIngredientCount > 0 && (
                            <p>You are missing only {elem.missedIngredientCount} ingredient(s): {elem.missedIngredients.join(', ')}
                            </p>
                        )}
                        </div>
                        <Link to={`/recipe/${elem.id}`} >
                            <div>
                                Read the instructions
                            </div>
                        </Link>
                    </div>;
                })}
        </div>
    );
};

export default SearchResults;
