import * as React from "react";
import {useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendApi } from "../backendApi/backendApi";

//material ui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";

//css
import '../styles/Form.css';

import { useSelector, useDispatch } from 'react-redux';
import { actualizarDashboard } from "../app/slices/credencialesSlice";

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

export const EditClient = ({ open, handleOpen, handleClose, id }) => {

  const [respuesta, setRespuesta] = useState({});
  const [Data, setData] = useState({});
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const GetData = async() => {
      
      const { data } = await axios({
        method:'GET',
        url:`${backendApi}/client/show/${id}`,
      });
      setData(data);        
    }

    GetData();

  },[]);
  

  const [Form, setForm] = useState({
    id_procceso: Data.id_procceso,
    priority: Data.priority,
    avt: Data.avt,
    clientName: Data.clientName,
    agenteName: Data.agenteName,
    emailAddress: Data.emailAddress,
    address: Data.address,
    phone: Data.phone,
    twoPhone: Data.twoPhone,
    callBackAppointment: Data.callBackAppointment,
    resortName: Data.resortName,
    location: Data.location,
    unitSize: Data.unitSize,
    weeksPoints: Data.weeksPoints,
    years: Data.years,
    maintenceFee: Data.maintenceFee,
    priceOffered: Data.priceOffered,
    pendingBalance: Data.pendingBalance,
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
    
    const datosx = Form;
    const { data } = await axios({
      method:'PUT',
      url:`${backendApi}/client/update/${id}`,
      data:datosx
    });
    setRespuesta(data);

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
                defaultValue={Data.clientName}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.clientName && <div className={'errorModal'}>{respuesta.clientName}</div>}
            </Grid>
          
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Agent Name"
                name="agenteName"
                type="text"
                defaultValue={Data.agenteName}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.agenteName && <div className={'errorModal'}>{respuesta.agenteName}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Email Address"
                name="emailAddress"
                type="text"
                defaultValue={Data.emailAddress}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.emailAddress && <div className={'errorModal'}>{respuesta.emailAddress}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Address"
                name="address"
                type="text"
                defaultValue={Data.address}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.address && <div className={'errorModal'}>{respuesta.address}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Phone"
                name="phone"
                type="text"
                defaultValue={Data.phone}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.phone && <div className={'errorModal'}>{respuesta.phone}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="2nd Phone"
                name="twoPhone"
                type="text"
                defaultValue={Data.twoPhone}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.twoPhone && <div className={'errorModal'}>{respuesta.twoPhone}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Call Back Appointment"
                name="callBackAppointment"
                type="text"
                defaultValue={Data.callBackAppointment}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.callBackAppointment && <div className={'errorModal'}>{respuesta.callBackAppointment}</div>}
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
                defaultValue={Data.resortName}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.resortName && <div className={'errorModal'}>{respuesta.resortName}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Location"
                name="location"
                type="text"
                defaultValue={Data.location}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.location && <div className={'errorModal'}>{respuesta.location}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Unit size"
                name="unitSize"
                type="text"
                defaultValue={Data.unitSize}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.unitSize && <div className={'errorModal'}>{respuesta.unitSize}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Weeks/Points"
                name="weeksPoints"
                type="text"
                defaultValue={Data.weeksPoints}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.weeksPoints && <div className={'errorModal'}>{respuesta.weeksPoints}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Years"
                name="years"
                type="text"
                defaultValue={Data.years}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.years && <div className={'errorModal'}>{respuesta.years}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Maintence Fee"
                name="maintenceFee"
                type="text"
                defaultValue={Data.maintenceFee}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.maintenceFee && <div className={'errorModal'}>{respuesta.maintenceFee}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Price Offered"
                name="priceOffered"
                type="text"
                defaultValue={Data.priceOffered}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.priceOffered && <div className={'errorModal'}>{respuesta.priceOffered}</div>}
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                id="standard-basic"
                label="Pending Balance"
                name="pendingBalance"
                type="text"
                defaultValue={Data.pendingBalance}
                onChange={handleChange}
                variant="standard"
                sx={{ width: "100%" }}
              />
              {respuesta.pendingBalance && <div className={'errorModal'}>{respuesta.pendingBalance}</div>}
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
