export const uploadRecipes = (recipes) => {
    return {
        type: "UPLOAD_RECIPES",
        data: recipes,
    }
};

export const uploadRecipesInfo = (recipes) => {
    return {
        type: "UPLOAD_RECIPES_INFO",
        data: recipes,
        id: recipes.map(elem => elem.id)
    }
}