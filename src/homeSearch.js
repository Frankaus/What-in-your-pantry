import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadRecipes, dishType, loading} from "./redux/actions";

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
                    <h1 className="mt-12 mb-4 text-2xl font-semibold">
                        {" "}
                        What's in your pantry?
                    </h1>
                    <div className="flex flex-wrap min-w-min h-24 max-h-44 max-w-4xl">
                        {ingredientsList.length > 0 &&
                            ingredientsList.map((elem) => {
                                return (
                                    <div
                                        key={elem}
                                        name={elem}
                                        onClick={(e) => removeItem(e)}
                                        className="px-1 border-solid border-2 rounded-lg border-green-700 bg-green-700 m-2 text-gray-400 font-semibold max-h-8"
                                    >
                                        {elem}
                                    </div>
                                );
                            })}
                    </div>
                    <input
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
                        className="my-4 w-2/5 p-2 mx-2"
                    />
                    <div>
                        <span className="mx-2">Filter for the type of dish:</span>
                        <select 
                        className="p-1 px-2"
                        onChange={(e) => dispatch(dishType(e.target.value))}
                        name="type" id="type">
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
                            className="border-solid border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold mx-6"
                        >
                            Add the ingredient to the list
                        </button>
                        <button
                            className="border-solid border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold my-4"
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
