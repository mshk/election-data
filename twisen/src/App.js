import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/candidates" component={Candidates} />
      </div>
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
  return <div>
    
  </div>          
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">ホーム</Link>
      </li>
      <li>
        <Link to="/about">このサイトについて</Link>
      </li>
      <li>
        <Link to="/candidates">候補</Link>
      </li>
    </ul>
  );
}

export default App;