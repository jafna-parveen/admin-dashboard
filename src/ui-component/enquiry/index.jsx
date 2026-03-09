import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstituteEnquiry,
  updateEnquiry,
  deleteEnquiry
} from "../../container/enquirycontainer/slice";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Modal,
  Box,
  Button,
  TablePagination,
  Grid,
  Typography
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InstituteEnquiries() {

  const dispatch = useDispatch();

  const enquiries = useSelector(state => state.enquiry?.list || []);
  const loading = useSelector(state => state.enquiry?.loading);
  const error = useSelector(state => state.enquiry?.error);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getInstituteEnquiry());
  }, [dispatch]);

  const openModal = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading enquiries...</p>;
  if (error) return <p style={{ color: "red", padding: "20px" }}>{error}</p>;

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "rgb(230, 237, 248)",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          marginBottom: "25px",
          color: "#0f172a",
          fontWeight: "600"
        }}
      >
        Institute Enquiries
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          borderLeft: "6px solid #ea580c"
        }}
      >

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Student</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Course</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {enquiries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {

              const studentName =
                item?.studentId?.studentname || item?.name || "N/A";

              const studentEmail =
                item?.studentId?.email || item?.email || "N/A";

              const studentPhone =
                item?.studentId?.phone || item?.phone || "N/A";

              const courseName =
  item?.courseId?.courseName ||
  item?.courseId?.name ||
  item?.courseName ||
  item?.course ||
  "N/A";

              return (
                <TableRow key={item._id}>

                  <TableCell>{studentName}</TableCell>
                  <TableCell>{studentEmail}</TableCell>
                  <TableCell>{studentPhone}</TableCell>
                  <TableCell>{courseName}</TableCell>

                  <TableCell>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        backgroundColor:
                          item.status === "Approved"
                            ? "#d4edda"
                            : item.status === "Rejected"
                            ? "#f8d7da"
                            : "#fff3cd"
                      }}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  <TableCell>

                    <IconButton
                      onClick={() => openModal(item)}
                      style={{ color: "#0f172a" }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => dispatch(deleteEnquiry(item._id))}
                      style={{ color: "#ea580c" }}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={enquiries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />

      </div>

      {/* ================= VIEW MODAL ================= */}

      <Modal open={open} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "500px"
          }}
        >

          {selected && (
            <>
              <Typography variant="h3" mb={3}>
                Enquiry Details
              </Typography>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <b>Student</b>
                  <Typography>
                    {selected?.studentId?.studentname || selected?.name}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <b>Email</b>
                  <Typography>
                    {selected?.studentId?.email || selected?.email}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <b>Phone</b>
                  <Typography>
                    {selected?.studentId?.phone || selected?.phone}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <b>Course</b>
                  <Typography>
                    {selected?.courseId?.courseName}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <b>Qualification</b>
                  <Typography>
                    {selected?.qualification}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <b>Status</b>
                  <Typography>
                    {selected?.status}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <b>Description</b>
                  <Typography>
                    {selected?.description}
                  </Typography>
                </Grid>

              </Grid>

              {selected.status === "Pending" && (
                <div style={{ marginTop: "25px" }}>

                  <Button
                    variant="contained"
                    style={{
                      marginRight: "10px",
                      background: "#040336"
                    }}
                    onClick={() => {
                      dispatch(updateEnquiry({
                        id: selected._id,
                        status: "Contacted"
                      }));
                      closeModal();
                    }}
                  >
                    Contact
                  </Button>

                  <Button
                    variant="contained"
                    style={{ background: "#ea580c" }}
                    onClick={() => {
                      dispatch(updateEnquiry({
                        id: selected._id,
                        status: "Resolved"
                      }));
                      closeModal();
                    }}
                  >
                    Resolve
                  </Button>

                </div>
              )}

              <Button
                onClick={closeModal}
                style={{ marginTop: "20px" }}
              >
                Close
              </Button>

            </>
          )}

        </Box>
      </Modal>

    </div>
  );
}