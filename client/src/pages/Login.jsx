import { useContext } from 'react';
import {Alert,Button,Form,Row,Col,Stack,Card} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../pages/css/Login.css';


const Login = () => {

    const {loginUser,loginError,loginInfo,isloginloading, updateLoginInfo} = useContext(AuthContext);

    return ( 
    <>
    <Card className='CardLogin' > {/* style={{ width: '18rem' }} */} 
        <Card.Body>
            <Form onSubmit={loginUser} >
                {/* <Row style={{height:"100vh",justifyContent:"center",paddingTop:"10%"}}> */}
                <Row className='RowLogin' > {/* style={{justifyContent:"center"}} */}
                    <Col xs={12}>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        {/* <Form.Control type='text' placeholder='Name'/> */}
                        <Form.Control type='email' placeholder='Email' onChange={
                            (e)=>{
                                updateLoginInfo({...loginInfo,email:e.target.value})
                                }} />
                        <Form.Control type='password' placeholder='Password' onChange={
                            (e)=>{
                                updateLoginInfo({...loginInfo,password:e.target.value})
                                }} />
                        {/* <Form.Control type='password' placeholder='Confirm Password'/> */}
                        <Button varient='primary' type='submit' >
                            {isloginloading?"Getting you in...": "Login"}
                        </Button>
                        {
                            loginError?.error && 
                            <Alert variant='danger'>
                                <p>{loginError?.message}</p>
                            </Alert>
                        }
                    </Stack>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
    </Card>
    </>
     );
}
 
export default Login;