const os = require('os');

function getCommandPrefix() {
	const platform = os.platform();
	if (platform === 'win32') {
		return 'start "" ';
	} else if (platform === 'darwin') {
		return 'open';
	} else {
		return '';
	}
}

const compose = (...fns) => {
	const _length = fns.length;
	return (...args) => {
		let next_args = null;
		for (let i = _length; --i >= 0;) {
			const fn = fns[i];
			let fnArg = next_args ? next_args : args
			let currentArgs = fn.length ? fnArg.slice(0, fn.length) : fnArg;
			next_args = args.slice(fn.length || 1);
			let result = fn.call(null, ...currentArgs);
			next_args.unshift(result);
		}
		return next_args[0];
	}
};

function getCommandStr(...params) {
	const prefix = getCommandPrefix();
	return `${prefix} ${params.join(' ')}`;
}

function defaultHandler(content) {
	return {
		type: TYPES.console,
		content
	}
}

const TYPES = {
	exec: 'exec',
	console: 'console'
};

module.exports = {
	getCommandStr,
	defaultHandler,
	TYPES,
	compose
};
