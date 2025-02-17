export const schema = {
	class: 'CodeSearch_TestTed',
	invertedIndexConfig: {
		bm25: {
			b: 0.75,
			k1: 1.2
		},
		cleanupIntervalSeconds: 60,
		stopwords: {
			additions: null,
			preset: 'en',
			removals: null
		}
	},
	multiTenancyConfig: {
		enabled: false
	},
	properties: [
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'text',
			tokenization: 'word'
		},
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'source',
			tokenization: 'word'
		},
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'repository',
			tokenization: 'word'
		},
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'branch',
			tokenization: 'word'
		},
		{
			dataType: ['number'],
			indexFilterable: true,
			indexSearchable: false,
			name: 'loc_lines_from'
		},
		{
			dataType: ['number'],
			indexFilterable: true,
			indexSearchable: false,
			name: 'loc_lines_to'
		},
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'ext',
			tokenization: 'word'
		},
		{
			dataType: ['text'],
			indexFilterable: true,
			indexSearchable: true,
			name: 'userId',
			tokenization: 'word'
		}
	],
	replicationConfig: {
		factor: 1
	},
	shardingConfig: {
		actualCount: 1,
		actualVirtualCount: 128,
		desiredCount: 1,
		desiredVirtualCount: 128,
		function: 'murmur3',
		key: '_id',
		strategy: 'hash',
		virtualPerPhysical: 128
	},
	vectorIndexConfig: {
		cleanupIntervalSeconds: 300,
		distance: 'cosine',
		dynamicEfFactor: 8,
		dynamicEfMax: 500,
		dynamicEfMin: 100,
		ef: -1,
		efConstruction: 128,
		flatSearchCutoff: 40000, // 40k
		maxConnections: 64,
		pq: {
			bitCompression: false,
			centroids: 256,
			enabled: false,
			encoder: {
				distribution: 'log-normal',
				type: 'kmeans'
			},
			segments: 0,
			trainingLimit: 100000 // 100k
		},
		skip: false,
		vectorCacheMaxObjects: 1000000000000 // 1 trillion (1e12)
	},
	vectorIndexType: 'hnsw',
	vectorizer: 'none'
}
