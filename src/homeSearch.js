import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadRecipes} from "./redux/actions";

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
                    <button
                        onClick={() => {
                            ingredientsList.push(ingredient);
                            setIngredient("");
                        }}
                        className="border-solid border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold"
                    >
                        Add the ingredient to the list
                    </button>
                    <button
                        className="border-solid border-yellow-700 border-2 rounded-lg p-1 bg-yellow-700 text-white text font-semibold my-4"
                        onClick={() => submitList()}
                    >
                        Submit the pantry list
                    </button>
                </div>

                <div className="flex flex-wrap w-11/12">
                    {ingredientsList.length > 0 &&
                        ingredientsList.map((elem) => {
                            return (
                                <div
                                    key={elem}
                                    name={elem}
                                    onClick={(e) => removeItem(e)}
                                    className="px-1 border-solid border-2 rounded-lg border-green-700 bg-green-700 m-2 text-gray-400 font-semibold"
                                >
                                    {elem}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
