import C from './constants'

export const addTodo = (title) => 
    ({
        type:"ADD_TODO",
        title,
        data: new Date()
    })