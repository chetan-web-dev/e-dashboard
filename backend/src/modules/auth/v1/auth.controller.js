const AuthService = require('./auth.service');
const { hashToken } = require('../../../utils/token.util');

async function login(req, resp, next) {
    const resObj = { success: false, message: null, data: null, token: null };
    try {
        const user = await AuthService.login(req.body);
        const { id, email } = user;
        resObj.success = true;
        resObj.message = 'Login successful';
        resObj.data = { id, email };
        resObj.token = user.accessToken;

        // Set refresh token in HttpOnly cookie
        resp.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // true in production (HTTPS)
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return resp.status(200).json(resObj)        
    } catch (error) {
        next(error);
    }
}

async function logout(req, resp, next) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return resp.status(200).json({
                success: true,
                message: "Already logged out"
            });
        }

        const hashedToken = hashToken(token);
        const result = AuthService.clearUserToken(hashedToken);
        resp.clearCookie("refreshToken");

        return resp.status(200).json({
            success: true,
            message: (await result).matchedCount === 1
                        ? "Logged out successfully"
                        : "Already logged out"
        });

    } catch (error) {
        next();
    }
};

async function refreshToken(req, resp, next) {
    const resObj = { success: false, message: null, token: null };

    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            resObj.message = 'No refresh token provided';
            return resp.status(401).json(resObj)   
        }
        
        const { accessToken, refreshToken } = await AuthService.refreshToken(token);        
        resObj.success = true;
        resObj.message = 'New token generated successfully';
        resObj.token = accessToken;                

        resp.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return resp.status(200).json(resObj)     
    } catch (error) {
        next(error);
    }
}

async function updateProfile(req, resp) {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let user = null;
    try {
        const authId = req.params.id;
        console.log(`AuthId:`,authId);
        const updatedData = req.body;

        const result = AuthService.updateProfile(authId, updatedData);
        console.log(result)


        if (req.body.email && req.body.password) {
            user = await User.findOne(req.body).select("-password");
            response.message = 'No user found';
            if (typeof user._id != undefined) {
                response.message = 'User Found';
                response.status = true;
                response.error = false;
            }
            response.result = user;
        } else {
            response.message = 'Requested data invalid';
        }
        response.requestBody = req.body;
    } catch (error) {
        console.log('error::')
        console.log(error)
    }
    resp.send({ response });
}

module.exports = { 
    login, 
    logout,
    refreshToken,
    updateProfile    
}