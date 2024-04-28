const express = require("express");
const path = require("path");
const symbolmodel = require("../models/symbolmodel");
const router = express.Router();
const ErrorHandler = require("../utils/Errorhandler.js");
const multer = require("multer");
const { sendToken } = require("../utils/sendToken.js");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

async function uploadImages(files) {
  let images = [];
  try {
    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      let image = {
        public_id: result.original_filename,
        url: result.secure_url,
      };
      images.push(image);
      deletefile(result.originalname);
    }
    // console.log("images is", images);
    // Now you can work with the 'images' array after all uploads are done
    return images;
  } catch (err) {
    console.error(err);
    return [];
  }
}

router.post(
  "/symbol/registersymbol",
  upload.array("files", 2),
  async (req, res, next) => {
    try {
      let images = await uploadImages(req.files);
      // console.log("req.files is:", req.files);
      // req.files.map((file, index) => {
      //   cloudinary.uploader.upload(file.path, async function (err, result) {
      //     if (err) {
      //       console.log(err);
      //       return res.status(500).json({
      //         success: false,
      //         message: "Error",
      //       });
      //     }
      //     let image = { public_id: result.public_id, url: result.url };
      //      images.push({ ...image });
      //     // console.log(`Image${index} result is:`, result);
      //     deletefile(result.originalname);
      //   });
      // });
      // console.log("images is", images);
      //   if(req.file)
      //   {

      //     cloudinary.uploader.upload(req.file.path, function (err, result) {
      //       if (err) {
      //       console.log(err);
      //       return res.status(500).json({
      //         success: false,
      //         message: "Error",
      //       });
      //     }
      //     console.log("Image result is:", result);
      //   });

      // }
      // console.log("req.body is :", req.body);
      const { party_name, code, chairman, symbol_name } = req.body;
      if (!party_name || !code || !req.files || !chairman || !symbol_name) {
        if (req.files) {
          req.files.map((file, index) => {
            deletefile(file.filename);
          });
        }
        return res
          .status(400)
          .json({ success: false, message: "Please Fill All Required Fields" });
      }
      const existsymbol = await symbolmodel.findOne({
        $or: [
          { code: code },
          { party_name: party_name },
          { symbol_name: symbol_name },
        ],
      });
      if (existsymbol) {
        // console.log("Symbol Already Exists!");
        req.files.map((file, index) => {
          deletefile(file.filename);
        });
        // deletefile(req?.file?.filename);
        return res
          .status(400)
          .json({ success: false, message: "This Symbol Already Registered" });
      }
      await symbolmodel.create({
        party_name,
        symbol_name,
        code,
        image: images,
        chairman,
      });
      // req.files.map((file)=>{
      //  return { public_id: file.originalname, url: file.filename }
      // }),
      return res.status(200).json({
        success: true,
        message: `${party_name} symbol created successfully`,
      });
    } catch (error) {
      // return res.status(200).json({ success: false });
      // console.log(error);
      // console.log(error.message);
      return res.status(500).json({
        success: false,
        message: "Something Went Wrong",
        error: error.message,
      });
    }
  }
);

function deletefile(filename) {
  // console.log("to delete file filename i s:", filename);
  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) {
      return "Image Not Deleted!";
    }
    // console.log('File deleted successfully');
  });
  return "image Deleted Successfully;";
}

router.delete("/symbol/deletesymbol/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "symbol code not recieved!" });
    }
    const deletesymbolresult = await symbolmodel.findOneAndDelete({ _id: id });
    if (!deletesymbolresult) {
      return res
        .status(400)
        .json({ success: false, message: "no symbol exist with this code" });
    }
    deletefile(deletesymbolresult.image.url);
    return res.status(200).json({
      success: true,
      message: "Symbol deleted Successfully!",
      symbol: deletesymbolresult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
router.put("/symbol/updatesymbol/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;
    // console.log("req.bod.name", req.body.name);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id Not recieved" });
    }
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Please FIll the All Required Fields!",
      });
    }
    const updatedresult = await symbolmodel.findByIdAndUpdate(
      id,
      { name, code },
      { new: true }
    );
    if (!updatedresult) {
      return res
        .status(400)
        .json({ success: false, message: "not Any symbol Exist With this ID" });
    }
    return res.status(200).json({
      success: true,
      message: "Symbol Updated Successfullly!",
      symbol: updatedresult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Internal Server Error! ",
      error: error.message,
    });
  }
});
router.get("/getsymbols", async (req, res, next) => {
  try {
    const symbols = await symbolmodel.find().limit(5);
    return res.status(200).json({
      success: true,
      symbols,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Problem wait to resolve",
      error: error.message,
    });
  }
});
module.exports = router;
