import {createContext, useContext, useState} from "react"

type ProjectContextProvider = {
    project_path: string
    SetProjectPath: (project: string) => void
}

const initial_project: ProjectContextProvider = {
    project_path: {} as string,
    SetProjectPath: () => null,
}

export const ProjectContext = createContext<ProjectContextProvider>(initial_project)

interface IProjectContextProviderProps {
    children: any
}

export function ProjectContextProvider(props: IProjectContextProviderProps) {
    const [has_init, SetHasInit] = useState(false)

    const [project_path, SetProjectPath] = useState<string>("")

    if (!has_init) {
        SetHasInit(true)
    }

    return <ProjectContext.Provider value={{project_path, SetProjectPath}}>{props.children}</ProjectContext.Provider>
}

export function useProject() {
    const context = useContext(ProjectContext)
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectContextProvider")
    }
    return context
}
