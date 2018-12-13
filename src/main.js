#!/usr/bin/env node

// const dns  = require('dns');
const os = require('os');
const fs = require('fs');
const fsPromises = fs.promises;
const {exec} = require('child_process');
const {knowledge, commands} = require('./knowledge');


// const ALL_PLATFORM = ['aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'];

const DEFAULT_FOLDER = {
	host: () => {
		const platform = os.platform();
		if (platform === 'win32') {
			return 'c://windows/system32/drivers/etc';
		} else if (platform === 'darwin') {
			return '/private/etc';
		} else {
			return '';
		}
	}
};

const DEFAULT_COMMAND = {
	OPEN: () => {
		const platform = os.platform();
		if (platform === 'win32') {
			return 'start "" ';
		} else if (platform === 'darwin') {
			return 'open';
		} else {
			return '';
		}
	}
};


function openFolder(path) {
	if (path) {
		const oper = DEFAULT_COMMAND.OPEN()
		exec(`${oper} "${path}"`);
	}
}


function entry(path) {
	openFolder(path);
}

function pathExist(path) {
	return new Promise((a, b) => {
		fs.access(path, fs.constants.F_OK, (err) => {
			err ? b(false) : a(true);
		});
	});
}

async function checkFileSize(path, deep = 1, skipCheckExist = false) {
	let result = [];
	if (skipCheckExist || await pathExist(path)) {
		const info = await fsPromises.stat(path);
		if (info.isDirectory()) {
			result.push({path});
			const contents = await fsPromises.readdir(path);
			for (let i = 0, len = contents.length; i < len; i++) {
				result = result.concat(await checkFileSize(`${path}/${contents[i]}`, deep - 1, true, result));
			}
		} else if (info.isFile()) {
			result.push({path, size: info.size});
		}
	}
	return result;
}

async function startCheckFileSize(path) {
	const result = await checkFileSize(path, 3, false);
	result.forEach((item, index, arr) => {
		const deep = item.path.replace(arr[0].path, '').split('/').length;
		const prefix = new Array(deep).fill('').join('\t');
		console.log(`${prefix}${item.path}: ${item.size || ''}`);
	});
}

fs.stat('/Users/shenhuan/githome', (err, info) => {
	console.log((info.size / 1024).toFixed(2) + 'kb')
});
const userInputCommands = process.argv.slice(2);
if (userInputCommands.length > 0) {
	const command = userInputCommands[0];
	if (commands.findIndex(item => item === command) > -1) {
		console.log(knowledge[command])
	} else if (DEFAULT_FOLDER[command]) {
		openFolder(DEFAULT_FOLDER[command]());
	} else {
		console.log(`command ${command} not found.`)
	}

} else {
	console.log('command not given.');
	console.log(`current support list are [host,${commands.toString()}]`)
	console.log(`e.g. smemo host`)
}


module.exports = {
	entry,
	startCheckFileSize
};
