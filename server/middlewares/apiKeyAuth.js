import ApiKey from "../models/ApiKey.js";

const apiKeyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({
        message: "API key required",
      });

    const apiKey = authHeader.split(" ")[1];

    const keyDoc = await ApiKey.findOne({
      key: apiKey,
      isActive: true,
    }).populate("projectId");

    if (!keyDoc) {
      return res.status(401).json({
        message: "Invalid API key",
      });
    }

    req.apiKey = keyDoc;
    req.project = keyDoc.projectId;

    next();
  } catch (err) {
    res.status(500).json({ message: "Auth error" });
  }
};

export default apiKeyAuth;
