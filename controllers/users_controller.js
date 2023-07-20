const User = require('../models/user');
module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: "User Profile"
    });
}

// Render the Sign Up Page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Major Project | Sign Up"
    })
}


// Render the Sign In Page
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Major Project | Sign In"
    })
}

// get the sign up data
// module.exports.create = (req, res) =>{
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({ email : req.body.email}, (err, user) =>{
//         if(err){console.log('Error in Finding user in signing up'); return}

//         if(!user){
//             User.create(req.body, (err, user) =>{
//                 if(err){console.log('Error in creating user while signing in')};

//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }
module.exports.create = async (req, res) => {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error');
    }
}

//Sign In and Create a session for the user
module.exports.createSession = async (req, res) => {
    // steps to authenticate

    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            //handle user found
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            //handle password which don't match
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
            
        } else {
            //handle user not found
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error');
    }




    //handle session creation



}