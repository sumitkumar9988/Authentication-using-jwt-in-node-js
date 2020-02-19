const user = require('./../userModel/userModel');
exports.signup = async (req, res) => {
	try {
		const newUser = await user.create(req.body);
		res.status(201).json({
			status: 'success',
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
