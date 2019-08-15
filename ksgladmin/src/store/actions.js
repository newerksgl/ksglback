/*
接收组件通知 触发mutation调用间接状态的方法的对象
*/
import storageUtil from "../util/storageUtil";
import { RECEIVE_TODOS, ADD_TODO, DEL_TODO, SELECT_ALL, DEL_TODOS } from './mutation-types'
export default {
    addTodo({ commit }, todo) {
        commit(ADD_TODO, { todo })
    },
    delTodo({ commit }, index) {
        commit(DEL_TODO, { index })
    },
    selectAll({ commit }, check) {
        commit(SELECT_ALL, { check })
    },
    delTodos({ commit }) {
        commit(DEL_TODOS)
    },
    reqTodos({ commit }) {
        setTimeout(() => {
            const todos = storageUtil.readTodos()
            commit(RECEIVE_TODOS, todos)
        }, 500)

    }

}
