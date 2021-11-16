import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './page/Error';
import history from './history'
import { Route, Switch } from 'react-router';
import Signin from './page/Signin';
import Home from './page/Home';
import NotFound from './page/NotFound';
import Signup from './page/Signup';
import { HeaderContainer } from './containers/HeaderContainer';

function App() {
  return (
		<ErrorBoundary FallbackComponent={Error}>
			<ConnectedRouter history={history}>
				<HeaderContainer />
				<Switch>
					<Route exact path="/signin" component={Signin} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/" component={Home} />
					<Route component={NotFound} />
				</Switch>
			</ConnectedRouter>
		</ErrorBoundary>
  );
}

export default App;
