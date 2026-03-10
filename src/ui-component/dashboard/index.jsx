import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import AnalyticsCard from './AnalyticsCard';
import ProfileModal from "./ProfileModal";
// import { getFacilitiesCount,  } from 'container/FacilityContainer/slice';
// import { getIssuesCount, } from 'container/ReportIssuesContainer/slice';
// import { getRatings, } from 'container/RatingContainer/slice';
// import { getUserCount, getUsers } from 'container/UsersContainer/slice';
// import { dashCount } from 'container/DashboardContainer/slice';
import MainCard from 'ui-component/cards/MainCard';
import { getInstitutions } from "container/institutecontainer/slice";


const DashboardDefault = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const [showModal, setShowModal] = useState(false);
  const [limit] = useState(5);
  const [page] = useState(0);

  // ✅ Profile check effect (SEPARATE)
  useEffect(() => {
    if (userData && userData.isProfileCompleted === false) {
      setShowModal(true);
    }
  }, [userData]);

  // ✅ Dashboard data effect (SEPARATE)
  // ✅ Dashboard data effect (SEPARATE)
useEffect(() => {

  dispatch(getInstitutions()); // ✅ FETCH INSTITUTIONS

  const urls = {
    facilities: `facilities?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`,
    users: `users?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`,
    issues: `issues?filter={"limit":${limit},"skip":${page},"order":["createdOn DESC"]}`,
    feedback: `feedbacks?filter={"limit": 5,"skip": 0}`
  };

  const draftFacilitiesUrl = `facilities?filter=${encodeURIComponent(
    JSON.stringify({
      where: { status: 'draft' }
    })
  )}`;

}, [dispatch, limit, page]);

   

    // dispatch calls here



    // dispatch(getFacilitiesCount('facilities/count'));
    // dispatch(getFacilities(urls.facilities));
    // dispatch(getDraftFacilities(draftFacilitiesUrl));
    // dispatch(getIssuesCount());
    // dispatch(getRatings(urls.feedback));
    // dispatch(getRatingCount(`feedbacks/count`));
    // dispatch(getUserCount(`users/count`));
    // dispatch(getIssueReports(urls.issues));
    // dispatch(getUsers(urls.users));
    // dispatch(dashCount());

  return (
    <Box
  sx={{
    minHeight: "100vh",
    backgroundColor: "rgb(230, 237, 248)", 
    padding: 3
  }}
>
  
    <MainCard sx={{ boxShadow: 'none',    backgroundColor: "rgb(230, 237, 248)", 
 }}>
      <Box>
        <Box
          sx={{
            p: 1.5,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: "#fff",
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Box
              sx={{
                background: '#0f172a',
                color: '#fff',
                borderRadius: '50%',
                height: 40,
                width: 40,
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}
            >
              <UserOutlined />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Platform Institute Dashboard</Typography>
              <Typography sx={{ fontSize: 13 , fontWeight: 500 ,textTransform:"capitalize"}}>
  Hello  {userData?.institutionName}
</Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Analytics Section */}
        <AnalyticsCard />
      </Box>
      {/* 👇 ADD MODAL AT BOTTOM */}
      {showModal && (
        <ProfileModal
          user={userData}
          onClose={() => setShowModal(false)}
        />
      )}
    </MainCard>
  
</Box>
  );
};

export default DashboardDefault;
