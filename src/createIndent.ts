enum IndentTypes {
  Spaces = 'spaces',
  Tabs = 'tabs',
}
interface IndentOpts {
  indentType?: IndentTypes
}

const SPACE = ' '
const TAB = '\t'

export function stripWhitespace(s: string) {
  return s.replace(/^(\t| )*/g, '').replace(/(\t| )*$/g, '')
}

function getIndentLevel(s: string) {
  const matches = s.match(/^(\t| )*/g)
  return matches?.[0]?.length || 0
}

function indent(s: string, opts: IndentOpts = {}): string {
  const { indentType } = opts

  let indentChar = SPACE
  if (indentType && indentType === IndentTypes.Tabs) {
    indentChar = TAB
  }

  // TODO: determine this dynamically based on what is used in the input string
  let newLine = '\n'

  let minIndentLevel = Infinity

  // TODO: detect newline characters being used
  return s
    .split(newLine)
    .map(piece => {
      let cleanedPiece = stripWhitespace(piece)

      // a null indentLevel indicates an empty line
      let indentLevel = null
      if (cleanedPiece.length) {
        indentLevel = getIndentLevel(piece)
      }

      if (indentLevel && indentLevel < minIndentLevel) {
        minIndentLevel = indentLevel
      }

      return {
        piece: cleanedPiece,
        indentLevel,
      }
    })
    .map(({ piece, indentLevel }) => {
      return {
        piece,
        indentLevel: indentLevel === null ? null : indentLevel - minIndentLevel,
      }
    })
    .reduce((acc, { piece, indentLevel }) => {
      console.log(piece, indentLevel)
      if (indentLevel === null) {
        console.log('hitting the newline addition...........')
        return acc + newLine
      }

      // @ts-ignore
      let linePieces: string[] = new Array(indentLevel).fill(indentChar)
      linePieces.push(piece, newLine)
      return acc += linePieces.join('')
    }, '')
}

export default indent