export const SEND_PHONE_MESSAGE = 'SEND_PHONE_MESSAGE';
export const sendPhoneMessage = (id, message) => ({
  type: SEND_PHONE_MESSAGE,
  id,
  message
});

export const DISPLAY_QUESTIONS = 'DISPLAY_QUESTION';
export const displayQuestions = (questions) => ({
  type: DISPLAY_QUESTIONS,
  questions
});

export const CREATE_USER = 'CREATE_USER';
export const createUser = (currentUser) => ({
  type: CREATE_USER,
  currentUser
});
