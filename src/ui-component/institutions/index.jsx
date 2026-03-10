import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  TextField,
  Chip,
  IconButton
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";

const InstiDashboard = () => {

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [institutions, setInstitutions] = useState([]);
  const [selectedInst, setSelectedInst] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: ""
  });

  /* ================= FETCH ================= */

  const fetchInstitutions = async () => {

    try {

      const res = await axios.get(
        "http://localhost:7000/api/allinsti"
      );

      setInstitutions(res.data);

    } catch (error) {

      console.log("Fetch error:", error);

    }

  };

  useEffect(() => {

    fetchInstitutions();

  }, []);

  /* ================= INPUT ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updated = {
      ...formData,
      [name]: value
    };

    if (name === "phone") {

      if (value.length >= 6) {
        updated.password = value.slice(-6);
      }

    }

    setFormData(updated);

  };

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editMode) {

        await axios.put(
          "http://localhost:7000/api/update",
          formData,
          { withCredentials: true }
        );

        alert("Institution updated successfully");

      } else {

        await axios.post(
          "http://localhost:7000/api/register",
          formData
        );

        alert("Institution added successfully");

      }

      fetchInstitutions();

      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        password: ""
      });

      setEditMode(false);
      setOpen(false);

    } catch (error) {

      console.log("Backend error:", error.response?.data);
      alert(error.response?.data || "Operation failed");

    }

  };

  /* ================= DELETE ================= */

  const deleteInstitution = async () => {

    if (!window.confirm("Delete this institution?")) return;

    try {

      await axios.delete(
        "http://localhost:7000/api/delete",
        { withCredentials: true }
      );

      alert("Institution deleted");

      fetchInstitutions();

    } catch (error) {

      console.log("Delete error:", error);

    }

  };

  /* ================= VIEW ================= */

  const viewInstitution = (inst) => {

    setSelectedInst(inst);
    setViewOpen(true);

  };

  /* ================= EDIT ================= */

  const editInstitution = (inst) => {

    setFormData({
      name: inst.name,
      email: inst.email,
      phone: inst.phone,
      city: inst.city,
      password: ""
    });

    setEditMode(true);
    setOpen(true);

  };

  return (

    <Box p={4} sx={{ background: "#eef2ff", minHeight: "100vh" }}>

      {/* HEADER */}

      <Box display="flex" justifyContent="space-between" mb={3}>

        <Typography variant="h5" fontWeight="bold">
          Institutions
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: "#0f172a",
            "&:hover": { background: "#ea580c" }
          }}
          onClick={() => {
            setEditMode(false);
            setOpen(true);
          }}
        >
          + Add Institution
        </Button>

      </Box>

      {/* TABLE */}

      <Card
        sx={{
          borderRadius: 3,
          borderLeft: "5px solid #ea580c",
          boxShadow: 2
        }}
      >

        <Table>

          <TableHead sx={{ background: "#f8fafc" }}>

            <TableRow>

              <TableCell sx={{ fontWeight: 600 }}>Institution</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {institutions.length > 0 ? (

              institutions.map((inst) => (

                <TableRow
                  key={inst._id}
                  hover
                  sx={{
                    "&:hover": { background: "#f1f5f9" }
                  }}
                >

                  <TableCell>{inst.name}</TableCell>
                  <TableCell>{inst.email}</TableCell>
                  <TableCell>{inst.phone || "-"}</TableCell>
                  <TableCell>{inst.city || "-"}</TableCell>

                  <TableCell>

                    <Chip
                      label={inst.isActive ? "Active" : "Inactive"}
                      size="small"
                      sx={{
                        background: inst.isActive
                          ? "#22c55e"
                          : "#f59e0b",
                        color: "white"
                      }}
                    />

                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      sx={{ color: "#0f172a" }}
                      onClick={() => viewInstitution(inst)}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      sx={{ color: "#6366f1" }}
                      onClick={() => editInstitution(inst)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      sx={{ color: "#ef4444" }}
                      onClick={() => deleteInstitution()}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell colSpan={6} align="center">
                  No Institutions Added
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </Card>

      {/* ADD / EDIT DIALOG */}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>

        <Box p={4}>

          <Typography variant="h6" mb={2}>
            {editMode ? "Update Institution" : "Add Institution"}
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField
              label="Institution Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password (Auto Generated)"
              name="password"
              value={formData.password}
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "#0f172a",
                "&:hover": { background: "#ea580c" }
              }}
            >
              {editMode ? "Update Institution" : "Save Institution"}
            </Button>

          </form>

        </Box>

      </Dialog>

      {/* VIEW DIALOG */}

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth>

        <Box p={4}>

          <Typography variant="h6" mb={2}>
            Institution Details
          </Typography>

          {selectedInst && (

            <Box>

              <Typography><b>Name:</b> {selectedInst.name}</Typography>
              <Typography><b>Email:</b> {selectedInst.email}</Typography>
              <Typography><b>Phone:</b> {selectedInst.phone}</Typography>
              <Typography><b>City:</b> {selectedInst.city}</Typography>

            </Box>

          )}

        </Box>

      </Dialog>

    </Box>

  );

};

export default InstiDashboard;