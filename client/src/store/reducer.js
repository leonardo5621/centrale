const initialState = {
    prenom:'none',
    movie: {
        Title: 'Filme',
        Plot: "C'est un film",
        Poster: 'none'
    }
}

const reducer = (state=initialState, action) => {
    console.log(state);
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                prenom:action.prenom}
        case 'MOVIE':
            return {
                ...state,
                movie: action.movie
            }
        default:
            return state;
    }
};

export default reducer;