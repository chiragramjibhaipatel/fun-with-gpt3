import {ResourceList} from "@shopify/polaris";

export function RenderItem(props) {
    const {id, prompt, response} = props.item;
    return (
        <ResourceList.Item id={id}>
            <div>{prompt}</div>
            <div>{response}</div>
        </ResourceList.Item>
    );
}
