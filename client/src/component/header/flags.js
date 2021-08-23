import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const countries = {
    "ar": "Argentina",
    "au": "Australia",
    "at": "Austria",
    "be": "Belgium",
    "br": "Brazil",
    "bg": "Bulgaria",
    "ca": "Canada",
    "cn": "China",
    "co": "Colombia",
    "cu": "Cuba",
    "cz": "Czech Republic",
    "eg": "Egypt",
    "fr": "France",
    "de": "Germany",
    "gr": "Greece",
    "hk": "Hong Kong",
    "hu": "Hungary",
    "in": "India",
    "id": "Indonesia",
    "ie": "Ireland",
    "il": "Israel",
    "it": "Italy",
    "jp": "Japan",
    "lv": "Latvia",
    "lt": "Lithuania",
    "my": "Malaysia",
    "mx": "Mexico",
    "ma": "Morocco",
    "nl": "Netherlands",
    "nz": "New Zealand",
    "ng": "Nigeria",
    "no": "Norway",
    "ph": "Philippines",
    "pl": "Poland",
    "pt": "Portugal",
    "ro": "Romania",
    "ru": "Russia",
    "sa": "Saudi Arabia",
    "rs": "Serbia",
    "sg": "Singapore",
    "sk": "Slovakia",
    "si": "Slovenia",
    "za": "South Africa",
    "kr": "South Korea",
    "se": "Sweden",
    "ch": "Switzerland",
    "tw": "Taiwan",
    "th": "Thailand",
    "tr": "Turkey",
    "ae": "UAE",
    "ua": "Ukraine",
    "gb": "United Kingdom",
    "us": "United States",
    "ve": "Venuzuela"
}
const useStyles = makeStyles((theme) => ({
    box: {
        display: 'inline-flex',
        alignItems: 'center'
    },
    avatar: {
      display: 'inline-block',
      marginRight: '1rem'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
    },
    content: {
        marginTop: '2rem',
        height: 450,
        overflow: 'auto'
    }
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
export default function FlagsModal(props) {
  const classes = useStyles();
//   const [open, setOpen] = React.useState(props.open);


  return (
    <Modal
        aria-labelledby="flags-modal-title"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box className={classes.paper}>
            <Typography variant="h4" id="flags-modal-title" gutterBottom>Select country</Typography>
            <Divider />
            <Grid container spacing={3} className={classes.content}>
                {Object.keys(countries).map((option) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={option}>
                        <LinkRouter color="inherit" to={`/${option}`}>
                            <Box className={classes.box}>
                                <Avatar className={classes.avatar} alt="Country" src={`/flags/${option}.svg`} variant="rounded">{option}</Avatar>
                                <Typography variant="body1" component="span" > {countries[option]} </Typography>
                            </Box>
                        </LinkRouter>
                    </Grid>
                ))}   
            </Grid>
          </Box>
        </Fade>
    </Modal>
    
  );
}

FlagsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
