import React,{useEffect,useState} from 'react'
import Container from 'react-bootstrap/Container';
import img from "./favicon.png";
import Navbar from 'react-bootstrap/Navbar';
import "../CSS/card.css";
import { Badge,Nav } from 'react-bootstrap';
import {useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom";
import { BASE_URL } from './url';
import {CartFetch} from "../Redux/Action"

const NavbarC = ({user,size,setLoggedIn,isLoggedIn}) => {
const navigate = useNavigate()

const dispatch = useDispatch()

  const logout = async(e)=>{
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "GET",
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log("Logout successful");
        localStorage.setItem('isLoggedIn', 'false');
        dispatch(CartFetch())
        setLoggedIn(false)
        navigate('/login')
       
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

 
  return (
    <Navbar fixed='top' style={{maxHeight:"10rem",boxShadow:"0px 0px 4px orange",backgroundColor:"white"}}>
     <Container style={{position:"relative",padding:"0"}}>
     <Nav style={{display:"flex",alignItems:"center"}}>
    
     <Nav.Link as={Link} to="/" style={{color:'azure',fontFamily:"math",fontWeight:"bold"}} href="#home"><img alt='Logo' style={{marginTop:"0.2rem",position:"absolute",maxWidth:"1.5rem"}} src={img}></img><span style={{marginLeft:"1.5rem",fontSize:"20px",color:"orange"}}>FlavorHub</span></Nav.Link>
      {!isLoggedIn ? (
        <>
      <Nav.Link as={Link} style={{marginLeft:"2rem",color:"orange",fontFamily:"math",fontWeight:"bold"}} to="/" >Signup</Nav.Link>
      <Nav.Link as={Link} style={{marginLeft:"2rem",color:"orange",fontFamily:"math",fontWeight:"bold"}} to="/login" >Login</Nav.Link>
      </>
      ): (<Badge bg='none' style={{fontFamily:"Georgia, serif",color:"orange",backgroundColor:"transparent",position:"absolute",right:'37px'}}><i style={{paddingBottom:"3px"}} class="fa-solid fa-user"></i><br></br>{user && user.first ? user.first[0].toUpperCase()+user.first.slice(1) : ''} {user && user.last ? user.last[0].toUpperCase()+user.last.slice(1) : ''}</Badge>
     )}
      </Nav>
      {isLoggedIn && (
      <Nav.Link onClick={logout} as={Link} style={{position:"absolute",left:"153px",color:"orange",fontFamily:"math",fontWeight:"bold"}}><i class="fa-solid fa-right-from-bracket"></i></Nav.Link>
      )}
      <Link to="/cart"><span style={{position:"relative"}}>
      <i id='text' style={{color:"#F26E01",cursor:"Pointer",fontSize:"31px"}} className="fa-solid fa-cart-shopping"></i><Badge className='bg bg-transparent' style={{backgroundColor:"white",position:'absolute',right:"3px",top:"-12px"}}>{size}</Badge>
      </span></Link>
    </Container>
  </Navbar>
  )
}

export default NavbarC;