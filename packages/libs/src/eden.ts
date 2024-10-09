import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'backend'
import env from "@repo/env"

export const api: ReturnType<typeof edenTreaty<App>> = edenTreaty<App>(`${env.BACKEND_URL}`, {
    $fetch: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth') || ''}`
        }
    }
})
