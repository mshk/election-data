import React from 'react';
import Link from '@material-ui/core/Link';
import MyAppBar from './components/MyAppBar';
import * as data from './data.json';
import Areas from './pages/Areas';
import Timelines from './pages/Timelines';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>      
      <Route exact path="/" component={Areas} />
      <Route path="/about" component={About} />
      <Route path="/areas" component={Areas} />
      <Route path="/timelines/:area" component={Timelines} />        
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Candidates({ match }) {
  return <React.Fragment>
    <MyAppBar></MyAppBar>
    <div>
      <a style={{'width': '100%'}} className="twitter-timeline" href="https://twitter.com/katsubekenji?ref_src=twsrc%5Etfw">Tweets by katsubekenji</a> 
    </div>      
  </React.Fragment>          
}

export default App;