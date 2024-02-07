const { BACK_END, FRONT_END } = process.env;

const registerMessage = (email, newUser) => {
  return {
    to: email,
    subject: "Verify Your Email Address",
    html: `
          <h1>Dear User,</h1>
          <p>Thank you for registering!<br/> To complete your registration and access all features, please click the link below.</p>
        
          <a target="_blank" href="${BACK_END}/auth/verify/${newUser.verificationToken}">Click verify email</a>
      
          <p>For confirmation purposes, this email is being sent to you by Tracker of Water.<br/> If you have any questions or concerns, please feel free to contact our support team.</p> 
          <a target="_blank" href="https://discord.gg/dCga7faG">Support</a><br/><br/>
          
          <b>Best regards,<br/>
            TeamForce</b>
        `,
  };
};

const resetMessage = (email, user) => {
  return {
    to: email,
    subject: "Reset Your Password",
    html: `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; text-align: center; padding: 20px; background: linear-gradient(to right, #4b9cdb, #305f91); border-radius: 15px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);">
    <h1 style="color: #fff; margin-bottom: 15px; font-size: 32px;">Dear User 😊,</h1>
    <p style="font-size: 20px; color: #fff; line-height: 1.5;">We received a request to reset your password. If you did not make this request, please ignore this email.</p>
    <p style="font-size: 20px; color: #fff; line-height: 1.5; margin-bottom: 20px;">To reset your password, click the button below:</p>
    
    <a
      style="display: inline-block; margin: 15px 0; padding: 15px 25px; font-size: 20px; color: #fff; background-color: #fff; background: linear-gradient(to right, #4b9cdb, #305f91); text-decoration: none; border-radius: 10px; transition: background 0.3s, color 0.3s; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"
      target="_blank"
      href="${FRONT_END}/reset-password/${user._id}"
    >
      Reset Password
    </a>
  
    <p style="font-size: 20px; color: #fff; line-height: 1.5; margin-top: 20px; margin-bottom: 20px;">If you have any questions or concerns, please feel free to contact our support team. 🚀</p>
    <a style="font-size: 20px; color: #fff; text-decoration: none;" target="_blank" href="https://discord.gg/dCga7faG">Support</a><br/><br/>
                
    <b style="font-size: 24px; color: #fff;">Best regards,<br/>TeamForce 🌟</b>
</div>


        `,
  };
};

const messages = {
  registerMessage,
  resetMessage,
};

module.exports = {
  messages,
};
