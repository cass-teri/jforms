import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Header} from "./components/gui/Header.tsx";
import {Footer} from "./components/gui/Footer.tsx";
import {ThemeProvider} from "@/components/gui/ThemeProvider.tsx";
import {Sidebar} from "@/components/gui/Sidebar.tsx";
import {DraggingProvider} from "@/components/context/DraggingContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render( <React.StrictMode>
        <DraggingProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Header></Header>
                <App />
                <Sidebar></Sidebar>
                <Footer></Footer>
            </ThemeProvider>
        </DraggingProvider>
    </React.StrictMode>,
)
