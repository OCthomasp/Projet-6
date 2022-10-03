const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorize");
const multer = require("../middleware/multer-config");

const sauceController = require("../controllers/sauce");

// route to get a sauce
router.get("/:id", authorize, sauceController.getOneSauce);

// route to get all sauces
router.get("/", authorize, sauceController.getAllSauces);

// route to add a new sauce
router.post("/", authorize, multer, sauceController.createSauce);

// route to update a sauce
router.put("/:id", authorize, multer, sauceController.modifySauce);

// route to delete a sauce
router.delete("/:id", authorize, sauceController.deleteSauce);

// route to like or dislike a sauce
router.post("/:id/like", authorize, sauceController.likeDislikeSauce);

module.exports = router;