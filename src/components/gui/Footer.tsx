import { useDragging } from "@/components/context/DragContextProvider.tsx"
import { useSelection } from "@/components/context/SelectionContext.tsx"

export function Footer() {
    const { dragging_context } = useDragging()
    const { selected } = useSelection()

    return (
        <footer className="fixed h-16 left-0 bottom-0 right-0 bg-primary">
            <div className="flex justify-around items-center h-full px-4">
                <div className="text-neutral-200">Selected: {selected}</div>

                <div className="text-neutral-200">Dragging: {dragging_context.id}</div>
                <div className="text-neutral-200">Dragging Type: {dragging_context.dragging_type}</div>
            </div>
        </footer>
    )
}
