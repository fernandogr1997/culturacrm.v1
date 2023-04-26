import * as React from "react";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendApi } from "../backendApi/backendApi";

//material ui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";

//css
import styles from '../styles/Form.module.css';
import { actualizarDashboard } from "../app/slices/credencialesSlice";

import { useSelector, useDispatch } from 'react-redux';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 800,
  bgcolor: "background.paper",
  borderTop: "8px solid #be185d",
  boxShadow: 24,
  p: 4,
};

export const NewClient = ({ open, handleOpen, handleClose }) => {

  const [respuesta, setRespuesta] = useState({});
  const dispatch = useDispatch();

  const [Form, setForm] = useState({
    id_procceso: 1,
    priority: 0,
    avt:'/avt.jpg',
    clientName:'',
    agenteName:'',
    emailAddress:'',
    address:'',
    phone:'',
    twoPhone:'',
    callBackAppointment:'',
    resortName:'',
    location:'',
    unitSize:'',
    weeksPoints:'',
    years:'',
    maintenceFee:'',
    priceOffered:'',
    pendingBalance:'',
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

  const enviarDatos = async(e) => {
    e.preventDefault();
    
    const { data } = await axios({
      method:'POST',
      url:`${backendApi}/new_client`,
      data:Form
    });
    setRespuesta(data);

    console.log(data);

    if(data.respuesta){
      handleClose();
      dispatch(actualizarDashboard());

      Swal.fire({
        title:`${data.respuesta}`,
        icon: 'success',
        timer: 4000,
      })
    }
            
  }

  return (
    <div
      
      style={{ maxHeight: "calc(100vh - 290px)" }}
    >
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={(e) => enviarDatos(e)}>
      <div 
          style={style} 
          className="bg-gradient-to-r to-red-200 rounded-md bg-white
          px-5 py-5 overflow-y-auto overflow-x-hidden h-auto ">
         
              <div style={{
                    boxShadow:3,
                    paddingTop:3,
                    paddingBottom:2,
                    marginBottom:5,
                    marginTop:20,
                    backgroundColor: '#BE185D',
                    background: 'linear-gradient(to right, purple, blue)'
              }}>
                <Typography
                  sx={{ 
                    marginBottom: 3,
                    textAlign: 'center', 
                    color: '#fff'
                  }}
                  
                  id="modal-modal-title"
                  variant="h3"
                  component="h2"
                  >
                  NEW CLIENT
                </Typography>
              </div>
          

          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Client Name"
                name="clientName"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.clientName && <div className={styles.errorModal}>{respuesta.clientName}</div>}
            </Grid>
          
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Agent Name"
                name="agenteName"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.agenteName && <div className={styles.errorModal}>{respuesta.agenteName}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Email Address"
                name="emailAddress"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.emailAddress && <div className={styles.errorModal}>{respuesta.emailAddress}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Address"
                name="address"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.address && <div className={styles.errorModal}>{respuesta.address}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Phone"
                name="phone"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.phone && <div className={styles.errorModal}>{respuesta.phone}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="2nd Phone"
                name="twoPhone"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.twoPhone && <div className={styles.errorModal}>{respuesta.twoPhone}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Call Back Appointment"
                name="callBackAppointment"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.callBackAppointment && <div className={styles.errorModal}>{respuesta.callBackAppointment}</div>}
            </Grid>

            <Grid item xs={12} md={12}>
            <div style={{
                    boxShadow:3,
                    paddingTop:3,
                    paddingBottom:2,
                    marginTop:10,
                    marginBottom:5,
                    backgroundColor: '#BE185D',
                    background: 'linear-gradient(to right, purple, blue)'
              }}>
                <Typography
                  sx={{ 
                    marginBottom: 3,
                    textAlign: 'center', 
                    color: '#fff'
                  }}
                  
                  id="modal-modal-title"
                  variant="h3"
                  component="h2"
                  >
                  RESORT INFORMATION
                </Typography>
              </div>
            </Grid>
            <hr />

            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Resort Name"
                name="resortName"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.resortName && <div className={styles.errorModal}>{respuesta.resortName}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Location"
                name="location"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.location && <div className={styles.errorModal}>{respuesta.location}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Unit size"
                name="unitSize"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.unitSize && <div className={styles.errorModal}>{respuesta.unitSize}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Weeks/Points"
                name="weeksPoints"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.weeksPoints && <div className={styles.errorModal}>{respuesta.weeksPoints}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Years"
                name="years"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.years && <div className={styles.errorModal}>{respuesta.years}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Maintence Fee"
                name="maintenceFee"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.maintenceFee && <div className={styles.errorModal}>{respuesta.maintenceFee}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Price Offered"
                name="priceOffered"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.priceOffered && <div className={styles.errorModal}>{respuesta.priceOffered}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Pending Balance"
                name="pendingBalance"
                type="text"
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.pendingBalance && <div className={styles.errorModal}>{respuesta.pendingBalance}</div>}
            </Grid>
            <Grid item xs={2} md={2}>
            <Button
                sx={{
                  marginTop:5,
                  marginBottom:5,
                  backgroundColor: 'blue',
                  border: '1px solid',
                  color:'white',
                  "&:hover": {
                    color: 'white',
                    backgroundColor: '#0F2272'
                  },
                }}
                type="submit"
                variant="standard"
                
              >
                save
              </Button>
            
            </Grid>
            <Grid item xs={2} md={2}>
              <Button
                sx={{
                  marginTop:5,
                  marginBottom:5,
                  backgroundColor: 'red',
                  border: '1px solid',
                  color:'white',
                  "&:hover": {
                    color: 'white',
                    backgroundColor: '#AB341A'
                  },
                }}
                onClick={handleClose} 
                variant="standard"
                
              >
                Cancel
              </Button>
            </Grid>

          </Grid>
          
        </div>
      </form>
    </Modal>
    </div>
  );
};
