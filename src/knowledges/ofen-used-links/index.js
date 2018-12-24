const {getCommandStr,TYPES} = require('../../utils/index');

const LINKS = {
	dy: 'https://www.douyu.com/g_DOTA2',
	v2: 'https://www.v2ex.com/',
	xiami: 'https://www.xiami.com/billboard'
};

function getLinksIndex() {
	return Object.keys(LINKS).reduce((prev, curr) => {
		prev[curr] = {
			type: 'link',
			content: LINKS[curr],
			handler
		};
		return prev;
	}, {})
}


function handler(...params) {
	params = params.flat(1);
	if (!(params.length === 1 || params.length === 2)) {
		console.error('[LINK] 类型只能接受1-2个参数 【浏览器（选填），链接（必填）】')
	}
	return {type: TYPES.exec, content: getCommandStr(...params)};
}


module.exports = {
	getLinksIndex
};
