import {Sandbox} from '@e2b/sdk'
import {expect, test} from 'bun:test'
import {SerpAPI} from 'langchain/tools'
import {z} from 'zod'
import env from '~/env.mjs'
import exec from '~/tools/exec'

test('Bun test runner', () => {
	expect(Bun.version).toInclude('1.0')
})

test('Sandbox filesystem', async () => {
	const shell = await Sandbox.create({
		apiKey: env.E2B_API_KEY,
		id: 'base',
		onStderr: data => console.error(data.line),
		onStdout: data => console.log(data.line)
	})

	// Get current directory
	const pwd = await shell.process.start({cmd: 'pwd'})
	await pwd.wait()

	const {output: pwdOutput} = pwd as any

	expect(pwdOutput.messages[0].line).toInclude('/home/user')

	// List files
	const cd = await shell.process.start({cmd: 'ls -a'})
	await cd.wait()

	const {output: cdOutput} = cd as any

	expect(cdOutput.messages.length).toBeGreaterThan(5)

	// Create a directory
	const mkdir = await shell.process.start({cmd: 'mkdir temp && cd temp && pwd'})
	await mkdir.wait()

	const {output: mkdirOutput} = mkdir as any

	expect(mkdirOutput.messages[0].line).toInclude('/home/user/temp')

	await shell.close()
})

test(
	'Sandbox git',
	async () => {
		const shell = await Sandbox.create({
			apiKey: env.E2B_API_KEY,
			id: 'base',
			onStderr: data => console.error(data.line),
			onStdout: data => console.log(data.line)
		})

		const cli = await exec({
			description: '',
			name: '',
			setupCmd: `git config --global user.email "${env.GITHUB_EMAIL}" && git config --global user.name "${env.GITHUB_USERNAME}"`,
			shell,
			preCmdCallback: (cmd: string) => {
				const tokenB64 = btoa(`pat:${env.GITHUB_ACCESS_TOKEN}`)
				const authFlag = `-c http.extraHeader="AUTHORIZATION: basic ${tokenB64}"`

				// Replace only first occurrence to avoid prompt injection
				// Otherwise "git log && echo 'git '" would print the token
				return cmd.replace('git ', `git ${authFlag} `)
			}
		})

		// Clone repo from GitHub
		const clone = await cli.func({
			cmd: 'git clone https://github.com/tedspare/maige.git'
		})

		const cloneOutput = JSON.parse(clone)

		expect(cloneOutput.messages[0].line).toInclude("Cloning into 'maige'...")

		// List files in cloned repo
		const ls = await cli.func({
			cmd: 'cd maige && ls -a'
		})

		const lsOutput = JSON.parse(ls)

		expect(lsOutput.messages.map(({line}) => line).join(', ')).toInclude(
			'package.json'
		)

		await shell.close()
	},
	15 * 1000 // override default timeout
)

test('SERP API', async () => {
	const serp = new SerpAPI()
	const res = await serp.call("today's weather in san francisco")

	const weather = JSON.parse(res)

	expect(weather.location).toBe('San Francisco, CA')
})

test('Zod parser', () => {
	const dynamicFieldsSchema = z.record(z.string(), z.any())
	const testObj = {
		field1: 'val',
		field2: ['val2', 'val3'],
		field3: {
			field4: 'val4'
		}
	}
	const validObj = dynamicFieldsSchema.parse(testObj)

	expect(validObj).toHaveProperty('field1')
	expect(validObj?.field3?.field4).toBe('val4')
})

test.todo('E2E', () => {
	console.log(
		'It should pass a sample issue to engineer() and have it appropriately labelled'
	)
})
