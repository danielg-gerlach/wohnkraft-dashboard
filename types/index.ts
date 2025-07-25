// API Types
export interface DashboardPayload {
    quizId: string
    customer: Customer
    answers: Answer[]
    sendEmail: boolean
}

export interface Customer {
    name: string
    email: string
    phone?: string
    company?: string
}

export interface Answer {
    questionId: string
    value?: string | string[] | number | boolean
    text?: string
}

// Database Types
export interface Response {
    id: string
    quiz_id: string
    customer_name: string
    customer_email: string
    customer_phone: string | null
    customer_company: string | null
    answers: Answer[]
    created_at: string
    updated_at: string
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}