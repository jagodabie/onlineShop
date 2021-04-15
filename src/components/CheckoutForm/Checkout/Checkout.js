import React, {useState,useEffect}from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, Grid, CssBaseline, Divider, Button} from '@material-ui/core'
import { Link } from 'react-router-dom';
import {commerce} from '../../../lib/commerce'
import useStyles from './style';
import {AddressForm}  from './AddressForm';
import {PaymentForm} from './PaymentForm';

const Checkout = ({cart, data, order,onCaptureCheckout,error}) => {
const classes = useStyles();
const steps = ['Shipping adress', 'Payment details', 'Confirmation'];
const[checkoutToken, setCheckoutoken] = useState(null);
const[activeStep, setActiveStep] = useState(0);
const[shippingData, setShippingData] = useState({});

const generateToken = async() => {
    const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'})
    setCheckoutoken(token)     
}
useEffect(() => {generateToken()}, [cart]);

    let Confirmation = () => {
          return (
            <>
            <div>
            <Typography variant = "h5">Thank you for your purchase</Typography>
            <Divider className = {classes.divider}/>
            </div>
            <br/>
            <Button component = {Link} to = "/" variant = "outlined" type = "button">Back to Home</Button>
            </>
          )
    }
      if(error){
          <>
            <Typography variant = "h5">Error: {error}</Typography>
          </>
      }
const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
const next = (data) => {
    setShippingData(data);
    nextStep();
}

const Form = ()  => activeStep === 0 ? 
                <AddressForm checkoutToken = {checkoutToken} next = {next} /> : 
                <PaymentForm shippingData = {shippingData} checkoutToken = {checkoutToken} nextStep = {nextStep} backStep = {backStep} onCaptureCheckout = {onCaptureCheckout}/>
    return ( 
        <>
        <CssBaseline>
            <Grid item xs = {12} sm = {6} style ={{ marginLeft: 'auto', marginRight:'auto', marginTop: '10 rem'}}>
                <div className = {classes.toolbar}>
                    <main className = {classes.toolbar}>
                        <Paper className = {classes.paper}>
                            <Typography variant = "h4" align = "center"> Checkout</Typography>
                            <Stepper activeStep= {activeStep} className = {classes.stepper}>
                                {steps.map( step => (
                                <Step key= {step}> 
                                        <StepLabel>{step}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? <Confirmation/>: checkoutToken && <Form/>}
                        </Paper>
                    </main>
                </div>
            </Grid>
        </CssBaseline>
        </>
     );
}
export default Checkout;