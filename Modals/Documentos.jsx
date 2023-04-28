import { useState, useEffect } from "react";
import React from 'react';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';

//components
import { Dropzone } from "../components/ModalDocument/Dropzone";

//material ui
import Modal from "@mui/material/Modal";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

//css
import '../styles/Comentarios.css';
import { DownloadFiles } from "../components/ModalDocument/DownloadFiles";
import { backendApi } from "../backendApi/backendApi";
import axios from "axios";

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

  const [name, setname] = useState();
  const [Datos, setDatos] = useState([]);
  const [DownLoad, setDownLoad] = useState(false);

  const preClose = () => handleClose();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === '2') {
      setDownLoad(true);
    } else {
      setDownLoad(false);
    }
  };

  const recargar = () => {
    setValue('2');
    if (DownLoad === false) {
      setDownLoad(true);
    } else if (DownLoad === true) {
      setDownLoad(false);
    }
  }
  const reload = () => {
    if (DownLoad === false) {
      setDownLoad(true);
    } else if (DownLoad === true) {
      setDownLoad(false);
    }
  }

  useEffect(() => {
    const getDatos = async () => {

      const { data } = await axios({
        method: 'GET',
        url: `${backendApi}/documentos/${id}`,
      });

      if (!data || data.length === 0) {
          reload();
      } else {
        setDatos(data);
      }

    }
    getDatos();
  }, [DownLoad])

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

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Upload Files" value="1" />
                <Tab label="Download files" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Dropzone
                className='p-16 mt-10 border border-neutral-200'
                id={id}
                recargar={recargar}
              />
            </TabPanel>

            <TabPanel value="2">
              <DownloadFiles Datos={Datos} />
            </TabPanel>
          </TabContext>

        </Box>
      </Modal>
    </>

  );
};
