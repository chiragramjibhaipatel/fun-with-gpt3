import {useState} from "react";
import {Button, Card, Layout, Stack, TextField} from "@shopify/polaris";

export function InputComponent() {
    const [value, setValue] = useState('Jaded Pixel');

    const handleChange = ((newValue) => setValue(newValue), []);

    return (
        <Card sectioned>
            <Layout>
                <Layout.Section>
                    <TextField
                        label="Store name"
                        value={value}
                        onChange={handleChange}
                        autoComplete="off"
                        multiline={3}

                    />
                </Layout.Section>
                <Layout.Section>
                    <Stack distribution="trailing">
                        <Button>Process my story</Button>
                    </Stack>
                </Layout.Section>
            </Layout>
        </Card>
    );
}
