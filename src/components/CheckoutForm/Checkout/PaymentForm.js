import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
export const PaymentForm = ({checkoutToken, backStep, nextStep, shippingData, onCaptureCheckout }) => {


    const handleSubmit = async (e, elements, stripe)=> {
        e.preventDefault();
        if(!stripe || !elements) return;
        
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } =  await stripe.createPaymentMethod({type : 'card' , card: cardElement});
            if (error){
                console.log(error)
            } else {
                const orderData = {
                    line_items : checkoutToken.live.line_items,
                    customer : {firstname: shippingData.fistName, lastname : shippingData.lastname, email : shippingData.email },
                    shipping : {
                                street : shippingData.address1, 
                                town_city : shippingData.city,
                                contry_state :  shippingData.shippingSubdivision,
                                postal_zip_code: shippingData.zip,
                                country: shippingData.shippingCountry,
                            },
                            payment: {
                                gate : 'stripe',
                                stripe : {
                                    payment_meyhod_id: paymentMethod
                                }
                            }
                } 
                onCaptureCheckout(checkoutToken.id , orderData);
                nextStep();
            }
        }
    return (  
        <>
            <Review checkoutToken = {checkoutToken}/>
            <Divider/>
            <Typography variant = "h6" gutterBottom style = {{margin: '20px 0'}}>Payment method:  </Typography>
            <Elements stripe = {stripePromise}> 
                    <ElementsConsumer>
                        {({elements, stripe})=>(
                            <form onSubmit = { (e) => handleSubmit(e,elements,stripe) } >
                                <CardElement/>
                                <br/>
                                <div style = {{ display : 'flex', justifyContent: 'space-between'}}>
                                <Button variant = 'outlined' onClick = {backStep}>Back</Button>
                                 <Button type = "submit" variant = "contained"  disabled = {!stripe} color = "primary">
                                    Pay ${ checkoutToken.live.subtotal.formatted.slice(0, checkoutToken.live.subtotal.formatted.length-3)}
                                 </Button>
                                 </div>
                            </form>
                        )}
                        </ElementsConsumer>
                </Elements>  
        </> 
    );
} 
 