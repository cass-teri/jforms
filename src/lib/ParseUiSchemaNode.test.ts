import { describe, expect, it } from "vitest"
import { ParseUiSchemaNode } from "@/lib/ParseUiSchemaNode.ts"

describe("ParseUiSchemaNode", () => {
    it('should correctly parse a "Category" type node with children', () => {
        const mockDataSchema = {
            type: "object",
            properties: {
                child1: { type: "string" },
                child2: { type: "string" }
            }
        }
        const mockUiSchema = {
            type: "Category",
            elements: [
                { type: "Control", scope: "#/properties/child1" },
                { type: "Control", scope: "#/properties/child2" }
            ],
            label: "Test Category"
        }
        const parent = null

        const result = ParseUiSchemaNode("Category", mockDataSchema, mockUiSchema, parent)

        expect(result.type).toBe("Category")
        expect(result.children.length).toBe(2)
        // @ts-expect-error FIXME label may be null or undefined
        expect(result.SchemaPackage.ui_schema.label).toBe("Test Category")
    })

    it('should correctly parse a "Control" type node', () => {
        const mockDataSchema = {
            type: "object",
            properties: {
                test: {
                    type: "string"
                }
            }
        }
        const mockUiSchema = {
            type: "Control",
            scope: "#/properties/test"
        }
        const parent = null

        const result = ParseUiSchemaNode("Control", mockDataSchema, mockUiSchema, parent)

        expect(result.type).toBe("Text")
    })

    it('should correctly parse a "Control" of type date', () => {
        const mockDataSchema = {
            type: "object",
            properties: {
                test: {
                    type: "string",
                    format: "date"
                }
            }
        }
        const mockUiSchema = {
            type: "Control",
            scope: "#/properties/test"
        }
        const parent = null

        const result = ParseUiSchemaNode("Control", mockDataSchema, mockUiSchema, parent)

        expect(result.type).toBe("Date")
    })

    it("should correctly parse a Control of type DropDown", () => {
        const mockDataSchema = {
            type: "object",
            properties: {
                test: {
                    type: "string",
                    enum: ["option1", "option2"]
                }
            }
        }
        const mockUiSchema = {
            type: "Control",
            scope: "#/properties/test"
        }

        const result = ParseUiSchemaNode("Control", mockDataSchema, mockUiSchema, null)

        expect(result.type).toBe("DropDown")
        // @ts-ignore
        const test = result.SchemaPackage.data_schema.test ?? null
        expect(test).toBeDefined()

        // TODO This will come when I fully implement import
        //expect(test?.enum).toEqual(["option1", "option2"])
    })
})

/*
import { IAst } from "@/types/IAst.tsx"
import { createId } from "@paralleldrive/cuid2"
import { GetSchemasForComponentType } from "@/lib/GetSchemasForComponentType.ts"
import { GetObjectFromDataSchemaAddress } from "@/lib/GetObjectFromDataSchemaAddress.ts"

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
                SchemaPackage: GetSchemasForComponentType(type, id)
            }

            if (ui_schema.label) {
                // @ts-expect-error FIXME: Property 'label' may be null or undefined
                ast.SchemaPackage.ui_schema.label = ui_schema.label
            }

            break
        }
        case "Control": {
            let id = createId()
            if (ui_schema.scope) {
                id = ui_schema.scope.split("/").pop()
            }

            const data_schema_element = GetObjectFromDataSchemaAddress(ui_schema.scope, data_schema)
            console.log("data_schema_element", data_schema_element)

            let sub_type = "Text"
            switch (data_schema_element.type) {
                case "string": {
                    sub_type = "Text"
                    if (data_schema_element.enum) {
                        sub_type = "DropDown"
                    } else if (
                        data_schema_element.format === "date-time" ||
                        data_schema_element.format === "date" ||
                        data_schema_element.format === "time"
                    ) {
                        sub_type = "Date"
                    } else if (
                        ui_schema.options !== null &&
                        ui_schema.options !== undefined &&
                        ui_schema.options.multi
                    ) {
                        sub_type = "Textarea"
                    }

                    break
                }
                case "number": {
                    sub_type = "Number"
                    break
                }
                case "integer": {
                    sub_type = "Integer"
                    break
                }
                case "boolean": {
                    sub_type = "Checkbox"
                    break
                }
                default: {
                    throw new Error(`Unknown type: ${data_schema_element.type}`)
                }
            }

            ast = {
                id: id,
                type: sub_type,
                parent: parent,
                SchemaPackage: GetSchemasForComponentType(sub_type, id),
                children: []
            }
            break
        }
        case "HelpContent": {
            const id = createId()

            let sub_type = ""
            let usage = 0

            if (ui_schema.label) {
                sub_type = "Header"
                usage += 1
            }
            if (ui_schema.options && ui_schema.options.help) {
                sub_type = "Paragraph"
                usage += 1
            }
            if (ui_schema.elements && ui_schema.elements.length > 0) {
                if (ui_schema.elements[0].type === "HelpContent") {
                    //Might be subheader or bullet list
                    if (ui_schema.elements[0].options && ui_schema.elements[0].options.help) {
                        sub_type = "BulletList"
                        usage += 1
                    } else {
                        sub_type = "SubHeader"
                        usage += 1
                    }
                }
            }

            if (usage > 1) {
                sub_type = "HelpContent"
            }

            ast = {
                id,
                type: sub_type,
                parent: parent,
                SchemaPackage: GetSchemasForComponentType(sub_type, id),
                children: []
            }
            //set the content
            const shallow_copy = { ...{}, ...ui_schema }
            console.log("shallow_copy", shallow_copy)

            ast.SchemaPackage.ui_schema = {
                ...shallow_copy,
                type: "HelpContent"
            }
            break
        }
        default: {
            throw new Error(`Unknown type: ${type}`)
            /!*
                        const id = createId()
                        ast = {
                            id,
                            type: type,
                            parent: parent,
                            SchemaPackage: GetSchemasForName(type, id),
                            children: []
                        }
                        break
            *!/
        }
    }

    return ast
}
*/
