import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export class AuthController {
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return this.sendError(response);
    }

    let passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      return this.sendError(response);
    }

    let accessToken = sign(
      {
        userId: user.id,
        email: user.email
      },
      "secret123",
      {
        expiresIn: "15m"
      }
    );

    return response.json({
      success: true,
      message: "User log in success",
      data: {
        user: {
          id: user.id,
          full_name: user.fullname,
          email: user.email
        },
        accessToken
      }
    });
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async currentUser(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.json({
        message: "No token provided"
      });
    }

    const token = tokenHeader.split(" ")[1];

    try {
      const payload = verify(token, "secret123");
      const user = payload as any;

      const { email, userId } = user;

      res.json({
        email,
        userId
      });
    } catch (e) {
      return res.status(401).json({ success: false, message: e.message });
    }
  }

  /**
   * Send error message in case of invalid credentials.
   * @param response
   */
  private sendError(response: Response) {
    return response.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
}
