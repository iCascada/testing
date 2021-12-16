const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

const getStyleLoaders = (loader) => {
    const cssLoaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
    ]

    if (loader) {
        cssLoaders.push(loader)
    }

    return cssLoaders
}

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true,
        open: true,
        compress: true,
        port: 5555,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src', 'static/fonts'),
                    to: path.join(__dirname, 'dist', 'static/fonts'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: getStyleLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: getStyleLoaders('sass-loader'),
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}