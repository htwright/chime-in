export const SEND_PHONE_MESSAGE = 'SEND_PHONE_MESSAGE';
export const sendPhoneMessage = (id, message) => ({
  type: SEND_PHONE_MESSAGE,
  id,
  message
});
