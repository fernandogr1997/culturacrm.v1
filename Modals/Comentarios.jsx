import {useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendApi } from "../backendApi/backendApi";

//material ui
import * as React from 'react'; 
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

//css

import { useSelector, useDispatch } from 'react-redux';
import { Grid3x3 } from "@mui/icons-material";
import { Box, Grid, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "white",
  background: 'white',
  borderTop: "8px solid #be185d",
  boxShadow: 24,
  p: 4,
};

export const Comentarios = ({ open, handleOpen, handleClose, id }) => {

  const [respuesta, setRespuesta] = useState({});
  const [Data, setData] = useState({});
  const dispatch = useDispatch();
  
  // useEffect(()=>{
  //   const GetData = async() => {
      
  //     const { data } = await axios({
  //       method:'GET',
  //       url:`${backendApi}/client/${id}`,
  //     });
  //     setData(data);        
  //   }

  //   GetData();

  // },[]);
  

  const [Form, setForm] = useState({
    
  });


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


  return (
    
    <div style={{background: 'white'}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
      >

          <Grid container spacing={2}>
          <form onSubmit={(e) => enviarDatos(e)}>
          <Grid item xs={6} md={6}>
                  <TextField
                    id="standard-basic"
                    label="Nuevo Comentario"
                    name="comentario"
                    type="text"
                    // defaultValue={Data.clientName}
                    onChange={handleChange}
                    variant="standard"
                    sx={{ width: "100%" }}
                  />
                  {/* {respuesta.clientName && <Box className={styles.errorModal}>{respuesta.clientName}</Box>} */}
            </Grid>
          <Grid item xs={6} md={6}>
                  <button>enviar</button>
            </Grid>
        
        
          </form>

          
          </Grid>  


      </Modal>
  </div>
    
  );
};
