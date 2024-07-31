import { IAst } from "@/types/IAst.tsx"

export function GenerateUiSchema(ast: IAst) {
    const ui_schema = ast.SchemaPackage.ui_schema

    if (ui_schema === undefined || ui_schema == undefined) {
        return null
    }
    if (ast.children && ast.children.length > 0) {
        ui_schema.elements = ast.children.map((child) => GenerateUiSchema(child))
    }

    return ui_schema
}
