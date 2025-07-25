import { useAuthStore } from '~/stores/auth'

// @ts-ignore
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
    const authStore = useAuthStore()
    await authStore.checkAuth()

    const publicRoutes = ['/login']
    const isPublicRoute = publicRoutes.includes(to.path)

    if (!authStore.user && !isPublicRoute) {
        // @ts-ignore
        return navigateTo('/login')
    }

    if (authStore.user && to.path === '/login') {
        // @ts-ignore
        return navigateTo('/dashboard')
    }
})