import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
export const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware reached");
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
        }
        catch (error) {
            console.error("Error occurred while extracting token:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        //Verify token and extract user Id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
    }
    catch (error) {
        console.error("Error occurred while verifying token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
    next();
};
//# sourceMappingURL=authMiddleware.js.map