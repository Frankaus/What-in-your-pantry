const DEFAULT_STATE = {
    recipes: [],
    dishType: "",
    comments: []
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

    if (action.type === "UPLOAD_COMMENT") {
        state = {
            ...state,
            comments: [
                ...state.comments, 
                action.data
            ]
        };
    }
    
    if (action.type === "GET_COMMENTS") {
        state = {
            ...state,
            comments: action.data
        };
    }


    return state;
}
