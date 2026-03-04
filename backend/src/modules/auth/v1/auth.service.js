const bcrypt = require('bcrypt');
const Auth = require('../../user/v1/user.model');
const { hashToken } = require('../../../utils/token.util');
const JWT = require('jsonwebtoken');

const AuthService = {    
    register: ()=>{
        return true;
    },
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
            const refreshToken = await AuthService.generateRefreshToken(user);
            const hashedToken = hashToken(refreshToken);            
            
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
                refreshToken: refreshToken,
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
    refreshToken: async (token)=> {
        try {
            const decoded = JWT.verify(token, process.env.JWT_REFRESH_SECRET);
            const hashed = hashToken(token);

            const user = await Auth.findOne({
                _id: decoded.uid,
                refreshToken: hashed
            });

            if (!user) {
                const err = new Error("Invalid refresh token test");
                err.status = 401;
                throw err;
            }

            const newAccessToken = await AuthService.generateAccessToken(user);            
            const refreshToken = await AuthService.generateRefreshToken(user);
            const hashedToken = hashToken(refreshToken); 

            user.refreshToken = hashedToken;
            await user.save();

            return {
                accessToken: newAccessToken,
                refreshToken: refreshToken
            };
        } catch (error) {        
            if (error.name === "TokenExpiredError") {
                error.status = 401;
            }
            throw error;
        }            
    },
    clearUserToken: async (hashed)=> {
        try {
            const result = await Auth.updateOne(
                { refreshToken: hashed },
                { $unset: { refreshToken: 1 } }
            );    
            return result;
        } catch (error) {
            throw error;
        }
    },
    updateProfile: async (userId, data)=> {
        try {
            console.log(id);
            console.log(data);

            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                const err = new Error('Invalid user id');
                err.statusCode = 400;
                throw err;
            }

            // Restrict Sensitive Fields
            const restrictedFields = [
                'password',
                'role',
                'refreshToken',
                'email' // handled separately
            ];

            restrictedFields.forEach(field => {
                if (updateData[field] !== undefined) {
                    delete updateData[field];
                }
            });

            // If no valid fields remain
            if (!Object.keys(updateData).length) {
                const err = new Error('No valid fields provided for update');
                err.statusCode = 400;
                throw err;
            }

            // Update user dynamically
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (!updatedUser) {
                const err = new Error('User not found');
                err.statusCode = 404;
                throw err;
            }
            return updatedUser;

        } catch (error) {
            console.log(error);
        }
    }  
      
}

module.exports = AuthService;