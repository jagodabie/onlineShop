import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Grid} from '@material-ui/core'; 
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './style'
const Product = ({product , handleAddToCart, card}) => {
    const classes = useStyles();
    return (   
        <>
        <Grid container sm = {12} style = {{padding: '5%'}}>
            <Card className = {classes.root}>
            <CardMedia className = {classes.media} image = {product.media.source}  /> 
                <CardContent>
                    <div className = {classes.CardContent}>
                        <Typography variant = "h5" gutterBottom>
                            {product.name}
                        </Typography> 
                        <Typography variant = "h5" gutterBottom>
                            {product.price.formatted_with_symbol}
                        </Typography> 
                        <Typography dangerouslySetInnerHTML={{ __html:product.description}} Setvariant = "h5" color = "textSecondary"/>
                    </div> 
                </CardContent>
                <CardActions disableSpacing className= {classes.CardActions}>
                    <IconButton aria-label = "Add to Card" onClick = {() => handleAddToCart(product.id,1)}>
                        <AddShoppingCart/>
                    </IconButton>
                </CardActions>
            </Card>
            </Grid>
        </>

     );
}
 
export default Product;