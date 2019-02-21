export default class Validate {
  static name(input, required) {
    if (!input && !required) {
      return {
        isValid: true,
      };
    }
    if (input.match(/[a-z]{2}/i) && !input.match(/[0-9!$%*|}{:><?~`_&#^=]/)) {
      return {
        isValid: true,
      };
    }
    return {
      isValid: false,
      error: 'Please enter valid characters. Only alphabetic characters allowed.!!',


    };
  }

  static email(input, required) {
    if (!input && !required) {
      return {
        isValid: true,
      };
    }
    if (input.match(/\S+@\S+\.\S+/i)) {
      return true;
    }
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  static string(input, required) {
    if (!input && !required) {
      return {
        isValid: true,
      };
    }
    if (input.match(/[a-z0-9]{2}/i) && !input.match(/[|}{~`^=]/)) {
      return {
        isValid: true,
      };
    }
    return {
      isValid: false,
      error: 'Please enter valid characters!',
    };
  }
}
