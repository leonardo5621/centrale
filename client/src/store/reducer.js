const initialState = {
    prenom:'none'
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return {prenom:action.prenom}
        default:
            return state;
    }
};

export default reducer;