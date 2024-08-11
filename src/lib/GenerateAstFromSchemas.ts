import {ParseUiSchemaNode} from "@/lib/ParseUiSchemaNode.ts";

export function GenerateAstFromSchemas(data_schema_string: string, ui_schema_string: string) {

    const data_schema = JSON.parse(data_schema_string)
    const ui_schema = JSON.parse(ui_schema_string)

    let new_ast = null
    try {
        new_ast = ParseUiSchemaNode(ui_schema.type, data_schema, ui_schema, null)
    }catch (e:any){
        console.log("error", e)
    }

    return new_ast
}
