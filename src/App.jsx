import { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";

//redux
import { useDispatch,useSelector } from 'react-redux';
import { login, logout } from '../app/slices/credencialesSlice';

function App() {

  const dispatch = useDispatch();

  const status = useSelector((state) => state.credenciales.status)
   
useEffect(() =>{
  const token = document.cookie.replace('token=','');
  if(token.length < 1){dispatch(logout())};
  if(token.length > 1){dispatch(login())};
},[])

  if(status === 'checking'){
    return 'cargando';
  }

  return (
    <>
    <Routes>
      {
        (status === 'no-autenticado')
        ?<>
          <Route path='/auth/login' element={<Login/>}/>
          {/* <Route path='/registro' element={<Registro/>}/> */}
          <Route path='/*' element={<Login/>}/>
         </>
       :<>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/*' element={<Dashboard/>}/>
        </>
      }
    </Routes>
    </>
  )
}

export default App
