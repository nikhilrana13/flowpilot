import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {type: String,required: true,maxlength: 20,lowercase: true,trim: true},
    workemail: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true},
    onboarding: {
      categoryliketoautomate: {type: String,enum: ["sales","marketing","customersupport","hrpeople","finance","other",],default:null,
      },
      technicalexperience: {
        type: String,
        enum: ["begineer", "intermediate", "advanced"],
        default:null,
      },
      sizeofworkspace: {
        type: String,
        enum: [
          "justme",
          "2-10",
          "11-50",
          "51-200",
          "201-500",
          "501-2000",
          "1000+",
        ],
        default:null,
      },
    },
    isActive: { type: Boolean, default: false },
    isOnboardingCompleted:{type:Boolean,default:false}
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
