module.exports.profile = (req, res) => {
    return res.render('user_profile', {
        title: "User Profile"
    });
}

// Render the Sign Up Page
module.exports.signUp = (req, res) =>{
    return res.render('user_sign_up',{
        title : "Major Project | Sign Up"
    })
}


// Render the Sign In Page
module.exports.signIn = (req, res) =>{
    return res.render('user_sign_in', {
        title : "Major Project | Sign In"
    })
}