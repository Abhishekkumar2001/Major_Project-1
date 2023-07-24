const User = require('../models/user');

// Render the Profile Page
// module.exports.profile = async (req, res) => {
//     try {
//         const user = await User.findById(req.cookies.user_id);
//         if (user) {
//             res.render('user_profile', {
//                 title: "User Profile",
//                 user: user
//             });
//         } else {
//             return res.redirect('/users/sign-in');
//         }

//     }
//     catch (err) {
//         console.log('Error:', err.message);
//         return res.status(500).send('Internal Server Error');
//     }

// }

//Render the profile page
module.exports.profile = (req, res) =>{
    return res.render('user_profile',{
        title : 'User Profile'
    })
}

// Render the Sign Up Page
module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Major Project | Sign Up"
    })
}


// Render the Sign In Page
module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Major Project | Sign In"
    })
}

// get the sign up data
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
// module.exports.createSession = async (req, res) => {
//     // steps to authenticate

//     try {
//         // find the user
//         const user = await User.findOne({ email: req.body.email });

//         //handle user found
//         if (user) {
//             // handle password which doesn't match
//             if (user.password != req.body.password) {
//                 return res.redirect('back');
//             }

//             //handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         } else {
//             //handle user not found
//             return res.redirect('back');
//         }
//     }
//     catch (err) {
//         console.log('Error:', err.message);
//         return res.status(500).send('Internal Server Error');
//     }


// }

// Sign In and Create a session for the user
module.exports.createSession = (req, res) =>{
    return res.redirect('/');
}

module.exports.destroySession = (req, res) =>{
    // req.logout();
    // return res.redirect('/');
    req.logout((err) => {
        if (err) { return next(err); }
        
        return res.redirect('/');
      });
}