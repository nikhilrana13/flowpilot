import User from "../models/UserModel.js";
import WorkSpace from "../models/WorkSpace.js";
import { Response } from "../utils/responseHandler.js";

// create workspace
export const CreateWorkspace = async (req, res) => {
  try {
    const userId = req.user;
    const { spacename } = req.body;
    // validation
    if (!spacename?.trim()) {
      return Response(res, 400, "Space Name is Required");
    }
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // check workspace already exists or not
    const existingWorkspace = await WorkSpace.findOne({
      userId,
      spacename,
    });
    if (existingWorkspace) {
      return Response(res, 409, "Workspace already exists");
    }
    // count user workspace
    const count = await WorkSpace.countDocuments({ userId });
    if (count >= 5) {
      return Response(res, 403, "Workspace limit reached");
    }
    // create workspace
    const workspace = await WorkSpace.create({
      userId: user._id,
      spacename: spacename.trim(),
    });
    return Response(res, 201, "Workspace created successfully", { workspace });
  } catch (error) {
    console.error("Failed to created workspace", error);
    return Response(res, 500, "Internal server error");
  }
};
// Get user workspaces 
export const GetMyWorkspaces = async (req, res) => {
  try {
    const userId = req.user;
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    }
    // find user workspaces
    const workspaces = await WorkSpace.find({userId}).sort({createdAt:-1}).lean().select("_id spacename")
    return Response(res,200,"workspaces fetched successfully",{workspaces})
  } catch (error) {
    console.error("Failed to get workspaces", error);
    return Response(res, 500, "Internal server error");
  }
};


