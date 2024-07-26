

interface IChoiceComponentProps {
    id: string,
    type: string
}


export function ChoiceComponent(props: IChoiceComponentProps) {
    return <div id={props.id} className="w-full">Choice: {props.type}</div>;
}
