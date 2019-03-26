import Alert from 'react-s-alert';

const emailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // RFC 2822

const types = [
  "password", "email", "text"
];

/**
 * @typedef config
 * @type {object}
 * @property {?number} maxLength
 * @property {?number} minLength
 */

/**
 * Valitaion of input values
 * The 3th param may be a config or a callback
 * If there is 4th param then 3th one is config
 * and 4th one is a callback
 * @param {!string} type
 * @param {!string} val
 * @param  {...any=} args
 */
export const validate = (type, val, ...args) => {
  let callback = () => null;
  /** @type {config} */
  let config = {};

  // is it a callback?
  switch (args.length) {
    // there is a callback of config
    case 1:
      if (typeof args[0] === 'function') {
        callback = args[0];
      } else if (typeof args[0] === 'object') {
        config = args[0];
      }
      break;
    // there are config and callback
    case 2:
      config = args[0];
      callback = args[1];
      break;
    default:
  }

  let isValidType = false;
  types.forEach(t => {
    if (type === t) {
      isValidType = true;
    }
  });

  if (!isValidType) {
    throw new Error("The " + type + "is not supported by the validate function");
  }

  if (val === "") {
    callback(new Error("You must input the " + type));
    return null;
  }

  for (let key in config) {
    let keyVal = config[key];

    switch (key) {
      case "minLength":
        if (val.length < keyVal) {
          callback(new Error("The " + type + " field needs " + keyVal + " or more symbols"));
        }
        break;
      case "maxLength":
        if (val.length > keyVal) {
          callback(new Error("The " + type + " field needs " + keyVal + " or more symbols"));
        }
        break;
      default:
    }
  }

  switch (type) {
    case "text":
      break;
    case "email":
      if (emailReg.test(val)) {
        callback(null);
      } else {
        callback(new Error("Invalid Email"));
      }
      break;
    case "password":
      if (val.length >= 6) {
        callback(null);
      } else {
        callback(new Error("The password must consist 6 of more symbols"));
      }
      break;
    default:
  }
};

const alertWarningConfig = {
  position: 'top-right',
  effect: 'slide',
  beep: false,
  timeout: 3000,
  offset: 100
};

export const validateInput = (valData, name, val) => {
  let isValid = true;

  validate(
    valData[name][0],
    val,
    valData[name][1],
    err => {
      if (err) {
        isValid = false;
        Alert.warning(err, alertWarningConfig);
      }
    });

  return isValid;
};

export const validateInputs = (validData, data) => {
  let isValid = true;

  const alertWarningConfig = {
    position: 'top-right',
    effect: 'slide',
    beep: false,
    timeout: 3000,
    offset: 100
  };

  const callback = err => {
    if (err) {
      isValid = false;
      Alert.warning(err, alertWarningConfig);
    }
  };

  for (const key in validData) {
    const type = validData[key][0];
    const val = data[key];

    if (validData[key].length === 1) {
      validate(type, val, callback);
    } else if (validData[key].length === 2) {
      const config = data[key][1];
      validate(type, val, config, callback);
    }
  }

  return isValid;
};
