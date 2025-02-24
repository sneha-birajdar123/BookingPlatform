import jwt from "jsonwebtoken";
import config from "config";

const jwt_secret = config.get("JWT_SECRET")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);

    const token = authHeader.split(" ")[1];
    console.log(token);
    

    try {
        const decoded = jwt.verify(token, jwt_secret)
        req.user = decoded
        next()
    } catch (error) {
        console.error("Invalid token:", error);
    return res.status(401).json({ msg: "Invalid token" });
    }
}

export default authMiddleware












// import jwt from "jsonwebtoken";
// import config from "config";

// const jwt_secret = config.get("JWT_SECRET");

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
    
//     // Check if Authorization header exists
//     if (!authHeader) {
//         return res.status(401).json({ msg: "Authorization header is missing" });
//     }

//     // Split the token from the 'Bearer <token>' format
//     const token = authHeader.split(" ")[1];
    
//     // Check if token exists
//     if (!token) {
//         return res.status(401).json({ msg: "Token is missing" });
//     }

//     try {
//         // Verify the token with the secret
//         const decoded = jwt.verify(token, jwt_secret);
        
//         // Attach decoded user data to request object
//         req.user = decoded;
        
//         // Move to the next middleware
//         next();
//     } catch (error) {
//         console.error("Token verification failed:", error);

//         // Handle different types of JWT errors
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ msg: "Token has expired" });
//         } else if (error.name === "JsonWebTokenError") {
//             return res.status(401).json({ msg: "Invalid token" });
//         } else {
//             return res.status(401).json({ msg: "Authentication failed" });
//         }
//     }
// };

// export default authMiddleware;
