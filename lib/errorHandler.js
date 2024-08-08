// an error handling middleware that will run anytime one of the route
// handlers calls `next`, in other words, when an error gets thrown in one of
// the promise chains
module.exports = function (err, req, res, next) {
  // there are `ValidationError`s and `ValidatorErrors`, so use a regex
  // to catch them both
  if (err.name.match(/Valid/) || err.name === "MongoError") {
    const message = "The receieved params failed a Mongoose validation";
    err = { status: 422, message };
  } else if (err.name === "BadParamsError") {
    err.status = 422;
  }

  // if set a status code above, send that status code
  // otherwise, send 500. Also, send the error message as JSON.
  res.status(err.status || 500).json(err);
};
