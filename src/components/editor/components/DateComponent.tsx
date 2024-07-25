interface IDateComponentProps {
    id: string
    name?: string
}

export function DateComponent (props: IDateComponentProps){
    return <div id={props.id} draggable tabIndex={0} className="h-16 rounded-xl hover:shadow-2xl px-4 py-2 focus:ring-4 ring-amber-300">
        Calendar: {props.name}
    </div>
}
