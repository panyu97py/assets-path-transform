import type {NodePath, PluginItem, PluginPass} from '@babel/core'
import type {ImportDeclaration, Statement} from "@babel/types";
import template from '@babel/template'
import path from "path";
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

export interface AssetsTransformOpt {
    transform?: (filePath: string) => string
}


module.exports = (): PluginItem => {

    const defaultTransform = generateDefaultTransform()

    return {
        visitor: {
            ImportDeclaration(importDeclarationAstPath: NodePath<ImportDeclaration>, state: PluginPass) {

                if (state.file.opts.filename?.includes("node_modules")) return;

                const {transform = defaultTransform} = state.opts as AssetsTransformOpt

                const {node} = importDeclarationAstPath;

                const {value} = node.source;

                const fileUrl = transform(value)

                if (!fileUrl) return;

                const [specifier] = node.specifiers

                const assignExpression = template.ast(`const ${specifier.local.name} = '${fileUrl}';`);

                importDeclarationAstPath.replaceWith(assignExpression as Statement);
            }
        }
    }
}
