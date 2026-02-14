import crypto from "crypto";
import ApiKey from "../models/ApiKey.js";
import Project from "../models/Project.js";

const generateKey = () => {
  // sk_live_xxxxxxxxxxxxxxxxx
  return "sk_live_cortex" + crypto.randomBytes(24).toString("hex");
};

const generateClientId = () => {
  // gen-lang-client-xxxxxxxx
  return "gen-lang-client-" + crypto.randomBytes(6).toString("hex");
};



export const createApiKey = async (req, res) => {
  try {
    const { name, projectId } = req.body;

    if (!name || !projectId) {
      return res.status(400).json({
        message: "Name and project required",
      });
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const apiKey = await ApiKey.create({
      name,
      projectId,
      key: generateKey(),
      clientId: generateClientId(),
    });

    res.status(201).json({
      message: "API key created",
      apiKey,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getApiKeys = async (req, res) => {
  try {
    // get only projects belonging to user
    const userProjects = await Project.find({
      userId: req.user.userId,
    }).select("_id");

    const projectIds = userProjects.map(p => p._id);

    const apiKeys = await ApiKey.find({
      projectId: { $in: projectIds }
    })
      .populate("projectId", "name")
      .sort({ createdAt: -1 });

    const formatted = apiKeys.map((key) => ({
      _id: key._id,
      name: key.name,
      projectName: key.projectId?.name,
      clientId: key.clientId,
      createdAt: key.createdAt,
      tier: "Free",
      billingStatus: "Set up billing",
      maskedKey: "••••" + key.key.slice(-4),
      fullKey : key.key,
    }));

    res.json({
      success: true,
      apiKeys: formatted,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load API keys",
    });
  }
};
