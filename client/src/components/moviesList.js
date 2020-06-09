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
import {useDispatch} from 'react-redux';
import Footer from './Footer';

// Liste de films

export default function MoviesList() {
    const [cards, setCards] = useState([]);
    const classes = homeStyle();
    const dispatcher = useDispatch();

    //Changement d'état, fonction qui récupère des données des films
    useEffect(() => {
    const getMovies = async () => {
      let m1 = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=e5eca88b');
      let m2 = await axios.get('http://www.omdbapi.com/?t=Blade+Runner&apikey=e5eca88b');
      let m3 = await axios.get('http://www.omdbapi.com/?t=The+Witcher&apikey=e5eca88b');
      console.log(m1.data);
      setCards([m1.data,m2.data,m3.data]);
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
    
                    <LinkR to="/connection">
                    <Button variant="contained" color="primary">
                      Connectez-vous
                    </Button>
    
                    </LinkR>
                    
                  </Grid>
                  
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.Poster}
                      title={card.Title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.Title}
                      </Typography>
                      <Typography>
                        {card.Plot}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <LinkR to="/movieDetail">
                        <Button size="small" color="primary"
                        onClick={() => {
                          dispatcher({
                            type:'MOVIE',
                            movie:{
                              Title:card.Title,
                              Plot:card.Plot,
                              Poster:card.Poster
                            }
                          })
                        }}>
                          View
                        </Button>
                      </LinkR>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Grid container alignItems="center" justify="center">
              <div style={{paddingBottom:'3%'}}>
                  <LinkR to="/movieCreate">
                    <Button
                    variant ="contained" color="secondary">
                    Ajouter un Film
                    </Button>
                  </LinkR>
              </div>
                   
          </Grid>
        </main>
    
        {/* Footer */}
        <Footer />
        {/* End footer */}
        </React.Fragment>
    )
}
