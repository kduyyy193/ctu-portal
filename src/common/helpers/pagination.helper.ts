export interface PaginationParams {
    page: number
    limit: number
}

export interface PaginationMeta {
    page: number
    limit: number
    total: number
    totalPages: number
}

export function buildPaginationMeta(
    total: number,
    { page, limit }: PaginationParams,
): PaginationMeta {
    const totalPages = Math.ceil(total / limit)

    return {
        page,
        limit,
        total,
        totalPages,
    }
}