module.exports = {
  friendlyName: 'Delete',
  description: 'Delete posts.',

  inputs: {
    postId: {
        type: 'string',
        required: true,
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'layouts/user_related/success_page',
      statusCode: 200,
      description: 'Post deleted',
    }, 
    error: {
      description: 'Oops! Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
      try {
          const postId = inputs.postId
          await Post.destroy({id: postId});

          return exits.success({
              message: 'Post should be deleted!'
          });

      } catch (error) {
          return exits.error({
              message: 'Oops :( an error occurred',
              error: error.message,
          });
      }
  }
};
