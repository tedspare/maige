import weaviate from 'weaviate-ts-client'
import deleteRepo from './delete'
import addRepo from './embed'
import {checkIndexExists} from './exists'
import search from './query'

export type WeaviateClient = ReturnType<typeof weaviate.client>

export type WeaviateConfig = {
	client: WeaviateClient
	userId: string
	indexName: string
}

export default class Weaviate {
	client: WeaviateClient
	config: WeaviateConfig

	constructor(userId: string, indexName: string = 'CodeSearch') {
		this.client = weaviate.client({
			scheme: process.env.WEAVIATE_SCHEME,
			host: process.env.WEAVIATE_HOST
		})

		checkIndexExists(this.client, indexName)

		this.config = {
			client: this.client,
			userId: userId,
			indexName: indexName
		}
	}

	async embedRepo(repoUrl: string, branch: string, replace: boolean = false) {
		return await addRepo(this.config, repoUrl, branch, replace)
	}

	async searchCode(query: string, repository: string, numResults: number = 3) {
		return await search(this.config, query, numResults, repository)
	}

	async deleteRepo(repoUrl: string) {
		return await deleteRepo(this.config, repoUrl)
	}

	// TODO: implement
	async updateRepo(repoUrl: string, filenames: Array<string>) {
		return
	}
}
