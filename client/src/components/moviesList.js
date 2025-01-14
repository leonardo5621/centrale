import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import homeStyle from './HomeStyle';
import {Link as LinkR} from 'react-router-dom';
import ToolBar from './ToolBar';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import Footer from './Footer';

// Liste de films

export default function MoviesList() {
  const [cards, setCards] = useState([]);
  const [uuids, setUuids] = useState([]);
  const [noMore, setNoMore] = useState(false);
  const classes = homeStyle();
    const dispatcher = useDispatch();
    const state = useSelector(state => state);
    let connectButton;

    const goToNextPage = ()=> {
        axios.get('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/movies/'+uuids[uuids.length-1])
          .then((response) => {
            console.log(response.data);
            setCards(response.data.movies.length ? response.data.movies : cards);
            if(response.data.lastElementUuid){
              setUuids([...uuids,response.data.lastElementUuid])
              setNoMore(false)
            }
            else{
              setNoMore(true)
            }
            window.scrollTo(0, 0)
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });      
    }
    const goToBackPage = ()=> {
      var url = "" ; 
      if((uuids.length>2) || (noMore &&  (uuids.length>1)) ){
        url = 'https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/movies/'+uuids[uuids.length-2] ;
      }
      else {
        url = 'https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/movies' ;
      } ;
      console.log('url',url)
        setUuids([...uuids.slice(0,uuids.length-1)]) ;

      axios.get(url)
        .then((response) => {
          console.log(response.data);
          setCards(response.data.movies.length ? response.data.movies : cards);
          if(response.data.lastElementUuid){
            setUuids([...uuids,response.data.lastElementUuid])
            setNoMore(false)
          }
          else{
            setNoMore(true)
          }
          window.scrollTo(0, 0)
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });      
  }

    if(state.user && (state.user.name == 'none')){
        connectButton=(
          <LinkR to="/connection">
                    <Button variant="contained" color="primary">
                      Connectez-vous
                    </Button>
    
          </LinkR>
        );
    } else{
      connectButton = (
        <LinkR to={state.user.uuid}>
                    <Button variant="contained" color="primary">
                      Decouvrez ce que nous pouvons vous recommander!
                    </Button>
    
          </LinkR>
      );
    }

    //Changement d'état, fonction qui récupère des données des films
    useEffect(() => {
    const getMovies = async () => {
      axios.get('https://cors-anywhere.herokuapp.com/q25rjhfzij.execute-api.eu-west-1.amazonaws.com/dev/movies')
        .then((response) => {
          console.log(response.data);
          setCards(response.data.movies);
          setUuids([response.data.lastElementUuid])
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

      setCards([]);
    }
      getMovies();
  },[])

    return (
        <React.Fragment>
        <CssBaseline />
        <ToolBar />
        
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                Catalogue Disponible
              </Typography>
              
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
    
                    {connectButton}
                    
                  </Grid>
                  
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (

                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <LinkR style={{textDecoration:'none'}} to={card.uuid}>

                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={card.picture}
                          title={card.name}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            Nom: {card.name}
                          </Typography>
                          <Typography>
                            Année: {card.year} <br/>
                            Réalisateur: {card.realizer}
                          </Typography>
                        </CardContent>
                        
                          
                      </Card>
                    </LinkR>

                  </Grid>

              ))}
            </Grid>
          </Container>
          {!noMore && (uuids.length>0) && <div style={{display:'flex', justifyContent:'center'}}>
            <Button onClick={goToNextPage} color="default" variant="contained">Page suivante</Button>
          </div>}
          {
            (uuids.length>1) && (
              <div style={{display:'flex', justifyContent:'center'}}>
                <Button onClick={goToBackPage} color="default" variant="contained">Page précedente</Button>
              </div>
            )
          }
        </main>
    
        {/* Footer */}
        <Footer />
        {/* End footer */}
        </React.Fragment>
    )
}
