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

  },


  fn: async function (inputs) {
    await Post.create({title: inputs.title, body: inputs.postBody})

    // All done.
    return;

  }


};
