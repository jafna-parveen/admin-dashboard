import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip
} from "@mui/material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  BankOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";

import axios from "axios";

const AnalyticsCard = () => {

  const category = useSelector((state) => state.category?.list || []);
  const subcategory = useSelector((state) => state.subcategory?.list || []);
  const support = useSelector((state) => state.support?.list || []);

  const [institutions, setInstitutions] = useState([]);

  /* ================= FETCH INSTITUTIONS ================= */

  const fetchInstitutions = async () => {
    try {

      const res = await axios.get(
        "http://localhost:7000/api/allinsti"
      );

      setInstitutions(res.data);

    } catch (error) {

      console.log("Institution fetch error:", error);

    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  /* ================= RECENT INSTITUTIONS ================= */

  const recentInstitutions = [...institutions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
    <>

      {/* ================= DASHBOARD CARDS ================= */}

      <Grid container spacing={3} mb={4}>

        {/* INSTITUTIONS */}
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/institutions" style={{ textDecoration: "none" }}>
            <Paper sx={cardStyle}>
              <div>
                <Typography variant="h4" fontWeight={700}>
                  {institutions.length}
                </Typography>
                <Typography>Institutions</Typography>
              </div>
              <BankOutlined style={iconStyle} />
            </Paper>
          </Link>
        </Grid>

        {/* CATEGORY */}
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <Paper sx={cardStyle}>
              <div>
                <Typography variant="h4" fontWeight={700}>
                  {category.length}
                </Typography>
                <Typography>Category</Typography>
              </div>
              <AppstoreOutlined style={iconStyle} />
            </Paper>
          </Link>
        </Grid>

        {/* SUBCATEGORY */}
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/subcategory" style={{ textDecoration: "none" }}>
            <Paper sx={cardStyle}>
              <div>
                <Typography variant="h4" fontWeight={700}>
                  {subcategory.length}
                </Typography>
                <Typography>Sub Category</Typography>
              </div>
              <ApartmentOutlined style={iconStyle} />
            </Paper>
          </Link>
        </Grid>

        {/* SUPPORT */}
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/support" style={{ textDecoration: "none" }}>
            <Paper sx={cardStyle}>
              <div>
                <Typography variant="h4" fontWeight={700}>
                  {support.length}
                </Typography>
                <Typography>Support</Typography>
              </div>
              <CustomerServiceOutlined style={iconStyle} />
            </Paper>
          </Link>
        </Grid>

      </Grid>

      {/* ================= RECENT INSTITUTIONS TABLE ================= */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          borderLeft: "5px solid #ea580c",
          boxShadow: 2
        }}
      >

        <Typography variant="h6" mb={2}>
          Recently Added Institutions
        </Typography>

        <Table>

          <TableHead sx={{ background: "#f8fafc" }}>

            <TableRow>

              <TableCell sx={{ fontWeight: 600 }}>Institution</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {recentInstitutions.length > 0 ? (

              recentInstitutions.map((inst) => (

                <TableRow key={inst._id} hover>

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

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell colSpan={5} align="center">
                  No Institutions Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </Paper>

    </>
  );
};

export default AnalyticsCard;