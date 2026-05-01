import { apiClient } from "@/api/client";
import type { DataSourceResult } from "@/types/data-source";
import type { ContentDto } from "@/types/content/content";

export const contentApi = {
  async readByFilters(filters: Record<string, string | number>, options?: { page?: number; pageSize?: number }) {
    const { data } = await apiClient.get<DataSourceResult<ContentDto>>("/api/Content/Read", {
      params: {
        ...filters,
        page: options?.page ?? undefined,
        pageSize: options?.pageSize ?? undefined,
      },
    });
    return data;
  },
};