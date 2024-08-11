import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
} from "@/components/ui/menubar.tsx"

export function Header() {

    function OnDownloadUiSchema() {
    }

    return (
        <header
            className="bg-neutral-900 fixed left-0 top-0 right-0 h-16 flex flex-row justify-between items-center px-8 z-50">
            <Menubar className="bg-neutral-800 border-0 text-neutral-100">
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
{/*
                        <MenubarItem onClick={OnNewFile}>New Form</MenubarItem>
                        <MenubarItem onClick={OnDownloadDataSchema}>Download Data Schema</MenubarItem>
*/}
                        <MenubarItem onClick={OnDownloadUiSchema}>Download UI Schema</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator/>
                        <MenubarSub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Search the web</MenubarItem>
                                <MenubarSeparator/>
                                <MenubarItem>Find...</MenubarItem>
                                <MenubarItem>Find Next</MenubarItem>
                                <MenubarItem>Find Previous</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator/>
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </header>
    )
}
