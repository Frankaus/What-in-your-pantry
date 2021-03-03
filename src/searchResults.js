import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const loadingVariants = {
   animation: {
       scale: [1.25, 0.75, 1.25, 0.75],
       transition: {duration: 3}
   }
};


const SearchResults = () => {
    let recipes = useSelector((state) => state.recipes);
    const dishType = useSelector((state) => state.dishType);
    let loading = useSelector(state => state.loading);

    if (recipes.length > 0) {
        loading = false;
    }

    console.log('loading: ', loading);

    if (dishType === "2"){
       recipes = recipes.filter((elem) => elem.vegetarian)
    } else if (dishType === "3") {
        recipes = recipes.filter((elem) => elem.vegetarian && elem.vegan)
    } else if (dishType === "4") {
        recipes = recipes.filter((elem) => elem.vegan)
    } else if (dishType === "5") {
        recipes = recipes.filter(elem => elem.dairyFree)
    }

    if (loading) {
        return (
            <motion.div
                className="flex justify-center"
                variants={loadingVariants}
                animate="animation"
            >
                <span className="font-semibold text-3xl">  ☎️ Calling the Chef...</span>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center">
            {recipes.length > 0 &&
                recipes.map((elem, index) => {
                    {/* cards starts here */}
                    return (
                        <motion.div
                            key={index}
                            className="w-1/4 mx-6 my-4 bg-gray-100 rounded-l overflow-hidden shadow-md hover:shadown-2xl"
                            whileHover={{scale: 1.1}}
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
                                {!!elem.dishTypes.length && (
                                    <div>
                                        <span className="font-semibold">
                                            Dish type: {elem.dishTypes[0]}
                                        </span>
                                    </div>
                                )}
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
                                    <div className="p-1 border-solid border-2 rounded-lg border-yellow-200 bg-yellow-200 text-gray-400 font-semibold text-sm ">
                                        Dairy Free
                                    </div>
                                )}
                            </div>
                            <Link to={`/recipe/${elem.id}`}>
                                <div className="flex justify-center content-center py-2 border-t-2">
                                    Read the instructions
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
        </div>
    );
};

export default SearchResults;
