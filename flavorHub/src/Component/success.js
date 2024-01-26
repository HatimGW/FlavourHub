import React from 'react'
import { Container } from 'react-bootstrap'

const Success = () => {
  return (
    <Container style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <Container style={{border:"1px solid green",marginTop:"10rem",display:"flex", justifyContent:"center"}}>
                <h2 style={{color:"green"}}>Payment Successfull</h2>
        </Container>
    </Container>
  )
}

export default Success