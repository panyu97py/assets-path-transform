import fs from "fs";
import path from "path";

export const cacheFileName = 'fileUrlCache.json'

const getCacheData = (filePath: string): Record<string, string> => {
    try {
        fs.accessSync(filePath);
        return JSON.parse(fs.readFileSync(filePath).toString());
    } catch (error) {
        return {}
    }

}

const filePathFormat = (filePath: string) => filePath.replace(/^~/, '')


export const generateDefaultTransform = () => {
    let cacheData: Record<string, string>

    return (filePath: string) => {
        if (!cacheData) {
            cacheData = getCacheData(path.resolve(__dirname, cacheFileName))
        }

        if (!cacheData[filePathFormat(filePath)]) return filePath

        return cacheData[filePathFormat(filePath)]
    }
}
