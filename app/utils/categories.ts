export const categories = [
  { name: 'Others', value: 'OTHERS' },
  { name: 'Office', value: 'OFFICE' },
  { name: 'Home', value: 'HOME' },
] as const satisfies Record<'name' | 'value', string>[]
