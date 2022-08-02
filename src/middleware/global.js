exports.handleGlobalError = (err, req, res, next) => {
    console.log(err.type, err.message,"app error");
    res.status(500).send('Server Error')
  }
  
  exports.renderResponse = (req, res) => {
  
    const { status, ...response } = { status: 404, message: "Resource not found", data: "", ...req?.response }
    res.status(status).json(response)
  }