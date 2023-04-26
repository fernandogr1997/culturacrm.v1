import React from 'react';
import { UserGroupIcon, ServerIcon, CalendarIcon, ChartSquareBarIcon,
CogIcon } from '@heroicons/react/outline';

function SideBar(props) {
    return (
        <div className="fixed inset-y-0 left-0 bg-slate-50 w-40">
            <h1 className="flex items-center justify-center text-2xl
            h-16 bg-slate-200 text-black font-bold">CulturaCRM</h1>

            <ul className="flex flex-col text-lg h-full">
                <li className="flex justify-center items-center flex-col
                py-7 border-l-4 border-black text-2xl text-white
                bg-gradient-to-r from-purple-700 to-blue-500
                ">
                    <ServerIcon className="w-7 h-7 text-2xl text-white"/>
                    DashBoard
                </li>
                {/* <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                    <UserGroupIcon className="w-7 h-7"/>
                    NewClient
                </li>
                <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
                    <CalendarIcon className="w-7 h-7"/>
                    Schedule
                </li> */}
                <li className="flex justify-center items-center flex-col
                py-7 border-purple-500 text-2xl text-gray-600
                
                ">
                    <ChartSquareBarIcon className="w-7 h-7 text-2xl text-gray-600"/>
                    Report
                </li>

                {/* <li className="flex justify-center items-center flex-col
                py-7 text-gray-500 mt-auto mb-16">
                    <CogIcon className="w-7 h-7"/>
                    Settings
                </li> */}
            </ul>
        </div>
    );
}

export default SideBar;