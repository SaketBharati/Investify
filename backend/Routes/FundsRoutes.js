const express = require("express");

const authMiddleware =
  require("../middleware/authmiddleware");

const {
  UsersModel,
} = require("../model/UsersModel");

const {
  OrdersModel,
} = require("../model/OrdersModel");

const router = express.Router();

router.get("/addPositions", authMiddleware, async (req, res) => {

  const allPositions =
    await OrdersModel.find({
      userId: req.user.id
    }).sort({
      createdAt: -1
    });

  res.json(allPositions);
});
router.get("/balance", authMiddleware, async (req, res) => {

  try {

    const user =
      await UsersModel.findById(
        req.user.id
      );

    res.json({
      balance: user.balance,
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});

router.post(
  "/addFunds",
  authMiddleware,
  async (req, res) => {

    try {

      const { amount } = req.body;

      const user =
        await UsersModel.findById(
          req.user.id
        );

      user.balance += Number(amount);

      await user.save();

      res.json({
        success: true,
        balance: user.balance,
        message:
          "Funds added successfully",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: "Server Error",
      });

    }

  }
);

router.post(
  "/withdrawFunds",
  authMiddleware,
  async (req, res) => {

    try {

      const { amount } = req.body;

      const user =
        await UsersModel.findById(
          req.user.id
        );

      if (
        user.balance < Number(amount)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Insufficient Balance",
        });

      }

      user.balance -= Number(amount);

      await user.save();

      res.json({
        success: true,
        balance: user.balance,
        message:
          "Funds withdrawn successfully",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: "Server Error",
      });

    }

  }
);

module.exports = router;