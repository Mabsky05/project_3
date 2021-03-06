const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  longitude: {
    type: Number,
    required: true,
    default: 151.76,
  },
  latitude: {
    type: Number,
    required: true,
    default: 25.43,
  },

  pins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pin',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcryptjs.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
