import axios from "axios";
import {useState} from "react";

const HomeSearch = () => {
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    console.log('arr: ', ingredientsList);

    let submitList = async () => {
        axios.post("/api/submitIngredientsList", ingredientsList);
    };

    let fn = async () => {
        let res = await axios.get("/api/test");
        console.log("res: ", res);
    };

    return (
        <div className="p-2">
            <h1 className="text-6xl">Hello Francesco</h1>
            <button onClick={() => fn()}>Click me to test server</button>
            <div>
                <input
                    onKeyPress={(e) => { 
                        if (e.key === 'Enter'){
                            ingredientsList.push(ingredient);
                            setIngredient("");
                        }
                    }}
                    onChange={(e) => setIngredient(e.target.value)}
                    type="text"
                    placeholder="enter one ingredient"
                    value={ingredient}
                />
                <button
                    onClick={() => {
                        ingredientsList.push(ingredient);
                        setIngredient("");
                    }}
                    className="border-solid border-black border-2 rounded-lg p-1"
                >
                    Add the ingredient to the list
                </button>
                <button
                    className="border-solid border-black border-2 rounded-lg p-1"
                    onClick={() => submitList()}
                    >
                    Submit the List
                </button>
            </div>
        </div>
    );
}

export default HomeSearch;