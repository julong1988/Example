import React from 'react'
import {render} from 'react-dom'
import {addTodo} from '../redux/actions'

//import './Header.css'
class Header extends React.Component{
    constructor(props) {
        super(props)
    }

    menu(){
        console.log('menuevent')
    }
    add(){
        console.log(this)
        console.log(this.context)
        console.log(this.props)
    }
    render(){
        return(
            <div className='header-wraper'>
                <button className='menu' onClick={()=>this.menu()}>三</button>
                <h1>title</h1>
                <button className='add' onClick={()=>this.add()}>+</button>
            </div>
        )
    }
}


export default Header