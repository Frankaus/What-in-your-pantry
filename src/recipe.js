import { useSelector } from "react-redux";

const Recipe = (props) => {
    const id = props.match.params.id;
    console.log("id: ", id);

    const recipeArr = useSelector((state) =>
        state.recipesInfo.filter((elem) => elem.id == id)
    );

    let [recipe] = recipeArr;
    let ingredients = recipe.extendedIngredients;

    console.log("recipe: ", recipe);
    console.log("summary: ", recipe.summary);
    console.log("instructions: ", recipe.instructions);
    console.log("ingredients: ", ingredients);

    if (!recipe) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <h1>Recipe</h1>
            <div>
                <img src={recipe.image} alt={recipe.title} />
                <div>
                    <h2>{recipe.title}</h2>
                </div>
                <div>{recipe.instructions}</div>
            </div>
            {ingredients.length &&
                ingredients.map((elem, index) => {

                    return (
                        <div key={index}>
                            <ul>
                                <li>
                                    {(elem.measures.metric.amount).toFixed(1)} {elem.measures.metric.unitLong} of {elem.name}
                                </li>
                            </ul>
                        </div>
                    );
                })}
        </div>
    );
};

export default Recipe;
