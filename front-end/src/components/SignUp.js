import React, { useState, useEffect } from "react";
import { Col, Button, Row, Card, Form } from 'react-bootstrap-v5';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error,setError] = useState(false);    
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }); 

    const collectData = async () => {
        if(!name || !email || !password){
            setError(true);
            return false;
        }
        console.log(name, email, password);
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}register`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result.auth){
            if(!result.response.error){
                navigate('/register');
            }  
            localStorage.setItem("user",JSON.stringify(result.response.result));
            localStorage.setItem('token',result.auth);
        }else{
            navigate('/register');
        }
    }
    return (
        <div className="signup">
            {/* <Container className="vh-100"> */}
                <Row className="d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase">
                                        Register
                                    </h2>
                                    <div className="mb-3">
                                        {/* <Form> */}
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center mandatory">Name</Form.Label>
                                                <Form.Control type="text" required placeholder="Enter Name"
                                                    onChange={(e) => { setName(e.target.value) }} />
                                                {error && !name && <span className="mt-2 invalid-input">Enter valid name</span>}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center mandatory">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" required={true} placeholder="Enter email"
                                                    onChange={(e) => { setEmail(e.target.value) }} />
                                                {error && !email && <span className="mt-2 invalid-input">Enter valid email</span>}
                                            </Form.Group>
                                            
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword">
                                                <Form.Label className="mandatory">Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password"
                                                    onChange={(e) => { setPassword(e.target.value) }} />
                                                {error && !password && <span className="mt-2 invalid-input">Enter valid password</span>}
                                            </Form.Group>
                                            
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="info" onClick={collectData} type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
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
};
export default SignUp;
