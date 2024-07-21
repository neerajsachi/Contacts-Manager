import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CreateUser from './CreateUser'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getUser,setToken } from './redux/userSlice'
import UpdateUser from './UpdateUser'
import Login from './Login'
import NewUser from './NewUser'
import store from './redux/store'; 
import { Provider } from 'react-redux'


function App(){

  return(
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/newuser' element={<NewUser />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App