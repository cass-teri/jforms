import "./globals.css"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./components/ui/resizable"
import {Root} from "./components/editor/Root"
import {JsonForms} from "@jsonforms/react"
import {UISchemaElement} from "@jsonforms/core"
import {Trash} from "@/components/editor/Trash.tsx"
import {PropertiesPanel} from "@/components/gui/PropertiesPanel.tsx"
import {useAst} from "@/components/context/AstContextProvider.tsx"
import {materialCells, materialRenderers} from "@jsonforms/material-renderers"
import {GoABaseRenderers, GoACells, GoARenderers} from "@abgov/jsonforms-components";

export function App() {
    const {data_schema, ui_schema} = useAst()
    const data = {}

    const renderers = [...materialRenderers, ...GoABaseRenderers, ...GoARenderers]
    const cells = [...materialCells, ...GoACells]


    function OnChange(e: any) {
        console.log(e)
    }

    return (
        <div className="flex flex-row justify-between ">
            <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col items-top pt-16 pb-96 h-[calc(100vh-6rem)] bg-background border shadow-2xl overflow-auto clear-both justify-start pl-36 pr-4 w-1/2"
            >
                <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center pr-8">
                    <Root></Root>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50} className="pl-8 pr-16 py-16">
                    <JsonForms
                        schema={data_schema}
                        uischema={ui_schema as UISchemaElement}
                        data={data}
                        renderers={renderers}
                        cells={cells}
                        onChange={OnChange}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
            <PropertiesPanel></PropertiesPanel>
            <Trash></Trash>
        </div>
    )
}
