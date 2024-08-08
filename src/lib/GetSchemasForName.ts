import {
    Categorization,
    Category,
    ControlElement,
    GroupLayout,
    HorizontalLayout,
    JsonSchema7,
    Layout,
    UISchemaElement,
    VerticalLayout
} from "@jsonforms/core"
import {SchemaPackage} from "@/types/SchemaPackage.tsx"
import {HelpContent} from "@/types/HelpContent.tsx"

export function GetSchemasForName(component_type: string, id: string) {

    switch (component_type) {
        case "Group": {
            const ui_schema: GroupLayout = {
                type: "Group",
                elements: []
            }

            return {ui_schema, data_schema: {}, meta: {is_container: true, id}} as SchemaPackage
        }
        case "HorizontalLayout": {
            const ui_schema: HorizontalLayout & Layout & UISchemaElement = {
                type: "HorizontalLayout",
                elements: []
            }
            return {ui_schema, data_schema: {}, meta: {is_container: true, id}} as SchemaPackage
        }
        case "VerticalLayout": {
            const ui_schema: VerticalLayout & Layout & UISchemaElement = {
                type: "VerticalLayout",
                elements: []
            }

            return {ui_schema, data_schema: {}, meta: {is_container: true, id}} as SchemaPackage
        }
        case "Categorization": {
            const ui_schema: Categorization & Layout & UISchemaElement = {
                type: "Categorization",
                label: id,
                elements: [],
                options: {
                    variant: "stepper"
                }
            }

            return {ui_schema, data_schema: {}, meta: {is_container: true, id}} as SchemaPackage
        }
        case "Category": {
            const ui_schema: Category & Layout & UISchemaElement = {
                type: "Category",
                label: id,
                elements: []
            }

            return {ui_schema, data_schema: {}, meta: {is_container: true, id}} as SchemaPackage
        }
        case "Text": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Number": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "number"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Boolean": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`,
                options: {
                    radio: true,
                    textForTrue: "Yes",
                    textForFalse: "No"
                }
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "boolean"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Integer": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "integer"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "DropDown": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    enum: [""]
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Date": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    format: "date"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Textarea": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`,
                options: {
                    multi: true,
                    componentProps: {
                        rows: 4
                    }
                }
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Radio": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`,
                options: {
                    format: "radio",
                }

            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    enum: [""]
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Checkbox": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`,
                options: {
                    format: "checkbox"
                }
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "boolean",
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "PostalCode": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    pattern: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Email": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    pattern: "^.+@.+\\.[a-zA-Z]{2,}$"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Phone": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    pattern: "^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$"
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Header": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                label: "Header"
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Paragraph": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                label: "",
                options: {
                    help: "Paragraph Text"
                }
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "SubHeader": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                elements: [
                    {
                        type: "HelpContent",
                        label: "SubHeader"
                    }
                ]
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Bullets": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                elements: [
                    {
                        type: "HelpContent",
                        label: "",
                        options: {
                            help: [
                                "one", "two", "three"
                            ]
                        }
                    }
                ]
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Details": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                label: `Title: ${id}`,
                options: {
                    variant: "details",
                    help: `Text: ${id}`
                }
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Image": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                options: {
                    variant: "img",
                    src: "",
                    alt: "",
                    height: "",
                    width: ""
                }
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Link": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                options: {
                    variant: "hyperlink",
                    link: "http://alberta.ca",
                    help: `Link: ${id}`
                }
            }

            return {ui_schema, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Repeater": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [id]: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {}
                    }
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Province": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    enum: [
                        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Northwest Territories", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
                    ]
                }
            }

            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }
        case "Ministry": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`
            }

            const data_schema: JsonSchema7 = {
                [`${id}`]: {
                    type: "string",
                    enum: [
                        "Agriculture and Forestry", "Children's Services", "Community and Social Services", "Culture and Multiculturalism", "Economic Development, Trade and Tourism", "Education", "Energy", "Environment and Parks", "Health", "Indigenous Relations", "Infrastructure", "Justice and Solicitor General", "Labour", "Municipal Affairs", "Seniors and Housing", "Service Alberta", "Transportation", "Treasury Board and Finance"
                    ]
                }

            }
            return {ui_schema, data_schema, meta: {is_container: false, id}} as SchemaPackage
        }


        default: {
            return {ui_schema: {}, data_schema: {}, meta: {is_container: false, id}} as SchemaPackage
        }
    }
}
