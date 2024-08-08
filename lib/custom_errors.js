class BadParamsError extends Error {
  constructor(params) {
    super();
    this.name = "BadParamsError";
    this.message = "A required parameter was omitted or invalid";
    this.params = params;
  }
}

class DocumentNotFoundError extends Error {
  constructor(query) {
    super();
    this.name = "DocumentNotFoundError";
    this.message = "No results found for the executed query";
    this.query = query;
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
  DocumentNotFoundError,
};
