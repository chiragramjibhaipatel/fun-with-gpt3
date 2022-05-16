import {useState} from "react";
import {Button, Card, Layout, Stack, TextField, SkeletonBodyText, TextStyle} from "@shopify/polaris";
import {setResponse, processPromptAsync, saveResponseAsync} from "../AiSlice";
import {useDispatch, useSelector} from "react-redux";
import {aiState} from "../AiSlice";


export function InputComponent() {
    const [newPrompt, setNewPrompt] = useState('');
    const dispatch = useDispatch();
    const {isSyncing, response} = useSelector(aiState);

    const handleChange = (newValue) => setNewPrompt(newValue);

    async function handleSubmit() {
        dispatch(processPromptAsync(newPrompt));
    }

    function handleReset() {
        setNewPrompt("");
        dispatch(setResponse(""));
    }

    function handleSave() {
        dispatch(saveResponseAsync({prompt: newPrompt, response: response}))
        setNewPrompt("");
    }

    return (
        <Card sectioned>
            <Layout>
                <Layout.Section>
                    <Stack alignment="trailing">
                        <Stack.Item fill>
                            <TextField
                                label="Prompt"
                                value={newPrompt}
                                onChange={handleChange}
                                autoComplete="off"
                                multiline={3}

                            />
                        </Stack.Item>
                        <Stack.Item>
                            <Button onClick={handleSubmit} disabled={newPrompt.length === 0} loading={isSyncing}>Process</Button>
                        </Stack.Item>
                    </Stack>
                </Layout.Section>
                {
                    response? (
                        <Layout.Section>
                            <Card sectioned>
                                <Stack vertical alignment="fill" distribution="leading">
                                    <Stack.Item>
                                        <TextStyle variation="strong">Prompt: </TextStyle>{newPrompt}
                                    </Stack.Item>
                                    <Stack.Item>
                                        <TextStyle variation="strong">Response: </TextStyle>{response}
                                    </Stack.Item>
                                </Stack>
                                <Layout sectioned>
                                    <Layout.Section>
                                        <Stack spacing="loose" distribution="trailing" alignment="trailing">
                                            <Button onClick={handleReset}>Reset</Button>
                                            <Button onClick={handleSave} primary>Add response to list</Button>
                                        </Stack>
                                    </Layout.Section>
                                </Layout>
                            </Card>
                        </Layout.Section>
                    ) : (isSyncing?(
                        <Layout.Section>
                            <SkeletonBodyText lines={4} />
                        </Layout.Section>
                    ):"")
                }

            </Layout>
        </Card>
    );
}
