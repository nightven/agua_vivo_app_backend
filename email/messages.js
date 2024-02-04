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
          <h1>Dear User,</h1>
          <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
          <p>To reset your password, click the link below:</p>
          
          <a target="_blank" href="${FRONT_END}/reset-password/${user._id}">Reset Password</a>
      
          <p>If you have any questions or concerns, please feel free to contact our support team.</p>
          <a target="_blank" href="https://discord.gg/dCga7faG">Support</a><br/><br/>
          
          <b>Best regards,<br/>
            TeamForce</b>
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
