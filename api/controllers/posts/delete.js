module.exports = {
    friendlyName: 'Delete',
    description: 'delete post.',
  
    inputs: {
      postId: {
          type: 'number',
          required: true,
      }
    },
  
    exits: {
      success: {
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
  