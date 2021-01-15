module.exports = {
  posts: function(req, res) {
    Post.find().exec(function(err, posts) {
      if (err) {
        return res.serverError(err.toString())
      }

      res.send(posts)
    })
    //res.send(allPosts)
  },

  create: function(req, res) {
    const t = req.body.title
    const b = req.body.postBody

    sails.log.debug('My title: ' + t)
    sails.log.debug('My body: ' + b)

    Post.create({title: t, body: b}).exec(function() {
      if (err) {
        return res.serverError(err.toString())
      }

      console.log("Finished creating post object!")
      return res.end(); 
    })
  }

  /*findById: function(req, res) {
    const postId = req.param('postId')

    const filteredPosts = allPosts.filter(p => {return p.id == postId})
  }*/


  /*
  console.log("This route shows home page of posts")

  const allPosts = await Posts.find()

  res.view('pages/home', {allPosts})*/


  


}