import {
    ControlElement,
    GroupLayout,
    HorizontalLayout,
    JsonSchema7,
    Labelable,
    Layout,
    UISchemaElement,
    VerticalLayout
} from "@jsonforms/core"
import {HelpContent} from "./HelpContent"

export interface SchemaPackage {
    ui_schema: ControlElement | GroupLayout | HorizontalLayout | VerticalLayout | HelpContent | Layout | UISchemaElement | Labelable
    data_schema: JsonSchema7
    meta: {
        is_container: boolean
        id: string
    }
}
