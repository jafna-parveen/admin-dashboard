import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
MenuItem,
Switch,
IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
getCategories,
createCategory,
updateCategory,
deleteCategory,
toggleStatus
} from "../../container/categorycontainer/slice";


const AdminCategory = () => {

const dispatch = useDispatch();
const { categories } = useSelector(state => state.category);

const [open, setOpen] = useState(false);
const [editId, setEditId] = useState(null);

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState(true);
const [image, setImage] = useState(null);

useEffect(() => {
dispatch(getCategories());
}, [dispatch]);


const resetForm = () => {
setOpen(false);
setEditId(null);
setName("");
setDescription("");
setStatus(true);
setImage(null);
};


const handleSubmit = (e) => {

e.preventDefault();

const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("isActive", status);

if (image) {
formData.append("image", image);
}

if (editId) {

dispatch(updateCategory({
id: editId,
data: formData
}));

} else {

dispatch(createCategory(formData));

}

resetForm();

};


const handleEdit = (cat) => {

setOpen(true);

setEditId(cat._id);
setName(cat.name);
setDescription(cat.description || "");
setStatus(cat.isActive);

};


return (

<Box p={4} sx={{ background: "#eef2ff", minHeight: "100vh" }}>

{/* HEADER */}

<Box display="flex" justifyContent="space-between" mb={3}>

<Typography variant="h5" fontWeight="bold">
Course Categories
</Typography>

<Button
variant="contained"
sx={{
background: "#0f172a",
"&:hover": { background: "#ea580c" }
}}
onClick={() => setOpen(true)}
>
+ Add Category
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

<TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
<TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
<TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
<TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>

</TableRow>

</TableHead>

<TableBody>

{categories.length > 0 ? (

categories.map(cat => (

<TableRow
key={cat._id}
hover
sx={{
"&:hover": { background: "#f1f5f9" }
}}
>

<TableCell>{cat.name}</TableCell>

<TableCell>{cat.description}</TableCell>

<TableCell>

<Switch
checked={cat.isActive}
onChange={() => dispatch(toggleStatus(cat._id))}
/>

</TableCell>

<TableCell>

<IconButton
color="primary"
onClick={() => handleEdit(cat)}
>
<EditIcon />
</IconButton>

<IconButton
onClick={() => dispatch(deleteCategory(cat._id))}
sx={{ color: "#ea580c" }}
>
<DeleteIcon />
</IconButton>

</TableCell>

</TableRow>

))

) : (

<TableRow>
<TableCell colSpan={4} align="center">
No Categories Found
</TableCell>
</TableRow>

)}

</TableBody>

</Table>

</Card>


{/* ADD / EDIT DIALOG */}

<Dialog
open={open}
onClose={() => setOpen(false)}
maxWidth="sm"
fullWidth
>

<Box p={4}>

<Typography variant="h6" mb={2}>
{editId ? "Edit Category" : "Add Category"}
</Typography>

<form onSubmit={handleSubmit}>

<TextField
label="Category Name"
fullWidth
margin="normal"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>

<TextField
label="Description"
fullWidth
margin="normal"
multiline
rows={3}
value={description}
onChange={(e) => setDescription(e.target.value)}
/>

<TextField
select
label="Status"
fullWidth
margin="normal"
value={status}
onChange={(e) => setStatus(e.target.value)}
>

<MenuItem value={true}>Active</MenuItem>
<MenuItem value={false}>Inactive</MenuItem>

</TextField>

<Box mt={2}>
<input
type="file"
onChange={(e) => setImage(e.target.files[0])}
/>
</Box>

<Button
type="submit"
variant="contained"
fullWidth
sx={{
mt: 3,
background: "#0f172a",
"&:hover": { background: "#ea580c" }
}}
>
Save Category
</Button>

</form>

</Box>

</Dialog>

</Box>

);

};

export default AdminCategory;