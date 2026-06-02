export interface User {
  id: string
  email: string
  name: string
}

export interface Project {
  id: string
  name: string
  ownerId: string
  archived: boolean
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}
