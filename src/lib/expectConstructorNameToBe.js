const expectConstructorNameToBe = (value, constructorName, path, allowUndefined = false) => {
  try {
    if (value.constructor.name !== constructorName) {
      throw new Error()
    }
  } catch (error) {
    if (!allowUndefined) {
      throw new Error(`Expected ${path} to be "${constructorName}"`)
    } else if (typeof value !== 'undefined') {
      throw new Error(`Expected ${path} to be "undefined" or "${constructorName}"`)
    }
  }
}

module.exports = expectConstructorNameToBe