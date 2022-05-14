import {AppProvider as PolarisProvider, Page} from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import './App.css';
import * as PropTypes from "prop-types";
import {InputComponent} from "./components/InputComponent";
import {RenderItem} from "./components/RenderItem";
import {SummaryComponent} from "./components/SummaryComponent";


RenderItem.propTypes = {item: PropTypes.any};

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
