import React, { useState } from "react";
import { Row, Col, Card, Form, Button} from "react-bootstrap-v5"
import { useNavigate } from "react-router-dom";

const AddProduct =()=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);
    const [authError,setAuthError] = useState(false);
    const [authErrorMsg,setAuthErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleProduct = async ()=>{
        console.log(category);
        if(!name || !price || !category){
            setError(true)
            return false;
        }        
        const createdBy = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}product/add`,{
            method:'post',
            body:JSON.stringify({ name,price,category,company,createdBy }),
            headers:{
                'Content-Type':'application/json',
                authorization: JSON.parse(`"${localStorage.getItem('token')}"`)
            }
        })
        result = await result.json();
        if(result.authTokenError){
            setAuthError(true)
            setAuthErrorMsg(result.authTokenError)
            return false;
        }
        if(!result.error){
            navigate('/products');
        }else{
            setError(true)
            return false;
        }
    }
    
    return(
        <div className="signup">
            {
                (authError)?<p className="invalid-input">{authErrorMsg}</p>:''
            }     
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase">
                                        Add Product
                                    </h2>
                                    <div className="mb-3">
                                        {/* <Form> */}
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center mandatory">Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Product Name" 
                                                onChange={(e)=>{setName(e.target.value)}}
                                                />
                                                {error && !name && <span className="mt-2 invalid-input">Enter valid name</span>}                                                
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                                <Form.Label className="text-center mandatory">
                                                    Price
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Price" 
                                                onChange={(e)=>setPrice(e.target.value)} />
                                                {error && !price && <span className="mt-2 invalid-input">Enter valid price</span>}
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCategory">
                                                <Form.Label className="mandatory">Category</Form.Label>
                                                <Form.Select aria-label="Select Category" onChange={(e)=>setCategory(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="mobile">Mobile</option>
                                                    <option value="earphone">Ear Phone</option>
                                                </Form.Select>
                                                {error && !category && <span className="mt-2 invalid-input">Select valid category</span>}
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCompany">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Company"
                                                onChange={(e)=>{setCompany(e.target.value)}} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <Row className="d-flex justify-content-center align-items-center">
                                                <Button variant="btn col-lg-3 me-2 btn-outline-primary" type="submit"
                                                    onClick={handleProduct}>
                                                    Add Product
                                                </Button>
                                                <a className="btn col-lg-2 btn-outline-primary" href="/products" role="button">Cancel</a>
                                                {/* <Col md={5} lg={4} xs={12}>                                                    
                                                </Col>
                                                <Col md={6} lg={3} xs={12}>
                                                    <a className="btn btn-outline-primary" href="/products" role="button">Cancel</a>
                                                </Col> */}
                                            </Row>
                                        {/* </Form> */}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            {/* </Container> */}
        </div>   
    )
}

export default AddProduct;