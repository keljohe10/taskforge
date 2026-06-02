import neostandard from 'neostandard'

export default [
  { ignores: ['**/dist/**', '**/build/**', '**/node_modules/**'] },
  ...neostandard({ ts: true }),
]
