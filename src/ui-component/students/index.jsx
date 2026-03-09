import { useEffect, useState } from "react";
import axios from "axios";


import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  CircularProgress,
  TextField,
  Paper,
  MenuItem
} from "@mui/material";
import { Button, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

export default function Students() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = (value) => {
  if (value) setCourseTypeFilter(value);
  setAnchorEl(null);
};
  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const res = await axios.get(
          "http://localhost:7000/api/institution-students",
          { withCredentials: true }
        );

        setStudents(res.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };

    fetchStudents();

  }, []);

  const totalStudents = students.length;
  const degreeStudents = students.filter(
  (s) => s.courseId?.subcategory?.name === "Degree"
).length;

const diplomaStudents = students.filter(
  (s) => s.courseId?.subcategory?.name === "Diploma"
).length;
const [courseTypeFilter, setCourseTypeFilter] = useState("All");
  const filteredStudents = students
  .filter((s) =>
    s.studentId?.studentname?.toLowerCase().includes(search.toLowerCase())
  )
  .filter((s) => {
    if (courseTypeFilter === "Degree")
      return s.courseId?.subcategory?.name === "Degree";

    if (courseTypeFilter === "Diploma")
      return s.courseId?.subcategory?.name === "Diploma";

    return true;
  });

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }
 
  return (

    <Box sx={{ p: 4,  backgroundColor: "rgb(230, 237, 248)", minHeight: "100vh" }}>

      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Typography variant="h2" fontWeight="bold">
          Registered Students
        </Typography>

        {/* CUSTOM SEARCH */}
        

      </Stack>
       {/* FILTER */}
     <Stack direction="row" mb={3} spacing={2}>

  <Button
    variant="contained"
    startIcon={<FilterListIcon />}
    onClick={handleClick}
    sx={{
      color:'#0f172a',
      background: "#fff",
      borderRadius: "30px",
      textTransform: "none",
      px: 3,
      "&:hover": {
      background: "#fff",   // keeps same color on hover
      boxShadow: "none"     // optional: removes hover shadow
    }
    }}
  >
    {courseTypeFilter === "All" ? "All Courses" : courseTypeFilter}
  </Button>

  <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => handleClose()}
  PaperProps={{
    sx: {
      width: anchorEl?.clientWidth,
      mt: 1,
      borderRadius: 2,
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
    }
  }}
>
    <MenuItem onClick={() => handleClose("All")}>All Courses</MenuItem>
    <MenuItem onClick={() => handleClose("Degree")}>Degree</MenuItem>
    <MenuItem onClick={() => handleClose("Diploma")}>Diploma</MenuItem>
  </Menu>

  <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "30px",
            px: 2,
            py: 0.5,
            boxShadow: 2,
            width: 280
          }}
        >

          <SearchIcon sx={{ color: "#888", mr: 1 }} />

          <input
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "14px",
              background: "transparent"
            }}
          />

        </Box>

</Stack>


     {/* STAT CARDS */}
<Grid container spacing={3} mb={4}>

  <Grid item xs={12} md={4}>
    <Paper
      sx={{
         p: 3,
    borderRadius: 4,
    background:"#0f172a",
    borderLeft: "5px solid #ea580c",
    
    boxShadow: 3
      }}
    >
      <Typography variant="h4"sx={{ color: "#ffff", fontWeight: 700 }}>{totalStudents}</Typography>
      <Typography sx={{ color:"#ffff" }}>Total Students</Typography>
    </Paper>
  </Grid>

  <Grid item xs={12} md={4}>
    <Paper
      sx={{
         p: 3,
    borderRadius: 4,
   background:"#0f172a",
    borderLeft: "5px solid #ea580c",
    boxShadow: 3
      }}
    >
      <Typography variant="h4" sx={{ color: "#ffff", fontWeight: 700 }}>{degreeStudents}</Typography>
      <Typography sx={{ color: "#ffff" }}>Degree Students</Typography>
    </Paper>
  </Grid>

  <Grid item xs={12} md={4}>
    <Paper
      sx={{
         p: 3,
    borderRadius: 4,
  background:"#0f172a",
    borderLeft: "5px solid #ea580c",
    boxShadow: 3
      }}
    >
      <Typography variant="h4"sx={{ color: "#ffff", fontWeight: 700 }}>{diplomaStudents}</Typography>
      <Typography sx={{ color: "#ffff" }}>Diploma Students</Typography>
    </Paper>
  </Grid>

</Grid>

     
      


      {/* STUDENTS */}
      <Grid container spacing={3}>

        {filteredStudents.map((student) => (

          <Grid item xs={12} md={6} lg={4} key={student._id}>

            <Card
  sx={{
    borderRadius: 4,
    borderLeft: "6px solid #ea580c",
    overflow: "hidden",
    transition: "0.3s",
    boxShadow: 3,
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: 8
    }
  }}
>

              <CardContent>

                <Stack direction="row" spacing={2} alignItems="center" mb={2}>

                  <Avatar sx={{ bgcolor: "#0f172a" }}>
                    {student.studentId?.studentname?.charAt(0)}
                  </Avatar>

                  <Box>

                    <Typography fontWeight={600}>
                      <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      {student.studentId?.studentname}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      {student.studentId?.email}
                    </Typography>

                  </Box>

                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <SchoolIcon fontSize="small" />
                  <Typography variant="body2">
                    {student.courseId?.courseName}
                  </Typography>
                </Stack>
 <Stack direction="row" spacing={1} alignItems="center" mb={2}>
<Chip
  label={student.courseId?.subcategory?.name}
  color="primary"
  size="small"
/>
</Stack>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <PaymentIcon fontSize="small" />
                  
                  <Chip
                    label={student.paymentMethod}
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                <Chip
                  label={student.status}
                  color={
                    student.status === "Paid"
                      ? "success"
                      : "warning"
                  }
                  size="small"
                />

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}