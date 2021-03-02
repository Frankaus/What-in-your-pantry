import { useSelector } from "react-redux";
import parse from 'html-react-parser';


const Recipe = (props) => {
    const id = props.match.params.id;
    console.log("id: ", id);

    const recipeArr = useSelector((state) =>
        state.recipes.filter((elem) => elem.id == id)
    );

    let [recipe] = recipeArr;

    let parsed = parse(recipe.summary);

    console.log('parsed: ', parsed);

    function parsingFn (element){
        let body = "";
        for (var i = 0; i < element.length; i++){
            if (i % 2 == 0) {
                body += element[i];
            } else {
                body += element[i].props.children;
            }
        }
        return body;
    };

    let summary = parsingFn(parsed);

    console.log('summary: ', summary);


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
            <div>
                <p>{summary}</p>
            </div>
        </div>
    );
};

export default Recipe;
