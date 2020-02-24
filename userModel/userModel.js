const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'user must have name']
	},
	email: {
		type: String,
		required: [true, 'user must have email'],
		unique: true,
		validate: [validator.isEmail, 'user must have valid email']
	},
	password: {
		type: String,
		required: [true, 'user must have password'],
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [true, 'user must cofirm password'],
		validate: {
			validator: function(el) {
				if (el === this.password) return true;
				else return false;
			},
			message: 'password and confirm must be same'
		}
	}
});
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return;
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
});
userSchema.methods.correctpassword = async function(
	candidatePassword,
	userPassword
) {
	return bcrypt.compare(candidatePassword, userPassword);
};
const user = mongoose.model('User', userSchema);
module.exports = user;
