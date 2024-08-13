import React from "react"
import ReactDOM from "react-dom/client"
import {App} from "@/App.tsx"
import {ThemeProvider} from "@/components/context/ThemeProvider.tsx"
import {Toolbar} from "@/components/gui/Toolbar.tsx"
import {DragContextProvider} from "@/components/context/DragContextProvider.tsx"
import {AstContextProvider} from "@/components/context/AstContextProvider.tsx"
import {SelectionProvider} from "@/components/context/SelectionContext.tsx"
import {ProjectContextProvider} from "@/components/context/ProjectContextProvider.tsx";
import {ErrorBoundary} from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SelectionProvider>
                <DragContextProvider>
                    <ProjectContextProvider>
                        <ErrorBoundary FallbackComponent={(e)=><div>{e.error}</div>}>
                        <AstContextProvider>
                            <App/>
                            <Toolbar></Toolbar>
                            {/*
                        <Footer></Footer>
*/}
                        </AstContextProvider>
                        </ErrorBoundary>
                    </ProjectContextProvider>
                </DragContextProvider>
            </SelectionProvider>
        </ThemeProvider>
    </React.StrictMode>
)
