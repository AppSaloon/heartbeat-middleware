import fs from 'fs-extra'
import path from 'path'

const getPackageVersion = () => {
  const packagePath = path.join(process.cwd(), '/package.json')
  const packageJson = fs.readJsonSync(packagePath, { throws: false })
  if (packageJson !== null) {
    return `${packageJson.name}@${packageJson.version}`
  }
  return undefined
}

export default getPackageVersion
