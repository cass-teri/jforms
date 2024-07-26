import {DropZone} from "@/components/editor/DropZone.tsx";

export function StepperComponent(props: { id: string }) {
    return <>
       <DropZone></DropZone>
       <div id={props.id}>Stepper</div>
   </>
}
