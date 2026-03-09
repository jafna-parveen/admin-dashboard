
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react'
import axios from "axios";
import {
  BookOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

const AnalyticsCard = () => {

  const courses = useSelector((state) => state.course?.courses || []);
const [students, setStudents] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:7000/api/institution-students", { withCredentials: true })
    .then((res) => setStudents(res.data))
    .catch((err) => console.log(err));
}, []);  const enquiry = useSelector((state) => state.enquiry?.list || []);
const seatmanagement = useSelector((state) => state.seatManagement?.seats || []);

  const cardStyle = {
    p: 3,
    borderRadius: 4,
    background: "#0f172a",
    borderLeft: "5px solid #ea580c",
    boxShadow: 3,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)"
    }
  };

  const iconStyle = {
    fontSize: 30,
    color: "#ea580c"
  };

  return (
    <Grid container spacing={3} mb={4} >

      {/* COURSES */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/courses" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={ "#fff"}>
                {courses.length}
              </Typography>
              <Typography>Courses</Typography>
            </div>
            <BookOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* STUDENTS */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/students" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={ "#fff"}>
                {students.length}
              </Typography>
              <Typography>Students</Typography>
            </div>
            <TeamOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* ENQUIRIES */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/enquiry" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={ "#fff"}>
                {enquiry.length}
              </Typography>
              <Typography>Enquiries</Typography>
            </div>
            <QuestionCircleOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* SEAT MANAGEMENT */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/seat-management" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={ "#fff"}>
                {seatmanagement.length}
              </Typography>
              <Typography>Seat Management</Typography>
            </div>
            <AppstoreOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

    </Grid>
  );
};

export default AnalyticsCard;