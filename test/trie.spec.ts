import Trie from '../src/utils/trie'

describe('Trie', function () {
  describe('empty emotions: []', function () {
    const trie = new Trie()
    beforeEach(function () {
      trie.build([])
    })
    test('should return [] for ""', function () {
      expect(trie.search('')).toEqual([])
    })
    test('should return [] for "abcd"', function () {
      expect(trie.search('abcd')).toEqual([])
    })
  })

  describe('simple emotions: abc, abd', function () {
    const trie = new Trie()
    beforeEach(function () {
      trie.build(['abc', 'abd'])
    })
    test('should return [] for ""', function () {
      expect(trie.search('')).toEqual([])
    })
    test('should return [[0, 0]] for "abcd"', function () {
      expect(trie.search('abcd')).toEqual([[0, 0]])
    })
    test('should return [[0, 0], [4 , 1]] for "abcdabd"', function () {
      expect(trie.search('abcdabd')).toEqual([
        [0, 0],
        [4, 1],
      ])
    })
    test('should return [[0, 0], [4 , 0]] for "abcdabcd"', function () {
      expect(trie.search('abcdabcd')).toEqual([
        [0, 0],
        [4, 0],
      ])
    })
  })

  describe('cyclic emotions: aba', function () {
    const trie = new Trie()
    beforeEach(function () {
      trie.build(['aba'])
    })
    test('should return [[0, 0]] for "abab"', function () {
      expect(trie.search('abab')).toEqual([[0, 0]])
    })
    test('should return [[0, 0]] for "ababa"', function () {
      expect(trie.search('ababa')).toEqual( [[0, 0]])
    })
  })

  describe('actual emotions: /::), /::(', function () {
    const trie = new Trie()
    beforeEach(function () {
      trie.build(['/::)', '/::('])
    })
    test('should return [[1, 0]] for "//::)/::x"', function () {
      expect(trie.search('//::)/::x')).toEqual( [[1, 0]])
    })
    test('should return [[3, 1]] for "/::/::("', function () {
      expect(trie.search('/::/::(')).toEqual( [[3, 1]])
    })
    test('should return [[0, 0], [4, 0], [8, 0]] for "/::)/::)/::)"', function () {
      expect(trie.search('/::)/::)/::)')).toEqual([
        [0, 0],
        [4, 0],
        [8, 0],
      ])
    })
  })

  describe('many emotions: /::), /:<L>, /::(', function () {
    const trie = new Trie()
    beforeEach(function () {
      trie.build(['/::)', '/:<L>', '/::('])
    })
    test('should return [[14, 0], [37, 1]] for "I love gungou /::), and I fuck gungou/:<L>."', function () {
      expect(
        trie.search('I love gungou /::), and I fuck gungou/:<L>.')).toEqual(
        [
          [14, 0],
          [37, 1],
        ],
      )
    })
    test('should return [[0, 0], [4, 0]] for "/::)/::)"', function () {
      expect(trie.search('/::)/::)')).toEqual( [
        [0, 0],
        [4, 0],
      ])
    })
  })
})
