import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [ image, setImage ] = useState(null)
  const [ state , setState ] = useState({
    product_name : '',
    price : '',
    description : '',
    quantity : '',
    image : null
  })

  const handleChange = (e) =>{
    setState({
      ...state, [e.target.name] : e.target.value
    })
  }
  console.log(image);
  const submitProduct = e =>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("image",image,image.name );
    formData.append("product_name",state.product_name);
    formData.append("price",state.price);
    formData.append("description",state.description);
    formData.append("quantity",state.quantity);
    // const config = {
    //   headers : {
    //     ContentType : 'multipart/form-data'
    //   }
    // }
    Axios.post('http://localhost:5000/product',formData,{headers: {'Content-Type': 'multipart/form-data' }})
    .then(res => console.log(res))
  }



  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                name="product_name"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                autoFocus
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Price"
                name="price"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Quantity"
                name="quantity"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              rows={5}
              id="outlined-multiline-static"
                variant="outlined"
                required
                fullWidth
                multiline
                name="description"
                label="Description"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
            <h4>Image:</h4>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="file"
                name="description"
                onChange={e => setImage(e.currentTarget.files[0])}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e =>  submitProduct(e)}
          >
          Add Product
          </Button>
        </form>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
}