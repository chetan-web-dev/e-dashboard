import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap-v5"

const Profile = () => {

    const handleProfile = () => {
        console.log('handle')
    }

    return (
        <div className="profile">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="px-4">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-center text-uppercase">
                                    Profile
                                </h2>
                                <div className="mb-3">
                                    <Form.Group className="mb-3" controlId="Name">
                                        <Form.Label className="text-center mandatory">Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCompany">
                                        <Form.Label className="mandatory">Email</Form.Label>
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

export default Profile;