import React from 'react'
import {render} from 'react-dom'
import {createStore,combineReducers} from 'redux'
import {todo,popup} from './redux/reducers'
import TodoApp from './TodoApp'
import App from './App'
import {Provider,connect} from 'react-redux'
import {addTodo} from './redux/actions'

import 'normalize.css'

window.React = React;

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

let initialState = {
    todo:[],
    popup:false
}
for(let i=0;i<10;i++){
    initialState.todo.push({
        title:"todo "+i,
        data:new Date().Format("yyyy-MM-dd")
    })
}


const store = createStore(
    combineReducers({todo, popup}),
    initialState
)




/*console.log(store.getState())

store.dispatch(addTodo("julongwaisui"))
console.log(store.getState())*/

render(
    <Provider store={store}>
    <App />
    
    </Provider>,
    document.getElementById('app')
)