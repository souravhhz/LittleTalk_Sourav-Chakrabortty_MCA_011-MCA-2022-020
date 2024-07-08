import React, { useEffect } from 'react';
import '../pages/css/EditAccount.css';
import { useContext } from 'react';
import {Alert,Button,Form,Row,Col,Stack,Card} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const EditAccount = ({history}) => {
  const {updateProfileInfo, updateProfileupdateInfo,updateProfileError,isUpdateProfileloading,profileUpdate,checkUserById,userExist} = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      updateProfileupdateInfo({
        ...updateProfileInfo,
        Id: user._id,
        oldAccountId:user.accountId,
        accountId:user.accountId,
        name: user.name,
        aboutYourself: user.about,
        facebook: user.facebook,
        instagram: user.instagram,
        youtube: user.youtube,
        linkedin: user.linkedin,
        github: user.github,
        twitter: user.twitter
      });
    }
  }, [user]);
  

  const cancelButton = () => {
    window.location.href = '/profile';
  };
  return (
    <>
    <div className="container" style={{margin:"10px"}}>
      <div className="row gutters">
      <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
      <div className="card h-100">
        <div className="card-body">
          <div className="account-settings">
            <div className="user-profile">
              <div className="user-avatar">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Profile pic"/>
              </div>
              <h5 className="user-name">{user.name}</h5>
              <h6 className="user-email">{user.email}</h6>
            </div>
            <div className="about">
              <h5>About</h5>
              <p>{updateProfileInfo.aboutYourself}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
      <div className="card h-100" style={{marginTop:'5px'}}>
        <div className="card-body">
          <Form  onSubmit={profileUpdate}>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mb-2 text-primary">Personal Details</h6>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <Form.Control type="text" className="form-control" value={updateProfileInfo.name} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,name:e.target.value})} placeholder="Enter full name"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="eMail">Email</label>
                  <Form.Control type="email" className="form-control" value={user.email}  placeholder="Enter email ID" readOnly/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="phone">User ID</label>
                  {/* <Form.Control type="text" className="form-control" value={user.accountId} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,oldAccountId:e.target.value})} placeholder="Enter phone number" style={{ display: 'none' }} /> */}

                  <Form.Control type="text" className="form-control" value={updateProfileInfo.accountId}
                  onChange={ (e) => {
                      updateProfileupdateInfo({...updateProfileInfo, accountId: e.target.value}); 
                      checkUserById(e,e.target.value); 
                  }}   
                  placeholder="Enter User Id"
                  minLength={3}
                  />
                  {
                    userExist && 
                    <span >
                          <span className='text-danger' style={{margin:'3px'}}> User ID already exists </span>
                    </span>
                  }
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="website">About Yourself</label>
                  <Form.Control  as="textarea" rows={1} value={updateProfileInfo.about} className="form-control" onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,aboutYourself:e.target.value})} placeholder="Write about yourself"
                />
                </div>
              </div>
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mt-3 mb-2 text-primary">Social Media</h6>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="Street">Facebook</label>
                  <Form.Control type="name" value={updateProfileInfo.facebook} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,facebook:e.target.value})}  className="form-control"  placeholder="Enter Facebook Profille Link"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="ciTy">Instragram</label>
                  <Form.Control type="name" value={updateProfileInfo.instagram} className="form-control" onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,instagram:e.target.value})}   placeholder="Enter Instragram Profille Link"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="sTate">LinkedIn</label>
                  <Form.Control type="text" className="form-control" value={updateProfileInfo.linkedin} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,linkedin:e.target.value})}   placeholder="Enter LinkedIn Profille Link"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="zIp">Twitter</label>
                  <Form.Control type="text" className="form-control" value={updateProfileInfo.twitter} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,twitter:e.target.value})}   placeholder="Enter Twitter Profille Link"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="zIp">YouTube</label>
                  <Form.Control type="text" className="form-control" value={updateProfileInfo.youtube} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,youtube:e.target.value})}   placeholder="Enter YouTube Channel Link"/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="zIp">Github</label>
                  <Form.Control type="text" className="form-control" value={updateProfileInfo.github} onChange={(e)=>updateProfileupdateInfo({...updateProfileInfo,github:e.target.value})}   placeholder="Enter Github Profile Link"/>
                </div>
              </div>
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="EditButtons">
                  <Button type="button" onClick={cancelButton} className="btn btn-danger">Cancel</Button>
                  <Button type="submit" name="submit" className="btn btn-primary" disabled={userExist}>
                  {
                          isUpdateProfileloading ? "Updating" : "Update"
                  }</Button>
                </div>
                {
                    updateProfileError ?.error && 
                      <Alert variant='danger' >
                          <span> {updateProfileError?.message} </span>
                      </Alert>
                  }
              </div>
            </div>
          </Form>
        </div>
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default EditAccount 