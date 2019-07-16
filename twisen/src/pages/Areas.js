import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MyAppBar from '../components/MyAppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import * as data from '../data.json';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function Areas() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MyAppBar></MyAppBar>
      <Box mt={9} mx={1}>      
        <List className={classes.root} >
          {data.areas.map((area, i) => {
            return (
            <ListItem key={`area-${i}`}>
              <Typography variant="h3" gutterBottom>
                <Link href={`/timelines/${area}`}>{area}</Link>
              </Typography>
            </ListItem>
            );
          })}
        </List>
      </Box>
    </React.Fragment>
  );
}