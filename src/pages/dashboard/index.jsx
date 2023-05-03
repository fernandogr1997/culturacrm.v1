import { use, useEffect, useState } from "react";

//librerias
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//components
import { backendApi } from "../../../backendApi/backendApi";
import Layout from "../../../components/Layout";
import CardItem from "../../../components/CardItem";
import { NewClient } from "../../../Modals/NewClient";

//icons
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import BoardData from "../../../data/board-data.json";
import { useSelector,useDispatch } from "react-redux";
import { verdato } from "../../../app/slices/credencialesSlice";
import Cookies from 'js-cookie';


function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Dashboard = () => {
  const [boardData, setBoardData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [respuesta, setrespuesta] = useState([]);
  const [Permisos, setPermisos] = useState('');
  const getDatos = useSelector((state) => state.credenciales.getDatos)
  const dispatch = useDispatch();


  const enviarDatos = async (id,id_procceso) => {

    const json = { id_procceso };
    const { data } = await axios({
      method: 'PUT',
      url: `${backendApi}/client/proceso/${id}`,
      data: json
    });

    console.log(data);

  }


  useEffect(() => {
    const GetData = async () => {

      const { data } = await axios({
        method: 'GET',
        url: `${backendApi}/clients`,
      });

      let permisos = Cookies.get('permisos');
      setPermisos(permisos);
      //admin
      if(permisos === '1'){
        setBoardData(data);
        
        
      //Broker
      }else if(permisos === '2'){
        const datos = data.slice(1, 5);
        setBoardData(datos);
        

      //Broker jr  
      }else if(permisos === '3'){
        const datos = data.slice(0, 2);
        setBoardData(datos);
        

      //secretaria  
      }else if(permisos === '4'){
        const datos = data.slice(0, 1);
        setBoardData(datos);
        

      }
    }

    GetData();

  }, [getDatos]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId
      && destination.index === source.index) return;
    let newBoardData = boardData;
    let dragItem =
      newBoardData[parseInt(source.droppableId)].items[source.index];
    newBoardData[parseInt(source.droppableId)].items.splice(
      source.index,
      1
    );

    newBoardData[parseInt(destination.droppableId)].items.splice(
      destination.index,
      0,
      dragItem
    );

    let idCard = dragItem.id;

    const findItemIndexesById = (data, id) => {
      let indexes = { sectionIndex: -1, itemIndex: -1 };
      data.some((section, sectionIndex) => {
        indexes.itemIndex = section.items.findIndex(item => item.id === id);
        if (indexes.itemIndex !== -1) {
          indexes.sectionIndex = sectionIndex;
          return true;
        }
      });
      return indexes;
    }

    const proceso = findItemIndexesById(newBoardData,idCard);
    let sectionindex = proceso.sectionIndex;
    //Broker
    if(Permisos === '2'){
       sectionindex = (1 + sectionindex);
    }
    // //Broker jr  
    // }else if(Permisos === '3'){
    //   let sectionindex = proceso.sectionIndex;

    // //secretaria  
    // }else if(Permisos === '4'){
    //   let sectionindex = proceso.sectionIndex;
    // }

    enviarDatos(idCard,sectionindex);


  }



  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  //modalNewClient 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>

      <Layout>
        <div className="p-10 flex flex-col h-screen">
          {/* Board header */}
          <div className="flex flex-initial justify-between">
            <div className="flex items-center">
              <h4 className="text-4xl font-bold text-gray-600">Dashboard</h4>
              <ChevronDownIcon
                className="w-9 h-9 text-gray-500 rounded-full
            p-1 bg-white ml-5 shadow-xl"
              />
            </div>

            <ul className="flex space-x-3">
              <li>
                <button
                  className="ml-5 pl-2 pr-4 py-2 rounded-md flex items-center text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-600 hover:to-blue-400"
                  onClick={() => handleOpen()}
                >
                  <span

                  >New Client</span>
                </button>
              </li>
            </ul>
          </div>

          <NewClient
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}

          />

          {/* Board columns */}

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex grid-cols-5 gap-5 my-5">

              {boardData.map((board, bIndex) => {

                
                return (

                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                          >
                            <span
                              className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                            ></span>
                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-2xl text-gray-600">
                                {board.name}
                              </span>
                              {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}
                            </h4>

                            <div
                              className="overflow-y-auto overflow-x-hidden h-auto"
                              style={{ maxHeight: "calc(100vh - 290px)" }}
                            >
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="m-3"
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>

                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>

                );
              })}
            </div>
          </DragDropContext>

        </div>
      </Layout>
    </>
  );
}

export default Dashboard;