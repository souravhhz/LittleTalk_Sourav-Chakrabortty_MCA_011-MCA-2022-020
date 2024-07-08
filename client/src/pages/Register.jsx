import { useContext } from 'react';
import {Alert,Button,Form,Row,Col,Stack, Card, FormControl} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../pages/css/Login.css';



const Register = () => {
    const {registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterloading} = useContext(AuthContext);
    
    return (
    <>
    <Card className='CardLogin' > {/* style={{ width: '18rem' }} actype */} 
        <Card.Body>
            <Form onSubmit={registerUser}> 
                <Row className='RowLogin'>
                    <Col xs={12}>
                    <Stack gap={3}>
                        <h2>Register</h2>
                        {/* <h2>{user.name}</h2> */}
                        <Form.Control type='text' onChange={(e)=>updateRegisterInfo({...registerInfo,name:e.target.value})} minLength={3}  placeholder='Name'/>
                        <Form.Control type='email' onChange={(e)=>updateRegisterInfo({...registerInfo,email:e.target.value})} minLength={3}  placeholder='Email'/>
                        <Form.Select  value={registerInfo.actype} onChange={(e) => updateRegisterInfo({ ...registerInfo, actype: e.target.value })} required >
                            <option value={0}>Normal Account</option>
                            <option value={1}>Guest Account</option>
                        </Form.Select>
                        <Form.Control type='password' onChange={(e)=>updateRegisterInfo({...registerInfo,password:e.target.value})}  placeholder='Password' minLength={6} />
                        {/* <Form.Control type='password' placeholder='Confirm Password'/> */}
                        <Button varient='primary' type='submit'>
                            {
                                isRegisterloading ? "Creating" : "Register"
                            }
                        </Button>
                        {
                            registerError?.error && 
                            <Alert variant='danger'>
                                < p> {registerError?.message} </p>
                            </Alert>
                        }
                        
                    </Stack>
                    </Col>
                </Row>
            </Form>
            <div className='text-danger'>
                <p><b>*</b> Guest Account only for 2 hour. After 2 hour your data will be deleted from our website. </p> 
                <p><b>*</b> Permanent Account for life time.</p> 
            </div>
        </Card.Body>
    </Card>
    </> 
     );
}
 
export default Register;