import UserProfileModel from "../model/UserProfile.js";

const resolvers = {
  Query: {
    getUserProfile: async (_, { userId }) => {
      try {
        const userProfile = await UserProfileModel.findOne({ userId });
        return userProfile;
      } catch (error) {
        throw new Error("Fetching user profile");
      }
    },
  },
  Mutation: {
    createProfile: async (_, { userProfileInput }) => {
      try {
        const userProfile = new UserProfileModel(userProfileInput);
        await userProfile.save();
        return userProfile;
      } catch (error) {
        throw new Error("Error creating user profile");
      }
    },
    updateProfile: async (_, { userId, userProfileInput }) => {
      try {
        const userProfile = await UserProfileModel.findOneAndUpdate(
          { userId },
          userProfileInput,
          { new: true }
        );
        if (!userProfile) {
          throw new Error("User profile not found");
        }
        return userProfile;
      } catch (error) {
        throw new Error("Error updating user profile");
      }
    },
    deleteProfile: async (_, { userId }) => {
      try {
        const userProfile = await UserProfileModel.findOneAndDelete({ userId });
        if (!userProfile) {
          throw new Error("User profile not found");
        }
        return userProfile;
      } catch (error) {
        throw new Error("Error deleting user profile");
      }
    },
  },
};

export default resolvers;
