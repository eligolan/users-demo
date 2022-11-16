import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UsersStore } from "../store/UsersStore";
import { observer } from "mobx-react";

const ProfileCard = () => {

  const [locationBtn, setLocationBtn] = useState(false);
  
  return (
    <div className='centered'>
      <Card sx={{ width: 500 }}>
        <CardMedia
          component="img"
          height="140"
          image={UsersStore.currentUser.pic.large}
          alt="green iguana"
        />
        <CardContent>
          {!locationBtn && <div>
            <Typography gutterBottom variant="h5" component="div">
              {`${UsersStore.currentUser.firstName} ${UsersStore.currentUser.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Phone Number: ${UsersStore.currentUser.phone}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Gender: ${UsersStore.currentUser.gender}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Email: ${UsersStore.currentUser.email}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Age: ${UsersStore.currentUser.age}`}
            </Typography>
          </div>}
          {locationBtn && <div>
            <Typography gutterBottom variant="h5" component="div">
             Location Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Country: ${UsersStore.currentUser.gender}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`City: ${UsersStore.currentUser.location.city}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`State: ${UsersStore.currentUser.location.state}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Postcode: ${UsersStore.currentUser.location.postcode}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Street: ${UsersStore.currentUser.location.street.name} ${UsersStore.currentUser.location.street.number}`}
            </Typography>
          </div>}
        </CardContent>
        <CardActions>
          <Button onClick={() => setLocationBtn(false)} size="small">Main Details</Button>
        </CardActions>
        <CardActions>
          <Button onClick={() => setLocationBtn(true)} size="small">Location</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default observer(ProfileCard);