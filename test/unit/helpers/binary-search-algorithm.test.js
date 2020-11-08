import binarySearchAlgorithm from '../../../helpers/binary-search-algorithm.js'

describe('Binary search helper algorithm', () => {
  describe('getFirstExpiredIndex()', () => {
    context('Searching a simple array with an odd number of elements.', () => {
      let result

      before(() => {
        const threshold = 545
        const searchArray = [
          { timestamp: 23 },
          { timestamp: 33 },
          { timestamp: 136 },
          { timestamp: 230 },
          { timestamp: 390 },
          { timestamp: 459 },
          { timestamp: 570 },
        ]

        result = binarySearchAlgorithm.getFirstExpiredIndex(threshold, searchArray)
      })

      it('should return the index of the cut-off threshold', () => {
        expect(result).to.be.eql(5)
      })
    })

    context('Worst case scenario.', () => {
      let result

      before(() => {
        const threshold = 459
        const searchArray = [
          { timestamp: 23 },
          { timestamp: 33 },
          { timestamp: 136 },
          { timestamp: 230 },
          { timestamp: 390 },
          { timestamp: 459 },
        ]

        result = binarySearchAlgorithm.getFirstExpiredIndex(threshold, searchArray)
      })

      it('should return the index of the cut-off threshold', () => {
        expect(result).to.be.eql(5)
      })
    })

    context('Best case scenario.', () => {
      let result

      before(() => {
        const threshold = 235
        const searchArray = [
          { timestamp: 45 },
          { timestamp: 87 },
          { timestamp: 136 },
          { timestamp: 235 },
          { timestamp: 400 },
          { timestamp: 459 },
          { timestamp: 800 },
        ]

        result = binarySearchAlgorithm.getFirstExpiredIndex(threshold, searchArray)
      })

      it('should return the index of the cut-off threshold', () => {
        expect(result).to.be.eql(3)
      })
    })
  })
})
