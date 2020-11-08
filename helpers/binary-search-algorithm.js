const binarySearchAlgorithm = {
  getFirstExpiredIndex: (threshold, searchArray) => {
    let low = 0
    let mid
    let high = searchArray.length - 1

    while (low <= high) {
      mid = Math.ceil((low + high) / 2)
      if (searchArray[parseInt(mid, 10)].timestamp < threshold) {
        if (searchArray[mid + 1] && searchArray[mid + 1].timestamp < threshold) {
          low = mid + 1
        } else {
          return mid
        }
      } else if (searchArray[parseInt(mid, 10)].timestamp > threshold) {
        if (searchArray[mid - 1] && searchArray[mid - 1].timestamp > threshold) {
          high = mid - 1
        } else {
          return mid
        }
      } else {
        return mid
      }
    }

    return mid
  },
}

export default binarySearchAlgorithm
