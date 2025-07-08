import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "not token is provided" });

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({ message: "token is not provided" });
    }
};
