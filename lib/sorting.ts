import {Product} from "@/types/types";

export const sortProducts = (
  products: Product[],
  orderColumn?: string,
  orderDir?: "asc" | "desc",
  filterLabelId?: string
) => {
  let filteredProducts = products;

  // Если filter[label_id]==="2", отбираем только товары, у которых в labels есть label с id = 2
  if (filterLabelId === "2") {
    filteredProducts = filteredProducts.filter((product) =>
      product.labels?.some((label) => label.id === 2)
    );
  }

  // Если не задана сортировка, возвращаем отфильтрованные товары
  if (!orderColumn) return filteredProducts;

  return [...filteredProducts].sort((a, b) => {
    const aValue = a[orderColumn as keyof Product];
    const bValue = b[orderColumn as keyof Product];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return orderDir === "desc" ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return orderDir === "desc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    return 0;
  });
};
