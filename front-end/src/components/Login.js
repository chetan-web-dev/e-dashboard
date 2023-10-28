import React,{ useEffect, useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [error,setError] = useState(false);    
    const navigate = useNavigate();
    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[]);

    const handleLogin = async ()=>{
        if(!email || !password){
            setError(true)
            return false;
        }
        let result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}login`,{
            method:'post',
            body:JSON.stringify({email:email,password:password}),
            headers:{
                'Content-type':'application/json'
            }
        })
        result = await result.json();
        console.log(result.response.error)
        if(result.auth){
            if(!result.response.error){
                localStorage.setItem('user',JSON.stringify(result.response.result));
                localStorage.setItem('token',result.auth);
                navigate('/');
            }else{
                alert('Invalid credentials');
            }
        }else{
            alert('Invalid credentials');
        }        
    };

    return (
        <div className="login">
            {/* <Container> */}
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-center text-uppercase">
                                    Login
                                </h2>
                                {/* <Form> */}
                                <Form.Group className="mb-3" controlId="Email">
                                    <Form.Label className="mandatory">Email</Form.Label>
                                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
                                    {error && !email && <span className="mt-2 invalid-input">Enter valid email</span>}
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="Password">
                                    <Form.Label className="mandatory">Password</Form.Label>
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                                    {error && !password && <span className="mt-2 invalid-input">Enter password</span>}
                                </Form.Group>
                                
                                <div className="d-grid">
                                    <Button variant="info" type="submit" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </div>
                                {/* </Form> */}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            {/* </Container> */}
        </div>
    )
}

export default Login;