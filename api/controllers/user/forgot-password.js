module.exports = {


  friendlyName: 'Forgot password',


  description: '',


  inputs: {
    email: {
      description:
        "The email address of the user who wants to recover their password.",
      example: "albus@dumbledore.com",
      type: "string",
      required: true,
    },
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'layouts/reset/success_pg.ejs',
      description: "Email matched a user and a recovery email might have been sent",
    },
    invalidEmail: {
      description: "The email is invalid",
    }
  },


  fn: async function (inputs, exits) {
    var user = await User.findOne({ email: inputs.email });
    if (!user) {
      return exits.invalidEmail({
        error: "The provided email is invalid."
      })
    }  

    // Recovery token that will be sent to user
    const token = await sails.helpers.strings.random("url-friendly");

    // Token is stored in the database along with its expiration time
    await User.update({ id: user.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt:
        Date.now() + sails.config.custom.passwordResetTokenTTL,
    });

    const TOKEN_CODE = `${token}`;
    const recoveryLink = `http://localhost:1337/reset`;

    const email = {
      to: user.email,
      subject: "MOMENT: Reset Password",
      template: "forgot-psw",
      context: {
        name: user.fullName,
        CODE: TOKEN_CODE,
        recoverLink: recoveryLink,
      },
    };

    try {
      await sails.helpers.sendMail(email);
      // All done.
      return exits.success({
        // Should take user to success view
      });

    } catch (error) {
      sails.log(error);
    }
  }
};
