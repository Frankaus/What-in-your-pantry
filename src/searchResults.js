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
        <div className="flex flex-wrap justify-center">
            {!!recipes.length &&
                recipes.map((elem, index) => {
                    {/* cards starts here */}
                    return (
                        <div
                            key={index}
                            className="w-1/4 mx-6 my-4 bg-gray-100 rounded-l overflow-hidden shadow-md"
                        >
                            <div className="relative">
                                <img src={elem.image} alt={elem.title} />
                                <div className="bg-yellow-200 w-min p-2 text-xs font-bold uppercase rounded-full absolute top-0 m-1">
                                    <span>{elem.readyInMinutes}min</span>
                                </div>
                            </div>
                            <div className="p-2">
                                <span className="font-bold text-md text-gray-600 border-b-2">
                                    {elem.title}
                                </span>
                                <span className="block font-semibold">
                                    Servings: {elem.servings}
                                </span>
                                {elem.missedIngredientCount > 0 && (
                                    <span>
                                        You are missing only{" "}
                                        {elem.missedIngredientCount}{" "}
                                        ingredient(s):{" "}
                                    <span className="font-semibold">
                                        {elem.missedIngredients
                                            .map((elem) => elem.name)
                                            .join(", ")}
                                    </span>
                                    </span>
                                )}
                            </div>
                            <div className="p-2 flex justify-between">
                                {!!elem.vegetarian && (
                                    <div className="p-1 border-solid border-2 rounded-lg border-yellow-200 bg-yellow-200 text-gray-400 font-semibold text-sm w-min">
                                        Vegetarian
                                    </div>
                                )}
                                {!!elem.vegan && (
                                    <div className="p-1 border-solid border-2 rounded-lg border-yellow-200 bg-yellow-200 text-gray-400 font-semibold text-sm w-min">
                                        Vegan
                                    </div>
                                )}
                                {!!elem.dairyFree && (
                                    <div className="p-1 border-solid border-2 rounded-lg border-yellow-200 bg-yellow-200 text-gray-400 font-semibold text-sm w-min">
                                        DairyFree
                                    </div>
                                )}
                            </div>
                            <Link to={`/recipe/${elem.id}`}>
                                <div className="flex justify-center content-center py-2 border-t-2">
                                    Read the instructions
                                </div>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};

export default SearchResults;
