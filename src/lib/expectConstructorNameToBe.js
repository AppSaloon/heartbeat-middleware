const expectConstructorNameToBe = (value, constructorName, path, allowUndefined = false) => {
  if (!value || !value.constructor || !value.constructor.name || value.constructor.name !== constructorName) {
    if(!allowUndefined) {
      throw new Error(`Expected ${path} to be "${constructorName}"`)
    } else if(typeof value !== 'undefined') {
      throw new Error(`Expected ${path} to be "undefined" or "${constructorName}"`)
    }
  }
}

module.exports = expectConstructorNameToBe