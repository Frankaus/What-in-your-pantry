import { useEffect } from "react";

let Test = () => {
    useEffect(() => {

        const { REACT_APP_API_TOKEN } = process.env;
        console.log(REACT_APP_API_TOKEN);

        fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=tomato&number=20&ranking=2&limitLicense=true&ignorePantry=true&apiKey=${REACT_APP_API_TOKEN}`
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data: ", data);
            })
            .catch((err) => {
                console.log("error: ", err);
            });

    }, []);

    return (
        <div>
            <h1>Cool</h1>
        </div>
    );
};

export default Test;
