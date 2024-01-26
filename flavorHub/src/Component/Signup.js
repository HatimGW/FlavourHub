import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Signup =()=>  {
  const[signedup,setSignedup]=useState({})
  const[alert, setalert]=useState(false)
  const Navigate=useNavigate()

  const signup = async (e)=>{
   
    e.preventDefault()
    try {
      const response = await axios.post(`${BASE_URL}/signup`,{
      signedup},{withCredentials:true,credentials: 'include' })

    if(response.data.success){
      setalert(response.data.success)
      setTimeout(()=>{
        setalert(false)
        Navigate('/login')
      },500)
      
      console.log(response.data.message)
    }
    else{
      console.log(response.data.message)
    }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (

<>

   
    
    <Container style={{maxWidth:"30rem",marginTop:"8rem",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    {alert ? (
    <div style={{position:"absolute",marginTop:"-30rem"}} class="alert alert-success" role="alert">
  A simple success alert—check it out!
     </div>
      ):null}
    <h1 style={{color:"orange",fontFamily:"serif",fontSize:"25px"}}>Signup Now</h1>
    <Form style={{boxShadow:"0 0 10px orange",padding:"50px",borderRadius:"10px"}}>  
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control value={signedup.firstname} onChange={(e)=>setSignedup({...signedup,firstname:e.target.value})} type="text" placeholder="First name" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={signedup.lastname} onChange={(e)=>setSignedup({...signedup,lastname:e.target.value})} type="text" placeholder="Last name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control value={signedup.email} onChange={(e)=>setSignedup({...signedup,email:e.target.value})} placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' value={signedup.password} onChange={(e)=>setSignedup({...signedup,password:e.target.value})} placeholder="Create password" />
      </Form.Group>

      <Button onClick={signup} style={{backgroundColor:"orange",border:"none"}} type="submit">
       Signup
      </Button>
     <Link to="/login"><p style={{float:"right",color:"orange"}}>Already have an account?</p></Link> 
    </Form>
    </Container>
    </>
   
  );
}

export default Signup;