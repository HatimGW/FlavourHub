import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PayPalButton from "./paypal"
import "../CSS/card.css"
import {CartFetch} from "../Redux/Action"
import {useDispatch, useSelector} from "react-redux"

const Checkout = ({cart,setcart,price}) => {


  const {products2}= useSelector(state=>state.items2)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(CartFetch())
  },[dispatch])

    const navigate = useNavigate()
    
    const handlePaymentSuccess = (details, data) => {
        navigate("/success")
       };
        
  return (
    <section>
  <Container style={{marginTop:"10rem",display:"flex",justifyContent:"center", flexDirection:"column"}}>
    <Container style={{display:"flex",justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
    <h1>Order Summary</h1>
    <Table className="table" style={{marginTop:"2rem"}}>
            <tr>
                <th>S.No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
    {products2?.map((e,index)=>{
        return(
           <tr>
               <td>{index+1}</td>
               <td>{e.Title}</td>
               <td>{e.amount}</td>
               <td>${e.Price}</td>
           </tr>
        )
    })}
    </Table>
    <Table className='secTab'>
 
  <tr>
    <th colSpan={2} style={{border:"none",width:'55%'}}></th> 
    <th style={{ width:'28%'}}>Total</th>
    <th>${price}</th>
  </tr>
</Table>
    </Container>
    <Container style={{display:"flex",justifyContent:"center",marginTop:"8rem"}}>
    <PayPalButton cart={cart} onSuccess={handlePaymentSuccess} />
    </Container>
  </Container>
  </section>
  )
}

export default Checkout