import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Support = () => {

  const [requests,setRequests] = useState([]);
  const [loading,setLoading] = useState(false);

  const [openReply,setOpenReply] = useState(false);
  const [openType,setOpenType] = useState(false);

  const [reply,setReply] = useState("");
  const [selected,setSelected] = useState(null);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");


  /* ================= LOAD SUPPORT REQUESTS ================= */

  const loadData = async () => {

    try{

      setLoading(true);

      const res = await axios.get(
        "http://localhost:7000/api/support-requests"
      );

      setRequests(res?.data?.data || []);

    }catch(err){

      console.log("Support fetch error:",err);

    }finally{

      setLoading(false);

    }

  };


  useEffect(()=>{

    loadData();

  },[]);



  /* ================= CREATE SUPPORT TYPE ================= */

  const createType = async ()=>{

    if(!name){
      alert("Support type name required");
      return;
    }

    try{

      await axios.post(
        "http://localhost:7000/api/support-type",
        {
          name,
          description
        }
      );

      alert("Support Type Added");

      setName("");
      setDescription("");
      setOpenType(false);

    }catch(err){

      console.log("Create type error:",err);

    }

  };



  /* ================= EDIT ================= */

  const handleEdit = (row)=>{

    setSelected(row);

    setReply(row.reply || "");

    setOpenReply(true);

  };



  /* ================= SEND REPLY ================= */

  const sendReply = async ()=>{

    if(!reply){
      alert("Reply cannot be empty");
      return;
    }

    try{

      await axios.post(
        `http://localhost:7000/api/support-reply/${selected._id}`,
        {reply}
      );

      alert("Reply Sent");

      setOpenReply(false);

      loadData();

    }catch(err){

      console.log("Reply error:",err);

    }

  };



  /* ================= DELETE ================= */

  const handleDelete = async(id)=>{

    if(!window.confirm("Delete this support request?")) return;

    try{

      await axios.delete(
        `http://localhost:7000/api/support/${id}`
      );

      alert("Support Request Deleted");

      loadData();

    }catch(err){

      console.log("Delete error:",err);

    }

  };



  return(

  <Box sx={{p:3}}>

    <Typography
      variant="h5"
      sx={{
        fontWeight:600,
        color:"#0f172a",
        mb:2
      }}
    >
      Support Requests
    </Typography>


    <Box display="flex" justifyContent="flex-end" mb={2}>

      <Button
        variant="contained"
        onClick={()=>setOpenType(true)}
        sx={{
          background:"#0f172a",
          "&:hover":{background:"#020617"}
        }}
      >
        + Add Support Type
      </Button>

    </Box>


    {/* ================= TABLE CARD ================= */}

    <Paper
      elevation={3}
      sx={{
        borderRadius:3,
        overflow:"hidden",
        borderLeft:"5px solid #ea580c"
      }}
    >

    {loading ? (

      <Box textAlign="center" p={4}>
        <CircularProgress sx={{color:"#ea580c"}}/>
      </Box>

    ) : (

    <Table>

      <TableHead>

        <TableRow sx={{background:"#f8fafc"}}>

          <TableCell><b>Institution</b></TableCell>
          <TableCell><b>Support Type</b></TableCell>
          <TableCell><b>Message</b></TableCell>
          <TableCell><b>Status</b></TableCell>
          <TableCell><b>Reply</b></TableCell>
          <TableCell><b>Actions</b></TableCell>

        </TableRow>

      </TableHead>

      <TableBody>

        {requests.length > 0 ? (

          requests.map((r)=>(

          <TableRow key={r._id} hover>

            <TableCell>
              {r.institution?.name || "-"}
            </TableCell>

            <TableCell>
              {r.supportType?.name || "-"}
            </TableCell>

            <TableCell>
              {r.message}
            </TableCell>

            <TableCell
              sx={{
                color:r.status==="replied" ? "green" : "#ea580c",
                fontWeight:600
              }}
            >
              {r.status}
            </TableCell>

            <TableCell>
              {r.reply || "-"}
            </TableCell>

            <TableCell>

              <IconButton
                onClick={()=>handleEdit(r)}
                sx={{color:"#0f172a"}}
              >
                <EditIcon/>
              </IconButton>

              <IconButton
                onClick={()=>handleDelete(r._id)}
                sx={{color:"#ea580c"}}
              >
                <DeleteIcon/>
              </IconButton>

            </TableCell>

          </TableRow>

          ))

        ) : (

          <TableRow>

            <TableCell
              colSpan={6}
              align="center"
            >
              No Support Requests Found
            </TableCell>

          </TableRow>

        )}

      </TableBody>

    </Table>

    )}

    </Paper>



    {/* ================= CREATE SUPPORT TYPE MODAL ================= */}

    <Dialog
      open={openType}
      onClose={()=>setOpenType(false)}
    >

      <Box sx={{p:3,width:400}}>

        <Typography variant="h6" mb={2}>
          Add Support Type
        </Typography>

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
          sx={{
            mt:2,
            background:"#0f172a",
            "&:hover":{background:"#020617"}
          }}
          onClick={createType}
        >
          Submit
        </Button>

      </Box>

    </Dialog>



    {/* ================= REPLY MODAL ================= */}

    <Dialog
      open={openReply}
      onClose={()=>setOpenReply(false)}
    >

      <Box sx={{p:3,width:420}}>

        <Typography variant="h6" mb={2}>
          Reply Support Request
        </Typography>

        <Typography>
          <b>Institution:</b> {selected?.institution?.name}
        </Typography>

        <Typography>
          <b>Type:</b> {selected?.supportType?.name}
        </Typography>

        <Typography mb={2}>
          <b>Message:</b> {selected?.message}
        </Typography>

        <TextField
          label="Reply"
          fullWidth
          multiline
          rows={4}
          value={reply}
          onChange={(e)=>setReply(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            mt:2,
            background:"#ea580c",
            "&:hover":{background:"#c2410c"}
          }}
          onClick={sendReply}
        >
          Send Reply
        </Button>

      </Box>

    </Dialog>

  </Box>

  );

};

export default Support;