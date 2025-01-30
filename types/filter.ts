export interface FilterItems {
  name: string,
  value: string,
}

export interface FilterGroup {
  title: string,
  items: FilterItems[],
  defaultOpen?: boolean
  className?: string,
}
