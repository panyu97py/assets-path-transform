import type {IPluginContext} from "@tarojs/service";
import path from 'path';


module.exports = (ctx: IPluginContext,) => {

    ctx.modifyWebpackChain(({chain}) => {
        const tempPath = path.resolve(__dirname, './babel-plugin-assets-to-url');

        chain.module
            .rule('script')
            .use('babelLoader')
            .options({plugins: [tempPath]})

    })

}
