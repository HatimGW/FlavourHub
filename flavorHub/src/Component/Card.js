import React from 'react'
import Card from 'react-bootstrap/Card';
import {Row} from "react-bootstrap";
import Img from "./icons8-veg-48.png"
import "../CSS/card.css"
import Spinner from 'react-bootstrap/Spinner';

const CardC = ({item,add,spin}) => {
  const {id,Title,Price,Descrpition,img} = item
  
  return (
      <Row className='row mt-4'>
      <Card style={{overflow:"hidden",height:"200px",padding:'10px'}} className="d-flex flex-row-reverse align-items-center">
        <Card.Img style={{borderRadius:"20px",maxHeight:"115px"}} variant="right" src={`/images/${img}`} />
        {!spin ?(
        <button onClick={()=>add(item)} id='btn' style={{maxWidth:"9rem",border:"1px solid green",borderRadius:"10px",position:"absolute",top:"160px",right:"45px"}}>Add to Cart</button>
        ):(
          <button id='btn2' style={{maxWidth:"9rem",border:"1px solid green",borderRadius:"10px",position:"absolute",top:"157px",right:"72px"}}>
          <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
          </Spinner>
          </button>
        )
        }
      <Card.Body style={{maxHeight:"220px"}}>
      <Card.Img style={{maxWidth:"1rem"}} variant='top' src={Img}/>
      <Card.Title>{Title}</Card.Title>
        <Card.Text>$ {Price}</Card.Text>
        <Card.Text>{Descrpition}</Card.Text>
      </Card.Body>
    </Card>
   </Row>
)
     }
   
  

export default CardC