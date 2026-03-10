import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../container/institutecontainer/slice";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CircularProgress
} from "@mui/material";

import EventSeatIcon from "@mui/icons-material/EventSeat";

/* THEME COLORS */
const colors = {
  primary: "#ea580c",
  dark: "#0f172a",
  white: "#ffffff",
  light: "#f1f5f9"
};

const SeatManagement = () => {

  const dispatch = useDispatch();

  const { courses = [], loading } = useSelector(
    (state) => state.course || {}
  );

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const seatData = useMemo(() => {

    let totalSeats = 0;
    let filledSeats = 0;

    const courseSeats = courses.map((course) => {

      const total = Number(course.totalSeats) || 0;

      const filled = course.enrolledStudents
        ? course.enrolledStudents.length
        : 0;

      const vacant = total - filled;

      totalSeats += total;
      filledSeats += filled;

      let status = "Available";
      if (vacant <= 0) status = "Full";
      else if (vacant <= 5) status = "Limited";

      return {
        name: course.courseName,
        total,
        filled,
        vacant,
        status
      };

    });

    return {
      totalSeats,
      filledSeats,
      vacantSeats: totalSeats - filledSeats,
      courseSeats
    };

  }, [courses]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  return (
    <Box p={4} bgcolor={colors.light} minHeight="100vh">

      <Typography
        variant="h2"
        fontWeight="bold"
        mb={4}
        color={colors.dark}
      >
        Seat Management
      </Typography>

      {/* ===== TOP STATS ===== */}

      <Grid container spacing={3} mb={4}>

        {/* TOTAL */}

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: colors.dark,
              borderLeft: `5px solid ${colors.primary}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <EventSeatIcon sx={{ mr: 2, color: colors.primary}} />

              <Box>
                <Typography variant="body2" sx={{ color: colors.white }}>
                  Total Seats
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.white }}
                >
                  {seatData.totalSeats}
                </Typography>

              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* FILLED */}

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: colors.dark,
              borderLeft: `5px solid ${colors.primary}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <EventSeatIcon sx={{ mr: 2, color: colors.primary }} />

              <Box>
                <Typography variant="body2" sx={{ color: colors.white }}>
                  Filled Seats
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.white }}
                >
                  {seatData.filledSeats}
                </Typography>

              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* VACANT */}

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: colors.dark,
              borderLeft: `5px solid ${colors.primary}`,
              borderRadius: 3
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <EventSeatIcon sx={{ mr: 2, color: colors.primary }} />

              <Box>
                <Typography variant="body2" sx={{ color: colors.white }}>
                  Vacant Seats
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: colors.white }}
                >
                  {seatData.vacantSeats}
                </Typography>

              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ===== COURSE TABLE ===== */}

      <Card
        sx={{
          borderRadius: 3,
          borderLeft: `6px solid ${colors.primary}`
        }}
      >

        <CardContent>

          <Typography
            variant="h3"
            fontWeight="bold"
            mb={3}
            color={colors.dark}
          >
            Course-wise Seat Allocation
          </Typography>

          <TableContainer component={Paper} elevation={0}>

            <Table>

              {/* HEADER */}

              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>

                  <TableCell><b>Course</b></TableCell>
                  <TableCell align="center"><b>Total</b></TableCell>
                  <TableCell align="center"><b>Filled</b></TableCell>
                  <TableCell align="center"><b>Vacant</b></TableCell>
                  <TableCell align="center"><b>Status</b></TableCell>

                </TableRow>
              </TableHead>

              {/* BODY */}

              <TableBody>

                {seatData.courseSeats.map((course, index) => (

                  <TableRow key={index}>

                    <TableCell>{course.name}</TableCell>

                    <TableCell align="center">
                      {course.total}
                    </TableCell>

                    <TableCell align="center">
                      {course.filled}
                    </TableCell>

                    <TableCell align="center">
                      {course.vacant}
                    </TableCell>

                    <TableCell align="center">

                      <Chip
                        label={course.status}
                        sx={{
                          backgroundColor: colors.dark,
                          color: colors.white,
                          fontWeight: "bold"
                        }}
                        size="small"
                      />

                    </TableCell>

                  </TableRow>

                ))}

                {seatData.courseSeats.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No courses found
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>

            </Table>

          </TableContainer>

        </CardContent>

      </Card>

    </Box>
  );
};

export default SeatManagement;