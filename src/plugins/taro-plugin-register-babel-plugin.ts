import type {IPluginContext} from "@tarojs/service";
import path from 'path';
import {AssetsToUrlOpt} from "./babel-plugin-assets-path-transform";


module.exports = (ctx: IPluginContext, pluginOpts: AssetsToUrlOpt) => {

    const {cacheFileName} = pluginOpts

    ctx.modifyWebpackChain(({chain}) => {
        const tempPath = path.resolve(__dirname, './babel-plugin-assets-to-url');

        chain.module
            .rule('script')
            .use('babelLoader')
            .options({plugins: [[tempPath, {cacheFileName}]]})

    })

}
