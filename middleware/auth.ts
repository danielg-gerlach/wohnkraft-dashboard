import { useAuthStore } from '~/stores/auth'

// @ts-ignore
export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
    console.log('🛡️ Auth Middleware: Route change', from?.path, '->', to.path)
    
    const authStore = useAuthStore()
    await authStore.checkAuth()

    const publicRoutes = ['/login']
    const isPublicRoute = publicRoutes.includes(to.path)

    console.log('🛡️ Auth Middleware: User exists', !!authStore.user)
    console.log('🛡️ Auth Middleware: Is public route', isPublicRoute)

    if (!authStore.user && !isPublicRoute) {
        console.log('🛡️ Auth Middleware: Redirecting to login (no user)')
        // @ts-ignore
        return navigateTo('/login')
    }

    if (authStore.user && to.path === '/login') {
        console.log('🛡️ Auth Middleware: Redirecting to dashboard (user exists)')
        // @ts-ignore
        return navigateTo('/dashboard')
    }
    
    console.log('🛡️ Auth Middleware: Allowing navigation')
})