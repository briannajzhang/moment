module.exports = {

    friendlyName: 'Create',
  
    description: 'Create post.',
  
    inputs: {
      title: {
        type: 'string',
        required: true,
      },
      body: {
        type: 'string', 
        required: true,
      },
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
                body: inputs.body,
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
  