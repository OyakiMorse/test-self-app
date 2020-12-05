import { combineReducers } from 'redux'
import quizReducer from '../reducers/quizReducer'
import quizCreateReducer from '../reducers/quizCreatorReducer'
import authReducer from '../reducers/authReducer'

export default combineReducers({
  quiz: quizReducer,
  quizCreate: quizCreateReducer,
  auth: authReducer,
})
