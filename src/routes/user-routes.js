const { Router } = require("express");
const userRouter = Router();
const verifyToken=require("../utils/auth-middlware")
const UserController = require("../controllers/1user");

userRouter.post("/create/", UserController.createUser);
userRouter.get("/getAll/", verifyToken,UserController.getAllUsers);
userRouter.post("/login/", UserController.login);
userRouter.patch("/update/:_id", UserController.UpdateUserByUsername);

module.exports = userRouter;
