export interface BookList {
  id: string
  title: string
  description: string
  books: { id: string; type: string }[]
}
