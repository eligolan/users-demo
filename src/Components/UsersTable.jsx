import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import { DEFAULT_NUM_OF_USERS, BASE_API_URL } from "../utils/constants"
import ElementMaker from "./ElementMaker"
import { UsersStore } from "../store/UsersStore";
import { observer } from "mobx-react";

const UsersTable = () => {
    const [data, setData] = useState([]);
    const [selectValue, setSelectValue] = useState(DEFAULT_NUM_OF_USERS);
    const [changesUsers, setChangesUsers] = useState({});

    const initializeTableData = (numOfUsers) => {
        axios.get(`${BASE_API_URL}${numOfUsers}`)
            .then((response) => {
                UsersStore.setData(response.data.results.map((item, index) => {
                    return {
                        serialNumber: index + 1,
                        firstName: item.name.first,
                        lastName: item.name.last,
                        email: item.email,
                        phone: item.phone,
                        gender: item.gender,
                        pic: item.picture,
                        location: item.location,
                        age: item.dob.age,
                        showInputEle: false,
                    }
                }))
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        const data = window.localStorage.getItem('CHANGES_USERS_STATE');
        if (data !== null) setChangesUsers(JSON.parse(data));
        initializeTableData(DEFAULT_NUM_OF_USERS);
    }, [])

    const handleChange = (event) => {
        const numOfUsers = event.target.value;
        setSelectValue(numOfUsers);
        initializeTableData(numOfUsers);
    }

    const onDeleteClick = (serialNumber) => {
        setData(data.filter(item => item.serialNumber !== serialNumber));
        changesUsers[serialNumber] = { deleted: true }
        window.localStorage.setItem('CHANGES_USERS_STATE', JSON.stringify(changesUsers));
    };

    const onUpdateClick = (serialNumber, index) => {
        changesUsers[serialNumber] = { phone: UsersStore.data[index].phone }
        window.localStorage.setItem('CHANGES_USERS_STATE', JSON.stringify(changesUsers));
    };

    const handleDoubleClick = (index) => {
        UsersStore.data[index].showInputEle = true
    }

    const handlePhoneInputChange = (e, index) => {
        UsersStore.data[index].phone = e.target.value;
    }

    const handlePhoneInputBlur = (index) => {
        UsersStore.data[index].showInputEle = false;
    }

    return (
        <div>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectValue}
                onChange={handleChange}
                label="Age"
            >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
            <Paper className="container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {UsersStore.data.map(({ serialNumber, firstName, lastName, email, gender }, index) => {
                            if (changesUsers[serialNumber]?.deleted) {
                                return null;
                            }

                            if (changesUsers[serialNumber]?.phone) {
                                UsersStore.data[index].phone = changesUsers[serialNumber].phone;
                            }
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Link onClick={() => {
                                            UsersStore.setCurrentUser(UsersStore.data[index]);
                                        }} to='about'>{serialNumber}</Link>
                                    </TableCell>
                                    <TableCell>{firstName}</TableCell>
                                    <TableCell>{lastName}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell><ElementMaker
                                        value={UsersStore.data[index].phone}
                                        handleDoubleClick={() => handleDoubleClick(index)}
                                        handleChange={(e) => handlePhoneInputChange(e, index)}
                                        handleBlur={() => handlePhoneInputBlur(index)}
                                        showInputEle={UsersStore.data[index].showInputEle}
                                    /></TableCell>
                                    <TableCell>{gender}</TableCell>
                                    <TableCell><Button onClick={() => onUpdateClick(serialNumber, index)} variant="contained" color="primary">Update</Button></TableCell>
                                    <TableCell><Button onClick={() => onDeleteClick(serialNumber)} variant="contained" color="error">Delete</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div >
    )
};

export default observer(UsersTable);
