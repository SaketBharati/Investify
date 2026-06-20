const express = require("express");

const authMiddleware =
  require("../middleware/authmiddleware");

const {
  HoldingsModel,
} = require("../model/HoldingsModel");

const {
  OrdersModel,
} = require("../model/OrdersModel");

const {
  UsersModel,
} = require("../model/UsersModel");

const router = express.Router();

router.post("/newOrder", authMiddleware, async (req, res) => {
  try {

    const { name, qty, price, mode } = req.body;

    const user = await UsersModel.findById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (mode === "BUY") {

      const totalCost =
        Number(qty) * Number(price);

      if (user.balance < totalCost) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Balance",
        });
      }

      user.balance -= totalCost;
      await user.save();

      let holding =
        await HoldingsModel.findOne({
          name,
          userId: req.user.id,
        });

      if (holding) {

        const totalQty =
          holding.qty + Number(qty);

        const avgPrice =
          (
            holding.avg * holding.qty +
            price * qty
          ) / totalQty;

        holding.qty = totalQty;
        holding.avg = avgPrice;

        await holding.save();

      } else {

        await HoldingsModel.create({
          userId: req.user.id,
          name,
          qty,
          avg: price,
          price,
          net: "+0.00%",
          day: "+0.00%",
        });

      }

    }

    else if (mode === "SELL") {

      let holding =
        await HoldingsModel.findOne({
          name,
          userId: req.user.id,
        });

      if (!holding) {
        return res.status(400).json({
          success: false,
          message:
            "You don't own this stock",
        });
      }

      if (
        holding.qty < Number(qty)
      ) {
        return res.status(400).json({
          success: false,
          message:
            `Only ${holding.qty} shares available`,
        });
      }

      const totalValue =
        Number(qty) * Number(price);

      user.balance += totalValue;

      await user.save();

      holding.qty -= Number(qty);

      if (holding.qty === 0) {

        await HoldingsModel.deleteOne({
          _id: holding._id,
        });

      } else {

        await holding.save();

      }

    }

    else {

      return res.status(400).json({
        success: false,
        message: "Invalid order type",
      });

    }

    const order = new OrdersModel({
      userId: req.user.id,
      name,
      qty,
      price,
      mode,
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message:
        `${mode} order placed successfully`,
      order,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
});

router.get("/orders", authMiddleware, async (req, res) => {
  const orders = await OrdersModel.find({
    userId: req.user.id,
  });
  res.json(orders);
});

module.exports = router;