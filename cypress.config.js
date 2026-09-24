const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://api.escuelajs.co/api/v1',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
})
