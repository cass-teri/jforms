import {useDragging} from "@/components/context/DragContextProvider.tsx";

export function Footer() {

    const { dragging_context} = useDragging()

    return <footer className="fixed h-16 left-0 bottom-0 right-0 bg-primary">
        <div className="flex justify-around items-center h-full px-4">
            <div className="text-neutral-200">Dragging: {dragging_context.id}</div>
            <div className="text-neutral-200">Dragging Type: {dragging_context.dragging_type}</div>
            <div className="text-neutral-200">Is Dragging: [{dragging_context.is_dragging}]</div>

        </div>
    </footer>;
}
