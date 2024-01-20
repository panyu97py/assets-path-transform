import {AcceptedPlugin} from "postcss";
import fs from "fs";
import {generateDefaultTransform} from "../utils";

const getCacheData = (filePath: string): Record<string, string> => {
    try {
        fs.accessSync(filePath);
        return JSON.parse(fs.readFileSync(filePath).toString());
    } catch (error) {
        return {}
    }

}


const urlRegexp = /url\('([^']*)'\)/

const filePathFormat = (filePath: string) => filePath.replace('~@', '@')


export interface AssetsTransformOpt {
    transform?: (filePath: string) => string
}


module.exports = (opt: AssetsTransformOpt): AcceptedPlugin => {

    const defaultTransform = generateDefaultTransform()

    return {
        postcssPlugin: 'auto-replace-assets-url',

        Declaration(decl) {

            if (!urlRegexp.test(decl.value)) return

            let [_, filePath] = decl.value.match(urlRegexp)!;

            filePath = filePathFormat(filePath)

            const {transform = defaultTransform} = opt

            decl.value = `url(${transform(filePath)})`

        }
    }
}
