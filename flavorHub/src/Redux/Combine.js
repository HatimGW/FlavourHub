import {combineReducers} from "redux"
import {Reducers1,Reducers2} from "./Reducer"

const root = combineReducers({
    items:Reducers1,
    items2:Reducers2
})
export default root