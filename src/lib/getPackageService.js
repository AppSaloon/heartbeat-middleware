const fs = require('fs-extra')
const path = require('path')

const getPackageVersion = () => {
  const packagePath = path.join(process.cwd(), '/package.json')
  const packageJson = fs.readJsonSync(packagePath, { throws: false })
  if (packageJson !== null) {
    return packageJson.version
  }
  return undefined
}

module.exports = getPackageVersion
