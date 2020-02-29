const jwt = require('jsonwebtoken');
const user = require('./../userModel/userModel');
const catchAsync = require('./../utils/catchAsync');
exports.signup = catchAsync(async (req, res) => {
	const newUser = await user.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm
	});

	const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
		expiresIn: process.env.JWT_EXPIRE
	});

	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser
		}
	});
});

exports.login = catchAsync(async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		return res.json({
			status: 'fail',
			message: 'enter email or password'
		});
	}
	//const users = await user.findOne({ email }).select('+password');
	const users = await user.findOne({ email }).select('+password');

	if (!users || !(await users.correctpassword(password, users.password))) {
		return res.json({
			status: 'password incorrect or user not found',
			message: 'enter email or password'
		});
	}
	const token = jwt.sign({ id: users._id }, process.env.JWT_TOKEN, {
		expiresIn: process.env.JWT_EXPIRE
	});
	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: users
		}
	});
});
