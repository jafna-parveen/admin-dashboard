
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
  MenuItem,
  Paper,
  IconButton
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfile, userMe } from "../../container/LoginContainer/slice";
import CloseIcon from "@mui/icons-material/Close";

const boxStyle = {
  position: "relative",
  display: "inline-block",
  border: "1px solid #e2e8f0",
  borderRadius: 2,
  p: 1,
  bgcolor: "#f9f9f9"
};

const closeBtnStyle = {
  position: "absolute",
  top: -8,
  right: -8,
  bgcolor: "#0f172a",
  color: "#fff",
  "&:hover": { bgcolor: "#0f172a" },
  width: 24,
  height: 24
};

const ProfileModal = ({ user = {}, mode = "create", onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    institutionName: "",
    institutionType: "",
    yearEstablished: "",
    registrationNumber: "",
    accreditationAuthority: "",
    gstNumber: "",
    officialEmail: "",
    officialPhone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    profileImage: null,             // current or new profile image
    removedProfileImage: false,     // mark deletion
    certificate: [],                // newly uploaded certificates
    existingCertificates: [],       // existing certificates as strings
    removedCertificates: []         // marked for deletion
  });

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setForm({
      institutionName: user?.institutionName || "",
      institutionType: user?.institutionType || "",
      yearEstablished: user?.yearEstablished || "",
      registrationNumber: user?.registrationNumber || "",
      accreditationAuthority: user?.accreditationAuthority || "",
      gstNumber: user?.gstNumber || "",
      officialEmail: user?.officialEmail || "",
      officialPhone: user?.officialPhone || "",
      website: user?.website || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
      postalCode: user?.postalCode || "",
      profileImage: user?.profileImage || null,
      removedProfileImage: false,
      certificate: [],
      existingCertificates: user?.certificate || [],
      removedCertificates: []
    });

    setInitialData({
      ...user,
      certificate: [],
      removedCertificates: [],
      removedProfileImage: false
    });
  }, [user]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0], removedProfileImage: false });
  };

  const handleCertificatesChange = (e) => {
    setForm({ ...form, certificate: [...form.certificate, ...Array.from(e.target.files)] });
  };

  const isChanged = JSON.stringify(form) !== JSON.stringify(initialData);

  const isValid =
    mode === "edit"
      ? isChanged
      : Object.entries(form).every(([key, val]) =>
          ["certificate", "existingCertificates", "removedCertificates", "profileImage", "removedProfileImage"].includes(key)
            ? true
            : val.trim() !== ""
        );

  const handleSave = () => {
    const formData = new FormData();

    // Append all fields
    Object.entries(form).forEach(([key, val]) => {
      if (key === "certificate") {
        val.forEach((file) => formData.append("certificate", file));
      } else if (key === "removedCertificates") {
        val.forEach((file) => formData.append("removedCertificates", file));
      } else if (key === "profileImage") {
        if (val && typeof val !== "string") formData.append("profileImage", val);
      } else if (key === "removedProfileImage") {
        if (val) formData.append("removedProfileImage", true);
      } else if (!["existingCertificates"].includes(key)) {
        formData.append(key, val);
      }
    });

    dispatch(updateProfile(formData)).then(() => {
      dispatch(userMe());
      onClose();
    });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: "85vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Paper
          elevation={5}
          sx={{
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden"
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 3,
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fafafa"
            }}
          >
            <Typography variant="h5" fontWeight={600} sx={{ color: "#0f172a" }}>
              {mode === "edit" ? "Edit Institution Profile" : "Complete Institution Profile"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* SCROLLABLE CONTENT */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 4, color: "#0f172a" }}>
            {/* PROFILE IMAGE */}
            <Box sx={{ textAlign: "center", mb: 3, position: "relative" }}>
              {form.profileImage && (
                <>
                  <Box
                    component="img"
                    src={
                      typeof form.profileImage === "string"
                        ? `http://localhost:7000/uploads/${form.profileImage}`
                        : URL.createObjectURL(form.profileImage)
                    }
                    alt="Profile"
                    sx={{ width: 120, height: 120, borderRadius: "50%", mb: 1, objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() =>
                      setForm({
                        ...form,
                        profileImage: null,
                        removedProfileImage: typeof form.profileImage === "string"
                      })
                    }
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: "calc(50% - 60px)",
                      bgcolor: "#0f172a",
                      color: "#fff",
                      "&:hover": { bgcolor: "#0f172a" }
                    }}
                  >
                    ×
                  </IconButton>
                </>
              )}
              <Button variant="outlined" component="label" sx={{ color: "#0f172a", borderColor: "#0f172a" }}>
                {form.profileImage ? "Change Profile Image" : "Upload Profile Image"}
                <input type="file" hidden accept="image/*" onChange={handleProfileImageChange} />
              </Button>
            </Box>

            {/* Institution Details */}
            <Typography variant="h6" sx={{ color: "#0f172a" }}>Institution Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Institution Name" value={form.institutionName} onChange={handleChange("institutionName")} required={mode === "create"} />
              </Grid>
              <Grid item xs={6}>
                <TextField select fullWidth label="Institution Type" value={form.institutionType} onChange={handleChange("institutionType")} required={mode === "create"}>
                  <MenuItem value="University">University</MenuItem>
                  <MenuItem value="College">College</MenuItem>
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Training Institute">Training Institute</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}><TextField fullWidth label="Year Established" value={form.yearEstablished} onChange={handleChange("yearEstablished")} required={mode === "create"} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Registration Number" value={form.registrationNumber} onChange={handleChange("registrationNumber")} required={mode === "create"} /></Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Contact */}
            <Typography variant="h6" sx={{ color: "#0f172a" }}>Contact Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField fullWidth label="Official Email" value={form.officialEmail} onChange={handleChange("officialEmail")} required={mode === "create"} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Official Phone" value={form.officialPhone} onChange={handleChange("officialPhone")} required={mode === "create"} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Website" value={form.website} onChange={handleChange("website")} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Accreditation Authority" value={form.accreditationAuthority} onChange={handleChange("accreditationAuthority")} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="GstNumber" value={form.gstNumber} onChange={handleChange("gstNumber")} /></Grid>


            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Address */}
            <Typography variant="h6" sx={{ color: "#0f172a" }}>Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Address" value={form.address} onChange={handleChange("address")} required={mode === "create"} /></Grid>
              <Grid item xs={4}><TextField fullWidth label="City" value={form.city} onChange={handleChange("city")} required={mode === "create"} /></Grid>
              <Grid item xs={4}><TextField fullWidth label="State" value={form.state} onChange={handleChange("state")} required={mode === "create"} /></Grid>
              <Grid item xs={4}><TextField fullWidth label="Postal Code" value={form.postalCode} onChange={handleChange("postalCode")} required={mode === "create"} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Country" value={form.country} onChange={handleChange("country")} required={mode === "create"} /></Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Certificates */}
            <Typography variant="h6" sx={{ color: "#0f172a", mt: 3 }}>Registration Certificates</Typography>
            <Button variant="outlined" component="label" fullWidth sx={{ mt: 1, color: "#0f172a", borderColor: "#0f172a" }}>
              Upload Certificates
              <input type="file" hidden multiple onChange={handleCertificatesChange} />
            </Button>

            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {/* Existing certificates */}
              {form.existingCertificates?.map((file, idx) => (
                <Box key={file + idx} sx={boxStyle}>
                  <img src={`http://localhost:7000/uploads/${file}`} alt={file} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
                  <IconButton
                    size="small"
                    sx={closeBtnStyle}
                    onClick={() => setForm({
                      ...form,
                      existingCertificates: form.existingCertificates.filter((_, i) => i !== idx),
                      removedCertificates: [...form.removedCertificates, file]
                    })}
                  >
                    ×
                  </IconButton>
                </Box>
              ))}

              {/* New certificates */}
              {form.certificate?.map((file, idx) => (
                <Box key={file.name + idx} sx={boxStyle}>
                  {file.type?.startsWith("image/") ? (
                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }} />
                  ) : (
                    <Typography sx={{ maxWidth: 100, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", fontSize: 12, color: "#0f172a" }}>
                      {file.name}
                    </Typography>
                  )}
                  <IconButton size="small" sx={closeBtnStyle} onClick={() => setForm({ ...form, certificate: form.certificate.filter((_, i) => i !== idx) })}>
                    ×
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          {/* FOOTER */}
          <Box sx={{ p: 3, borderTop: "1px solid #eee", display: "flex", gap: 2, backgroundColor: "#fafafa" }}>
            <Button variant="outlined" fullWidth onClick={onClose}>Cancel</Button>
            <Button variant="contained" fullWidth disabled={!isValid} onClick={handleSave} sx={{ bgcolor: "#0f172a", "&:hover": { bgcolor: "#0f172a" } }}>
              {mode === "edit" ? "Save Changes" : "Submit for Verification"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
