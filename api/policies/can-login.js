module.exports = async function (req, res, proceed) {
    const { username/*email*/ } = req.allParams();
    try {
      const user = await User.findOne({ username: username/*email: email*/ });
      if (!user) {
        res.status(404).json({
          error: `${username/*email*/} does not belong to a user`,
        });
      } else if (user.emailStatus === 'unconfirmed') {
        res.status(401).json({
          error: 'This account has not been confirmed. Click on the link in the email sent to you to confirm.',
        });
      } else {
        return proceed();
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };