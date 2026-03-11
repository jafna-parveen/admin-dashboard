import React, {useState} from "react";
import axios from "axios";

import {
Button,
Dialog,
TextField
} from "@mui/material";

const SupportType = () => {

const [open,setOpen] = useState(false);
const [name,setName] = useState("");
const [description,setDescription] = useState("");

const submit = async ()=>{

await axios.post("http://localhost:7000/api/support-type",{
name,
description
});

alert("Support Type Added");

setName("");
setDescription("");
setOpen(false);

};

return(

<>

<Button
variant="contained"
onClick={()=>setOpen(true)}
>
+ Add Support Type
</Button>


<Dialog open={open} onClose={()=>setOpen(false)}>

<div style={{padding:20,width:400}}>

<h3>Add Support Type</h3>

<TextField
label="Support Type"
fullWidth
margin="normal"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<TextField
label="Description"
fullWidth
multiline
rows={3}
margin="normal"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<Button
variant="contained"
sx={{mt:2}}
onClick={submit}
>
Submit
</Button>

</div>

</Dialog>

</>

);

};

export default SupportType;