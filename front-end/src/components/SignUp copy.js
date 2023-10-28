import React, { useState, useEffect } from "react";
import { Col, Button, Row, Card, Form } from 'react-bootstrap-v5';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }); 

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://e-dashboard.com:7000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(!result.error){
            navigate('/register');
        }  
        console.log(result.result);
        localStorage.setItem("user",JSON.stringify(result.result));
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
                                                <Form.Label className="text-center">Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name"
                                                    onChange={(e) => { setName(e.target.value) }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email"
                                                    onChange={(e) => { setEmail(e.target.value) }} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password"
                                                    onChange={(e) => { setPassword(e.target.value) }} />
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


/*import { Button } from 'react-bootstrap-v5';
import { Container } from 'react-bootstrap-v5';
class SignUp extends Component{
    render(){
        return(
            <Container className="mt-4">
                <div>
                    <h1>Bootstrap 5 with React</h1>
                    <Button variant="primary">Primary</Button>
                </div>
            </Container>
        )
    }
}
export default SignUp;*/