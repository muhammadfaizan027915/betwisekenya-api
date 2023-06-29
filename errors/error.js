const errorHandler = {
  validationError: (message = "All fields are required") => {
    return { status: 422, message };
  },

  badRequest: (message = "Bad request") => {
    return { status: 400, message };
  },

  unAuthorized: (message = "Unauthorized") => {
    return { status: 401, message };
  },

  forbidden: (message = "Not allowed") => {
    return { status: 403, message };
  },

  notfound: (message = "Not found") => {
    return { status: 404, message };
  },

  confilt: (message = "Conflict") => {
    return { status: 409, message };
  },

  serverError: (message = "Internal server error") => {
    return { status: 500, message };
  },
};

module.exports = errorHandler;
