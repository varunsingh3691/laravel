import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import config from '../config.json';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
    const { id } = useParams();
    let location = useLocation();
    const [empData, setEmpData] = useState(location.state.employee);

    useEffect(() => {

        setEmpData(location.state.employee);
    }, [location.state.employee]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigation = useNavigate()
    function convertTimestampToNormalFormat(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const normalFormat = `${month}-${day}-${year} At ${hours}:${minutes}:${seconds}`;

        return normalFormat;
    }

    const handleSubmit = async () => {
        try {
            const { ...updatedData } = empData;

            const url = `${config.serverPath}/updateEmployee/${id}`; // Using employee ID from route path
            console.log(url, updatedData);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log('Data updated successfully');
                navigation('/');
                location.state.sendUpdate(true);
                // props.closeModel();
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="edit-employee-container">
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEmployeeId">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control type="text" value={empData.employee_id} disabled />
                        </Form.Group>

                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="full_name"
                                value={empData.full_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={empData.gender}
                                onChange={handleChange}
                            >
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
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={empData.phone_number}
                                onChange={handleChange}
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
                            />
                        </Form.Group>

                        <Form.Group controlId="formHireDate">
                            <Form.Label>Hire Date</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name="hire_date"
                                value={convertTimestampToNormalFormat(empData.hire_date)}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formSalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="text"
                                name="salary"
                                value={empData.salary}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formJobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="job_title"
                                value={empData.job_title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDeptID">
                            <Form.Label>Department ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="department_id"
                                value={empData.department_id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group className='mt-4' controlId="formIsActive">
                        <Form.Label>IsActive</Form.Label>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label=""
                            checked={empData.is_active}
                            onChange={() =>
                                setEmpData((prevData) => ({
                                    ...prevData,
                                    is_active: !prevData.is_active,
                                }))
                            }
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" className='mt-4' onClick={handleSubmit}>
                    Submit
                </Button>
                <Link to="/"  >
                    <Button variant="success" className='mt-4 ml-14' >
                        Got To Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
};

export default EditEmployee;
