import {AppProvider as PolarisProvider, Page} from "@shopify/polaris";
import {Provider} from "react-redux";
import store from "./store";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import './App.css';
import {InputComponent} from "./components/InputComponent";
import {SummaryComponent} from "./components/SummaryComponent";

function App() {
  return (
      <PolarisProvider i18n={translations}>
          <Provider store={store}>
              <Page title="Play AI like a Pro">
                  <InputComponent/>
                  <SummaryComponent/>
              </Page>
          </Provider>
      </PolarisProvider>
  );
}

export default App;
