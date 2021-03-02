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