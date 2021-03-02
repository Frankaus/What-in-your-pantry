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
    try {
        let {data} = await axios.post('/api/uploadComment', comment);
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
        console.log('get comments: ', data);
        if (data.comments) {
            return {
                type: "GET_COMMENTS",
                data: data.rows
            }
        }
    } catch(err) {
        console.log('error in getComments action: ', err);
    }
}

export const loading = () => {
    return {
        type: "LOADING",
    }
}