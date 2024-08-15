import { useEffect, useState } from "react"
import { LuMinimize2 } from "react-icons/lu"
import { motion } from "framer-motion"
import { useSelection } from "@/components/context/SelectionContext.tsx"
import { useAst } from "@/components/context/AstContextProvider.tsx"
import { FindById } from "@/lib/FindById.ts"
import { GeneralProperties } from "@/components/gui/properties/GeneralProperties.tsx"
import { StringProperties } from "@/components/gui/properties/StringProperties.tsx"
import { NumberProperties } from "@/components/gui/properties/NumberProperties.tsx"
import { EnumProperties } from "@/components/gui/properties/EnumProperties.tsx"
import { HeaderProperties } from "@/components/gui/properties/HeaderProperties.tsx"
import { SubHeaderProperties } from "@/components/gui/properties/SubHeaderProperties.tsx"
import { ParagraphProperties } from "@/components/gui/properties/ParagraphProperties.tsx"
import { LayoutProperties } from "@/components/gui/properties/LayoutProperties.tsx"
import { CategorizationProperties } from "@/components/gui/properties/CategorizationProperties.tsx"
import { HelpContentProperties } from "@/components/gui/properties/HelpContentProperties.tsx"
import { BulletProperties } from "@/components/gui/properties/BulletsProperties.tsx"

export function PropertiesPanel() {
    const [minimize, setMinimize] = useState(true)

    const { ast } = useAst()
    const { selected } = useSelection()

    const [id, SetId] = useState("")
    const [type, SetType] = useState("")

    useEffect(() => {
        const node = FindById(ast, selected)

        SetId(node?.id ?? "")
        SetType(node?.type ?? "")
    }, [ast, id, selected])

    function Minimize() {
        setMinimize(!minimize)
    }

    const NotGeneralTypes = [
        "Header",
        "SubHeader",
        "Paragraph",
        "Bullets",
        "VerticalLayout",
        "HorizontalLayout",
        "Categorization",
        "Category",
        "Group",
        "HelpContent"
    ]

    return (
        <motion.aside
            className={`fixed top-0 right-0 bottom-16 bg-background text-foreground overflow-auto z-40 p-4 shadow-2xl  max-w-[42rem] ${minimize ? "w-16" : "w-2/5"}`}
            layout
            layoutId="properties-panel"
        >
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between w-full">
                    {minimize ? null : <span className="text-xl">Properties</span>}
                    <button
                        className="text-white bg-neutral-800 w-8 h-8 flex items-center justify-center rounded-xl "
                        onClick={Minimize}
                    >
                        <LuMinimize2 className="text-foreground text-neutral-200 font-bold h-6 w-6" />
                    </button>
                </div>

                {minimize ? null : (
                    <form>
                        <label className="bg-neutral-600 text-neutral-50 px-4 py-2 rounded-t flex flex-row items-center w-full text-xl">
                            <span>Id: </span>
                            <div className="flex flex-row justify-between items-center w-full">
                                <span className="w-full text-xl">{id}</span>
                            </div>
                        </label>

                        {/* TODO Clean this disaster up*/}
                        {selected && !NotGeneralTypes.includes(type) ? <GeneralProperties></GeneralProperties> : null}
                        {type === "Text" || type === "Email" || type === "Phone" || type === "PostalCode" ? (
                            <StringProperties></StringProperties>
                        ) : null}
                        {type === "Number" || type === "Integer" ? <NumberProperties></NumberProperties> : null}
                        {type === "DropDown" || type === "Radio" || type === "Province" || type === "Ministry" ? (
                            <EnumProperties></EnumProperties>
                        ) : null}
                        {type === "Header" ? <HeaderProperties></HeaderProperties> : null}
                        {type === "SubHeader" ? <SubHeaderProperties></SubHeaderProperties> : null}
                        {type === "Paragraph" ? <ParagraphProperties></ParagraphProperties> : null}
                        {type === "Category" || type === "Group" ? <LayoutProperties></LayoutProperties> : null}
                        {type === "Categorization" ? <CategorizationProperties></CategorizationProperties> : null}
                        {type == "HelpContent" ? <HelpContentProperties></HelpContentProperties> : null}
                        {type == "Bullets" ? <BulletProperties></BulletProperties> : null}
                    </form>
                )}
            </div>
        </motion.aside>
    )
}
