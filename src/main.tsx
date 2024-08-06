import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "@/App.tsx"
import { Header } from "./components/gui/Header.tsx"
import { ThemeProvider } from "@/components/context/ThemeProvider.tsx"
import { Toolbar } from "@/components/gui/Toolbar.tsx"
import { DragContextProvider } from "@/components/context/DragContextProvider.tsx"
import { AstContextProvider } from "@/components/context/AstContextProvider.tsx"
import { SelectionProvider } from "@/components/context/SelectionContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SelectionProvider>
                <DragContextProvider>
                    <AstContextProvider>
                        <Header></Header>
                        <App />
                        <Toolbar></Toolbar>
{/*
                        <Footer></Footer>
*/}
                    </AstContextProvider>
                </DragContextProvider>
            </SelectionProvider>
        </ThemeProvider>
    </React.StrictMode>
)
