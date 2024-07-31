import { IAst } from "@/types/IAst.tsx"

export function GenerateDataSchema(ast: IAst) {
    const data_schema = ast.SchemaPackage.data_schema

    return JSON.stringify(data_schema, null, 4)
}
