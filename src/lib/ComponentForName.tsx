import {HorizontalComponent} from "@/components/editor/components/HorizontalComponent.tsx";
import {VerticalComponent} from "@/components/editor/components/VerticalComponent.tsx";
import {TextComponent} from "@/components/editor/components/TextComponent.tsx";
import {CalendarComponent} from "@/components/editor/components/CalendarComponent.tsx";
import {createId} from "@paralleldrive/cuid2";

export function ComponentForName(component_name: string) {

    const new_id = createId()
    const new_props = {id: new_id}

    switch (component_name) {
        case "horizontal":
            return <HorizontalComponent {...new_props}></HorizontalComponent>
        case "vertical":
            return <VerticalComponent {...new_props}></VerticalComponent>
        case "text":
            return <TextComponent {...new_props}></TextComponent>
        case "calendar":
            return <CalendarComponent {...new_props}></CalendarComponent>
        default:
            break
    }

}
