import React from "react";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  BankOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";

const AnalyticsCard = () => {

  const institutions = useSelector((state) => state.institution?.list || []);
  const category = useSelector((state) => state.category?.list || []);
  const subcategory = useSelector((state) => state.subcategory?.list || []);
  const support = useSelector((state) => state.support?.list || []);

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
      {/* ================= CARDS ================= */}

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

        {/* SUB CATEGORY */}
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

      {/* ================= RECENT INSTITUTIONS ================= */}

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          Recently Added Institutions
        </Typography>

        <List>
          {recentInstitutions.map((inst) => (
            <ListItem key={inst._id} divider>
              <ListItemText
                primary={inst.name}
                secondary={`${inst.email} • ${inst.city || "No city"}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

    </>
  );
};

export default AnalyticsCard;