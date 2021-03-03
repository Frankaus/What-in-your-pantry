import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadRecipes, dishType, loading} from "./redux/actions";
import {motion} from "framer-motion";

const HomeSearch = () => {
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [addInfo, setAddInfo] = useState([]);

    const { REACT_APP_API_TOKEN } = process.env;

    let removeItem = (event) => {
        let clicked = event.target.getAttribute("name");
        setIngredientsList(
            ingredientsList.filter((elem) => {
                if (elem !== clicked) {
                    return elem;
                }
            })
        );
    };

    let submitList = () => {
        let queryString = ingredientsList.join(",");
        console.log("query: ", queryString);
        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&number=40&ranking=2&limitLicense=true&ignorePantry=true&apiKey=${REACT_APP_API_TOKEN}`
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data: ", data);
                setRecipes(data);
                let ids = data.map((elem) => elem.id).join(",");
                console.log("ids: ", ids);
                fetch(
                    `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${REACT_APP_API_TOKEN}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log("data2: ", data);
                        setAddInfo(data);
                    })
                    .catch((err) => {
                        console.log("error second Fetch: ", err);
                    });
            })
            .catch((err) => {
                console.log("error first Fetch: ", err);
            });
    };

    useEffect(() => {
        let combinedArr = addInfo.map((elem, index) => {
            return (elem[index] = {
                ...recipes[index],
                ...addInfo[index],
            });
        });
        console.log("combinedArr: ", combinedArr);
        dispatch(uploadRecipes(combinedArr));
    }, [addInfo]);

    return (
        <div className="p-2 w-screen h-auto">
            {/* div for box flex align ingredients start */}
            <div className="flex flex-col">
                {/* search and button container starts here */}
                <div className="h-full flex flex-col items-center">
                    <motion.h1
                        className="mt-24 mb-4 text-4xl font-semibold text-yellow-700"
                        initial={{ y: -250 }}
                        animate={{ y: 0 }}
                        transition={{delay: 1, type:'spring', stiffness: 500, duration: 2}}
                    >
                        {" "}
                        What's in your pantry?
                    </motion.h1>
                    {/* INGREDIENTS LIST */}
                    <div className="flex flex-wrap min-w-min h-24 max-h-44 max-w-4xl">
                        {ingredientsList.length > 0 &&
                            ingredientsList.map((elem) => {
                                return (
                                    <motion.div
                                        key={elem}
                                        name={elem}
                                        onClick={(e) => removeItem(e)}
                                        className="px-2 py-2 border-solid border-2 rounded-lg border-green-700 bg-green-700 m-2 text-gray-400 font-semibold max-h-10 relative"
                                        initial={{ x: -500 }}
                                        animate={{ x: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {elem}
                                        <div className="absolute bg-green-400 rounded-full h-4  text-xs -inset-1 text-center w-min px-1 text-gray-800">
                                            x
                                        </div>
                                    </motion.div>
                                );
                            })}
                    </div>
                    {/* INPUT */}
                    <motion.input
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                ingredientsList.push(ingredient);
                                setIngredient("");
                            }
                        }}
                        onChange={(e) => setIngredient(e.target.value)}
                        type="text"
                        placeholder="Enter one ingredient at the time..."
                        value={ingredient}
                        className="my-4 w-2/5 p-2 mx-2 rounded-full outline-none focus:shadow-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 3 }}
                    />
                    <div>
                        {/* FILTER & BUTTONS */}
                        <span className="mx-2">
                            Filter for the type of dish:
                        </span>
                        <select
                            className="p-1 px-2 outline-none rounded-full hover:border-gray-500 shadow focus:outline-none"
                            onChange={(e) => dispatch(dishType(e.target.value))}
                            name="type"
                            id="type"
                        >
                            <option value="1">All</option>
                            <option value="2">Vegetarian</option>
                            <option value="3">Vegetarian & Vegan</option>
                            <option value="4">Vegan</option>
                            <option value="5">Dairy free</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                ingredientsList.push(ingredient);
                                setIngredient("");
                            }}
                            className="border-solid focus:outline-none border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold mx-6 hover:shadow-xl"
                        >
                            Add the ingredient to the list
                        </button>
                        <button
                            className="border-solid focus:outline-none border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold my-4 hover:shadow-xl"
                            onClick={() => {
                                dispatch(loading());
                                submitList();
                            }}
                        >
                            Submit the pantry list
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
