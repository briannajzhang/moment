module.exports = async function(req, res) {
  const allPosts = await Post.find();

  console.log("This route shows home page of posts")
  res.view('layouts/user_related/feed_page',
    {allPosts}
  )
}