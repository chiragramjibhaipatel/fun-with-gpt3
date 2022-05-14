import {AppProvider as PolarisProvider, Page, ResourceList, Card, TextField, Button, Layout, Stack} from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import './App.css';
import * as PropTypes from "prop-types";
import {useState} from "react";


function RenderItem(props) {
    const {id, prompt, response} = props.item;
    return (
        <ResourceList.Item id={id}>
            <div>{prompt}</div>
            <div>{response}</div>
        </ResourceList.Item>
    );
}

RenderItem.propTypes = {item: PropTypes.any};

function InputComponent() {
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

function SummaryComponent() {
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
            <ResourceList  bulkActions={bulkActions}  items={items} renderItem={(item) => <RenderItem item={item}/> }/>
        </Card>
    );
}

function App() {
  return (
      <PolarisProvider i18n={translations}>
          <Page title="Play AI like a Pro">
              <InputComponent/>
              <SummaryComponent/>
          </Page>
      </PolarisProvider>
  );
}

export default App;
