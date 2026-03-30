module.exports = {
	ci: {
		collect: {
			startServerCommand: 'npx http-server ./dist -p 8085 --silent',
			url: ['http://localhost:8085/'],
			numberOfRuns: 1,
		},
		assert: {
			assertions: {
				'categories:accessibility': ['error', { minScore: 0.95 }],
				'categories:performance': ['warn', { minScore: 0.7 }],
				'total-byte-weight': ['error', { maxNumericValue: 500000 }],
			},
		},
		upload: {
			target: 'filesystem',
			outputDir: '.lighthouseci',
		},
	},
};
