export const parseId = (id: string | number): number => {
  return typeof id === 'number' ? id : Number.parseInt(id, 10)
}
