// import aws from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-s3";

// const s3 = new aws.S3({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.S3_BOCKET_RESION,
// });

// const upload = (bucketName) =>{
//     multer({
//         storage: multerS3({
//           s3,
//           bucket: bucketName,
//           metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.filename });
//           },
//           key: function(req,file,cb){
//             cb(null, 'image.jpeg')
//           }
//         }),
//       });
// }

// const setProfilePic = (req, res, next) => {
//   console.log(req.files);

// const uploadsingle = upload("khelnowproject").single('image-upload')
// uploadsingle(req,res,err => {
//     if(err) return res.status(400).json({success:false, message:err.message})
//     console.log(req.files)

//     res.status(200).json({data:req.files})
// })
// };

// export default setProfilePic;
