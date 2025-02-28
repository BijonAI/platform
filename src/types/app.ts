export interface App {
  id: string
  name: string
  description: string
  api_key: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface CreateAppDTO {
  name: string
  description: string
} 