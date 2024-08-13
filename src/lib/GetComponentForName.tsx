import { HorizontalComponent } from "@/components/editor/components/HorizontalComponent.tsx"
import { VerticalComponent } from "@/components/editor/components/VerticalComponent.tsx"
import { TextComponent } from "@/components/editor/components/TextComponent.tsx"
import { createId } from "@paralleldrive/cuid2"
import { GroupComponent } from "@/components/editor/components/GroupComponent.tsx"
import { ChoiceComponent } from "@/components/editor/components/ChoiceComponent.tsx"
import { HelpComponent } from "@/components/editor/components/HelpComponent.tsx"
import { RepeaterComponent } from "@/components/editor/components/RepeaterComponent.tsx"
import { CategorizationComponent } from "@/components/editor/components/CategorizationComponent.tsx"
import { CategoryComponent } from "@/components/editor/components/CategoryComponent.tsx"

export function GetComponentForName(component_name: string, props: any) {
    const new_id = createId()
    const new_props = { id: new_id, ...props }

    switch (component_name) {
        case "HorizontalLayout":
            return <HorizontalComponent {...new_props} key={props.key}></HorizontalComponent>
        case "VerticalLayout":
            return <VerticalComponent {...new_props} key={props.key}></VerticalComponent>
        case "Group":
            return <GroupComponent {...new_props} key={props.key}></GroupComponent>
        case "Repeater":
            return <RepeaterComponent {...new_props} key={props.key}></RepeaterComponent>
        case "Categorization":
            return (
                <CategorizationComponent {...new_props} key={props.key} type="categorization">
                    {" "}
                </CategorizationComponent>
            )
        case "Category":
            return <CategoryComponent {...new_props} key={props.key} type="Category"></CategoryComponent>
        case "Text":
            return <TextComponent {...new_props} key={props.key} type="String"></TextComponent>
        case "Date":
            return <TextComponent {...new_props} key={props.key} type="Date"></TextComponent>
        case "Number":
            return <TextComponent {...new_props} key={props.key} type="Number"></TextComponent>
        case "Integer":
            return <TextComponent {...new_props} key={props.key} type="Integer"></TextComponent>
        case "PostalCode":
            return <TextComponent {...new_props} key={props.key} type="Postal Code"></TextComponent>
        case "Email":
            return <TextComponent {...new_props} key={props.key} type="Email"></TextComponent>
        case "Phone":
            return <TextComponent {...new_props} key={props.key} type="Phone"></TextComponent>
        case "Textarea":
            return <TextComponent {...new_props} key={props.key} type="Textarea"></TextComponent>

        case "Boolean":
            return <ChoiceComponent {...new_props} key={props.key} type="Boolean"></ChoiceComponent>
        case "DropDown":
            return <ChoiceComponent {...new_props} key={props.key} type="Dropdown"></ChoiceComponent>
        case "Radio":
            return <ChoiceComponent {...new_props} key={props.key} type="Radio"></ChoiceComponent>
        case "Checkbox":
            return <ChoiceComponent {...new_props} key={props.key} type="Checkbox"></ChoiceComponent>
        case "Province":
            return <ChoiceComponent {...new_props} key={props.key} type="Province"></ChoiceComponent>
        case "Ministry":
            return <ChoiceComponent {...new_props} key={props.key} type="Ministry"></ChoiceComponent>

        case "Header":
            return <HelpComponent {...new_props} key={props.key} type="Header"></HelpComponent>
        case "SubHeader":
            return <HelpComponent {...new_props} key={props.key} type="Sub Header"></HelpComponent>
        case "Paragraph":
            return <HelpComponent {...new_props} key={props.key} type="Paragraph"></HelpComponent>
        case "Bullets":
            return <HelpComponent {...new_props} key={props.key} type="Bullets"></HelpComponent>
        case "Details":
            return <HelpComponent {...new_props} key={props.key} type="Details"></HelpComponent>
        case "Link":
            return <HelpComponent {...new_props} key={props.key} type="Link"></HelpComponent>
        case "Image":
            return <HelpComponent {...new_props} key={props.key} type="Image"></HelpComponent>
        case "HelpContent":
            return <HelpComponent {...new_props} key={props.key} type="Help Content"></HelpComponent>

        default:
            break
    }
}
