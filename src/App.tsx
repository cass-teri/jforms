import "./globals.css"
import {Root} from "@/components/editor/Root.tsx"
import {Trash} from "@/components/editor/Trash.tsx";

function App() {

  return (
      <>
        <section
            className="flex flex-col items-top pt-8 pb-96 h-[calc(100vh-6rem)] bg-background border shadow-2xl overflow-auto clear-both justify-start pl-36 pr-4"
        >
            <Root></Root>
        </section>

          <Trash></Trash>
     </>
  )
}

export default App
