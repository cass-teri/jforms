import "./globals.css"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable"
import { Root } from "./components/editor/Root"
import { JsonForms } from "@jsonforms/react"
import { GoARenderers } from "@abgov/jsonforms-components"
import { UISchemaElement } from "@jsonforms/core"

function App() {
    const data = {}
    const data_schema = {}
    const uiSchema = {}

    function OnChange(e: any) {
        console.log(e)
    }

    return (
        <div className="flex flex-row justify-between ">
            <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col items-top pt-16 pb-96 h-[calc(100vh-6rem)] bg-background border shadow-2xl overflow-auto clear-both justify-start pl-36 pr-4 w-1/2"
            >
                <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center">
                    <Root></Root>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <JsonForms
                        schema={data_schema}
                        uischema={uiSchema as UISchemaElement}
                        data={data}
                        renderers={GoARenderers}
                        onChange={OnChange}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default App
