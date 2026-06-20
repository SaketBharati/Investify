const express = require("express");

const authMiddleware =
  require("../middleware/authmiddleware");

const {
  HoldingsModel,
} = require("../model/HoldingsModel");

const router = express.Router();

router.get("/addHoldings", authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({
    userId: req.user.id,
  });
  res.json(allHoldings);
});

router.get("/holding/:name", authMiddleware, async (req, res) => {
  const holding = await HoldingsModel.findOne({
    name: req.params.name,
    userId: req.user.id,
  });

  if (!holding) {
    return res.status(404).json({
      message: "Holding not found",
    });
  }

  res.json(holding);
});

module.exports = router;