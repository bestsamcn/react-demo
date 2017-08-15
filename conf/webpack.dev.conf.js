var path = require('path');
var assetsPath = path.join(process.cwd(), 'public');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var fs = require('fs');
var lessToJs = require('less-vars-to-js');
var themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, '..', 'theme.less'), 'utf8'));

var _port = 8000;

var webpackConfig = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: assetsPath,
        filename: 'js/[name].client.js',
        //静态文件输出的形式/js/xxx.js
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    devServer:{
        watch:true,
        historyApiFallback:true,
        hot:true,
        inline:true,
        port:_port,
        progress:true
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!'+`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(themeVariables)}}`
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, 
        {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader',
            query: {
                limit: 1000000,
                name: 'fonts/[name].[ext]',
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            query: {
                name: 'fonts/[name].[ext]',
            }

        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        // new ExtractTextPlugin('[name].css', {allChunks: false}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:'+_port
        })

    ]
}


module.exports = webpackConfig;