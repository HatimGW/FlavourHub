const products = []
const products2 = []
const Reducers1 = (state={products},action)=>{
   switch (action.type){
     case "menuSuccess":
        return {products:action.payload}
     case "menuFailed":
        return {products:action.payload}
     default:
        return state;
   }
}
const Reducers2 = (state={products2},action)=>{
   switch (action.type){
     case "cartSuccess":
        return {products2:action.payload}
     case "cartFailed":
        return {products2:action.payload}
     default:
        return state;
   }
}
export {Reducers1,Reducers2};