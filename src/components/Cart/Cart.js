import React from 'react';
import { Container, Typography, Button, Grid } from "@material-ui/core"
import { Link } from 'react-router-dom'
import useStyles from  './style';
import CardItem from './CardItem/CardItem';
const Cart = ({cart,handleUpdateCartQuantity, handleRemoveFromCart,handleEmptyCart}) => {
    const classes = useStyles();
    const EmptyCard = () => (
        <Typography variant = "subtitle1">You have no items in your shopping cart,
        <Link to = "/" className = {classes.link}> start adding some </Link>!
        </Typography>
    )
    const FilledCard = () => {
        console.log(cart)

        return(

        <>
            <Grid container spacing = {3} >
                {cart.line_items.map((item)=>(
                    <Grid item xs = {12} sm = {4} key = {item.id}>
                        <CardItem item = {item} handleUpdateCartQuantity = {handleUpdateCartQuantity} handleRemoveFromCart = {handleRemoveFromCart}/>
                    </Grid>
                    ))}
                    <div className = {classes.cardDetails}>
                        <Typography variant = "h4">
                            Subtotal: {cart.subtotal.formatted_with_symbol}
                        </Typography>
                        <div>
                            <Button className = {classes.emptyButton} size = "large" type = "button" variant = "contained" color = "secondary" onClick = {handleEmptyCart}>Empty Cart</Button>
                            <Button component = {Link}  to = "/Checkout" className = {classes.checkoutButton} size = "large" type = "button" variant = "contained" color = "primary">Checkout</Button>
                        </div>
                    </div>     
            </Grid>
       </>
    )  
    }
    return ( 
        <Container>
            <div className = {classes.toolbar}/>
            <Typography className = {classes.title} variant = "h4" gutterBottom >Your Shopping Cart</Typography>
            {cart.line_items.length  ? <FilledCard/> : <EmptyCard/>}
        </Container>   
     )
}
export default Cart;