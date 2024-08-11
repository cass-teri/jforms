import "./globals.css"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./components/ui/resizable"
import {Root} from "./components/editor/Root"
import {JsonForms} from "@jsonforms/react"
import {UISchemaElement} from "@jsonforms/core"
import {Trash} from "@/components/editor/Trash.tsx"
import {PropertiesPanel} from "@/components/gui/PropertiesPanel.tsx"
import {useAst} from "@/components/context/AstContextProvider.tsx"
import {materialCells, materialRenderers} from "@jsonforms/material-renderers"
import {GoARenderers} from "@abgov/jsonforms-components"
import {ErrorBoundary} from "react-error-boundary"
import {useEffect} from "react"
import {appWindow} from "@tauri-apps/api/window"
import {IAst} from "@/types/IAst.tsx"
import {GenerateDataSchema} from "@/lib/GenerateDataSchema.ts"
import {readDir, readTextFile, writeTextFile} from "@tauri-apps/api/fs"
import {open, save} from "@tauri-apps/api/dialog"
import {GenerateUiSchema} from "@/lib/GenerateUiSchema.ts"
import {useProject} from "@/components/context/ProjectContextProvider.tsx"
import {ReparentAst} from "@/components/context/ReparentAst.tsx"
import {GenerateAstFromSchemas} from "@/lib/GenerateAstFromSchemas.ts"


