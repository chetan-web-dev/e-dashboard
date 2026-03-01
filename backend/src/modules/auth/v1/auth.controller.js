const AuthService = require('./auth.service');
const { formatError } = require('../../../utils/errorFormatter');

async function login(req, resp) {
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
        return resp.status(error.status || 500).json({
            success: false,
            message: formatError(error)
        });
    }
}

async function updateProfile(req, resp) {
    const response = { status: false, error: true, result: null, requestBody: null, message: null };
    let user = null;
    try {
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

module.exports = { login, updateProfile  }