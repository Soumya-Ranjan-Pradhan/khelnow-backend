import videoModel from "../model/Videos.js";

// Create a new video
const createVideos = async (req, res) => {
  const { videoUrl, caption, sportsType, thumbnailUrl, duration, userId } =
    req.body;

  if (!videoUrl || !caption || !sportsType || !thumbnailUrl || !duration || !userId) {
    return handleError(res, 422, "Please fill in all the fields properly");
  }

  try {
    const videoExist = await videoModel.findOne({
      videoUrl,
      caption,
      sportsType,
      thumbnailUrl,
      duration,
      userId,
    });

    if (videoExist) {
      return handleError(res, 400, "Video already exists");
    }

    const newVideo = new videoModel({
      videoUrl,
      caption,
      sportsType,
      thumbnailUrl,
      duration,
      userId,
    });

    await newVideo.save();

    return res.status(201).json({ message: "Video created successfully" });
  } catch (err) {
    console.error(err);
    return handleError(res, 500, "Failed to create Video");
  }
};

// Get a list of all videos
const AllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();
    return res.status(200).json(videos);
  } catch (error) {
    return handleError(res, 500, "Internal Server Error");
  }
};

// Get a specific video by ID
const getVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.videoId);
    if (!video) {
      return handleError(res, 404, "Video not found");
    }
    return res.status(200).json(video);
  } catch (error) {
    return handleError(res, 500, "Internal Server Error");
  }
};

// Update a video
const updatesVideo = async (req, res) => {
  try {
    const updatedVideo = await videoModel.findByIdAndUpdate(
      req.params.videoId,
      req.body,
      { new: true }
    );
    if (!updatedVideo) {
      return handleError(res, 404, "Video not found");
    }
    return res.status(200).json(updatedVideo);
  } catch (error) {
    return handleError(res, 500, "Internal Server Error");
  }
};

// Delete Videos
const deleteVideos = async (req, res) => {
  try {
    const deletedVideo = await videoModel.findByIdAndRemove(req.params.videoId);
    if (!deletedVideo) {
      return handleError(res, 404, "Video not found");
    }
    return res.status(204).json();
  } catch (error) {
    return handleError(res, 500, "Internal Server Error");
  }
};

export { createVideos, AllVideos, getVideo, updatesVideo, deleteVideos };