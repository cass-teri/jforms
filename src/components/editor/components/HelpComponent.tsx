export function HelpComponent(props: { id: string, type: string }) {

    return <div id={props.id} className="w-full">Help: {props.type}</div>;
}
