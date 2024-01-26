import React, { useEffect, useState } from 'react'
import NavbarC from './Component/Navbar'
import Main from './Component/Main'
import Alert from 'react-bootstrap/Alert';
import Cart from './Component/Cart'
import { Route, Routes, useNavigate} from 'react-router-dom';
import Success from './Component/success';
import Checkout from './Component/checkout';
import Signup from './Component/Signup';
import Login from './Component/Login';
import axios from "axios"
import { BASE_URL } from './Component/url';
import { useSelector ,useDispatch} from 'react-redux';
import { CartFetch } from './Redux/Action'

const App = () => {
  const Navigate = useNavigate();

  const[user, setUser]=useState("")
  const[success,setsuccess]=useState(false);
  const[warning,setwarning]=useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const[price, setPrice] = useState(0);
  const[empty,setEmpty] = useState(false);
  const{products}= useSelector((state)=>state.items)
  const[spin, setSpin]=useState(Array(products?.length || 0).fill(false))


  const{products2}= useSelector((state)=>state.items2)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(CartFetch())
  },[dispatch])

  
  useEffect(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/check`,{withCredentials:true,credentials: 'include' });
      if (response.data.success) {
        setLoggedIn(true); 
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
   
  },[]);
  
 const fetch = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/main`, {
      withCredentials: true,credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      setUser(response.data.username);
    } else {
      setUser("");
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(()=>{
  fetch()
},[])


 const add = async(item)=>{
  dispatch(CartFetch())
  const{id,Title,Price,Descrpition,img,amount}=item
  const index = products.findIndex((product) => product.id === item.id);
  try {
    setSpin((prevSpin) => {
      if (typeof index !== 'number' || isNaN(index)) {
        console.error('Invalid index:', index);
        return prevSpin;
      }
      if (!Array.isArray(prevSpin)) {
        console.error('prevSpin is not an array:', prevSpin);
        return prevSpin;
      }
      const newSpin = [...prevSpin];
      newSpin[index] = true;
      return newSpin;
    });

    const response = await axios.post(`${BASE_URL}/cart`, {
      id,
      Title,
      Price,
      Descrpition,
      img,
      amount}, 
      {
      withCredentials: true,credentials: 'include' 
  });
  if(response.data.success){
    dispatch(CartFetch())
      setsuccess(true)
      setTimeout(() => {
        setSpin((prevSpin) => {
          const newSpin = [...prevSpin];
          newSpin[index] = false;
          return newSpin;
        })
        setsuccess(false)
      }, 2000);
     
    }
    else{
      setwarning(true)
      setSpin((prevSpin) => prevSpin.map((e)=>false))
      setTimeout(() => {
      setwarning(false)
    }, 2000);
    }
  } catch (error) {
    alert("Session Expired Please Login")
  }
 }

const priceUpdate=()=>{
  let ans = 0
  if (!products2 || !Array.isArray(products2)) {
    return;
  }
 products2.map((item)=>(
    ans += item.amount*item.Price
  ))
  setPrice(ans.toFixed(2))
 
}

useEffect(()=>{
  priceUpdate()
},[products2])


  
  return (
   
    <>
{success &&
( <>
    {['success'].map((variant) => (
      <Alert style={{right:"0px",position:"fixed",zIndex:"100"}} key={variant} variant={variant}>
        Item added successfully
      </Alert>
    ))}
  </>) }

{warning &&
(<>
    {['danger'].map((variant) => (
      <Alert style={{right:"0px",position:"fixed",zIndex:"100"}} key={variant} variant={variant}>
        Item is already added to cart
      </Alert>
    ))}
  </>)}  
    <NavbarC user={user} add={add} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} size={products2 ? products2.length:0}/>
    <Routes>
    {!isLoggedIn ? (
      <>
      <Route path="/" element={<Signup/>} />
      <Route path='/login' element={<Login setLoggedIn={setLoggedIn} fetch={fetch} add={add}/>}></Route>
      </>
    ):(
      <>
      <Route path='/' element={<Main spin={spin} add={add}/>}></Route>
      <Route path='/cart' element={<Cart add={add} price={price} setPrice={setPrice} setEmpty={setEmpty} empty={empty}/>}></Route>
      <Route path='/checkout' element={<Checkout price={price}/>}></Route>
      
      <Route path='/success' element={<Success/>}></Route>
      </>
    )}
      
    </Routes>
    
    </>
  )
}

export default App