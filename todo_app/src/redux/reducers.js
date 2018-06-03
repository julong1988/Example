import C from './constants'

export const todo = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_TODO:
            return [
                ...state,{
                title: action.title,
                date: action.date
            }]
        case C.REMOVE_TODO:
            return state.filter(
                c => c.id !== action.id
            )
        default :
            return state
    }
}

export const popup = (state = {}, action) => {
    switch (action.type) {
        case C.OPEN_POPUP:
            return {
                visible: true,
            }
        case C.CLOSE_POPUP:
            return {
                visible: fasle
            }
        default :
            return state
    }
}