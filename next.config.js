/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const { parsed: myEnv } = require('dotenv').config()
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true
    },
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    },
    images: {
        domains: ['i.scdn.co', 'learnbestcoding.com'],
      },
}

module.exports = nextConfig
