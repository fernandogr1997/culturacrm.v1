import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { backendApi } from '../../backendApi/backendApi';
import toast, { Toaster } from 'react-hot-toast';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import '../../styles/Form.css';
import { login } from '../../app/slices/credencialesSlice';
import Cookies from 'js-cookie';

export const AuthLogin = ({ title, subtitle, subtext }) => {

  const [Form, setForm] = useState({
    email: '',
    password: ''
  });

  const [respuesta, setRespuesta] = useState({});

  const dispatch = useDispatch();

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    // console.log(value);
 
    setForm((prevalue) => {
      return {
        ...prevalue,             
        [name]: value
      }
    })
  }

  const enviarDatos = async(e) => {
    e.preventDefault();
    
    const { data } = await axios({
      method:'POST',
      url:`${backendApi}/login`,
      data:Form
    });
    setRespuesta(data);

    if(data.respuesta){toast.error(data.respuesta)}
            
    if(data.accessToken){
        const { accessToken, user } = data;
        console.log(data);
        const token = accessToken.split('|');
        Cookies.set('token', `${token[1]}`);
        Cookies.set('user', user.name);
        dispatch(login(token[1]));
    }

  }

  return (
    <>
    {/* Notificacion */}
    <Toaster 
      position="top-right"
    />

      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

<form onSubmit={(e) => enviarDatos(e)}>
      <Stack>
        <Box>
          <label>Email</label>
          <TextField
            id="email"
            name='email'
            type='email'
            variant="outlined"
            className='w-full my-3'
            onChange={handleChange}
          />
        </Box>
        {respuesta.email && <div className={'error'}>{respuesta.email}</div>}
        <Box>
          <label>Contraseña</label>
          <TextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            className='w-full my-3'
            onChange={handleChange}
          />
        </Box>
        {respuesta.password && <div className={'error'}>{respuesta.password}</div>}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >

          <Typography
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>

        </Stack>
      </Stack>
      <Box>
        <button
          color="primary"
          className='w-full text-white bg-blue-500 
        rounded py-3 hover:bg-blue-700 active:bg-blue-500'
          type="submit"
        >
          Sign In
        </button>
      </Box>
      {/* {subtitle} */}
</form>
    </>
  )
}
