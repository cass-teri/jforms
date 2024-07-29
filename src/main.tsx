import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Header} from "./components/gui/Header.tsx";
import {Footer} from "./components/gui/Footer.tsx";
import {ThemeProvider} from "@/components/context/ThemeProvider.tsx";
import {Sidebar} from "@/components/gui/Sidebar.tsx";
import { DragContextProvider} from "@/components/context/DragContextProvider.tsx";
import {AstContextProvider} from "@/components/context/AstContextProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render( <React.StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <DragContextProvider>
                 <AstContextProvider>

                <Header></Header>
                <App />
                <Sidebar></Sidebar>
                <Footer></Footer>

                 </AstContextProvider>
                </DragContextProvider>
            </ThemeProvider>
    </React.StrictMode>,
)
