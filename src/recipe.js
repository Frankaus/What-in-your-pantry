import { useSelector } from "react-redux";

const Recipe = (props) => {
    const id = props.match.params.id;
    console.log("id: ", id);

    const recipeArr = useSelector((state) =>
        state.recipes.filter((elem) => elem.id == id)
    );
    // const tenRecipes = useSelector((state) => 
    //     state.recipes.filter((elem, index) => {
    //         if (elem[index] < elem[10]){
    //             return elem;
    //         }}));

    // console.log('ten recipe: ', tenRecipes);

    let [recipe] = recipeArr;

    if (!recipe) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <div>
                <img src={recipe.image} alt={recipe.title} />
                <div>
                    <h2>{recipe.title}</h2>
                </div>
                <div>
                    <span>Dish type: {recipe.dishTypes[0]}</span>
                    <span>Ready in {recipe.readyInMinutes} minutes.</span>
                    <span>Servings: {recipe.servings}</span>
                </div>
                <span>Instructions: {recipe.instructions}</span>
            </div>
            {recipe.extendedIngredients.length &&
                recipe.extendedIngredients.map((elem, index) => {
                    return (
                        <div key={index} overflow-y-visible>
                            <h2>Ingredients: </h2>
                            <ul>
                                <li>
                                    {elem.measures.metric.amount.toFixed(1)}{" "}
                                    {elem.measures.metric.unitLong} of{" "}
                                    {elem.name}
                                </li>
                            </ul>
                        </div>
                    );
                })}
            
        </div>
    );
};

export default Recipe;
