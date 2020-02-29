const senderrorforDevelopment = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
};
const senderrorForProduction = (err, res) => {
	// trusted error send error message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	} else {
		//error by third part not want to show error  to client error message
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!'
		});
	}
};
module.exports = (err, req, res, next) => {
	//console.log(err.stack);
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		senderrorforDevelopment(err, res);
	}

	if (process.env.NODE_ENV === 'production') {
		senderrorForProduction(err, res);
	}
};
