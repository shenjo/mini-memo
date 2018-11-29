#!/usr/bin/env node

// const dns  = require('dns');
const os = require('os');
const {exec} = require('child_process');

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

// dns.lookup('steamcommunity.com', {all:false},function(err, address, family){
//   if(err) throw err;
//   console.log('例子A: ' + address);
// });

function openFolder(path) {
    if (path) {
        const oper = DEFAULT_COMMAND.OPEN()
        exec(`${oper} "${path}"`);
    }
}


function entry(path) {
    openFolder(path);
}
const userInputCommands = process.argv.slice(2);
if (userInputCommands.length > 0) {
    const path = userInputCommands[0];
    openFolder(DEFAULT_FOLDER[path]());
}else{
   console.log('command not given.')
   console.log('current support list are ["host"]')
}


module.exports = {
    entry
};
