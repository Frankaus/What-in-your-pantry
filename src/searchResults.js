import { useSelector } from "react-redux";
import { useState } from "react";

import { Link } from "react-router-dom";

const SearchResults = () => {
    const recipes = useSelector((state) => state.recipes);

    console.log("recipes: ", recipes);

    if (!recipes) {
        return null;
    }

    return (
        <div>
            {!!recipes.length &&
                recipes.map((elem, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <img src={elem.image} alt={elem.title} />
                                <div>
                                    <span>{elem.readyInMinutes}min</span>
                                </div>
                            </div>
                            <div>
                                <span>{elem.title}</span>
                                <span>Servings: {elem.servings}</span>
                                {elem.missedIngredientCount > 0 && (
                                    <span>
                                        You are missing only{" "}
                                        {elem.missedIngredientCount}{" "}
                                        ingredient(s):{" "}
                                        {elem.missedIngredients
                                            .map((elem) => elem.name)
                                            .join(", ")}
                                    </span>
                                )}
                            </div>
                            <div>
                                {!!elem.vegetarian && <div>Vegetarian</div>}
                                {!!elem.vegan && <div>Vegan</div>}
                                {!!elem.dairyFree && <div>DairyFree</div>}
                            </div>
                            <Link to={`/recipe/${elem.id}`}>
                                <div>Read the instructions</div>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default SearchResults;
