const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const multer = require("multer");
const mimeTypes = require("mime-types");
const permission = require("../middlewares/permission");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "cv");
  },

  filename: function (req, file, cb) {
    cb(
      "",
      Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({
  storage: storage,
});


//requests with jobs
router.get("/", async (req, res) => {
  console.log("entra")
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ["id"],
    where: {
      professionalId: req.user.id,
    },
  });
  const request = await sequelize.models.requests.findAll({
    include: [
      {
        model: sequelize.models.jobs,
        include: [
          {
            model: sequelize.models.recruiters,
            attributes: ["company_name", "description"],
          },
        ],
      },
    ],
    where: {
      candidateId: candidate.id,
    }
  });
  request.cv =
    `https://get-that-job-backend.herokuapp.com` +
    "/static2/" +
    req.file.filename;
    
  console.log(request)
  return res.status(200).json({ data: request });
});

// Get request General of candidate
// router.get("/:id", permission("recruiter", "professional"),async (req, res) => {
//     const {
//       params: { id },
//     } = req;
//     // const candidate = await sequelize.models.candidates.findOne({
//     //   attributes: ["id"],
//     //   where: {
//     //     professionalId: req.user.id,
//     //   },
//    // });
//     const request = await sequelize.models.requests.findOne({
//       where: {
//         id: id
//       },
//     });
//     console.log("general")
//     return res.status(200).json({ data: request });
//   }
// );

//requests with candidate
router.get("/candidate", async (req, res) => {
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ["id"],
    where: {
      professionalId: req.user.id,
    },
  });
  const request = await sequelize.models.requests.findAll({
    include: [
      {
        model: sequelize.models.candidates,
      },
    ],
    include: [
      {
        model: sequelize.models.jobs,
        attributes: ["title"],
      },
    ],
    where: {
      candidateId: candidate.id,
    },
  });
  return res.status(200).json({ data: request });
});


router.get("/exists:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const candidate = await sequelize.models.candidates.findOne({
    attributes: ["id"],
    where: {
      professionalId: req.user.id,
    },
  });

  const job = await sequelize.models.requests.findOne({
    where: {
      candidateID: candidate.id,
      jobId: id,
    },
  });

  if (job) {
    return res.status(201).json("exists");
  } else {
    return res.status(201).json("noexists");
  }
});

// Creating a new request
router.post("/", upload.single("cv"), async (req, res) => {
  const { body } = req;
  console.log("archivo", req.file.filename);
  console.log(body);
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ["id"],
    where: {
      professionalId: req.user.id,
    },
  });

  const request = await sequelize.models.requests.create({
    candidateId: candidate.id,
    jobId: body.job,
    cv: req.file.path,
    experience: body.experience,
    interest: body.interest,
  });

  await request.save();
  request.cv =
    `https://get-that-job-backend.herokuapp.com` +
    "/static2/" +
    req.file.filename;
  console.log(request.cv);
  return res.status(201).json({ data: request });
});

// Update a request by id
router.put("/:id", upload.single("cv"), async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const request = await sequelize.models.requests.findByPk(id);
  if (!request) {
    return res.status(404).json({ code: 404, message: "request not found" });
  }
  const updatedrequest = await request.update({
    cv: req.file.path,
    experience: body.experience,
    interest: body.interest,
  });
  return res.json({ data: updatedrequest });
});

// // Delete a review by id
// router.delete('/:id', async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const review = await sequelize.models.reviews.findByPk(id);
//   if (!review) {
//     return res.status(404).json({ code: 404, message: 'Review not found' });
//   }
//   await review.destroy();
//   return res.json();
// });

module.exports = router;
