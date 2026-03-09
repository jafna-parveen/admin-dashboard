
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCategories,
  getSubCategories
} from '../../container/coursecontainer/slice';

import {
  Box,
  Button,
  Drawer,
  TextField,
  Select,
  MenuItem,
  Chip,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Card,
  CircularProgress
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";
const initialForm = {
  courseName: '',
  category: '',
  subcategory: '',
  level: '',
  mode: 'Online',
  fees: '',
  totalSeats: '',
  duration: '',
  skills: '',
  location: '',
  modules: [],
  description: '',
  status: 'Active',

  institution: '',
  images: []
};

const CoursesDashboard = () => {
  const dispatch = useDispatch();

  const { courses = [], categories = [], subcategories = [], loading, error } = useSelector(state => state.course || {});
  const userData = useSelector((state) => state?.login?.userData || {});
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    dispatch(getCourses(userData));
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch, userData]);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (formData.category) {
      setFilteredSubcategories(
        (subcategories || []).filter(
          (sub) => String(sub.categoryId?._id) === String(formData.category)
        )
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);


  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
const skillsArray = (() => {
  if (!selectedCourse?.skills) return [];

  try {
    if (Array.isArray(selectedCourse.skills)) {
      // Case: ["web","node"]
      if (typeof selectedCourse.skills[0] === "string" && !selectedCourse.skills[0].startsWith("[")) {
        return selectedCourse.skills;
      }

      // Case: ['["web","node"]']
      return JSON.parse(selectedCourse.skills[0]);
    }

    return [];
  } catch {
    return [];
  }
})();  
   


  const handleView = (course) => {
    console.log("course", course);
    setSelectedCourse(course);
    setViewOpen(true);
  };
  console.log("images", selectedCourse.images)

  const openAddDrawer = () => {
    setEditMode(false);
    setFormData({ ...initialForm, institution: userData?._id || '' });
    setOpen(true);
  };

  const openEditDrawer = (course) => {
    setEditMode(true);
    setFormData({
      _id: course._id, // important!
      courseName: course.courseName || '',
      category: course.category?._id || '',
      subcategory: course.subcategory?._id || '',
      level: course.level || '',
      mode: course.mode || 'Online',
      fees: course.fees || '',
      totalSeats: course.totalSeats || '',
      duration: course.duration || '',
skills: course.skills ? course.skills.join(", ") : "",
      location: course.location || '',
      modules: course.modules || [],
      description: course.description || '',
      status: course.status || 'Active',
      approval: course.approval || 'Pending',
      institution: course.institution?._id || userData?._id || '',
      images: course.images
    });
    setOpen(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModulesChange = (e) => {
    const count = Number(e.target.value);
    const modulesArray = Array.from({ length: count }, (_, index) => ({
      title: formData.modules[index]?.title || '',
      description: formData.modules[index]?.description || ''
    }));
    setFormData({ ...formData, modules: modulesArray });
  };

  const handleSubmit = () => {
    if (!formData.courseName || !formData.category || !formData.subcategory) {
      alert("Please fill all required fields!");
      return;
    }



    const form = new FormData();

    if (editMode) form.append("_id", formData._id);

    form.append("courseName", formData.courseName);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory);
    form.append("institution", formData.institution);
    form.append("totalSeats", formData.totalSeats);
    form.append("fees", formData.fees);
    form.append("mode", formData.mode);
    form.append("status", formData.status);
    form.append("approval", formData.approval);
    form.append("location", formData.location);
    form.append("description", formData.description);
    form.append("duration", formData.duration);
  let skillsArray = [];

if (typeof formData.skills === "string") {
  skillsArray = formData.skills.split(",").map((s) => s.trim());
} else if (Array.isArray(formData.skills)) {
  skillsArray = formData.skills;
}

form.append("skills", JSON.stringify(skillsArray));
form.append("modules", JSON.stringify(formData.modules));
    // important part
    formData.images.forEach((img) => {

      // new files
      if (img instanceof File) {
        form.append("images", img);
      }

      // existing images
      else {
        form.append("existingImages", img);
      }

    });

    if (editMode) {
      dispatch(updateCourse({ id: formData._id, form }));
    } else {
      dispatch(addCourse(form));
    }

    setOpen(false);
  };

  const toggleStatus = (course) => {
    dispatch(updateCourse({
      id: course._id,
      form: {
        status: course.status === 'Active' ? 'Inactive' : 'Active'
      }
    }));
  };


  return (

    <Box
      sx={{
        p: 4,
        backgroundColor: "rgb(230, 237, 248)",
        minHeight: "100vh"
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2} >
        <Typography variant="h2" fontWeight="bold">Courses</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDrawer}>
          Add New Course
        </Button>
      </Box>

      {/* LOADING */}
      {loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {error && <Typography color="error">{error}</Typography>}

      {/* TABLE */}
      <Card sx={{
        borderLeft: "5px solid #ea580c"
      }}>
        <Table >
          <TableHead >
            <TableRow >
              <TableCell sx={{ color: "#0f172a" }}>Course</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Category</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Subcategory</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Mode</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Fees</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Seats</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Status</TableCell>

              <TableCell sx={{ color: "#0f172a" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(courses || []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No courses found</TableCell>
              </TableRow>
            ) : (
              (courses || []).map(course => (
                <TableRow key={course._id}>
                  <TableCell >{course.courseName}</TableCell>
                  <TableCell>{course.category?.name}</TableCell>
                  <TableCell>{course.subcategory?.name}</TableCell>
                  <TableCell>{course.mode}</TableCell>
                  <TableCell>₹{course.fees}</TableCell>
                  <TableCell>{course.totalSeats}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDrawer(course)} ><EditIcon /></IconButton>
                    <IconButton onClick={() => handleView(course)} color="primary">
                      <VisibilityIcon />
                    </IconButton>               
                       <IconButton  sx={{ color: "#ea580c" }} onClick={() => dispatch(deleteCourse(course._id))}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* DRAWER FORM */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 600 } }}>
        <Box p={3}>
          <Typography variant="h6">{editMode ? 'Edit Course' : 'Add Course'}</Typography>

          

          {/* Course Name */}
          <TextField fullWidth label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} margin="normal" />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              {(categories || []).map(cat => (
                <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subcategory */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Sub Category</InputLabel>
            <Select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              {(filteredSubcategories || []).length === 0 ? (
                <MenuItem disabled>No Subcategories</MenuItem>
              ) : (
                (filteredSubcategories || []).map(sub => (
                  <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Level */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select name="level" value={formData.level} onChange={handleChange}>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          {/* Mode */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Mode</InputLabel>
            <Select name="mode" value={formData.mode} onChange={handleChange}>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
          </FormControl>

          {/* Fees and Seats */}
          <TextField fullWidth label="Fees ₹" name="fees" type="number" value={formData.fees} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Seats" name="totalSeats" type="number" value={formData.totalSeats} onChange={handleChange} margin="normal" />

          {/* Location Duration skills*/}
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Duration" name="duration" value={formData.duration} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Skills" name="skills" value={formData.skills} onChange={handleChange} margin="normal" />


          {/* Modules */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Modules</InputLabel>
            <Select value={formData.modules?.length || 0} onChange={handleModulesChange}>
              {[1, 2, 3, 4, 5].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
            </Select>
          </FormControl>

          {(formData.modules || []).map((module, index) => (
            <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Module {index + 1}</Typography>
              <TextField
                fullWidth
                label="Module Title"
                value={module.title}
                onChange={(e) => {
                  const updatedModules = [...formData.modules];
                  updatedModules[index].title = e.target.value;
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Module Description"
                multiline
                rows={3}
                value={module.description}
                onChange={(e) => {
                  const updatedModules = [...formData.modules];
                  updatedModules[index].description = e.target.value;
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
              />
            </Box>
          ))}

          {/* Description */}
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={3} />

          {/* Status */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          {/* Course Images */}
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Course Images</InputLabel>
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload Images
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFormData({ ...formData, images: [...formData.images, ...files] });
                }}
              />
            </Button>

            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {(formData.images || []).map((img, index) => {
                const src = typeof img === 'string' ? img : URL.createObjectURL(img);
                return (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid #ccc',

                    }}
                  >
                    <img src={src} alt={`Course ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, images: newImages });
                      }}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                        p: 0.5,
                      }}
                    >
                      ✕
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </FormControl>
          <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            {editMode ? 'Update Course' : 'Create Course'}
          </Button>
        </Box>
        
      </Drawer>


      <Drawer
        anchor="right"
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        PaperProps={{
          sx: {
            width: 520,
            backgroundColor: "#f9fafc"
          }
        }}
      >
        {selectedCourse && (
          <Box>

            {/* HEADER */}
            <Box
              sx={{
                p: 3,
                background: "#0f172a",
                color: "#fff"
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="#fff">
                {selectedCourse.courseName}
              </Typography>

              <Chip
                label={selectedCourse.status}
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor:
                    selectedCourse.status === "Active" ? "#2e7d32" : "#c62828",
                  color: "white"
                }}
              />
            </Box>

            <Box p={3}>

              {/* IMAGE */}
              {selectedCourse?.images?.length > 0 ? (
                <Box mb={3}>
                  <img
                    src={`http://localhost:7000/${selectedCourse.images[0]}`}
                    alt="course"
                    style={{
                      width: "50%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 12
                    }}
                  />
                </Box>
              ) : (
                <Typography>No image available</Typography>
              )}

              {/* COURSE INFO */}
              <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={2}>
                  Course Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Category</Typography>
                    <Typography fontWeight={500}>
                      {selectedCourse.category?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="text.secondary">Subcategory</Typography>
                    <Typography fontWeight={500}>
                      {selectedCourse.subcategory?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="text.secondary">Mode</Typography>
                    <Typography fontWeight={500}>{selectedCourse.mode}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="text.secondary">Duration</Typography>
                    <Typography fontWeight={500}>
                      {selectedCourse.duration}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="text.secondary">Fees</Typography>
                    <Typography fontWeight={500}>
                      ₹{selectedCourse.fees}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography color="text.secondary">Seats</Typography>
                    <Typography fontWeight={500}>
                      {selectedCourse.totalSeats}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography color="text.secondary">Location</Typography>
                    <Typography fontWeight={500}>
                      {selectedCourse.location}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* SKILLS */}
              {selectedCourse?.skills?.length > 0 && (
  <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
    <Typography fontWeight="bold" mb={2}>
      Skills Covered
    </Typography>

    <Box display="flex" flexWrap="wrap" gap={1}>
      {skillsArray.map((skill, index) => (
        <Chip key={index} label={skill} color="primary" variant="outlined" />
      ))}
    </Box>
  </Paper>
)}
              {/* DESCRIPTION */}
              <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography fontWeight="bold" mb={1}>
                  Description
                </Typography>

                <Typography color="text.secondary">
                  {selectedCourse.description}
                </Typography>
              </Paper>

              {/* MODULES */}
              {selectedCourse.modules?.length > 0 && (
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography fontWeight="bold" mb={2}>
                    Course Modules
                  </Typography>

                  {selectedCourse.modules.map((m, index) => (
                    <Box key={index} mb={2}>
                      <Typography fontWeight={600}>
                        {index + 1}. {m.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {m.description}
                      </Typography>

                      {index !== selectedCourse.modules.length - 1 && (
                        <Divider sx={{ mt: 1 }} />
                      )}
                    </Box>
                  ))}
                </Paper>
              )}

            </Box>
            
          </Box>
          
        )}
      </Drawer>
    </Box>

  );
};

export default CoursesDashboard;