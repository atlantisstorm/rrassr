import React from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import Navbar from './navbar';
import NoMatch from './no-match';

const App = () => {
  return (
    <div>
      <h1><a href="/">rrassr!</a></h1>
      <Navbar />
      <Switch>
        { routes.map(({ path, exact, component: C, ...rest}) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              <C {...props} {...rest} />
            )}
          />
        ))}
        <Route render={(props)=> <NoMatch {...props} />} />
      </Switch>
    </div>
  );
};

export default App;