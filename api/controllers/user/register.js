module.exports = {

  friendlyName: 'Register',

  description: 'Register user.',

  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'layouts/success_page'
      //statusCode: 201,
      //description: 'New user created',
    }, 
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Oops! Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      // Makes sure email is all lowercase
      const newEmailAddress = inputs.email.toLowerCase();

      // Creates token for user used for email verification
      const token = await sails.helpers.strings.random('url-friendly');

      // New user record
      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
        emailProofToken: token,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL,
      }).fetch();

      // Confirm link sent to user
      const confirmLink = `http://localhost:1337/user/confirm?token=${token}`;
      

      // Set up and send confirmation email
      const email = {
        to: newUser.email,
        subject: 'Note It: Confirm Your Account',
        template: 'confirm',
        context: {
          name: newUser.fullName,
          confirmLink: confirmLink,
        },
      };
      await sails.helpers.sendMail(email);

      // All done.
      return exits.success({
        
        
        //message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
      });

    } catch (error) {
      if (error.code == 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exits',
        });
      }

      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }
};
