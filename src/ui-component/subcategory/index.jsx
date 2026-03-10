import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

import { getCategories } from "../../container/categorycontainer/slice";
import {
  getSubCategories,
  createSubCategory
} from "../../container/subcategorycontainer/slice";

const SubCategory = () => {

  const dispatch = useDispatch();

  const { categories } = useSelector(state => state.category);
  const { list, loading } = useSelector(state => state.subcategory);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {

    dispatch(getCategories());
    dispatch(getSubCategories());

  }, [dispatch]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !categoryId) {
      alert("Please fill all fields");
      return;
    }

    dispatch(createSubCategory({ name, categoryId }));

    setName("");
    setCategoryId("");

  };

  return (

    <Box p={4} sx={{ background: "#eef2ff", minHeight: "100vh" }}>

      {/* HEADER */}

      <Box display="flex" justifyContent="space-between" mb={3}>

        <Typography variant="h5" fontWeight="bold">
          Sub Categories
        </Typography>

      </Box>

      {/* FORM CARD */}

      <Card
        sx={{
          p:3,
          mb:3,
          borderRadius:3,
          borderLeft:"5px solid #ea580c",
          boxShadow:2
        }}
      >

        <form onSubmit={handleSubmit}>

          <Box display="flex" gap={2}>

            <TextField
              label="SubCategory Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />

            <Select
              value={categoryId}
              displayEmpty
              onChange={(e) => setCategoryId(e.target.value)}
              sx={{ minWidth:200 }}
            >

              <MenuItem value="">
                Select Category
              </MenuItem>

              {categories?.map(cat => (

                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>

              ))}

            </Select>

            <Button
              variant="contained"
              type="submit"
              sx={{
                background:"#0f172a",
                px:4,
                "&:hover":{
                  background:"#ea580c"
                }
              }}
            >

              {loading ? "Adding..." : "Add"}

            </Button>

          </Box>

        </form>

      </Card>

      {/* TABLE */}

      <Card
        sx={{
          borderRadius:3,
          borderLeft:"5px solid #ea580c",
          boxShadow:2
        }}
      >

        <Table>

          <TableHead sx={{ background:"#f8fafc" }}>

            <TableRow>

              <TableCell sx={{ fontWeight:600 }}>
                SubCategory
              </TableCell>

              <TableCell sx={{ fontWeight:600 }}>
                Category
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {list?.length > 0 ? (

              list.map(sub => (

                <TableRow
                  key={sub._id}
                  hover
                  sx={{
                    "&:hover":{
                      background:"#f1f5f9"
                    }
                  }}
                >

                  <TableCell>{sub.name}</TableCell>

                  <TableCell>
                    {sub.categoryId?.name || "N/A"}
                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell colSpan={2} align="center">
                  No SubCategories Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </Card>

    </Box>

  );

};

export default SubCategory;