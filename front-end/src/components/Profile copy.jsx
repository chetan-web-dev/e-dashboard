import React, { useMemo, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap-v5"

const Profile = () => {
    /*Use memo*/
    const [count,SetCount] = useState(0);
    // const calculatedRes = expensiveCalcultation(count);
    const calculatedRes = useMemo(()=> expensiveCalcultation(count,[count]));
    const [todos,setTodos] = useState([]);
    console.log(calculatedRes);
    /*Use memo*/

    const handleProfile = () => {
        console.log('handle')
    }

    /*Use memo*/
    const increment = ()=>{
        SetCount((c)=>c+1);
    }
    const addToDo = ()=>{
        setTodos((t)=>[...t,"new task"]);
    }
    console.log(todos);
    /*Use memo*/

    return (
        <div className="profile">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                            {
                                todos.map((val,index)=>{
                                    return <p key={index}>{val}</p>
                                })
                            }
                            <button onClick={addToDo}>Add Todo</button>
                            Count:{count}
                            <button onClick={increment}>+</button>
                            <h2>Expensive calculation</h2>
                            {calculatedRes}

                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-center text-uppercase">
                                    Profile
                                </h2>
                                <div className="mb-3">
                                    <Form.Group className="mb-3" controlId="Name">
                                        <Form.Label className="text-center mandatory">Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Product Name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPrice">
                                        <Form.Label className="text-center mandatory">
                                            Name
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCompany">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    ></Form.Group>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Button variant="btn col-lg-3 me-2 btn-outline-primary" type="submit"
                                            onClick={handleProfile}>
                                            Update
                                        </Button>
                                    </Row>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
};

const expensiveCalcultation = (num)=>{
    for(let i=0; i<=1000; i++){
        num += 1;
    }
    return '<input type="file">';
}

export default Profile;