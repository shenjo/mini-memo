
const {getNpmKnowledgeIndexs} = require('./knowledges/npmReleated');


const allKnowledge = {...getNpmKnowledgeIndexs()};

module.exports = {
    knowledge: allKnowledge,
    commands: Object.keys(allKnowledge)
};
