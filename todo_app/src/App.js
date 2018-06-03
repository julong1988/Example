import { connect } from 'react-redux'
import TodoApp from './TodoApp'
import {addTodo} from './redux/actions';

//将state.counter绑定到props的counter
const mapStateToProps = state => (
    {
        title: state.counter,
        date: state.date
    }
)

//将action的所有方法绑定到props上
const mapDispatchToProps = dispatch => (
    {
        addTodo: (...args) => dispatch(actions.addTodo(...args))
    }
)



//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(TodoApp)