import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Recipe = (props) => {
    const id = props.match.params.id;
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    console.log("id: ", id);

    const recipe = useSelector((state) =>
        state.recipes.filter((elem) => elem.id == id)
    );

    console.log("recipe: ", recipe);

    useEffect(() => {
        (async() => {
            let {data} = await axios.get("/api/getRecipeIngredients/" + id);
            console.log('ingredients: ', data);
            setIngredients(data);

        })();
    }, []);

    useEffect(() => {
        (async() => {
            let {data} = await axios.get("/api/getRecipeInstructions/" + id);
            console.log('instructions: ', data);
            setInstructions(data);

        })();
    }, []);

    if (!recipe.length || !ingredients.length || !instructions.length) {
        return (
            <div>
                Loading
            </div>
        );
    }

    return (
        <div>
            <h1>Recipe</h1>
            {recipe.length && recipe.map((elem, index) => {
                return (
                    <div key={index}>
                        <img src={elem.image} alt={elem.title} />
                        <div>
                            <h2>{elem.title}</h2>
                            <span>Match: {elem.match}</span>
                            {elem.missedIngredientCount > 0 && (
                                <p>
                                    You are missing only{" "}
                                    {elem.missedIngredientCount} ingredient(s):{" "}
                                    {elem.missedIngredients.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
            {ingredients.length && ingredients.map((elem, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{elem.amount} {elem.unit} of {elem.name}</li>
                        </ul>
                    </div>
                );
            })}
            {instructions.length && instructions.map((elem, index) => {
                return (
                    <div key={index}>
                        <ol>
                            <li>{elem}</li>
                        </ol>
                    </div>
                )
            })}
        </div>
    );
};

export default Recipe;
