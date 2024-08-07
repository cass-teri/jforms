import "./globals.css"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./components/ui/resizable"
import {Root} from "./components/editor/Root"
import {JsonForms} from "@jsonforms/react"
import {UISchemaElement} from "@jsonforms/core"
import {Trash} from "@/components/editor/Trash.tsx"
import {PropertiesPanel} from "@/components/gui/PropertiesPanel.tsx"
import {useAst} from "@/components/context/AstContextProvider.tsx"
import {materialCells, materialRenderers} from "@jsonforms/material-renderers"
import {GoARenderers} from "@abgov/jsonforms-components";
import {ErrorBoundary} from "react-error-boundary"

export function App() {
    const {data_schema, ui_schema} = useAst()
    const data = {}

    const renderers = [...materialRenderers, ...GoARenderers]
    const cells = [...materialCells]

    // const renderers = [...materialRenderers, , ...GoARenderers]
    // const cells = [...materialCells, ...GoACells]


    function OnChange(e: any) {
        console.log(e)
    }

    return (
        <div className="flex flex-row justify-between " style={{touchAction: "pan-y"}}>
            <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col items-top pt-16 bg-background border shadow-2xl clear-both justify-start pl-28 pr-4 w-1/2 overflow-hidden h-screen"
            >
                <ResizablePanel defaultSize={50} className="flex flex-col" minSize={18}>
                    <Root></Root>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50} className="pr-12" minSize={18}>
                    <ErrorBoundary FallbackComponent={() => <div>Temporary Error Placeholder</div>}
                                   onError={(error, componentStack) => console.log(error, componentStack)}
                    >
                        <div className="pl-8 pr-8 pt-16 overflow-auto h-[calc(100vh-4.1rem)]">
                            <JsonForms
                                schema={data_schema}
                                uischema={ui_schema as UISchemaElement}
                                data={data}
                                renderers={renderers}
                                cells={cells}
                                onChange={OnChange}
                            />
                        </div>
                    </ErrorBoundary>
                </ResizablePanel>
            </ResizablePanelGroup>
            <PropertiesPanel></PropertiesPanel>
            <Trash></Trash>
        </div>
    )
}
