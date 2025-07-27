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
                console.log('🔑 Auth Store: Starting login for', email)
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) {
                    console.error('🔑 Auth Store: Login error', error)
                    throw error
                }

                console.log('🔑 Auth Store: Login successful, setting user')
                this.user = data.user
                
                console.log('🔑 Auth Store: Navigating to dashboard')
                // @ts-ignore
                await navigateTo('/dashboard')
                console.log('🔑 Auth Store: Navigation complete')
                return { success: true }
            } catch (error: any) {
                console.error('🔑 Auth Store: Login failed', error.message)
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
            try {
                console.log('🔍 Auth Store: Checking auth status')
                const { data: { user }, error } = await supabase.auth.getUser()
                
                if (error) {
                    console.error('🔍 Auth Store: Auth check error', error)
                    this.user = null
                } else {
                    console.log('🔍 Auth Store: User found', user?.email || 'No user')
                    this.user = user
                }
            } catch (error) {
                console.error('🔍 Auth Store: Auth check failed', error)
                this.user = null
            }
        }
    }
})