import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import routes from "./routes.js";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import typeDefs from "./graphql/index.js";
import resolvers from "./resolver/index.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/verifyToken.js";
// import multer from "multer";
// import AWS from "aws-sdk"

// AWS.config.update({
//   accessKeyId: "AKIAXL3NMJXCH2K2RK7Z",
//   secretAccessKey: "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",
//   region: "us-east-1",
// });  

// const s3 = new AWS.S3();

// const upload = multer();

dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);


// app.post("/api/upload/videos", upload.single('videoFile'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//       return res.status(400).send("No file uploaded");
//   }

//   const myBucket = "soumyaranjanpradhan";
//   const myKey = `videos/${file.originalname}`;
  
//   const params = {
//       Bucket: myBucket,
//       Key: myKey,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//   };

//   s3.upload(params, (err, data) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send("Error uploading file to S3");
//       }

//       const awsURL = data.Location;
//       res.json({ awsURL });
//   });
// });

// app.get("/api/getVideo/:filename", (req, res) => {
//   const myBucket = "soumyaranjanpradhan";
//   const filename = req.params.filename;

//   const params = {
//       Bucket: myBucket,
//       Key: `videos/${filename}`,
//       Expires: 3600, 
//   };

//   s3.getSignedUrl("getObject", params, (err, url) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send("Error generating signed URL");
//       }

//       res.json({ url });
//   });
// });



app.use(verifyToken);

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req, res }) => ({ req, res }), 

    context: ({ req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_TOKEN);
          return {
            userId: decoded._id,
          };
        } catch (error) {
          throw new AuthenticationError('Invalid token');
        }
      }
      return {};
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
  });
};

serverStart().catch((error) => {
  console.error("Error starting server:", error);
});
