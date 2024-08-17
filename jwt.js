
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    //First check request header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({ error: 'Token not Found' });


    // Extract the JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1];  // Add optional chaining to handle potential undefined values
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: '1h'});
};

module.exports = { jwtAuthMiddleware, generateToken };
