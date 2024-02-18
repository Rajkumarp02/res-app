import { Avatar, Box, Card } from "@mui/material";
import { deepOrange, pink } from "@mui/material/colors";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useOidcUser } from "@axa-fr/react-oidc";
import { Link } from "react-router-dom";

const Profile = () => {
  const { oidcUser } = useOidcUser();
  //console.log(oidcUser)
  const FirstLetter = oidcUser && oidcUser?.name ? oidcUser?.name?.charAt(0).toUpperCase() : "";

  const shareViaWhatsApp = () => {
 
    const message = `Hi, I'm ${oidcUser?.name?.slice(0, 4)}. I'm working as a Software Developer.
    Thank You For Visiting My Profile Page!.............`;
  
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank');
  };

  return (
    <div>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Card sx={{ width: 800, m: { md: 18 }  }}>
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <CardMedia
              sx={{ height: 140, width: 140 }}
            >
              <Avatar sx={{ bgcolor: deepOrange[500], width: "100%", height: "100%",'&:hover': {
            bgcolor:pink[700],
          },}} variant="square">
                {
                  FirstLetter
                }
              </Avatar>
            </CardMedia>
            <div style={{
              marginLeft: "1rem",
            }}>
              <Typography variant="h6" gutterBottom color="text.secondary"sx={{ ml:{xs:1}}}>
                {
                  oidcUser?.name
                }
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary" sx={{ ml:{xs:1}}}>
                {
                  oidcUser?.email
                }
              </Typography>
            </div>
          </div>
     
          <CardContent sx={{
            width:'100%'
          }}>
            <Typography gutterBottom variant="h5" component="div">
              About
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '1rem',
             fontWeight: 400, lineHeight: '1.5', textAlign: 'left',
              }}>
              Hi, I'm {oidcUser?.name?.slice(0, 4)}. I'm working as a Software Developer.
              <br />
              Thank You For Visiting My Profile Page!.............
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small"  onClick={shareViaWhatsApp} >Share</Button>
            <Link to="/home">
            <Button size="small">Back Home</Button>
            </Link>
            
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