export function App() {
    const {data_schema, ui_schema, ast, SetAst} = useAst()
    const {project_path, SetProjectPath} = useProject()
    const data = {}
    const renderers = [...materialRenderers, ...GoARenderers]
    const cells = [...materialCells]

    useEffect(() => {
        const new_project = appWindow.listen(
            "new_project",
            () => {
                SetAst({} as IAst)
                // TEMP FIX FOR RELOADING THE PAGE TO CLEAR THE AST
                location.reload()
            }
        )

        const open_project = appWindow.listen(
            "open_project",
            async () => {
                try {
                    const selected = await open({
                        directory: true,
                        multiple: false
                    })

                    if (selected === null) {
                        console.error("No path selected")
                        return "No path selected"
                    }

                    if (typeof selected === "string") {


                        const split = selected.split("/")
                        const selected_path = split[split.length - 1]
                        //SetProjectName(meselected_path)
                        SetProjectPath(selected_path)

                        let project = ""
                        let data_schema = ""
                        let ui_schema = ""

                        const files = await readDir(`${selected}`)

                        for (const file of files) {
                            if (file.name?.endsWith("project.json")) {
                                console.log(file.path)
                                project = await readTextFile(file.path)
                            }
                            if (file.name?.endsWith("data_schema.json")) {
                                console.log(file.path)
                                data_schema = await readTextFile(file.path)
                            }
                            if (file.name?.endsWith("ui_schema.json")) {
                                console.log(file.path)
                                ui_schema = await readTextFile(file.path)
                            }
                        }

                        if (project !== "") {
                            const new_ast = ReparentAst(JSON.parse(project) as IAst)
                            SetAst(new_ast)
                        } else if (data_schema !== "" && ui_schema !== "") {
                            const new_ast = GenerateAstFromSchemas(data_schema, ui_schema)
                            SetAst(new_ast as IAst)
                        }
                    }

                } catch (e: any) {
                    console.error(`err: ${e}`)
                    return e.message
                }
            }
        )

        const save_project = appWindow.listen(
            "save_project",
            async () => {

                try {
                    const new_ast = ReparentAst(ast)
                    const data = JSON.stringify(new_ast, (key, value) => {
                        if (key == "parent") {
                            if (value!== undefined && value!= null && value.id)
                                return value.id
                            return value
                        }
                        return value
                    })

                    if (data === null) {
                        console.error("No data to download")
                        return
                    }

                    let path: string | null = project_path

                    console.log(project_path)
                    if (path == "") {
                        path = await save({
                            filters: [
                                {
                                    name: "project",
                                    extensions: ["json"]
                                }
                            ],
                            defaultPath: "project.json"
                        })
                    }
                    else{
                        path = project_path + "/project.json"
                    }


                    if (path == null) {
                        console.log("No path selected")
                        return "No path selected"
                    }

                    await writeTextFile(path, data)

                    const new_path = path.split("/")[path.split("/").length - 1]

                    if (new_path !== project_path) {

                        SetProjectPath(path)
                    }
                } catch (e: any) {
                    console.error(e)
                    return e.message
                }

            }
        )

        const save_data_schema = appWindow.listen(
            "save_data_schema",
            async () => {

                try {
                    const data = ast
                    if (data === null) {
                        console.error("No data to download")
                        return
                    }
                    const data_schema = GenerateDataSchema(data)
                    const data_schema_string = JSON.stringify(data_schema, null, 4)
                    let path: string | null = project_path

                    if (path == "") {
                        path = await save({
                            filters: [
                                {
                                    name: "data_schema",
                                    extensions: ["json"]
                                }
                            ],
                            defaultPath: "data_schema.json"
                        })
                    }
                    else{
                        path = project_path + "/data_schema.json"
                    }

                    if (path == null) {
                        console.log("No path selected")
                        return "No path selected"
                    }

                    await writeTextFile(path, data_schema_string)
                    const new_path = path.split("/")[path.split("/").length - 1]

                    if (new_path !== project_path) {
                        SetProjectPath(new_path)
                    }
                } catch (e: any) {
                    console.error(e)
                    return e.message
                }

            }
        )

        const save_ui_schema = appWindow.listen(
            "save_ui_schema",
            async () => {
                try {
                    const ui = ast
                    if (ui === null) {
                        console.error("No data to download")
                        return
                    }
                    const ui_schema = GenerateUiSchema(ui)
                    const ui_schema_string = JSON.stringify(ui_schema, null, 4)
                    let path: string | null = project_path

                    if (path == "") {
                        path = await save({
                            filters: [
                                {
                                    name: "ui_schema",
                                    extensions: ["json"]
                                }
                            ],
                            defaultPath: "ui_schema.json"
                        })
                    }
                    else{
                        path = project_path + "/ui_schema.json"
                    }

                    if (path == null) {
                        console.log("No path selected")
                        return "No path selected"
                    }

                    await writeTextFile(path, ui_schema_string)
                    const new_path = path.split("/")[path.split("/").length - 1]


                    if (new_path !== project_path) {
                        SetProjectPath(new_path)
                    }
                } catch (e: any) {
                    console.error(e)
                    return e.message
                }
            }
        )

        const save_all = appWindow.listen(
            "save_all",
            (data: any) => {
                console.log(data)
            }
        )


        return () => {
            new_project.then((f) => f())
            open_project.then((f) => f())
            save_project.then((f) => f())
            save_data_schema.then((f) => f())
            save_ui_schema.then((f) => f())
            save_all.then((f) => f())
        }
    }, [SetAst, SetProjectPath, ast, project_path])

    return (
        <div className="flex flex-row justify-between " style={{touchAction: "pan-y"}}>
            <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col items-top pt-0 bg-background border shadow-2xl clear-both justify-start pl-28 pr-4 w-1/2 overflow-hidden h-screen"
            >
                <ResizablePanel defaultSize={50} className="flex flex-col" minSize={18}>
                    <Root></Root>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50} className="pr-12" minSize={18}>
                    <ErrorBoundary FallbackComponent={(e) => <div>Temporary Error Placeholder: {e.error}</div>}
                                   onError={(error, componentStack) => console.log(error, componentStack)}
                    >
                        <div className="px-8 pt-8 overflow-auto h-[calc(100vh-0.1rem)]">
                            <JsonForms
                                schema={data_schema}
                                uischema={ui_schema as UISchemaElement}
                                data={data}
                                renderers={renderers}
                                cells={cells}
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
