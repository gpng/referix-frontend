// module imports
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

// local imports
import authReducer from 'reducers/authReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer
});
