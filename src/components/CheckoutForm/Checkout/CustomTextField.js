import { Grid, TextField } from '@material-ui/core';
import {useFormContext, Controller} from 'react-hook-form';

import React from 'react';

export const CustomTextField = ({name , label, required}) => {
    const { control } = useFormContext();
    return ( 
        <Grid item xs = {12} sm = {6}>
            <Controller 
                render={({ field }) => <TextField {...field}  label = {label}  required = {required}/>}
                control = {control}
                fullWidth 
                name = {name}
               />
        </Grid>
     );
}
