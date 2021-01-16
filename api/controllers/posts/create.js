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
    }
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New post created',
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

          return exits.success({});

      } catch (error) {
          return exits.error({
              message: 'Oops :( an error occurred',
              error: error.message,
          });
      }
  }
};
