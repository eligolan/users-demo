import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'

const ProfileCard = () => {
  const location = useLocation()
  const [locationBtn, setLocationBtn] = useState(false)

  return (
    <div className='centered'>
      <Card sx={{ width: 500 }}>
        <CardMedia
          component="img"
          height="140"
          image={location.state.pic.large}
          alt="green iguana"
        />
        <CardContent>
          {!locationBtn && <div>
            <Typography gutterBottom variant="h5" component="div">
              {`${location.state.firstName} ${location.state.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Phone Number: ${location.state.phone}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Gender: ${location.state.gender}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Email: ${location.state.email}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Age: ${location.state.age}`}
            </Typography>
          </div>}
          {locationBtn && <div>
            <Typography gutterBottom variant="h5" component="div">
             Location Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Country: ${location.state.location.country}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`City: ${location.state.location.city}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`State: ${location.state.location.state}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Postcode: ${location.state.location.postcode}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Street: ${location.state.location.street.name} ${location.state.location.street.number}`}
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

export default ProfileCard;