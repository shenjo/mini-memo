// const dns  = require('dns');
const os = require('os');
const {exec} = require('child_process');

// const ALL_PLATFORM = ['aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32'];

const DEFAULT_FOLDER = {
    HOST: () => {
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
        exec(`${DEFAULT_COMMAND.OPEN()} "${path}"`);
    }
}


openFolder(DEFAULT_FOLDER.HOST());

function entry() {
    const argv = process.argv.slice(2);
    if (argv[0]) {
        console.log(`process argv is ${process.argv}`);
        openFolder(DEFAULT_COMMAND.OPEN());
    } else {
        console.error('Specify path should be given.')
    }
}

module.exports = {
    entry
};
