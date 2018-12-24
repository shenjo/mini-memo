const {getNpmKnowledgeIndexs} = require('./knowledges/npmReleated');
const {oftenUsedCodes} = require('./knowledges/codes');
const {getLinksIndex} = require('./knowledges/ofen-used-links');


const allKnowledge = {...getNpmKnowledgeIndexs(), ...oftenUsedCodes(), ...getLinksIndex()};

module.exports = {
	knowledge: allKnowledge,
	commands: Object.keys(allKnowledge)
};
