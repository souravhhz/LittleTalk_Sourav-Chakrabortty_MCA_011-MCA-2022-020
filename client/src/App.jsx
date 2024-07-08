import {Routes,Route,Navigate} from 'react-router-dom';
import Chat from './pages/Chat'
import Register from './pages/Register';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from 'react-bootstrap';
import MyNavBar from './components/MyNavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatsContext';
import Account from './pages/Account';
import EditAccount from './pages/EditAccount';



  
function App() {

  const {user} = useContext(AuthContext);
  return (
    <ChatContextProvider user = {user}>
      <MyNavBar/>
      <Container id='ContainerApp' style={{width:'99%'}}  > {/* style={{display: "flex",justifyContent: "center"}} */}
        <Routes>
          <Route path="/" element={user ? <Chat/>:<Login/> }/>
          <Route path="/profile" element={user ?<Account/>:<Register/> }/>
          <Route path="/editaccount" element={user ?<EditAccount/>:<Register/> }/>
          <Route path="/register" element={user ?<Chat/>:<Register/> }/>
          <Route path="/login" element={user ? <Chat/>:<Login/> }/>
          <Route path="*" element={<Navigate to="/"/> }/>
        </Routes>
      </Container>
    </ChatContextProvider> 
  );
}

export default App
