import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Card, Button } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const params = useParams();
    const nvaigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    
    const handleProduct = async () => {
        console.log(category)
        if(!name || !price || !category){     
            setError(true);
            return false;      
        }

        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}product/update/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(`"${localStorage.getItem('token')}"`)
            }
        })
        result = await result.json();
        if (!result.error) {
            nvaigate('/products');
        } else {
            setError(true)
        }
    }

    const getProductDetails = async () => {
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}product/details/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(`"${localStorage.getItem('token')}"`)
            }
        })
        result = await result.json();
        
        if (!result.error) {
            let { name, price, company, category } = result.result;
            setName(name);
            setPrice(price)
            setCategory(category)
            setCompany(company)
        } else {
            nvaigate('/products');
        }
    }

    useEffect(() => {
        getProductDetails();
    },[]);
    
    return (
        <div className="updateProduct">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">

                                <h2 className="fw-bold mb-2 text-center text-uppercase">
                                    Update Product
                                </h2>
                                <div className="mb-3">
                                    {/* <Form> */}
                                    <Form.Group className="mb-3" controlId="Name">
                                        <Form.Label className="text-center mandatory">Name</Form.Label>
                                        <Form.Control type="text" value={name} placeholder="Enter Product Name"
                                            onChange={(e) => { setName(e.target.value) }}
                                        />
                                        {error && !name && <span className="mt-2 invalid-input">Enter valid name</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPrice">
                                        <Form.Label className="text-center mandatory">
                                            Price
                                        </Form.Label>
                                        <Form.Control type="text" value={price} placeholder="Enter Price"
                                            onChange={(e) => setPrice(e.target.value)} />
                                        {error && !price && <span className="mt-2 invalid-input">Enter valid price</span>}
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCategory">
                                        <Form.Label className="mandatory">Category</Form.Label>
                                        <Form.Select value={category || ''} aria-label="Select Category" onChange={(e) => setCategory(e.target.value)}>
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
                                        <Form.Control type="text" value={company} placeholder="Enter Company"
                                            onChange={(e) => { setCompany(e.target.value) }} />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    ></Form.Group>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Button variant="btn col-lg-3 me-2 btn-outline-primary" type="submit"
                                            onClick={handleProduct}>
                                            Update
                                        </Button>
                                        <a className="btn col-lg-2 me-2 btn-outline-primary" href="/products" role="button">Cancel</a>
                                        {/* <Col md={6} lg={3} xs={12}>                                            
                                        </Col>
                                        <Col md={6} lg={3} xs={12}>                                            
                                        </Col> */}
                                    </Row>
                                    {/* </Form> */}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default UpdateProduct;