# taro-assets-to-url
适用 `taro` 的文件资源路径转换插件，可用于上传本地资源至云端。并替换代码中使用的本地路径为云端路径

## 配置

### 自动上传文件并替换项目中的引用
```js
// taro config.js
module.exports = {
    // ...
    presets: [
        [
            'taro-assets-path-transform',
            {
                fileDir: 'assets',
                upload: (filePath, fileKey) => {
                    // 实现自定义上传逻辑
                    return 'url'
                }
            },
        ],
    ],
    // ...
    mini: {
        // ...
        postcss: {
            'taro-assets-path-transform/dist/plugins/postcss-plugin-assets-path-transform': {
                enable: 'true',
                config: {}
            }
        }
    }
}
```
### 仅替换资源路径且自定义转换逻辑
```js
// taro config.js
module.exports = {
    // ...
    mini: {
        // ...
        postcss: {
            'taro-assets-path-transform/dist/postcss-plugin-assets-path-transform': {
                enable: 'true',
                config: {
                    transform:(filePath)=>{
                        // 自定义转换逻辑
                        return 'newFilePath'
                    }
                }
            }
        }
    }
    // ...
}
```


```js
// babel.config.js
module.exports = {
    // ...
    plugins: ['taro-assets-to-url/dist/babel-plugin-assets-path-transform', {
        transform: (filePath) => {
            // 自定义转换逻辑
            return 'newFilePath'
        }
    }]
}
```
