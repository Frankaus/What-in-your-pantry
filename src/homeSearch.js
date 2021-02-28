import {useState} from "react";
import {useDispatch} from 'react-redux';
import { uploadRecipes, uploadRecipesInfo } from "./redux/actions";


const HomeSearch = () => {
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList] = useState([]);
    const { REACT_APP_API_TOKEN} = process.env;

    console.log('arr: ', ingredientsList);

    let submitList = () => {
        let queryString = ingredientsList.join(',');
        console.log('query: ', queryString);
        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&number=20&ranking=2&limitLicense=true&ignorePantry=true&apiKey=${REACT_APP_API_TOKEN}`
        )
        .then(res => {return res.json();})
        .then(data => {
            console.log('data: ', data);
            dispatch(uploadRecipes(data));
            let ids = data.map(elem => elem.id).join(",");
            console.log('ids: ', ids);
            fetch(
                `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${REACT_APP_API_TOKEN}`
            ).then((res) => {
                return res.json();
            }).then(data => {
                console.log('data2: ', data);
                dispatch(uploadRecipesInfo(data));
            });
        })
        .catch(err => {
            console.log('error: ', err);
        });
    
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