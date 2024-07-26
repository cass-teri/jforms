import {DropZone} from "@/components/editor/DropZone.tsx";

export function RepeaterComponent(props: { id: string }) {
    return <>
        <DropZone></DropZone>
        <div id={props.id} className="w-full">Repeater</div>;
    </>
}
