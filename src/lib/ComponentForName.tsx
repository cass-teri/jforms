import {HorizontalComponent} from "@/components/editor/HorizontalComponent.tsx";
import {VerticalComponent} from "@/components/editor/VerticalComponent.tsx";
import {TextComponent} from "@/components/editor/TextComponent.tsx";
import {CalendarComponent} from "@/components/editor/CalendarComponent.tsx";

export function ComponentForName(component_name: string) {

    switch (component_name) {
        case "horizontal":
            return <HorizontalComponent></HorizontalComponent>
        case "vertical":
            return <VerticalComponent></VerticalComponent>
        case "text":
            return <TextComponent></TextComponent>
        case "calendar":
            return <CalendarComponent></CalendarComponent>
        default:
            break
    }

}
