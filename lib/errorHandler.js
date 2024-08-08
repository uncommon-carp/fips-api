module.exports = function (err, req, res, next) {
  // there are `ValidationError`s and `ValidatorErrors`, so use a regex
  // to catch them both
  if (err.name.match(/Valid/) || err.name === "MongoError") {
    const message = "The receieved params failed a Mongoose validation";
    err = { status: 422, message };
  } else if (err.name === "BadParamsError") {
    err.status = 422;
  }

  res.status(err.status || 500).json(err);
};
