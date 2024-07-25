import {ControlElement, GroupLayout, HorizontalLayout, JsonSchema7, VerticalLayout } from "@jsonforms/core";
import {createId} from "@paralleldrive/cuid2";

interface HelpContent {
}

export function ComponentBlankForName(component_type: string) {
    const id=createId()


    switch (component_type) {
        case "Group": {
            const ui_schema: GroupLayout = {
                type: "Group",
                elements: []
            }

            return {ui_schema, data_schema: {}, meta: {container: true}}
        }
        case "HorizontalLayout": {
            const ui_schema : HorizontalLayout = {
                type: "HorizontalLayout",
                elements: []
            }
            return {ui_schema, data_schema: {}, meta: {container: true}}
        }
        case "VerticalLayout": {
            const ui_schema : VerticalLayout = {
                type: "VerticalLayout",
                elements: []
            }

            return {ui_schema, data_schema: {}, meta:{container: true}}
        }
        case "Text": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: `#/properties/${id}`,
            }

            const data_schema: JsonSchema7 = {
                type: "string",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Number": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "number",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Boolean": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
                options: {
                    radio: true,
                    textForTrue: "Yes",
                    textForFalse: "No"
                }
            }

            const data_schema: JsonSchema7 = {
                type: "boolean",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Integer": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "integer",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Dropdown": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                enum: []
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Date": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                format: "date"
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Textarea": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
                options: {
                    multi: true,
                    componentProps: {
                        rows: 4
                    }
                }
            }

            const data_schema: JsonSchema7 = {
                type: "string",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Radio": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
                options: {
                    format: "radio",
                    enumOptions: []
                }
            }

            const data_schema: JsonSchema7 = {
                type: "string",
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Checkbox": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
                options: {
                    format: "checkbox"
                }
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                enum: []
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "PostalCode": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                pattern: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$"
            }

            return {ui_schema, data_schema, meta: {container: false, id }}
        }
        case "Email": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                pattern: "^.+@.+\\.[a-zA-Z]{2,}$"
            }

            return {ui_schema, data_schema, meta: {container: false, id}}
        }
        case "Phone": {
            const ui_schema: ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "string",
                pattern: "^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$"
            }

            return {ui_schema, data_schema, meta: {container: false, id }}
        }
        case "Header": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                label: ""
            }

            return {ui_schema, data_schema: {}, meta: {container: false, id}}
        }
        case "SubHeader": {
            const ui_schema: HelpContent ={
                type: "HelpContent",
                elements: [
                    {
                        type: "HelpContent",
                        label: ""
                    }
                ]
            }

            return {ui_schema, data_schema: {}, meta: {container: false, id}}
        }
        case "Bullets": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                elements: [{
                    type: "HelpContent",
                    label: "",
                    options: {
                        help: []
                    }
                }]
            }

            return {ui_schema, data_schema: {}, meta: {container: false, id}}
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

            return {ui_schema, data_schema: {}, meta: {container: false, id}}
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

            return {ui_schema, data_schema: {}, meta: {container: false, id}}
        }
        case "Link": {
            const ui_schema: HelpContent = {
                type: "HelpContent",
                options: {
                    variant: "hyperlink",
                    link: "",
                    help: `Link: ${id}`
                }
            }

            return {ui_schema, data_schema: {}, meta: {container: false, id}}

        }
        case "Repeater": {
            const ui_schema : ControlElement = {
                type: "Control",
                scope: "",
            }

            const data_schema: JsonSchema7 = {
                type: "array",
                items: {
                    type: "object",
                    properties: {}
                }
            }

            return {ui_schema, data_schema, meta: {container: false, id}}

        }


        default: {
            return {ui_schema: {}, data_schema: {}, meta: {container: false, id}}
        }



    }


}
