exports.getProgress = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ progress: user.progress });
};

