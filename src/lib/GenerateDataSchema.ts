import { IAst } from "@/types/IAst.tsx"

export function GenerateDataSchema(ast: IAst, root?: any) {
    if (root === undefined) {
        root = {
            type: "object",
            properties: {},
            required: []
        }
    }
    const data_schema = ast.SchemaPackage.data_schema
    const keys = Object.keys(data_schema)
    if (data_schema === undefined || data_schema == undefined || keys.length === 0) {
        console.log("rejected", data_schema)
    } else {
        console.log("accepted", data_schema)

        keys.forEach((key) => {
            root.properties[key] = data_schema[key]
        })
    }
    if (ast.children && ast.children.length > 0) {
        ast.children.forEach((child) => GenerateDataSchema(child, root))
    }

    return root
}
