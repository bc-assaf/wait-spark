import { supabase } from '@/auth/supabase'
import { Api } from './Api'

export const api = new Api({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  getAccessToken: async () => (await supabase.auth.getSession()).data.session?.access_token ?? null,
  onUnauthorized: async () => {
    await supabase.auth.signOut()
  },
})

export { ApiError } from './Api'
