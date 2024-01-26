import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios"
import gif from "./icons8-tick.gif"
import cancelgif from "./icons8-cancel.gif"
import { BASE_URL } from './url';
import { useDispatch } from 'react-redux';
import { CartFetch } from '../Redux/Action';


const Login =({setLoggedIn,fetch})=>  {
  const Navigate=useNavigate()
const [loginData,setLogindata]=useState({})
const[alertL, setalertL]=useState(false)
const[alertF, setalertF]=useState(false)
const dispatch = useDispatch()

const login = async (e)=>{
  const{email,password}=loginData;
  e.preventDefault()
  try {
    const response = await axios.post(`${BASE_URL}/login`,{
      email,password},{
    withCredentials:true,credentials: 'include',
  })
  if(response.data.success){
    setalertL(response.data.success)
    dispatch(CartFetch())
    setTimeout(()=>{
      setalertL(false)
      Navigate("/")
      fetch()
      setLoggedIn(response.data.success)
    },1000)
    
  }
  else{
    setalertF(true)
    setTimeout(()=>{
      setalertF(false)
    },1000)
  }
    
  } catch (error) {
    console.log(error)
  }
  
}

  return (
    <Container style={{maxWidth:"30rem",marginTop:"8rem",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    {alertL ? (
      <>
      <img style={{position:"absolute",top:"4.5rem",backgroundColor:"transparent"}} src={gif}></img>
    <div style={{position:"absolute",marginTop:"-18rem"}} className="alert alert-success" role="alert">
      LOGIN SUCCESSFULLY 
     </div>
     </>
     ):null}
     {alertF ? (
      <>
      <img style={{position:"absolute",top:"4.5rem",backgroundColor:"transparent"}} src={cancelgif}></img>
    <div style={{position:"absolute",marginTop:"-18rem"}} className="alert alert-danger" role="alert">
      Invalid Credential
     </div>
     </>
     ):null}
    <h1 style={{color:"orange",fontFamily:"serif",fontSize:"25px"}}>LOGIN HERE</h1>
    <Form style={{boxShadow:"0 0 10px orange",padding:"50px",borderRadius:"10px"}}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control value={loginData.email} onChange={(e)=>setLogindata({...loginData,email:e.target.value})} type="text" placeholder="Enter email" />
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={loginData.password} onChange={(e)=>setLogindata({...loginData,password:e.target.value})} type="text" placeholder="Password" />
        </Form.Group>
        </Row>

      <Button onClick={login} style={{backgroundColor:"orange",border:"none"}} type="submit">
      Login
      </Button>
    </Form>
    </Container>
   
  );
}

export default Login;