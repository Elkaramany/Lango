import { ACTION, QUESTION } from './types'

interface Props {
    loading: boolean
    allQuestions: QUESTION[]
}

const INITIAL_STATE: Props = {
    allQuestions: [],
    loading: false
}

export default (state = { INITIAL_STATE }, action: ACTION) => {
    switch (action.type) {
        case 'Switch_Questions_Loading':
            return { ...state, loading: action.payload }
        case 'Set_Questions_Array':
            return { ...state, allQuestions: action.payload }
        default:
            return state
    }
}
