module.exports = {
  friendlyName: 'Create',
  description: 'Create posts.',

  inputs: {
    title: {
      description: 'Title of the post',
      type: 'string',
      required: true,
    },
    postBody: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'layouts/user_related/success_page',
      message: 'Success!',
    }, 
    error: {
      description: 'Oops! Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
      try {
          // New post record
          await Post.create({
              title: inputs.title,
              body: inputs.postBody,
          });

          return exits.success({
            message: 'Congrats! Moment successfully created.'
          })

      } catch (error) {
          return exits.error({
              message: 'Oops :( an error occurred',
              error: error.message,
          });
      }
  }
};
