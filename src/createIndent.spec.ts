import indent, { stripWhitespace } from './createIndent'

describe('indent', () => {
  it('works', () => {
    const res = indent(`
      let arr = []
      function foo() {
        arr
          .map(x => x + 1)
          .map(x => {
            return {
              x,
            } 
          })
        return 'bar'
      }

      function tabs() {
        return 'tabs'
      }
    `)
    const expected = 'let arr = []\nfunction foo() {\n  arr\n    .map(x => x + 1)\n    .map(x => {\n      return {\n        x,\n      }\n    })\n  return \'bar\'\n}\n\nfunction tabs() {\n  return \'tabs\'\n}'

    console.log(res)
    console.log(expected)
    expect(res).toEqual(expected)
  })
})