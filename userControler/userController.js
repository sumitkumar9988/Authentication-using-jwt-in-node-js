const jwt = require('jsonwebtoken');
const user = require('./../userModel/userModel');

exports.signup = async (req, res) => {
	try {
		// const newUser = await user.create(req.body);
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
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err
		});
	}
};

exports.login = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		if (!email || !password) {
			return res.json({
				status: 'fail',
				message: 'enter email or password'
			});
		}
		const users = await await user.findOne({ email }).select('+password');
		console.log(users);
		res.status(201).json({
			status: 'success',
			data: {
				user: users
			}
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail1',
			message: err
		});
	}
};
