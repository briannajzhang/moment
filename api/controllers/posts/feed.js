module.exports = async function(req, res) {
  /*posts: function(req, res) {
    Post.find().exec(function(err, posts) {
      if (err) {
        return res.serverError(err.toString())
      }

      res.send(posts)
    })
  },*/

  const allPosts = await Post.find()

  console.log("This route shows home page of posts")
  res.view('layouts/user_related/feed_page',
    {allPosts}
  )
}