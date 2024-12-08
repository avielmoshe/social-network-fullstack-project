import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import JWT from "jsonwebtoken";
const JWT_EXPIRATION = { expiresIn: "1h" };

export const TokenValid = (req, res) => {
  try {
    res.status(200).send({
      id: req.user._id,
      username: req.user.username,
      profile: req.user.profile,
      bio: req.user.bio,
      nickname: req.user.nickname,
      email: req.user.email,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Something went wrong. Please try again later." });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .send({ error: "email ,username and password are required" });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({
      status: "success",
      message: "User Succefully Regitered",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const singInUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!password || (!email && !username)) {
    return res
      .status(400)
      .send({ error: "email/username and password is required" });
  }
  try {
    const foundUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!foundUser) {
      return res.status(404).send({ error: "Email not found." });
    }

    const isAuth = await comparePassword(password, foundUser.password);
    if (!isAuth) {
      return res.status(401).send({ error: "Invalid password." });
    }

    const { _id, username, email, createdAt, profile, bio, nickname } =
      foundUser;
    const filteredUser = {
      _id,
      username,
      email,
      createdAt,
      profile,
      bio,
      nickname,
    };

    const token = JWT.sign(filteredUser, process.env.JWT_KEY, JWT_EXPIRATION);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.status(200).send({
      message: "Authentication successful",
      isAuth: true,
      username: username,
      token: token,
      foundUser : foundUser,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res
      .status(500)
      .send({ error: "Something went wrong. Please try again later." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { newUsername, newEmail, profile, nickname, bio, newPassword } =
      req.body;

    const existingUser = await User.findOne({
      $or: [{ username: newUsername }, { email: newEmail }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const id = req.user._id;
    const updateData = {};
    if (newUsername) updateData.username = newUsername;
    if (newEmail) updateData.email = newEmail;
    if (newPassword) updateData.password = newPassword;
    if (profile) updateData.profile = profile;
    if (nickname) updateData.nickname = nickname;
    if (bio) updateData.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    const user = await User.findById(id);
    console.log(updatedUser);

    try {
      const token = JWT.sign(
        {
          _id: user._id,
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          bio: user.bio,
          profile: user.profile,
        },
        process.env.JWT_KEY,
        JWT_EXPIRATION
      );

      res.cookie("jwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.status(201).send({
        message: "user updated successfully",
        updatedUser,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("error creating token");
    }
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).send({
      message: "user deleted successfully",
      deleteUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
