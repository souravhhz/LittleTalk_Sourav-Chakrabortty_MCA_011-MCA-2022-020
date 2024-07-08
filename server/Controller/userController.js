const userModel = require('../Models/userModels');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const CreateToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRATE_KEY;
    return jwt.sign({_id},jwtkey,{expiresIn:'3d'})
}


// create user function
const registerUser = async (req, res) => {
    try {
        const { name, email, actype, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json('All fields are required...');
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json(`Enter a valid email: ${email}`);
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json('Enter a strong password...');
        }

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json('User with this email already exists.');
        }

        let accountId = "";
        const count = await userModel.countDocuments({});
        accountId = name.split(" ")[0] + (count * 100);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new userModel({ name, email, accountId, actype, password: hashedPassword });
        await user.save();

        const token = CreateToken(user._id);
        
        // Send response based on whether actype is provided or not
        if (actype) {
            return res.status(200).json({ 
                _id: user._id, 
                name,
                actype,
                accountId: user.accountId,
                email,
                createdAt: user.createdAt,
                token 
            });
        } else {
            return res.status(200).json({ 
                _id: user._id,
                name: user.name,
                email,
                accountId: user.accountId,
                actype: user.actype,
                createdAt: user.createdAt,
                facebook: user.facebook,
                instagram: user.instagram,
                youtube: user.youtube,
                linkedin: user.linkedin,
                github: user.github,
                twitter: user.twitter
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};





// create user function
const updateUser = async (req, res) => {
    try {
        const {
            Id,
            accountId,
            name,
            aboutYourself,
            facebook,
            instagram,
            youtube,
            linkedin,
            github,
            twitter
        } = req.body;

        if(!Id){
            return (
                res.status(500).json('Internal Server Error...')
            );
        }
        // Check if required fields are provided
        if ( !name || !accountId) {
            return res.status(400).json('ID, name, and account ID are required fields.');
        }
        // console.log("oldAccountId",oldAccountId)
        // Find the user by ID
        let user = await userModel.findOne({ _id:Id });
        if (!user) {
            return res.status(404).json('User not found.');
        }

        // Update user's information
        user.accountId = accountId;
        user.name = name;
        user.about = aboutYourself;
        user.facebook = facebook;
        user.instagram = instagram;
        user.youtube = youtube;
        user.linkedin = linkedin;
        user.github = github;
        user.twitter = twitter;

        // Save the updated user
        await user.save();

        // Return the updated user information
        return res.status(200).json(
            { 
                _id:user._id,
                name:user.name,
                email,accountId:user.accountId,
                actype:user.actype,
                createdAt:user.createdAt,
                facebook: user.facebook,
                instagram:user.instagram ,
                youtube:user.youtube,
                linkedin:user.linkedin,
                github:user.github,
                twitter:user.twitter,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error.');
    }
}




// login user function
// function checkguestaccount(){
//     const twoHoursAgo = new Date();
//     twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

//     // Delete accounts matching the criteria
//     userModel.deleteMany({ actype: 0, createdAt: { $lt: twoHoursAgo } }, (err) => {
//     if (err) {
//         console.log('Error deleting accounts:', err);
//     } else {
//         console.log('Accounts deleted successfully');
//     }
//     });
// }


const loginUser = async (req,res) => {
    // checkguestaccount();
    const {email,password} = req.body;
    try
    {
        if( !email || !password)
        {
            return (
                res.status(400).json('All fields are required...')
            );

        }
        let user = await userModel.findOne({email});
        if(!user){
            return(
                res.status(400).json("Invalid email or password or guest account deleted after 2 hours")
            );
        }
        if(user.actype){
            const presentTime = new Date();
            const givenDateTime = new Date(user.createdAt);
            const timeDifferenceInMilliseconds = presentTime - givenDateTime;
            const gestac = 2*3600000;
            // console.log(`${gestac} ${timeDifferenceInMilliseconds}`);
            if(gestac < timeDifferenceInMilliseconds){
                // await userModel.deleteOne({ _id: user._id }, (err) => {
                //     if (err) {
                //         res.status(500).json(`Internal Server Error : ${err}`);
                //     } else {
                //         console.log('It is a guest account so it was deleted');
                //     }
                //   });
                userModel.deleteOne({ _id: user._id })
                .then(() => {
                    console.log('It is a guest account so it was deleted');
                })
                .catch(err => {
                    console.llog(err);
                    res.status(500).json(`Internal Server Error : `);
                });
                console.log(user);
                user = false;
            }
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return(
                res.status(400).json("Invalid email or password")
            );
        }
        const token = CreateToken(user._id);
        if(!user.actype)
        {
            return res.status(200).json(
                { 
                    _id:user._id,
                    name:user.name,
                    email,accountId:user.accountId,
                    actype:user.actype,
                    createdAt:user.createdAt,
                    facebook: user.facebook,
                    instagram:user.instagram ,
                    youtube:user.youtube,
                    linkedin:user.linkedin,
                    github:user.github,
                    twitter:user.twitter,
                });
        }
        res.status(200).json({_id:user._id,name:user.name,email,token,accountId:user.accountId,actype:user.actype,createdAt:user.createdAt});
    }
    catch(error){
        res.status(500).json(`Internal Server Error : ${error}`);
    }
}

// find user by id
const FindUser = async(req,res) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);

    }
    catch(error)
    {
        res.status(500).json(`Internal Server Error : ${error}`);

    }
}

// get user by accountId
const getUserByAcId = async (req,res) =>{
    const accountId = req.params.accountId;
    try{
        let user = await userModel.findOne({accountId:accountId});
        if(user){
            res.status(200).json(1);
        }
        else{
            res.status(200).json(0);
        }

    }
    catch(error)
    {
        res.status(500).json(`Internal Server Error : ${error}`);

    }
}

//get all user
const GetUsers = async(req,res) =>{
    try{
        const users = await userModel.find();

        res.status(200).json(users);

    }
    catch(error)
    {
        res.status(500).json(`Internal Server Error : ${error}`);

    }
}

module.exports = {registerUser,loginUser,FindUser,GetUsers,updateUser,getUserByAcId}