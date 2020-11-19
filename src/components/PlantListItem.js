import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const PlantListItem = ({ plant, button }) => {
  const classes = useStyles();
  const main_species = plant.data ? plant.data.main_species : plant;

  const image = main_species.image_url !== null ? main_species.image_url : '/palm_light.png';

  return (main_species.common_name ? 
    <div className={classes.demo}>
      <List dense={true}>
        <ListItem
          button
          component={Link}
          to={{
            pathname: "/plant",
            state: {
              plant: main_species,
              button: button,
            }
          }
        }>
          <ListItemAvatar>
            <Avatar alt={main_species.common_name} src={image} />
          </ListItemAvatar>
          <ListItemText
            primary={main_species.common_name}
          />
        </ListItem>
      </List>
    </div>
    :
    null
  );
}
export default PlantListItem;