// module imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from 'registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

// local imports
import App from 'containers/App';
import reducers from 'reducers';
import { AUTHENTICATED, UNAUTHENTICATED } from 'actions/types';

// style imports
import 'index.css';
import 'styles/react-redux-toastr.min.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// palette taken from material.io/color
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#666ad1',
      main: '#303f9f',
      dark: '#001970',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff5bff',
      main: '#d500f9',
      dark: '#9e00c5',
      contrastText: '#000000'
    }
  }
});

// check if refresh token in local storage
const refreshToken = localStorage.getItem('refresh_token');
if (refreshToken) {
  store.dispatch({ type: AUTHENTICATED });
} else {
  store.dispatch({ type: UNAUTHENTICATED });
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Reboot />
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
registerServiceWorker();
