import { useState, useEffect } from "react";
import axios from "axios";
import { backendApi } from "../backendApi/backendApi";
import Cookies from 'js-cookie';

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
import CloseIcon from '@mui/icons-material/Close';

import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField } from "@mui/material";
import { actualizarComentarios, actualizarDashboard } from "../app/slices/credencialesSlice";

//css
import '../styles/Comentarios.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "white",
  borderTop: "8px solid #be185d",
  boxShadow: 24,
  p: 4,
};

export const Comentarios = ({ open, handleOpen, handleClose, id }) => {
  
  const [respuesta, setRespuesta] = useState({});
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const Comentarios = useSelector((state) => state.credenciales.Comentarios)
  
  const [name, setname] = useState();
  const preClose = () => handleClose();

  useEffect(() => {
    const name = Cookies.get('user');
    setname(name);
  }, [])




  useEffect(() => {
    if (open === true) {
      const GetData = async () => {
        const { data } = await axios({
          method: 'GET',
          url: `${backendApi}/comentarios/${id}`,
        });
        setData(data);
      }

      GetData();
    }

  }, [open, Comentarios]);



  const [Form, setForm] = useState({
    comentario: ''
  });


  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    const json = { id_client: id, user_name: name, comentario: Form.comentario }

    setForm({
      ...Form,
      comentario: ''
    });

    const { data } = await axios({
      method: 'POST',
      url: `${backendApi}/new_comentario`,
      data: json
    });
    setRespuesta(data);

    if (data.respuesta) {
      dispatch(actualizarComentarios());
      dispatch(actualizarDashboard());
    }

  }


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Button
              sx={{
                position:'absolute',
                right:0,
                top:0,
                margin:0,
                
              }}
              onClick={preClose}
            >
            <CloseIcon/>
          </Button>

          <form 
            className="mt-5"
            onSubmit={(e) => enviarDatos(e)}
          >
            <TextField
              id="filled-basic"
              label="Nuevo Comentario"
              variant="filled"
              name="comentario"
              type="text"
              onChange={handleChange}
              value={Form.comentario}
              sx={{ width: '80%' }}
            />
            <Button
              sx={{
                marginLeft: 4,
                marginTop: 2,
                backgroundColor: 'blue',
                border: '1px solid',
                color: 'white',
                "&:hover": {
                  color: 'white',
                  backgroundColor: '#0F2272'
                },
              }}
              type="submit"
              variant="standard"

            >
              Enviar
            </Button>
            {respuesta.comentario && <div className='errorComentario'>{respuesta.comentario}</div>}

          </form>

          <hr className="mt-4 border-1 " />

          <div className="overflow-y-auto overflow-x-hidden  w-full h-96">

            {
              Data.map((data, index) => {

                return (
                  <List key={index} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={data.user_name} src="/avt.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Fecha: ${data.created_at}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {data.user_name}
                            </Typography>
                            {` — ${data.comentario}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <Divider variant="inset" component="li" />

                  </List>
                )
              })
            }
          </div>

        </Box>
      </Modal>
    </>

  );
};
