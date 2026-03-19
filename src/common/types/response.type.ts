export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
    meta?: Meta
}

export interface Meta {
    page?: number
    limit?: number
    total?: number
}