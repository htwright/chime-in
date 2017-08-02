const updateUser = require( "./updateUser" );

const addQuestionToUser = ( userId, questionId ) => {
	updateUser(userId, { questions: questionId });
}

module.exports = addQuestionToUser;
