// module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// local imports
import authReducer from 'reducers/authReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer
});
