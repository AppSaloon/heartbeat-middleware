const mergeStatuses = (arr) => {
  return Array.isArray(arr) && arr.length && arr.some(({status}) => status !== 200)
    ? 500
    : 200
}

module.exports = mergeStatuses