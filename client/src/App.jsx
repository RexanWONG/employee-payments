import React from 'react'
import { Switch, Route } from 'react-router-dom';

import { Sidebar, Dashboard, AddEmployee, Deposit, Footer } from './components';
import './App.css'



const App = () => {

  return (
    <div className="app">
      <div className="navbar">
        <Sidebar />
      </div>
      <div className="main">
        <div className="routes">
          <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/add-employee">
                <AddEmployee />
              </Route>
              <Route exact path="/deposit">
                <Deposit />
              </Route>
            </Switch>
        </div>
        {/* <div>
          <Footer />
        </div> */}
       
      </div>
    </div>
  
  )

}

export default App
