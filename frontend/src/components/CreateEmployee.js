import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config.json';
import './CreateEmployee.css'

const CreateEmployee = () => {
    const [empData, setEmpData] = useState({
        full_name: '',
        gender: '',
        date_of_birth: '',
        hire_date: '',
        salary: '',
        is_active: false,
        department_id: '',
        job_title: '',
        email_address: '',
        phone_number: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmpData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${config.serverPath}/addNewEmployee`, empData);
            setEmpData({
                full_name: '',
                gender: '',
                date_of_birth: '',
                hire_date: '',
                salary: '',
                is_active: false,
                department_id: '',
                job_title: '',
                email_address: '',
                phone_number: '',
            });
            alert('Employee created successfully');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <Form className="custom-form">
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={empData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={empData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email_address"
                            value={empData.email_address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone_number"
                            value={empData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mt-4' controlId="formIsActive">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Is Active"
                            checked={empData.is_active}
                            onChange={() =>
                                setEmpData((prevData) => ({
                                    ...prevData,
                                    is_active: !prevData.is_active,
                                }))
                            }
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="date_of_birth"
                            value={empData.date_of_birth}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formHireDate">
                        <Form.Label>Hire Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="hire_date"
                            value={empData.hire_date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formSalary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control
                            type="text"
                            name="salary"
                            value={empData.salary}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formJobTitle">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="job_title"
                            value={empData.job_title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDeptID">
                        <Form.Label>Department ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="department_id"
                            value={empData.department_id}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                </Col>
            </Row>

            <Button variant="primary" className='mt-4 mr-14' onClick={handleSubmit}>
                Submit
            </Button>
            <Link to="/"  >
                <Button variant="success" className='mt-4 ml-14' >
                    Got To Home
                </Button>
            </Link>
        </Form>
    );
};

export default CreateEmployee;
