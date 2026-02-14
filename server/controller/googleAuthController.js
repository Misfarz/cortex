import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    // verifying the token which recieved from google(client ID) that send from client side
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    //extracting all the infos from the verified token
    const payload = ticket.getPayload();

    const {
      sub: googleId,
      email,
      name,
      picture,
    } = payload;

    
    let user = await User.findOne({ googleId });

   
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        picture,
      });
    }

 
    user.lastLogin = new Date();
    await user.save();

    // create server token which giving back to the client side
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      error: "Google authentication failed",
    });
  }
};
