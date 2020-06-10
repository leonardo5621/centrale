const initialState = {
    prenom:'none',
    movie: {
        name: 'Filme',
        year: "2020",
        picture: '',
        actors:[],
        realizer:'Leo'
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