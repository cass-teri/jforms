import { IAst } from "@/types/IAst.tsx"

export function GenerateDataSchema(ast: IAst, root?: any) {
    if (root === undefined) {
        root = {
            type: "object",
            properties: {},
            required: []
        }
    }
    if (ast.SchemaPackage === undefined || ast.SchemaPackage === null || ast.SchemaPackage.data_schema === undefined) {
        return root
    }

    const data_schema = ast.SchemaPackage.data_schema
    const keys = Object.keys(data_schema)
    if (data_schema === undefined || data_schema == undefined || keys.length === 0) {
    } else {
        keys.forEach((key) => {
            // @ts-expect-error  TODO: Object is possibly 'undefined'.
            root.properties[key] = data_schema[key]
        })
    }
    if (ast.children && ast.children.length > 0) {
        ast.children.forEach((child) => GenerateDataSchema(child, root))
    }

    return root
}
