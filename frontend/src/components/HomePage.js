import React, { useEffect, useState, } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { Link } from 'react-router-dom';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './HomePage.css';
import config from '../config.json'

const HomePage = () => {
    const [rowData, setRowData] = useState({ data: [] });
    const [isUpdated, setIsUpdated] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `${config.serverPath}/allEmployees`;
                const response = await axios.get(url);
                console.log(response.data);
                setRowData({ data: response.data });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const url = `${config.serverPath}/allEmployees`;
                const response = await axios.get(url);
                console.log(response.data);
                setRowData({ data: response.data });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        setIsUpdated(false)
    }, [isUpdated]);

    const handleDeleteEmployee = async (emp) => {
        try {
            const url = `${config.serverPath}/deleteEmployee/` + emp.employee_id;
            await axios.delete(url);
            alert("employee Deleted")
            setIsUpdated(true);
        } catch (error) {
            console.log(error);
        }
    }

    function convertTimestampToNormalFormat(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const normalFormat = `${year}-${month}-${day} At ${hours}:${minutes}:${seconds}`;

        return normalFormat;
    }

    const gridOptions = {
        columnDefs: [

            {
                width: 120,
                field: 'Edit',
                cellRenderer: function (params) {
                    return (

                        <Link className="ml-5" to={`/update/${params.data.employee_id}`} state={{ employee: params.data }} >
                            <Button variant="primary" size="sm">
                                Edit
                            </Button>
                        </Link>
                    );
                },
                resizable: true,
            },
            {
                field: "employee_id",
                width: 150,
                headerName: 'Employee ID',
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                field: "department_id",
                width: 150,
                headerName: 'Department ID',
                sortable: true,
                filter: true,
                resizable: true,
            },

            {
                field: "full_name",
                width: 150,
                headerName: 'Full Name',
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Email Address',
                field: "email_address",
                width: 200,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Gender',
                field: "gender",
                width: 100,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                field: "hire_date",
                width: 200,
                sortable: true,
                headerName: 'Hire Date',
                filter: true,
                resizable: true,
                cellRenderer: function (params) {
                    return convertTimestampToNormalFormat(params.data.hire_date)
                }
            },
            {
                field: "is_active",
                headerName: 'Is Active',
                width: 100,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                field: "job_title",
                headerName: 'Job Title',
                width: 200,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Phone Number',
                field: "phone_number",
                width: 200,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Salary',
                field: "salary",
                width: 200,
                sortable: true,
                filter: true,
                resizable: true,
            },
            {
                headerName: 'Delete Employee',
                field: "Delete Employee",
                width: 200,
                sortable: true,
                filter: true,
                resizable: true,
                cellRenderer: function (params) {
                    return (

                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteEmployee(params.data)}
                        >
                            <i className="icon-trash"></i>
                        </Button>
                    );
                },
            },

        ],
    };




    return (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <Row style={{ width: "80%" }}>
                <Col md={12} lg={12} style={{ marginBottom: 20 }}>

                    <Card>
                        <Card.Header>
                            <div style={{ display: 'flex' }}>
                                <div className="input-group rounded">
                                    <input type="search" onChange={(e) => setFilterText(e.target.value)} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    <span className="input-group-text border-0" id="search-addon">
                                        {/* <Button
                                            variant="danger"
                                            size="sm"

                                        >
                                            <i className="icon-search fas"></i>
                                        </Button> */}
                                    </span>
                                </div>

                                <Link className="ml-5" to="/create">
                                    <Button variant="primary" size="sm">
                                        Create Employee
                                    </Button>
                                </Link>

                            </div></Card.Header>
                        <Card.Body className={"ag-theme-alpine"} style={{ width: "auto", height: "60vh" }}>
                            <AgGridReact rowData={rowData.data} gridOptions={gridOptions} pagination={true} quickFilterText={filterText} paginationAutoPageSize={true} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
