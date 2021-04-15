import React from 'react';
import {Typography, Button, Card, CardActions , CardContent, CardMedia} from '@material-ui/core';
import useStyles from  './style';
const CardItem = ({item , handleRemoveFromCart, handleUpdateCartQuantity, handleEmptyCart}) => {
    const classes = useStyles();
    return (
       <Card>
            <CardMedia image = {item.media.source} alt ={item.name} className = {classes.media} / >
            <CardContent className = {classes.cardContent}>
                <Typography variant = "h6">{item.name}</Typography>
                <Typography variant = "h6">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className = {classes.cartActions}>
                <div className = {classes.buttons}>
                    <Button type = "button" size = "small"  onClick = {()=> {handleRemoveFromCart(item.id, item.quantity - 1)}}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type = "button" size = "small" onClick = {()=>{handleUpdateCartQuantity(item.id, item.quantity + 1)}}>+</Button>
                </div>
                <Button variant = "contained" type = "button" color = "secondary" onClick = {()=> {handleRemoveFromCart(item.id, 0)}}>Remove</Button>
            </CardActions>
        </Card>
      );
}
 
export default CardItem;