import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import {CustomTextField} from './CustomTextField';

export const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShipingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const methods = useForm ();
    const countries = Object.entries(shippingCountries).map(([code,name])=>({id:code, label:name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name])=>({id:code, label:name}));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } =  await commerce.services.localeListShippingCountries(checkoutToken.id);
        setShippingCountries(countries);
        setShipingCountry(Object.keys(countries)[0]);
    }
    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } =  await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
        
    }, []);
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    return (  
            <>
                <Typography variant = "h6" gutterBottom> Shipping Address</Typography>
                <FormProvider {...methods}>
                    <form onSubmit = {methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision }))}>
                    <Grid container item xs={12}  spacing={3}>
                            <CustomTextField required name = 'firstName' label = 'First name'/>
                            <CustomTextField required name = 'secondName' label = 'Second name'/>
                            <CustomTextField required name = 'address1' label = 'Addres'/>
                            <CustomTextField required name = 'email' label = 'Email'/>
                            <CustomTextField required name = 'city' label = 'City'/>
                            <CustomTextField required name = 'zip' label = 'ZIP / Postal code'/>
                            <Grid item xs = {12} sm = {6}>
                                <InputLabel>Shipping Country: </InputLabel>
                                <Select value = {shippingCountry} fullWidth onChange = {(e)=> setShipingCountry(e.target.value)}>
                                    { countries.map( country =>(
                                            <MenuItem key = {country.id} value = {country.id}> 
                                            {country.label}
                                            </MenuItem>))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs = {12} sm = {6}>
                                <InputLabel>Subdivisions Country: </InputLabel>
                                <Select value = {shippingSubdivision} fullWidth onChange = {(e)=> setShippingSubdivision(e.target.value)}>
                                { subdivisions.map( subdivision =>(
                                    <MenuItem key = {subdivision.id} value = {subdivision.id}> 
                                        {subdivision.label}
                                    </MenuItem>))
                                }
                                </Select>
                            </Grid>
                        </Grid>
                        <br />
                        <div style = {{ display : 'flex', justifyContent: 'space-between'}}>
                                <Button component = {Link} to ="/cart" variant = "contained">Back to card</Button>
                                <Button type = "submit" variant = "contained" color = "primary" style ={{paddingRight: '50px', paddingLeft: '50px'}}>Next</Button>
                        </div>
                    </form>
                </FormProvider>
            </>
    );
}
 