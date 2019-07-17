import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import MyAppBar from '../components/MyAppBar';

import * as data from '../data.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Timelines({match}) {

  let sliderRef;
  const [index, setIndex] = useState(0);
  const candidates = data.candidates.filter((d) => d.area === match.params.area);

  const handleChange = function(event, newValue) {
    setIndex(newValue);
    sliderRef.slickGoTo(newValue);
  }
  
  const tabs = candidates.map((c, i) =>
    <Tab label={`${c.name}`} key={c.name} />
  )

  const timelines = candidates.map((c, i) =>
    <div>
      <Box>
      {candidates[i].twitter && <a className="twitter-timeline" href={candidates[i].twitter}>Tweets by {candidates[i].name}</a>}
      {!candidates[i].twitter && 'Twitterアカウントがみつかりませんでした'}
      </Box>   
    </div>);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <React.Fragment>      
      <AppBar position="fixed" color="default">
        <Box mt={8} mx={0} boxShadow={0}>
          <Tabs
            value={index}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs}
          </Tabs>
        </Box>                
      </AppBar>
      <MyAppBar title={match.params.area}></MyAppBar>          
      <Box mx={1} mt={17}>     
        <Slider 
          {...settings}
          ref={slider => (sliderRef = slider)}
        >
          {timelines}
        </Slider>     
      </Box>
    </React.Fragment>
  );
};
