import React from 'react';
import { Dashboard, Login, PrivateRoute, Error } from './pages';
import { RegisterScreen } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
   
      <Router>
     
        
       
          <Route path="/register" component={RegisterScreen} exact />
          {/* <Route path='/login'>
            <Login></Login>
          </Route> */}

          <Route path="/" component={Dashboard} exact />
          
          {/* <Route path='*'>
            <Error></Error>
          </Route> */}
      
      </Router>
  
  );
}

export default App;
