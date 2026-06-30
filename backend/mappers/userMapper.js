
export const UserMapper = (user)=>({
    _id:user._id,
    fullname: user.fullname,
    workemail:user.workemail,
    onboarding:user.onboarding,
    isActive:user.isActive,
    isOnboardingCompleted:user.isOnboardingCompleted
})

