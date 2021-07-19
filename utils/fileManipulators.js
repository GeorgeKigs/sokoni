const fs = require('fs');
const path = require('path');

exports.resolvePath = pathString => {
	return path.resolve(pathString);
};

exports.deleteFile = async filePath => {
	const path = this.resolvePath(filePath);
	return new Promise((resolve, reject) => {
		fs.exists(path, exists => {
			if (exists) {
				fs.unlink(path, err => {
					if (err) {
						reject(err);
					}
					resolve();
				});
			} else {
				resolve();
			}
		});
	});
};
