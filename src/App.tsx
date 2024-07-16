import "./globals.css"
import {RootDropZone} from "@/components/editor/RootDropZone"

function App() {

  return (

        <section
            className="flex flex-col items-top pt-16 pb-64 h-[calc(100vh-8rem)] bg-background border shadow-2xl overflow-scroll clear-both justify-start px-20"
        >
            <RootDropZone></RootDropZone>
        </section>
  )
}

export default App
