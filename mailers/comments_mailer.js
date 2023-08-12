const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')

  nodeMailer.transporter.sendMail(
    {
      from: "abhikum8131@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: htmlString
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};

// async function sendMail(){

//   // create an email transporter

//   const mailOptions = {
//     from: 'abhikum8131@gmail.com',
//     to: 'comment.user.email',
//     subject: 'Welcome to NodeJS App',
//     text: 'This is an email using nodemailer in NodeJS',
// };

// // 3. Send the email
// try{
//     const result = await nodeMailer.transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
// }catch(err){
//     console.log('Email send failer with error: '+ err);
// }
// }
// sendMail();