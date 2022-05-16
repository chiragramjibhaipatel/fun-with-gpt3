import {Card, ResourceList, EmptyState, TextStyle} from "@shopify/polaris";
import {useDispatch, useSelector} from "react-redux";
import {aiState, loadStateFromLocalStorage, deleteItems, sortItems} from "../AiSlice";
import {useEffect, useState} from "react";


function renderItem(props) {
    const {id, prompt, response} = props;
    return (
        <ResourceList.Item id={id}>
            <div><TextStyle variation="strong">Prompt: </TextStyle>{prompt}</div>
            <div><TextStyle variation="strong">Response: </TextStyle>{response}</div>
        </ResourceList.Item>
    );
}

export function SummaryComponent() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('CREATED_DESC');


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
    let  items = itemsList;
    const promotedBulkActions = [
        {
            content: 'Delete',
            onAction: () => {
                dispatch(deleteItems(selectedItems));
                setSelectedItems([])
            },
        },
    ];



    const emptyStateMarkup = !items.length ? (
                                <EmptyState
                                    heading="There is nothing to show here, why don't you try some prompt"
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
                sortValue={sortValue}
                sortOptions={[
                    {label: 'Newest update', value: 'CREATED_DESC'},
                    {label: 'Oldest update', value: 'CREATED_ASC'},
                ]}
                onSortChange={(selected) => {
                    setSortValue(selected);
                    console.log(`Sort option changed to ${selected}.`);
                    dispatch(sortItems(selected));
                }}
            />
        </Card>
    );
}
