import React from "react";
import { actualizarDashboard } from "../app/slices/credencialesSlice";
import { backendApi } from "../backendApi/backendApi";
import axios from "axios";
import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";

export const ListPriority = ({ priority, id, close }) => {

  const dispatch = useDispatch();

  const actualizarPriority = async (priority) => {
    let json = { priority:priority };
    const { data } = await axios({
      method: "PUT",
      url: `${backendApi}/client/priority/${id}`,
      data: json,
    });

    close(false);
    dispatch(actualizarDashboard());
  };

  return (
  <>
    {
        priority === 0 
        ? 
        <>
            <MenuItem onClick={() => actualizarPriority(1)}>
              <label
                className={`bg-gradient-to-r px-5 py-1 rounded text-white text-sm
                from-green-600 to-green-400 cursor-pointer w-full`}

              >
                Medium Priority
              </label>
            </MenuItem>
            <MenuItem onClick={() => actualizarPriority(2)}>
              <label
                className={` bg-gradient-to-r px-5 py-1 rounded text-white text-sm
              from-red-600 to-red-400 cursor-pointer w-full  `}

              >
                High Priority
              </label>
            </MenuItem>
          </>
          : priority === 1 
        ?
          <>
            <MenuItem onClick={() => actualizarPriority(0)}>
              <label
                className={`bg-gradient-to-r px-5 py-1 rounded text-white text-sm
              from-blue-600 to-blue-400 cursor-pointer w-full  `}

              >
                Low Priority
              </label>
            </MenuItem>
            <MenuItem onClick={() => actualizarPriority(2)}>
              <label
                className={` bg-gradient-to-r px-5 py-1 rounded text-white text-sm
                from-red-600 to-red-400 cursor-pointer w-full  `}

              >
                High Priority
              </label>
            </MenuItem>
          </>
          : 
          <>
            <MenuItem onClick={() => actualizarPriority(0)}>
              <label
                className={`bg-gradient-to-r px-5 py-1 rounded text-white text-sm
              from-blue-600 to-blue-400 cursor-pointer w-full  `}

              >
                Low Priority
              </label>
            </MenuItem>
            <MenuItem onClick={() => actualizarPriority(1)}>
              <label
                className={` bg-gradient-to-r px-5 py-1 rounded text-white text-sm
              from-green-600 to-green-400 cursor-pointer w-full  `}

              >
                Medium Priority
              </label>
            </MenuItem>
          </>
    }    
  </>
  );
};
