export const uploadRecipes = (recipes) => {
    return {
        type: "UPLOAD_RECIPES",
        data: recipes,
    }
};