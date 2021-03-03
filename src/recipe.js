import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { useEffect } from "react";
import Comments from "./comments";
import {motion} from "framer-motion";

const Recipe = (props) => {
    const id = props.match.params.id;
    // console.log("id: ", id);

    const recipeArr = useSelector((state) =>
        state.recipes.filter((elem) => elem.id == id)
    );

    let [recipe] = recipeArr;

    let parsed = recipe && parse(recipe.summary);

    function parsingFn(element) {
        let body = "";
        for (var i = 0; i < element.length; i++) {
            if (i % 2 == 0) {
                body += element[i];
            } else {
                body += element[i].props.children;
            }
        }
        return body;
    }

    let summary = recipe && parsingFn(parsed);

    useEffect(() => {
        console.log("recipe: ", recipe);
        if (!recipe) {
            window.location.replace("/");
        }
    }, []);

    if (!recipe) {
        return (
            <div className="flex justify-center text-2xl mt-6">Redirect...</div>
        );
    }

    return (
        <div className="bg-white">
            <h2 className="text-4xl font-semibold p-4 text-gray-600">
                {recipe.title}
            </h2>
            <div className="flex w-full">
                {/* SUMMARY & INFOS */}
                <div className="w-1/2 mx-4">
                    <div>
                        <p>{summary}</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="border-gray-300 border-2 border-dotted shadow-lg p-2 mt-2 w-1/3">
                            <h3 className=" text-gray-600 font-semibold">
                                Dish type: {recipe.dishTypes[0]}
                            </h3>
                            <h3 className="text-gray-600 font-semibold">
                                Servings: {recipe.servings}
                            </h3>
                            <h3 className="text-gray-600 font-semibold">
                                Ready in {recipe.readyInMinutes} minutes.
                            </h3>
                        </div>
                    </div>
                </div>
                {/* IMAGE */}
                <div className="w-1/2 flex justify-center mb-4">
                    <img
                        className="object-cover h-full"
                        src={recipe.image}
                        alt={recipe.title}
                    />
                </div>
            </div>
            <div className="flex w-full">
                {/* INGREDIENTS & INSTRUCTIONS*/}
                <motion.div 
                    className="bg-clip bg-cover m-2 rounded p-6 w-1/5 pl-14"
                    initial={{x: '-100vw'}}
                    animate={{ x: 0 }}
                    transition={{delay: 2, duration: 3, type: 'spring', stiffness: 200}}
                >
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">
                        Ingredients:{" "}
                    </h2>
                    {recipe.extendedIngredients.length &&
                        recipe.extendedIngredients.map((elem, index) => {
                            return (
                                <div key={index}>
                                    <ul>
                                        <li className="font-semibold text-gray-700">
                                            {elem.amount.toFixed(1)} {elem.unit}{" "}
                                            of {elem.name}
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                </motion.div>
                <div className="m-2 rounded p-2 flex flex-col w-4/5 border-2 border-dotted border-gray-300">
                    <p className="self-center mb-4 text-lg font-semibold text-gray-700 ">
                        Instructions:
                    </p>
                    <div>
                        <span>{recipe.instructions}</span>
                    </div>
                </div>
            </div>
            <Comments id={id} />
        </div>
    );
};

export default Recipe;
