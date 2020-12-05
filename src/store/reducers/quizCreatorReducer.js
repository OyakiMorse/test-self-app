import {
  QUIZ_CREATE_QUESTION,
  RESET_QUIZ_CREATION,
} from '../../store/actions/actionTypes'

const initState = {
  quiz: [],
}

export default function quizCreateReducer(state = initState, action) {
  switch (action.type) {
    case QUIZ_CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
      }
    default:
      return state
  }
}
