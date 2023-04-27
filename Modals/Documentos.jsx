import { useState, useEffect } from "react";
import React from 'react';

import axios from "axios";
import { backendApi } from "../backendApi/backendApi";
import { Dropzone } from "../components/Dropzone";
import Cookies from 'js-cookie';

//material ui
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
import { actualizarComentarios } from "../app/slices/credencialesSlice";

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

export const Documentos = ({ open, handleOpen, handleClose, id }) => {

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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style} className="overflow-y-auto overflow-x-hidden  w-full h-96">
          <section className='section '>
            <div className='container'>
              <h1 className='title text-3xl font-bold'>Upload Files</h1>
              <Dropzone 
                className='p-16 mt-10 border border-neutral-200' 
                id={id}
              />
            </div>
          </section>
        </Box>
      </Modal>
    </>

  );
};
