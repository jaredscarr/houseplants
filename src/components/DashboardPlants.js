import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const DashboardPlants = ({ plants }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid
          container
          spacing={4}
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item >
            <Button onClick={()=> history.push("/search")}>
              <AddBoxIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {plants.map((plant) => (
            <Grid item key={plant.data.main_species.id} xs={12} sm={6} md={4}>
                <Card
                  className={classes.card}
                  component={Link}
                  style={{textDecoration: "none"}}
                  to={{
                    pathname: "/plant",
                    state: {
                      plant: plant.data.main_species,
                      button: "Remove",
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    src={plant.data.main_species.image_url}
                    title={plant.data.main_species.common_name}
                    height="140"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="overline">
                      {plant.data.main_species.common_name}
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default DashboardPlants;