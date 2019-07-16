import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import MyAppBar from '../components/MyAppBar';
import ReactSwipe from 'react-swipe';
import * as data from '../data.json';
import SwipeableViews from 'react-swipeable-views';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

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

export default function Timelines({match}) {
  const candidates = data.candidates
    .filter((d) => d.area === match.params.area)
  const classes = useStyles();
  let reactSwipeEl;

  const timelines = candidates.map((c, i) => (
    <div>
      <Box my={5}>
        <h3>{c.name}({c.party})</h3>
        {c.twitter && <a key={c.twitter} style={{'width': '100%'}} className="twitter-timeline" href={c.twitter}>Tweets by {c.name}</a>}
      </Box>        
    </div>
  ));
  return (
    <React.Fragment>
      <MyAppBar></MyAppBar>      
      <Box mt={10} mx={1}>     

      <h2>{match.params.area}の候補者</h2>     

      <Grid container justify="center" spacing={10}>
        <Grid item>
          <Fab onClick={() => reactSwipeEl.prev()} variant="extended">前の候補へ</Fab>
        </Grid>        
        <Grid item>
          <Fab onClick={() => reactSwipeEl.next()} variant="extended">次の候補へ</Fab>
        </Grid>
      </Grid>      
      
      <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: true }}
          ref={el => (reactSwipeEl = el)}
        >
          {timelines}
        </ReactSwipe>  
      </Box>
    </React.Fragment>
  );
}

/**
 *      
 *  <button onClick={() => reactSwipeEl.prev()}>前の候補へ</button>
        <button onClick={() => reactSwipeEl.next()}>次の候補へ</button>    
 * <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          ref={el => (reactSwipeEl = el)}
        >
          {timelines}
        </ReactSwipe>  
 */