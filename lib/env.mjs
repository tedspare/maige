import {createEnv} from '@t3-oss/env-nextjs'
import z from 'zod'

export default createEnv({
	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
		GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY,
		GITHUB_APP_ID: process.env.GITHUB_APP_ID,
		GITHUB_APP_NAME: process.env.GITHUB_APP_NAME,
		GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
		GITHUB_EMAIL: process.env.GITHUB_EMAIL,
		GITHUB_USERNAME: process.env.GITHUB_USERNAME,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		STRIPE_BASE_PRICE_ID: process.env.STRIPE_BASE_PRICE_ID,
		E2B_API_KEY: process.env.E2B_API_KEY,
		LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2,
		LANGCHAIN_ENDPOINT: process.env.LANGCHAIN_ENDPOINT,
		LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY,
		LANGCHAIN_PROJECT: process.env.LANGCHAIN_PROJECT,
		SERPAPI_API_KEY: process.env.SERPAPI_API_KEY
	},

	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		NODE_ENV: z.enum(['development', 'test', 'production']),
		GITHUB_WEBHOOK_SECRET: z.string().min(1),
		GITHUB_PRIVATE_KEY: z.string().min(1),
		GITHUB_APP_ID: z.string().min(1),
		GITHUB_APP_NAME: z.string().min(1),
		GITHUB_ACCESS_TOKEN: z.string().min(1),
		GITHUB_EMAIL: z.string().email(),
		GITHUB_USERNAME: z.string().min(1),
		OPENAI_API_KEY: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		STRIPE_SECRET_KEY: z.string().min(1),
		STRIPE_WEBHOOK_SECRET: z.string().min(1),
		STRIPE_BASE_PRICE_ID: z.string().min(1),
		E2B_API_KEY: z.string().min(1),
		LANGCHAIN_API_KEY: z.string().optional(),
		LANGCHAIN_ENDPOINT: z.string().optional(),
		LANGCHAIN_PROJECT: z.string().optional(),
		LANGCHAIN_TRACING_V2: z.string().optional(),
		SERPAPI_API_KEY: z.string()
	}
})
