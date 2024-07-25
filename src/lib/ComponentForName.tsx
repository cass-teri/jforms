import {HorizontalComponent} from "@/components/editor/components/HorizontalComponent.tsx";
import {VerticalComponent} from "@/components/editor/components/VerticalComponent.tsx";
import {TextComponent} from "@/components/editor/components/TextComponent.tsx";
import {createId} from "@paralleldrive/cuid2";
import {DateComponent} from "@/components/editor/components/DateComponent.tsx";
import {GroupComponent} from "@/components/editor/components/GroupComponent.tsx";


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
        case "Text":
            return <TextComponent {...new_props}></TextComponent>
        case "Date":
            return <DateComponent {...new_props}></DateComponent>
        default:
            break
    }

}
