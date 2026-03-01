const bcrypt = require('bcrypt');
const Auth = require('../../user/v1/user.model');
const { hashToken } = require('../../../utils/token.util');
const JWT = require('jsonwebtoken');

const AuthService = {    
    login: async (data) =>{
        try {
            const { email, password } = data;            
            if (!email || !password) {
                const err = new Error('Missing data.');
                err.staus = 400;
                throw err;
            }            
            
            const user = await Auth.findOne({ email }); 
            if (!user) {
                const err = new Error('Invalid username or password.');
                err.status = 401;
                throw err;
            }
            
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                const err = new Error('Invalid username or password.');
                err.status = 401;
                throw err;
            }
            
            const accessToken = await AuthService.generateAccessToken(user);
            //console.log(accessToken)
            const refreshToken = await AuthService.generateRefreshToken(user);
            //console.log(refreshToken)
            //const hashedToken = hashToken(refreshToken);
            const hashedToken = refreshToken;

            await Auth.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        refreshToken: hashedToken,
                        refreshTokenCreatedAt: new Date()
                    }
                },
                {
                    new: false,             // no need to return updated doc
                    runValidators: false    // skip validation for performance
                }
            );
            
            return {
                id: user._id,
                email: user.email,
                refreshToken: user.refreshToken,
                accessToken
            }
        } catch (error) {
            throw error;
        }        
    },   
    generateAccessToken: async (user)=> {
        const { id, email } = user;
        return JWT.sign(
            { uid: id, username: email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
        )
    },
    generateRefreshToken: async (user)=> {
        const { id, email } = user;
        return JWT.sign(
            { uid: id, username: email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
        )
    },
    register: ()=>{
        return true;
    }
}

module.exports = AuthService;