import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PetList from './components/PetList';


  function App() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/pets" component={PetList} />
        </Switch>
      </Router>
    );
  }
  
  export default App;