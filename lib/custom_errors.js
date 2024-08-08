class BadParamsError extends Error {
  constructor() {
    super();
    this.name = "BadParamsError";
    this.message = "A required parameter was omitted or invalid";
  }
}

const handle404 = (record) => {
  if (!record) {
    throw new DocumentNotFoundError();
  } else {
    return record;
  }
};

module.exports = {
  handle404,
  BadParamsError,
};
