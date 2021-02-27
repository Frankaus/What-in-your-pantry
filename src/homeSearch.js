import axios from "axios";
import {useState} from "react";
import {useDispatch} from 'react-redux';
import {uploadRecipes} from './redux/actions';


const HomeSearch = () => {
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);

    console.log('arr: ', ingredientsList);

    let submitList = async () => {
        let {data} = await axios.post("/api/submitIngredientsList", ingredientsList);
        console.log('res: ', data);
        dispatch(uploadRecipes(data));
    };

    return (
        <div className="p-2 flex-col items-center">
            <input
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        ingredientsList.push(ingredient);
                        setIngredient("");
                    }
                }}
                onChange={(e) => setIngredient(e.target.value)}
                type="text"
                placeholder="enter one ingredient"
                value={ingredient}
            />
            <div>
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