
const {getNpmKnowledgeIndexs} = require('./knowledges/npmReleated');
const {oftenUsedCodes} = require('./knowledges/codes');


const allKnowledge = {...getNpmKnowledgeIndexs(),...oftenUsedCodes()};

module.exports = {
    knowledge: allKnowledge,
    commands: Object.keys(allKnowledge)
};
