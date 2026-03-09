import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import RateReviewIcon from '@mui/icons-material/RateReview';

const notifications = [
  {
    title: 'New student enrolled',
    description: 'Aarav Kumar enrolled in Full Stack Web',
    type: 'info',
    icon: <SchoolIcon color="primary" />
  },
  {
    title: 'Seat limit reached',
    description: 'Data Science course is now full',
    type: 'warning',
    icon: <EventSeatIcon color="warning" />
  },
  {
    title: 'New review received',
    description: 'UI/UX Design got a 5⭐ rating',
    type: 'success',
    icon: <RateReviewIcon color="success" />
  }
];

const Notification = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Notifications
      </Typography>

      <Card>
        <CardContent>
          <List>
            {notifications.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontWeight="600">
                      {item.title}
                    </Typography>
                  }
                  secondary={item.description}
                />
                <Chip
                  label={item.type}
                  color={
                    item.type === 'success'
                      ? 'success'
                      : item.type === 'warning'
                      ? 'warning'
                      : 'info'
                  }
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notification;
