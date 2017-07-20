export const SEND_PHONE_MESSAGE = 'SEND_PHONE_MESSAGE';
export const sendPhoneMessage = (phone, message) => ({
  type: SEND_PHONE_MESSAGE,
  phone,
  message
});
