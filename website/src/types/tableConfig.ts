export type SortDirection = "asc" | "desc";
export type SortConfig = {
  columnIndex: number;
  direction: SortDirection;
};

export type ColumnConfig<T> = {
  valueFunction: (row: T) => string | number;
  label: string;
  sortFunction?: (a: T, b: T) => number;
  renderFunction?: (row: T) => JSX.Element;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
};
