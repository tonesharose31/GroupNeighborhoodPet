import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PetList} />
        <Route path="/detail/:id" component={PetDetail} />
        <Route path="/search" component={PetForm} />
      </Switch>
    </Router>
  );
}

export default App;