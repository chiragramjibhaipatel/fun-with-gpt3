import {Card, ResourceList} from "@shopify/polaris";
import {useDispatch, useSelector} from "react-redux";
import {aiState} from "../AiSlice";
import {useState} from "react";

function renderItem(props) {
    console.log(props)
    const {id, prompt, response} = props;
    return (
        <ResourceList.Item id={id}>
            <div>{prompt}</div>
            <div>{response}</div>
        </ResourceList.Item>
    );
}

export function SummaryComponent() {
    const [selectedItems, setSelectedItems] = useState([]);

    const resourceName = {
        singular: 'prompt',
        plural: 'prompts',
    };
    const {isSyncing, itemsList} = useSelector(aiState);
    let  items = itemsList.map((item, i) => {
        return {...item, id: i}
    })
    console.log(items);
    const promotedBulkActions = [
        {
            content: 'Delete',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    return (
        <Card title="History">
            <ResourceList
                resourceName={resourceName}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                promotedBulkActions={promotedBulkActions}
                items={items}
                renderItem={renderItem}
            />
        </Card>
    );
}
