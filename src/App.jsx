import {BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './context/UserProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Quiz from './pages/Quiz'
import ScoreBoard from './pages/ScoreBoard'
import Login from './pages/Login';
import Register from './pages/Register';
import Message from './pages/Message';

function App() {

  return (
    <div className="App">
      <HelmetProvider>
      <BrowserRouter>
        <UserProvider>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/quiz' element={<Quiz/>}></Route>
              <Route path='/score-board' element={<ScoreBoard/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/create-account' element={<Register/>}></Route>
                <Route path='/feedbacks' element={<ProtectedRoute><Message/> </ProtectedRoute>}></Route>
              <Route path='/*' element={<NotFound/>}></Route>
            </Routes>
          <ToastContainer autoClose={5000} />
          <Footer/>
        </UserProvider>
      </BrowserRouter>
      </HelmetProvider>
    </div>
  )
}

export default App
