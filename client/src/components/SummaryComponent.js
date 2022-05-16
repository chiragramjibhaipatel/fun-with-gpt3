import {Card, ResourceList, EmptyState} from "@shopify/polaris";
import {useDispatch, useSelector} from "react-redux";
import {aiState, loadStateFromLocalStorage} from "../AiSlice";
import {useEffect, useState} from "react";


function renderItem(props) {
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

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadStateFromLocalStorage());
        return () => {
        };
    }, []);


    const resourceName = {
        singular: 'prompt',
        plural: 'prompts',
    };
    const {isSyncing, itemsList} = useSelector(aiState);
    let  items = itemsList.map((item, i) => {
        return {...item, id: i}
    })
    const promotedBulkActions = [
        {
            content: 'Delete',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    const emptyStateMarkup = !items.length ? (
                                <EmptyState
                                    heading="there is nothing to show here, why font you try some prompt"
                                    image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
                                >
                                    <p>
                                        you can search for anything in the text box above and we will try to generate some interesting responses for you.
                                    </p>
                                </EmptyState>
                            ) : undefined;

    return (
        <Card title="History">
            <ResourceList
                emptyState={emptyStateMarkup}
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
