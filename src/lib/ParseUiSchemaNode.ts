import {IAst} from "@/types/IAst.tsx";
import {createId} from "@paralleldrive/cuid2";
import {GetSchemasForName} from "@/lib/GetSchemasForName.ts";
import {GetObjectFromDataSchemaAddress} from "@/lib/GetObjectFromDataSchemaAddress.ts";

export function ParseUiSchemaNode(type: string, data_schema: any, ui_schema: any, parent: IAst | null) {

    let ast: IAst = {} as IAst
    switch (type) {
        case "Category":
        case "Group":
        case "HorizontalLayout":
        case "VerticalLayout":
        case "Categorization": {
            const children = ui_schema.elements.map((element: any) => {
                return ParseUiSchemaNode(element.type, data_schema, element, parent)
            })
            const id = createId()
            ast = {
                id,
                type: type,
                parent: parent,
                children: children,
                SchemaPackage: GetSchemasForName(type, id)
            }

            if (ui_schema.label) {
                // @ts-expect-error FIXME: Property 'label' may be null or undefined
                ast.SchemaPackage.ui_schema.label = ui_schema.label
            }

            break
        }
        case "Control": {

            const sub_type = "Text"

            let id = createId()
            if(ui_schema.scope) {
                id = ui_schema.scope.split("/").pop()
            }

            const data_schema_element = GetObjectFromDataSchemaAddress(ui_schema.scope, data_schema)
            console.log("data_schema_element", data_schema_element)


            ast = {
                id: id,
                type: sub_type,
                parent: parent,
                SchemaPackage: GetSchemasForName(sub_type, id),
                children: []
            }
            break
        }
        case "HelpContent": {
            const id = createId()

            let sub_type = ""

            if (ui_schema.label){
                sub_type = "Header"
            }
            else if (ui_schema.options && ui_schema.options.help){
                sub_type = "Paragraph"
            }
            else if (ui_schema.elements && ui_schema.elements.length > 0) {
                if (ui_schema.elements[0].type === "HelpContent") {
                    //Might be subheader or bullet list
                    if (ui_schema.elements[0].options && ui_schema.elements[0].options.help) {
                        sub_type = "BulletList"
                    }
                    else {
                        sub_type = "SubHeader"
                    }
                }
            }

            ast = {
                id,
                type: sub_type,
                parent: parent,
                SchemaPackage: GetSchemasForName(sub_type, id),
                children: []
            }
            //set the content
            const shallow_copy = { ...ui_schema}
            console.log("shallow_copy", shallow_copy)

            ast.SchemaPackage.ui_schema = {
                ...shallow_copy,
                type: "HelpContent"
            }
            break
        }
        default: {
            throw new Error(`Unknown type: ${type}`)
/*
            const id = createId()
            ast = {
                id,
                type: type,
                parent: parent,
                SchemaPackage: GetSchemasForName(type, id),
                children: []
            }
            break
*/
        }
    }

    return ast
}
