const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true
    },
    refreshToken:String,
    refreshTokenCreatedAt: Date,
    password:String,
    status:Boolean,
    createdAt:Date,
    updatedAt:Date
},{ timestamps: false })

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model('users',userSchema)



/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent OverwriteModelError in development
module.exports = mongoose.models.User || mongoose.model('User', userSchema);*/