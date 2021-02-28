const DEFAULT_STATE = {
    recipes: [],
};

export function reducer(state = DEFAULT_STATE, action) {
    if (action.type === "UPLOAD_RECIPES") {
        state = {
            ...state,
            recipes: action.data,
        };
    }

    if (action.type === "UPLOAD_RECIPES_INFO") {
        state = {
            ...state,
            recipesInfo: action.data,
        };
    }

    return state;
}
