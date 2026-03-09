import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  CircularProgress,
  Box,
  Rating,
  Paper,
  Typography
} from "@mui/material";

// Redux Action
import { getRating } from "../../container/RatingContainer/slice";

// Custom Table Components
import TableHead from "../../utils/TableHead";
import TableRows from "../../utils/TableRows";

export default function Feedback() {
  const dispatch = useDispatch();

  /* ===== REDUX STATE ===== */
  const { list, loading } = useSelector((state) => state.rating || {});

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    dispatch(getRating());
  }, [dispatch]);

  /* ===== FORMAT DATA ===== */
  const formattedData = useMemo(() => {
    return (list || []).map((item) => ({
      _id: item._id,
      Student: item.studentid?.email || "-",
      course: item.courseid?.courseName || "-",

      rating: (
        <Rating
          value={item.rating || 0}
          readOnly
          precision={0.5}
        />
      ),

      message: item.message || "-",
      createdOn: item.createdAt || ""
    }));
  }, [list]);

  /* ===== TABLE CONFIG ===== */

  const keys = [
    "Student",
    "course",
    "rating",
    "message",
    "createdOn"
  ];

  const config = {
    Student: { label: "Student", type: "text" },
    course: { label: "Course", type: "text" },
    rating: { label: "Rating", type: "custom" },
    message: { label: "Message", type: "text" },
    createdOn: { label: "Date", type: "date" }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(230, 237, 248)",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          padding: "25px",
          borderLeft: "6px solid #ff6a00"
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 600, marginBottom: "20px" }}
        >
          Student Feedback
        </Typography>

        <Table>
          <TableHead
            keys={keys}
            config={config}
            hasAction={false}
          />

          {loading ? (
            <Box sx={{ textAlign: "center", padding: "20px" }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableRows
              data={formattedData}
              keys={keys}
              config={config}
              currentPage={1}
              tableLimit={10}
              hasActionRow={false}
              slNo={true}
              msg="No Feedback Found"
            />
          )}
        </Table>
      </Paper>
    </Box>
  );
}