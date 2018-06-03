import React from 'react'
import {render} from 'react-dom'

//import './Header.css'



class TodoList extends React.Component{
    menu(){
        console.log('menuevent')
    }
    add(){
        console.log('addevent')
    }
    render(){
        return(
            <div className='body-wraper'>
                <ul>
                    {/*mockData.map(
                        (value,i) => <li key={i}><div>{value.title}<span className="date">{value.data}</span></div><button className="del">X</button></li>
                    )*/}
                </ul>
            </div>
        )
    }
}


export default TodoList