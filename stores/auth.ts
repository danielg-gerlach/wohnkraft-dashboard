import { defineStore } from 'pinia'
import { useSupabase } from '~/composables/useSupabase'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        loading: false
    }),

    actions: {
        async login(email: string, password: string) {
            const supabase = useSupabase()
            this.loading = true

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) throw error

                this.user = data.user
                // @ts-ignore
                await navigateTo('/dashboard')
                return { success: true }
            } catch (error: any) {
                return { success: false, error: error.message }
            } finally {
                this.loading = false
            }
        },

        async logout() {
            const supabase = useSupabase()
            await supabase.auth.signOut()
            this.user = null
            // @ts-ignore
            await navigateTo('/login')
        },

        async checkAuth() {
            const supabase = useSupabase()
            const { data: { user } } = await supabase.auth.getUser()
            this.user = user
        }
    }
})