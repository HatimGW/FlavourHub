import React, { useEffect } from 'react'
import {Card,Button,Container,Row} from "react-bootstrap"
import Img from "./icons8-veg-48.png"
import { Link } from 'react-router-dom'
import { CartFetch } from '../Redux/Action'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from './url'


const Cart = ({price,empty,setEmpty}) => {

  

  const{products2}=useSelector((state)=>state.items2)
  const dispatch = useDispatch()

  const Delete = async(id) =>{

    try {
      const response = await axios.delete(`${BASE_URL}/delete?id=${id}`,{
        withCredentials: true,credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      dispatch(CartFetch())
      if(response.data.success){
        if(products2.length === 0){
          setEmpty(true)
          console.log(empty)
        }
        else{
          setEmpty(false)
          console.log(empty)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handle= async(data,e)=>{
    try {
    const response = await axios.post(
      `${BASE_URL}/amount`,
      { ...data, amount: Math.max(1,data.amount + e) },
      { withCredentials: true,credentials: 'include' }
    );
    
    if (response.data.success) {
      dispatch(CartFetch())
      console.log("Updated");
    } else {
      console.log("Not updated");
    }
    } catch (error) {
    console.log(error);
    }
    };
  
  return (

  <>
  {!empty?(
    <Container>
    <h1 style={{marginTop:"80px"}}>Your Cart</h1>
    {products2?.map((item,index)=>{
      const{Title,img,Descrpition,Price,amount}=item;

      return(
      <Row className='row mt-4' key={index}>
      <Card style={{overflow:"hidden",height:"200px",padding:'10px'}} className="d-flex flex-row-reverse align-items-center">

      <Card.Body style={{display:"contents",padding:"0px",position:"relative", right:"0px"}}>
      <Card.Img style={{borderRadius:"20px",maxHeight:"115px"}} variant="right" src={`/images/${img}`} />
      <Container style={{display:"flex",right:"0px",maxWidth:"10rem",position:"absolute",top:"157px"}}>
      <Button onClick={()=>handle(item,-1)} style={{width:"2.2rem",textAlign:"center",border:"none",backgroundColor:"orange"}}>-</Button>
      <Button  style={{cursor:"default"}} variant='none'>{amount}</Button>
      <Button onClick={()=>handle(item,+1)} style={{textAlign:"center",border:"none",backgroundColor:"orange"}}>+</Button>
      </Container>
      </Card.Body>
      
      <Card.Body style={{maxHeight:"220px"}}>
      <Card.Img style={{maxWidth:"1rem"}} variant='top' src={Img}/>
      <Card.Title>{Title}</Card.Title>
        <Card.Text>$ {Price}</Card.Text>
        <Card.Text>{Descrpition}</Card.Text>
      </Card.Body>
    </Card>
    <Container style={{display:"flex",justifyContent:"center"}}>
    <Button onClick={()=>Delete(item.id)} style={{marginTop:"0.5rem",maxWidth:"25rem",border:"1px solid black",color:"black",backgroundColor:"transparent"}}><i style={{marginRight:"1rem"}} class="fa-solid fa-trash"></i>Remove</Button>
    </Container>
   </Row>
      )
    })
   }
   <Container style={{display:"flex",marginTop:"2rem",paddingRight:"7rem"}}>
    <h2>Total Price:&nbsp;&nbsp;&nbsp;${price}/- </h2>
   </Container>
   
   <Container style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}} className='d-flex justify-content-center flex-direction-column mt-4'>
   <Link to="/checkout" style={{padding:"10px",textDecoration:"none",textAlign:"center",color:"white",marginTop:"1rem",width:"9rem",borderRadius:"10px",border:"none",backgroundColor:"orange",position:"relative"}}>Checkout ({products2 ? products2.length : null})</Link>
   
   <Link to="/" style={{textDecoration:"none",textAlign:"center",color:"white",marginBottom:"2rem",marginTop:"2rem",width:"9rem",borderRadius:"20px",border:"none",backgroundColor:"orange",position:"relative"}}>Go Back</Link>
  </Container>
    </Container>
    ):
    (<Container style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1 style={{fontSize:"25px",marginTop:"7rem"}}>Your Cart is Empty!</h1>
      <p style={{marginTop:"2rem"}}>Must add items on the cart before you proceed to checkout.</p>
    <Link to="/" style={{textDecoration:"none",textAlign:"center",color:"white",marginTop:"8rem",width:"9rem",borderRadius:"20px",border:"none",backgroundColor:"orange",position:"relative"}}>Go Back</Link>
    </Container>)}

   

  </>
  )

}

export default Cart;