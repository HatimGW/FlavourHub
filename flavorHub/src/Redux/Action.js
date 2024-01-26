import axios from "axios"
import { BASE_URL } from "../Component/url"

const MenuFetch = ()=>async(dispatch)=>{
  try {
    const product = await axios.get(`${BASE_URL}/menu`)
    const response = product.data.menu

    dispatch({
        type:"menuSuccess",
        payload:response
    })

  } catch (error) {
    dispatch({
        type:"menuFailed",
        payload:error
    })
    console.log(error)
  }
  
}
const CartFetch = ()=>async(dispatch)=>{
  try {
    const products = await axios.get(`${BASE_URL}/upd`,{withCredentials:true,credentials:"include"})
    

    if(products.data.success){
      const responses = products.data.cart
    dispatch({
        type:"cartSuccess",
        payload:responses
    })
  }

  } catch (error) {
    dispatch({
        type:"cartFailed",
        payload:error
    })
    console.log(error)
  }
  
}

export {MenuFetch,CartFetch};