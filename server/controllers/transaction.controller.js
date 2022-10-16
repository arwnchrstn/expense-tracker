const User = require("../models/user.model");
const cookieOptions = require("../utils/cookie.options");
const transactionValidator = require("../utils/validators/transaction.validator");

//add balance controller
//status codes: (200, 400, 404, 500)
const addBalance = async (req, res) => {
  try {
    const { addBalance } = req.body;
    const existingUser = await User.findById(req.user, "-password");

    //validate balance amount to be added
    if ((addBalance <= 0 && addBalance > 1000000) || !addBalance)
      return res.status(400).json({
        message:
          "Amount must be greater than 0 and less than or equal to 1000000"
      });

    //update balance
    existingUser.balance += addBalance;
    const savedData = await existingUser.save();

    //return the updated balance and transactions
    res.json({
      balance: savedData.balance,
      transactions: savedData.transactions
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//add transaction controller
//status codes: (200, 400, 404, 500)
const addTransaction = async (req, res) => {
  try {
    const { error, value } = transactionValidator(req.body);
    const existingUser = await User.findById(req.user, "-password");

    //check is there is an error in the request body
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    //save the transaction to database
    let savedData;
    if (value.type === "income") {
      existingUser.balance += value.amount;
      existingUser.transactions.unshift(value);
      savedData = await existingUser.save();
    } else if (value.type === "expense") {
      //check if the balance is sufficient
      if (existingUser.balance - value.amount < 0)
        return res.status(400).json({
          message: "Not enough balance. Unable to complete this transaction"
        });

      existingUser.balance -= value.amount;
      existingUser.transactions.unshift(value);
      savedData = await existingUser.save();
    }

    res.json({
      balance: savedData.balance,
      transactions: savedData.transactions
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//get account overview controller
const getOverview = async (req, res) => {
  try {
    const overview = await User.getOverview(req.user);
    res.send(overview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  addBalance,
  addTransaction,
  getOverview
};
