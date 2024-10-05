import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'backend'

export const api: ReturnType<typeof edenTreaty<App>> = edenTreaty<App>('http://0.0.0.0:8080/')
