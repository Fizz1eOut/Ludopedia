import type { GameResponse } from '@/interface/game.interface';

export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          id: string
          created_at: string
          user_id: string
          item: string
          game_data: GameResponse | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          item: string
          game_data?: GameResponse | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          item?: string
          game_data?: GameResponse | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Favorite = Database['public']['Tables']['favorites']['Row']
export type FavoriteInsert = Database['public']['Tables']['favorites']['Insert']
export type FavoriteUpdate = Database['public']['Tables']['favorites']['Update']

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
