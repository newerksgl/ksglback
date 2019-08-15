/*
包含多个由action触发去直接调用更新状态的方法的对象
*/
import { RECEIVE_TODOS, ADD_TODO, DEL_TODO, SELECT_ALL, DEL_TODOS } from './mutation-types'
export default {
    [ADD_TODO](state, { todo }) {
        state.todos.unshift(todo)
    },
    [DEL_TODO](state, { index }) {
        state.todos.splice(index, 1)
    },
    [SELECT_ALL](state, { check }) {
        state.todos.forEach(todo => (todo.complete = check))
    },
    [DEL_TODOS](state) {
        state.todos = state.todos.filter(todo => !todo.complete)
    },
    [RECEIVE_TODOS](state, todos) {
        state.todos = todos
    }


}
