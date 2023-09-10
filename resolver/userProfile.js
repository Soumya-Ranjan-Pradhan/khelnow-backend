import UserProfileModel from '../model/UserProfile.js';

const resolvers = {
  Query: {
    getUserProfile: async (_, { userId }) => {
      try {
        const userProfile = await UserProfileModel.findOne({ userId });
        return userProfile;
      } catch (error) {
        throw new Error('Failed to fetch user profile');
      }
    },
    getAllUserProfiles: async () => {
      try {
        const userProfiles = await UserProfileModel.find();
        return userProfiles;
      } catch (error) {
        throw new Error('Failed to fetch user profiles');
      }
    },
  },
  Mutation: {
    createProfile: async (_, { userProfileInput }) => {
      try {
      
        const existingUserProfile = await UserProfileModel.findOne({
          userId: userProfileInput.userId,
        });
    
        if (existingUserProfile) {
          throw new Error('User profile with this userId already exists');
        }
    
        const userProfile = new UserProfileModel(userProfileInput);
        await userProfile.save();
        return userProfile;
      } catch (err) {
        throw new Error(err.message || 'Failed to create user profile');
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
          throw new Error('User profile not found');
        }
        return userProfile;
      } catch (error) {
        throw new Error('Failed to update user profile');
      }
    },
    deleteProfile: async (_, { userId }) => {
      try {
        const userProfile = await UserProfileModel.findOneAndDelete({ userId });
        if (!userProfile) {
          throw new Error('User profile not found');
        }
        return userProfile;
      } catch (error) {
        throw new Error('Failed to delete user profile');
      }
    },
  },
};

export default resolvers;
