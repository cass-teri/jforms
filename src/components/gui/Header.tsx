import {ModeToggle} from "@/components/gui/ModeToggle.tsx";

export function Header() {
    return <header className="bg-primary fixed left-0 top-0 right-0 h-16 flex flex-row justify-between items-center px-8">
        <h1 className="text-2xl text-neutral-900">Header</h1>
        <ModeToggle></ModeToggle>

    </header>
}
