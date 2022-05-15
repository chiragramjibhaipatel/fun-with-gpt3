import {useState} from "react";
import {Button, Card, Layout, Stack, TextField, SkeletonBodyText} from "@shopify/polaris";
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
                            <Button onClick={handleSubmit}>Process</Button>
                        </Stack.Item>
                    </Stack>
                </Layout.Section>
                {
                    response? (
                        <Layout.Section>
                            <Card title="Response" sectioned>
                                <Stack alignment="trailing" distribution="trailing">
                                    <Stack.Item fill>
                                        {response}
                                    </Stack.Item>
                                    <Stack.Item>
                                        <Stack>
                                            <Button onClick={handleReset}>Reset</Button>
                                            <Button onClick={handleSave} primary>Add response to list</Button>
                                        </Stack>
                                    </Stack.Item>
                                </Stack>
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
