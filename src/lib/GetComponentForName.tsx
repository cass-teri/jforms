import { HorizontalComponent } from "@/components/editor/components/HorizontalComponent.tsx"
import { VerticalComponent } from "@/components/editor/components/VerticalComponent.tsx"
import { TextComponent } from "@/components/editor/components/TextComponent.tsx"
import { createId } from "@paralleldrive/cuid2"
import { GroupComponent } from "@/components/editor/components/GroupComponent.tsx"
import { ChoiceComponent } from "@/components/editor/components/ChoiceComponent.tsx"
import { HelpComponent } from "@/components/editor/components/HelpComponent.tsx"
import { RepeaterComponent } from "@/components/editor/components/RepeaterComponent.tsx"
import { StepperComponent } from "@/components/editor/components/StepperComponent.tsx"

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
        case "Stepper":
            return <StepperComponent {...new_props} key={props.key}></StepperComponent>

        case "Text":
            return <TextComponent {...new_props} key={props.key} type="string"></TextComponent>
        case "Date":
            return <TextComponent {...new_props} key={props.key} type="date"></TextComponent>
        case "Number":
            return <TextComponent {...new_props} key={props.key} type="number"></TextComponent>
        case "Integer":
            return <TextComponent {...new_props} key={props.key} type="integer"></TextComponent>
        case "PostalCode":
            return <TextComponent {...new_props} key={props.key} type="postal_code"></TextComponent>
        case "Email":
            return <TextComponent {...new_props} key={props.key} type="email"></TextComponent>
        case "Phone":
            return <TextComponent {...new_props} key={props.key} type="phone"></TextComponent>
        case "Textarea":
            return <TextComponent {...new_props} key={props.key} type="textarea"></TextComponent>

        case "Boolean":
            return <ChoiceComponent {...new_props} key={props.key} type="radio"></ChoiceComponent>
        case "DropDown":
            return <ChoiceComponent {...new_props} key={props.key} type="dropdown"></ChoiceComponent>
        case "Radio":
            return <ChoiceComponent {...new_props} key={props.key} type="radio"></ChoiceComponent>
        case "Checkbox":
            return <ChoiceComponent {...new_props} key={props.key} type="radio"></ChoiceComponent>
        case "Province":
            return <ChoiceComponent {...new_props} key={props.key} type="province"></ChoiceComponent>
        case "Ministry":
            return <ChoiceComponent {...new_props} key={props.key} type="ministry"></ChoiceComponent>

        case "Header":
            return <HelpComponent {...new_props} key={props.key} type="header"></HelpComponent>
        case "SubHeader":
            return <HelpComponent {...new_props} key={props.key} type="sub_header"></HelpComponent>
        case "Paragraph":
            return <HelpComponent {...new_props} key={props.key} type="paragraph"></HelpComponent>
        case "Bullets":
            return <HelpComponent {...new_props} key={props.key} type="bullets"></HelpComponent>
        case "Details":
            return <HelpComponent {...new_props} key={props.key} type="details"></HelpComponent>
        case "Link":
            return <HelpComponent {...new_props} key={props.key} type="link"></HelpComponent>
        case "Image":
            return <HelpComponent {...new_props} key={props.key} type="image"></HelpComponent>

        default:
            break
    }
}
