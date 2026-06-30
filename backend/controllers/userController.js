import { UserMapper } from "../mappers/userMapper.js";
import User from "../models/UserModel.js";
import { Response } from "../utils/responseHandler.js";

// On boarding user
export const OnBoardingUser = async (req, res) => {
  try {
    const userId = req.user;
    const { categoryliketoautomate, technicalexperience, sizeofworkspace } = req.body;
    // validation
    const allowedFields = ["categoryliketoautomate","technicalexperience","sizeofworkspace"];
    for(let field of allowedFields){
        if(!req.body[field]){
            return Response(res, 400, `${field} is Required`);
        }
    }
    //check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 401, "User not found");
    } 
    if(user?.isOnboardingCompleted === true){
        return Response(res,409,"OnBoarding details already filled")
    }
    // update user 
    const updatedUser = await User.findByIdAndUpdate(userId,{
        onboarding:{
            categoryliketoautomate,
            technicalexperience,
            sizeofworkspace 
        },
        isOnboardingCompleted:true
    },{new:true})
    return Response(res,200,"OnBoarding successfully",{user:UserMapper(updatedUser)})
  } catch (error) {
    console.error("Failed to On boarding user", error);
    return Response(res,500, "Internal server error");
  }
};
