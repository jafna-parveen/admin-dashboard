
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Button
} from "@mui/material";
import { userMe } from "container/LoginContainer/slice";
import { useState } from "react";
import ProfileModal from "../dashboard/ProfileModal"; // adjust path

export default function InstitutionProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.login.userData);
const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    dispatch(userMe());
  }, [dispatch]);

  if (!userData) return null;

//   const status = userData?.isProfileCompleted ? "Verified" : "Incomplete";

  const InfoItem = ({ label, value }) => (
    <Box mb={2}>
      <Typography variant="caption" sx={{ color: "#64748b" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || "N/A"}
      </Typography>
    </Box>
  );

  return (
    <Box p={4}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Institution Profile
        </Typography>

        <Button
  variant="contained"
  sx={{
    backgroundColor: "#0f172a",
    textTransform: "none",
    borderRadius: 2
  }}
  onClick={() => setOpenModal(true)}
>
  Edit Profile
</Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4
        }}
      >
        {/* Status */}
        {/* <Box mb={3}>
          <Chip
            label={status}
            color={status === "Verified" ? "success" : "warning"}
            sx={{ fontWeight: 600 }}
          />
        </Box> */}
        <Box textAlign="left" mb={3}>
  {userData?.profileImage ? (
    <img
      src={`http://localhost:7000/uploads/${userData.profileImage}`}
      alt="Profile"
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        objectFit: "cover",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    />
  ) : (
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: "0%",
        bgcolor: "#cbd5e1",
        display: "inline-block"
      }}
    />
  )}
</Box>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <InfoItem
              label="Institution Name"
              value={userData.institutionName}
            />
            <InfoItem
              label="Institution Type"
              value={userData.institutionType}
            />
            <InfoItem
              label="Year Established"
              value={userData.yearEstablished}
            />
            <InfoItem
              label="Registration Number"
              value={userData.registrationNumber}
            />
            <InfoItem
              label="Accreditation Authority"
              value={userData.accreditationAuthority}
            />
            <InfoItem label="GST Number" value={userData.gstNumber} />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <InfoItem label="Official Email" value={userData.officialEmail} />
            <InfoItem label="Official Phone" value={userData.officialPhone} />
            <InfoItem label="Website" value={userData.website} />
                      


            <InfoItem
              label="Address"
              value={`${userData.address || ""}, ${
                userData.city || ""
              }, ${userData.state || ""}, ${
                userData.country || ""
              } - ${userData.postalCode || ""}`}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Certificate Section */}
{userData?.certificate && userData.certificate.length > 0 && (
  <Box>
    <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
      Registration Certificates
    </Typography>

    <Grid container spacing={2}>
      {(Array.isArray(userData.certificate)
        ? userData.certificate
        : [userData.certificate]
      ).map((file, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          {file.endsWith(".pdf") ? (
            <iframe
              src={`http://localhost:7000/uploads/${file}`}
              width="100%"
              height="300px"
              style={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
              title={`Certificate ${idx + 1}`}
            />
          ) : (
            <Box textAlign="center">
              <img
                src={`http://localhost:7000/uploads/${file}`}
                alt={`Certificate ${idx + 1}`}
                style={{
                  maxWidth: "50%",
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              />
            </Box>
          )}
        </Grid>
      ))}
    </Grid>
  </Box>
)}
      </Paper>
     {openModal && (
  <ProfileModal
    key={userData?.id} 
    user={userData}
    mode="edit"
    onClose={() => setOpenModal(false)}
  />
)}
    </Box>
  );
}