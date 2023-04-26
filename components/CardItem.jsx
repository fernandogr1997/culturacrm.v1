import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { actualizarDashboard } from "../app/slices/credencialesSlice";
import { backendApi } from "../backendApi/backendApi";

import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Draggable } from "react-beautiful-dnd";

//material ui
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import { EditClient } from '../Modals/EditClient';
import { Comentarios } from '../Modals/Comentarios';

//css
import '../styles/CardItem.module.css';
import { useDispatch } from "react-redux";

function CardItem({ data, index }) {
  //modalNewClient 
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {setAnchorEl(null);setOpenModal(true)};
  const Close = () => setOpenModal(false);
  
  const [openComentarios, setOpenComentarios] = useState(false);
  const handleOpenComentarios = () => setOpenComentarios(true);
  const CloseComentarios = () => setOpenModal(false);
  
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const eliminar = async(id,name) =>{
    setAnchorEl(null);

    Swal.fire({
      icon: 'question',
      title:'Eliminar',
      text: `¿Seguro que quieres eliminar el Cliente ${name} con el id ${id}?`,
      showDenyButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
    }).then(response=>{
      if(response.isConfirmed){
      
        const eliminarRegistro = async(id) =>{
              
            const { data } = await axios({
                method:'PUT',
                url:`${backendApi}/client/eliminar/${id}`,
            });
                dispatch(actualizarDashboard());
        
          Swal.fire({
              icon:'success',
              title:'Exito',
              text:'el registro se eliminó correctamente.',
              timer: 4000,
          });
        
    }
    eliminarRegistro(id);

          
      }
      
    });
  }

  return (
  <>
      {/* Modales */}
      <EditClient
        open={openModal}
        handleOpen={handleOpen}
        handleClose={Close}
        id={data.id}
      />

      <Comentarios
        open={openComentarios}
        handleOpen={handleOpenComentarios}
        handleClose={CloseComentarios}
        id={data.id}
      />
      {/* Modales */}

    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <div className={'btn'}>
            <label
              className={`bg-gradient-to-r
                px-2 py-1 rounded text-white text-sm
                ${
                  data.priority === 0
                    ? "from-blue-600 to-blue-400"
                    : data.priority === 1
                    ? "from-green-600 to-green-400"
                    : "from-red-600 to-red-400"
                }
                `}
            >
              {data.priority === 0
                ? "Low Priority"
                : data.priority === 1
                ? "Medium Priority"
                : "High Priority"}
            </label>
            <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <h1>...</h1>
          </Button>
              <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleOpen}>Edit</MenuItem>
            <MenuItem onClick={() => eliminar(data.id,data.title)}>Delete</MenuItem>
          </Menu>

          </div>

          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ChatAlt2Icon 
                  className="cursor-pointer w-8 h-8 text-gray-500 hover:text-gray-900" 
                  onClick={handleOpenComentarios}
                  />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="cursor-pointer w-8 h-8 text-gray-500 hover:text-gray-900"/>
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="flex space-x-3">
              
                  <li>
                    <img
                      src="/avt.jpg"
                      alt="avt"
                      width="40"
                      height="40"
                      objectFit="cover"
                      className=" rounded-full "
                    />
                  </li>

            </ul>
          </div>
        </div>
        
      )}
    </Draggable>
  </>
  );
}

export default CardItem;
