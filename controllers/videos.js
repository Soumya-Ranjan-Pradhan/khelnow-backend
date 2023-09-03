import videoModel from "../model/Videos.js";

// Create a new video
const createVideos = async (req, res) => {
  const { videoUrl, caption, sportsType, thumbnailUrl, duration, userId } =
    req.body;

  if (
    !videoUrl ||
    !caption ||
    !sportsType ||
    !thumbnailUrl ||
    !duration ||
    !userId
  ) {
    return res
      .status(422)
      .json({ error: "Please fill in all the fields properly" });
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
      return res.status(400).json({ error: "Video already exists" });
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

    res.status(201).json({ message: "Video created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Video" });
  }
};

// Get a list of all videos
const AllVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific video by ID
const getVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete Videos
const deleteVideos = async (req, res) => {
  try {
    const deletedVideo = await videoModel.findByIdAndRemove(req.params.videoId);
    if (!deletedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createVideos, AllVideos, getVideo, updatesVideo, deleteVideos };
