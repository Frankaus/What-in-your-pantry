import axios from "axios";

export const uploadRecipes = (recipes) => {
    return {
        type: "UPLOAD_RECIPES",
        data: recipes,
    }
};

export const dishType = (dishType) => {
    return {
        type: "GET_DISH_TYPE",
        data: dishType,
    }
}

export const uploadComment = async (comment) => {
    console.log('comment in action: ', comment);
    try {
        let {data} = await axios.post('/api/uploadComment', comment);
        console.log('response: ', data);
        if (data.uploaded) {
            return {
                type: "UPLOAD_COMMENT",
                data: comment
            }
        }
    } catch(err) {
        console.log('error in post uploadComment', err);
    }
}

export const getComments = async (recipeId) => {
    try {
        let {data} = await axios.get('/api/getComments/' + recipeId);
        console.log('res getComments: ', data);
        return {
            type: "GET_COMMENTS",
            data: data
        }
    } catch(err) {
        console.log('error in getComments action: ', err);
    }
} 