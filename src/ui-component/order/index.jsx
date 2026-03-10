import React, { useEffect } from "react";
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
  IconButton
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import {
  getInstitutionOrders,
  updateOrder,
  
} from "container/subcategorycontainer/slice";

const statusColor = {
  paid: "success",
  pending: "warning",
  cancelled: "error"
};

const OrderManagement = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.login.userData);
  const { data: orders, loading } = useSelector((state) => state.order);

  const institutionId = userData?._id;

  useEffect(() => {
    if (institutionId) {
      dispatch(getInstitutionOrders(institutionId));
    }
  }, [dispatch, institutionId]);

  // Calculations
  const totalOrders = orders?.length || 0;
  const paidOrders = orders?.filter((o) => o.status === "paid").length || 0;
  const pendingOrders = orders?.filter((o) => o.status === "pending").length || 0;
  const totalRevenue =
    orders?.filter((o) => o.status === "paid").reduce((sum, o) => sum + Number(o.price || 0), 0) || 0;

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: <ShoppingCartIcon fontSize="large" color="primary" /> },
    { title: "Paid Orders", value: paidOrders, icon: <CheckCircleIcon fontSize="large" color="success" /> },
    { title: "Pending Orders", value: pendingOrders, icon: <PendingIcon fontSize="large" color="warning" /> },
    { title: "Total Revenue", value: `₹ ${totalRevenue}`, icon: <CurrencyRupeeIcon fontSize="large" color="secondary" /> }
  ];

 const handleUpdate = (orderId, currentStatus) => {
  // toggle pending <-> paid for demo
  const newStatus = currentStatus === "pending" ? "paid" : "pending";
  dispatch(updateOrder({ id: orderId, updateData: { status: newStatus } }));
};

  

  return (
    <Box p={3}>
      <Typography variant="h2" fontWeight="bold" mb={3}>
        Order Management
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} mb={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Box mr={2}>{item.icon}</Box>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="subtitle2" color="text.secondary">{item.title}</Typography>
                <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Orders Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Institution Orders
          </Typography>

          {loading ? (
            <Typography>Loading orders...</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Student</b></TableCell>
                    <TableCell><b>Course</b></TableCell>
                    <TableCell align="center"><b>Price</b></TableCell>
                    <TableCell align="center"><b>Status</b></TableCell>
                    <TableCell align="center"><b>Date</b></TableCell>
                    <TableCell align="center"><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders?.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.student?.studentname || "N/A"}</TableCell>
                        <TableCell>{order.course?.courseName || "N/A"}</TableCell>
                        <TableCell align="center">₹ {order.price}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={order.status}
                            color={statusColor[order.status] || "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton color="primary" onClick={() => handleUpdate(order._id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Orders Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderManagement;
