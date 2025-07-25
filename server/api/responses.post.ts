import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    // Supabase Client mit Service Key für Server-Side Operationen
    const supabase = createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey
    )

    try {
        const body = await readBody(event)

        // Validierung
        if (!body.quizId || !body.customer || !body.customer.email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            })
        }

        // Daten für Supabase vorbereiten
        const responseData = {
            quiz_id: body.quizId,
            customer_name: body.customer.name,
            customer_email: body.customer.email,
            customer_phone: body.customer.phone || null,
            customer_company: body.customer.company || null,
            answers: body.answers || []
        }

        // In Supabase speichern
        const { data, error } = await supabase
            .from('responses')
            .insert(responseData)
            .select()
            .single()

        if (error) {
            console.error('Supabase error:', error)
            throw createError({
                statusCode: 500,
                statusMessage: 'Database error'
            })
        }

        // Optional: E-Mail senden (hier würde die E-Mail-Logik kommen)
        if (body.sendEmail) {
            // TODO: Implement email sending
            console.log('Email sending requested for:', body.customer.email)
        }

        return {
            success: true,
            data: data,
            message: 'Response saved successfully'
        }

    } catch (error: any) {
        console.error('API Error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Internal server error'
        })
    }
})