export interface ChatAttachment {
  type: 'image' | 'pdf' | 'code'
  url?: string
  alt?: string
  name?: string
  size?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  attachments?: ChatAttachment[]
  model?: string
  timestamp?: string
}

export interface ChatItem {
  id: string
  label: string
  project: string
}

export interface ChatSection {
  title: string
  items: ChatItem[]
}

export interface ModelOption {
  value: string
  label: string
  provider: string
  badge?: string
  description?: string
}

export interface ToolOption {
  value: string
  label: string
}

export interface UserProfile {
  name: string
  email: string
  initials: string
  plan: string
}

export interface AIChatWorkspaceProps {
  initialTheme?: 'dark' | 'light'
  initialChatId?: string
  className?: string
}
