import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import * as data from '../../data.json';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function MyAppBar({title}) {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon onClick={() => setIsDrawerOpen(true)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ツイセン {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
        >
          <List className={classes.root} >
          {data.areas.map((area, i) => {
            return (
            <ListItem key={`area-${i}`}>
                <Link href={`/timelines/${area}`}>{area}</Link>
            </ListItem>
            );
          })}
        </List>
          <Divider />
        </div>
        </Drawer>
    </div>
  );
}