import Alert from 'react-s-alert';

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const POP_NOTIFICATION = "POP_NOFITIFICATION";

const initialState = {
  stack: []
};

export default (state = initialState, action) => {
  const { type, notificationType, message } = action;

  switch (type) {
    case PUSH_NOTIFICATION:
      return {
        ...state,
        stack: [...state.stack, { type: notificationType, message }]
      };
    case POP_NOTIFICATION:
      return {
        ...state,
        stack: [...state.stack.slice(0, state.stack.length - 1)]
      };
    default:
      return state;
  }
};

export const notification = (notificationType, message) => dispatch => {
  Alert[notificationType](message);

  dispatch({
    type: PUSH_NOTIFICATION,
    notificationType,
    message
  });
};

export const popNotification = () => ({
  type: POP_NOTIFICATION
});
