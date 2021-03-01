import { useSelector } from "react-redux";
// import SearchResults from "./searchResults";

const Recipe = (props) => {
    const id = props.match.params.id;
    console.log("id: ", id);

    const recipeArr = useSelector((state) =>
        state.recipes.filter((elem) => elem.id == id)
    );
    const recipes = useSelector((state) => state.recipes);
    console.log("recipes in recipe: ", recipes);

    let [recipe] = recipeArr;

    if (!recipe) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <div className="flex">
                <div className="flex bg-white m-2 rounded-lg overflow-hidden">
                    <div className="w-1/3">
                        <img
                            className="object-cover h-full"
                            src={recipe.image}
                            alt={recipe.title}
                        />
                    </div>
                    <div className="p-2">
                        <h2 className="text-lg font-semibold">
                            {recipe.title}
                        </h2>
                        <span className="block mt-2">
                            Dish type: {recipe.dishTypes[0]}
                        </span>
                        <span className="block">
                            Ready in {recipe.readyInMinutes} minutes.
                        </span>
                        <span>Servings: {recipe.servings}</span>
                    </div>
                </div>
                <div className="bg-white m-2 rounded-lg p-2">
                    <h2 className="text-lg font-semibold">Ingredients: </h2>
                    {recipe.extendedIngredients.length &&
                        recipe.extendedIngredients.map((elem, index) => {
                            return (
                                <div key={index}>
                                    <ul>
                                        <li>
                                            {elem.amount.toFixed(1)} {elem.unit}{" "}
                                            of {elem.name}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="bg-white m-2 rounded-lg p-2 flex flex-col">
                <p className="self-center mb-4 text-lg font-semibold">
                    Instructions:
                </p>
                {recipe.analyzedInstructions[0].steps.map((elem, index) => {
                    return (
                        <div key={index}>
                            <ol>
                                <li>{elem.step}</li>
                            </ol>
                        </div>
                    );
                })}
            </div>
            {/* <div>
                <p>{recipe.summary}</p>
            </div> */}
            {/* <div className="border-2 border-yellow-500 h-1/4">
                <SearchResults />
            </div> */}
        </div>
    );
};

export default Recipe;
