const express = require('express');
const {registerUser,loginUser,FindUser,GetUsers,updateUser,getUserByAcId} = require('../Controller/userController'); 



const router = express.Router()

router.post('/register',registerUser);
router.post('/updateProfile',updateUser);
router.post('/login',loginUser);
router.get('/find/:userId',FindUser);
router.get('/all/users/',GetUsers);
router.get('/find/account/:accountId',getUserByAcId)

module.exports = router;