import Project from "../models/Project.js";
import mongoose from "mongoose";

export const createProject = async (req, res) => {
  try {
    const { name} = req.body;

    console.log("USER:", req.user);


    // 1️⃣ Basic validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    // 2️⃣ Prevent duplicate project names for same user
    const existingProject = await Project.findOne({
      name: name.trim(),
      userId: req.user.userId,
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "Project with this name already exists",
      });
    }

    // 3️⃣ Create project
    const project = await Project.create({
      name: name.trim(),
      userId: req.user.userId,
    });

    // 4️⃣ Response
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error("Create Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
    });
  }
};



export const getProjects = async (req, res) => {
  try {

    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(
      req.user.userId
    );

    const projects = await Project.aggregate([
      {
        $match: { userId: userObjectId }
      },
      {
        $lookup: {
          from: "apikeys",
          localField: "_id",
          foreignField: "projectId",
          as: "keys"
        }
      },
      {
        $addFields: {
          keysCount: { $size: "$keys" }
        }
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          keysCount: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    console.error("AGGREGATION ERROR:", error); // IMPORTANT
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
