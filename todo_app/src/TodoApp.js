import React from 'react'
import {render} from 'react-dom'

import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import AddForm from './components/AddForm'




class TodoApp extends React.Component{
    render(){
        return(
        <div className="wrap">
            <Header />
            
            <TodoList/>
            <Footer />
            {<AddForm />}
        </div>
        )
    }
}

    

export default TodoApp