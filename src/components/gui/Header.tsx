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
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { IAst } from "@/types/IAst.tsx"
import { GenerateDataSchema } from "@/lib/GenerateDataSchema.ts"
import { GenerateUiSchema } from "@/lib/GenerateUiSchema.ts"

export function Header() {
    const { ast, SetAst } = useAst()

    function OnNewFile() {
        SetAst({} as IAst)
        // TEMP FIX FOR RELOADING THE PAGE TO CLEAR THE AST
        location.reload()
    }

    function OnDownloadDataSchema() {
        const data = ast
        if (data === null) {
            console.error("No data to download")
            return
        }
        const data_schema = GenerateDataSchema(data)
        const data_schema_string = JSON.stringify(data_schema, null, 4)
        const blob = new Blob([data_schema_string], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "data_schema.json"
        a.click()
    }

    function OnDownloadUiSchema() {
        const ui = ast
        if (ui === null) {
            console.error("No data to download")
            return
        }
        const ui_schema = GenerateUiSchema(ui)
        const ui_schema_string = JSON.stringify(ui_schema, null, 4)
        const blob = new Blob([ui_schema_string], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "ui_schema.json"
        a.click()
    }

    return (
        <header className="bg-neutral-900 fixed left-0 top-0 right-0 h-16 flex flex-row justify-between items-center px-8 z-50">
            <Menubar className="bg-neutral-800 border-0 text-neutral-100">
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={OnNewFile}>New Form</MenubarItem>
                        <MenubarItem onClick={OnDownloadDataSchema}>Download Data Schema</MenubarItem>
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
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Search the web</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Find...</MenubarItem>
                                <MenubarItem>Find Next</MenubarItem>
                                <MenubarItem>Find Previous</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </header>
    )
}
