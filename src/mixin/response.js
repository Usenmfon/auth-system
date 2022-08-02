exports.parseResponse = (req, data) => {
    const response = { message: "", data: "", status: 200, ...data}
    req.response = response
}