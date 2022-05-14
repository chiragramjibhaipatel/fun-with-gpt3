import {Card, ResourceList} from "@shopify/polaris";
import {RenderItem} from "./RenderItem";

export function SummaryComponent() {
    const items = [
        {
            id: 1,
            prompt: "hello 1",
            response: "hello response 1"
        },
        {
            id: 2,
            prompt: "hello 2",
            response: "hello response 2"
        }
    ];
    const bulkActions = [
        {
            content: 'Add tags',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Remove tags',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            content: 'Delete customers',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    return (
        <Card title="History">
            <ResourceList bulkActions={bulkActions} items={items} renderItem={(item) => <RenderItem item={item}/>}/>
        </Card>
    );
}
