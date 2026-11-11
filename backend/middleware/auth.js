// this is a "fake" authentication middleware for demonstration purposes
module.exports = (req, res, next) => {
  // In a real application, you would check the request headers for an authentication token
  console.log("Fake authentication middleware called");
  // return res.status(401).json({ error: "Unauthorized" });
  next();
};
