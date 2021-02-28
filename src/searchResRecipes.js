import { useSelector } from "react-redux";
import { useState } from "react";

import { Link } from "react-router-dom";

const SearchResults = () => {
    const recipes = useSelector((state) => state.recipes);
    const info = useSelector((state) => state.recipesInfo);
    const [result] = useState([]);

    console.log("recipes: ", recipes);

    if (info) {
        for (let i = 0; i < recipes.length; i++) {
            result.push([recipes[i], info[i]]);
        }
    }
    console.log("result: ", result);

    if (!result.length) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            {result.length &&
                result.map((elem, index) => {
                    return (
                        <div key={index}>
                            <img src={elem[0].image} alt={elem[0].title} />
                            <div>
                                <h2>{elem[0].title}</h2>
                                {elem[0].missedIngredientCount > 0 && (
                                    <p>
                                        You are missing only{" "}
                                        {elem[0].missedIngredientCount}{" "}
                                        ingredient(s):{" "}
                                        {elem[0].missedIngredients
                                            .map((elem) => elem.name)
                                            .join(", ")}
                                    </p>
                                )}
                            </div>
                            <div>
                                {!!elem[1].vegetarian && <div>Vegetarian</div>}
                                {!!elem[1].vegan && <div>Vegan</div>}
                                {!!elem[1].dairyFree && <div>DairyFree</div>}
                            </div>
                            <Link to={`/recipe/${elem[0].id}`}>
                                <div>Read the instructions</div>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default SearchResults;
