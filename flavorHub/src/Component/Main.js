import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import CardC from './Card'
import {Container} from "react-bootstrap";
import { MenuFetch } from '../Redux/Action';


const Main = ({add,spin}) => {
  const{products}=useSelector((state)=>state.items)
  const dispatch=useDispatch()

  
  useEffect(()=>{
    dispatch(MenuFetch())
  },[dispatch])
  
  return (
    <Container style={{marginTop:"5rem",position:"relative",top:"10px"}}>
    {products?.map((item,index)=>{
        return (
            <CardC key={index} spin={spin[index]} add={add} item={item}/>
        )
    })}
    </Container>
 
  )
  }
export default Main