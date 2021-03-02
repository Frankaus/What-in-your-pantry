const DEFAULT_STATE = {
    recipes: [],
    dishType: ""
};

export function reducer(state = DEFAULT_STATE, action) {
    if (action.type === "UPLOAD_RECIPES") {
        state = {
            ...state,
            recipes: action.data,
        };
    }

    if (action.type === "GET_DISH_TYPE") {
        state = {
            ...state,
            dishType: action.data
        };
    }

    

    return state;
}
