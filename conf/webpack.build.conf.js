var path = require('path');
var assetsPath = path.join(process.cwd(), 'dist');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var path = require('path');
var fs = require('fs');
var lessToJs = require('less-vars-to-js');
var rimraf = require('rimraf')
var themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, '..', 'theme.less'), 'utf8'));
rimraf(path.join(__dirname, '..', 'dist'), err => console.log(err));
var webpackConfig = {
    entry: {
        //[app]为输出的文件名，output下的filename
        main: './src/main.js'
    },
    output: {
        path: assetsPath,
        filename: 'assets/js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: 'assets/js/[name].[hash].js',
        libraryTarget: 'umd'
    },
    resolve: {
        //不能有extensions属性
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!'+`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(themeVariables)}}`)
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'assets/img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader',
            query: {
                limit: 1000000,
                name: 'assets/fonts/[name].[ext]',
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            query: {
                name: 'assets/fonts/[name].[ext]',
            }

        }]
    },
    plugins: [
        //热更新下，css将不能抽离
        new LodashModuleReplacementPlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '..', 'dist/index.html'),
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                // 打包node_modules中的引用
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        //分离css文件
        new ExtractTextPlugin('assets/css/[name].[hash].css', { allChunks: true }),
        //压缩css
        new OptimizeCSSPlugin()
    ]
}


module.exports = webpackConfig;