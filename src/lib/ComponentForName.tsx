import {HorizontalComponent} from "@/components/editor/components/HorizontalComponent.tsx";
import {VerticalComponent} from "@/components/editor/components/VerticalComponent.tsx";
import {TextComponent} from "@/components/editor/components/TextComponent.tsx";
import {createId} from "@paralleldrive/cuid2";
import {GroupComponent} from "@/components/editor/components/GroupComponent.tsx";
import {ChoiceComponent} from "@/components/editor/components/ChoiceComponent.tsx";
import {HelpComponent} from "@/components/editor/components/HelpComponent.tsx";
import {RepeaterComponent} from "@/components/editor/components/RepeaterComponent.tsx";
import {StepperComponent} from "@/components/editor/components/StepperComponent.tsx";


export function ComponentForName(component_name: string) {

    const new_id = createId()
    const new_props = {id: new_id}


    switch (component_name) {
        case "HorizontalLayout":
            return <HorizontalComponent {...new_props}></HorizontalComponent>
        case "VerticalLayout":
            return <VerticalComponent {...new_props}></VerticalComponent>
        case "Group":
            return <GroupComponent {...new_props}></GroupComponent>
        case "Repeater":
            return <RepeaterComponent {...new_props}></RepeaterComponent>
        case "Stepper":
            return <StepperComponent {...new_props}></StepperComponent>

        case "Text":
            return <TextComponent {...new_props} type="string"></TextComponent>
        case "Date":
            return <TextComponent {...new_props} type="date"></TextComponent>
        case "Number":
            return <TextComponent {...new_props} type="number"></TextComponent>
        case "Integer":
            return <TextComponent {...new_props} type="integer"></TextComponent>
        case "PostalCode":
            return <TextComponent {...new_props} type="postal_code"></TextComponent>
        case "Email":
            return <TextComponent {...new_props} type="email"></TextComponent>
        case "Phone":
            return <TextComponent {...new_props} type="phone"></TextComponent>
        case "TextArea":
            return <TextComponent {...new_props} type="textarea"></TextComponent>

        case "Boolean":
            return <ChoiceComponent {...new_props} type="radio"></ChoiceComponent>
        case "DropDown":
            return <ChoiceComponent {...new_props} type="dropdown"></ChoiceComponent>
        case "Radio":
            return <ChoiceComponent {...new_props} type="radio"></ChoiceComponent>
        case "Checkbox":
            return <ChoiceComponent {...new_props} type="radio"></ChoiceComponent>
        case "Province":
            return <ChoiceComponent {...new_props} type="province"></ChoiceComponent>
        case "Ministry":
            return <ChoiceComponent {...new_props} type="ministry"></ChoiceComponent>

        case "Header":
            return <HelpComponent {...new_props} type="main"></HelpComponent>
        case "SubHeader":
            return <HelpComponent {...new_props} type="sub"></HelpComponent>
        case "Paragraph":
            return <HelpComponent {...new_props} type="paragraph"></HelpComponent>
        case "Bullets":
            return <HelpComponent {...new_props} type="bullets"></HelpComponent>
        case "Details":
            return <HelpComponent {...new_props} type="details"></HelpComponent>
        case "Link":
            return <HelpComponent {...new_props} type="link"></HelpComponent>
        case "Image":
            return <HelpComponent {...new_props} type="image"></HelpComponent>

        default:
            break
    }

}
