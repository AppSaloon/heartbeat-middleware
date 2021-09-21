const expectArrayToHaveSize = (value, size, path) => {
  if (!Array.isArray(value) || value.length !== size) {
    throw new Error(`Expected ${path} to be an array containing "${size}" element(s)`)
  }
}

module.exports = expectArrayToHaveSize
