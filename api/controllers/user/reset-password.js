module.exports = {
  friendlyName: 'Reset password',
  description: '',

  inputs: {
    password: {
      description: "The new, unencrypted password.",
      example: "myfancypassword",
      required: true,
    },

    token: {
      description:
        "The password token that was in the forgot-password endpoint",
      example: "gwa8gs8hgw9h2g9hg29",
      required: true,
    },
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'layouts/general/login_page',
      description:
        "Password successfully updated, and requesting user agent automatically logged in",
    },

    invalidToken: {
      statusCode: 401,
      description:
        "The provided password token is invalid, expired, or has already been used.",
    },
  },

  fn: async function (inputs, exits) {
    // Check if request contains token
    if (!inputs.token) {
      return exits.invalidToken({
        error: "Your reset token is either invalid or expired",
      });
    }

    // Token is valid, get user record with token
    var user = await User.findOne({ passwordResetToken: inputs.token });

    // Check if user record was retrieved & if token is expired or not
    if (!user || user.passwordResetTokenExpiresAt <= Date.now()) {
      return exits.invalidToken({
        error: "Your reset token is either invalid or expired",
      });
    }

    const hashedPassword = await sails.helpers.passwords.hashPassword(
      inputs.password
    );

    // Update user record with hashed password & reset the last 2 fields
    await User.updateOne({ id: user.id }).set({
      password: hashedPassword,
      passwordResetToken: "",
      passwordResetTokenExpiresAt: 0,
    });

    const token = await sails.helpers.generateNewJwtToken(user.email);

    this.req.user = user;
    return exits.success({
      message: `Password reset successful. ${user.email} has been logged in`,
      data: user,
      token,
    });
  }
};
