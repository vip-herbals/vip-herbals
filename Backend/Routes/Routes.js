const express = require("express");
const { postFlatData, getAllflats, flatDataId, getflatSearch, editFlate, deleteFlate } = require("../Controllers/flatDataControllers")
const router = express.Router();

router.post("/flat", postFlatData)

router.get("/flats/all", getAllflats)

router.get("/flatDataId", flatDataId)

router.get("/flat/search", getflatSearch)

router.post("/flate/edit/:id", editFlate)

router.delete("/flate/delete/:id", deleteFlate)

module.exports = router