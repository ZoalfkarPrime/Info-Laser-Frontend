export interface FilterItems {
  name: string,
  value: string,
}

export interface FilterGroup {
  title: string,
  items: FilterItems[],
  defaultOpen?: boolean
  className?: string,
  checked?: boolean;
  onClickCheckbox?: (id: string) => void;
  selectedIds?: Set<string>
}

export interface PriceProps {
  priceFrom?: number,
  priceTo?: number
}

export interface QueryFilters extends FilterGroup {
  priceFrom?: string;
  priceTo?: string;
  materials?: string;
  manufacturer?: string;
}