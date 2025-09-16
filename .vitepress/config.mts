import { zh, shared } from './conf.d'
import { withMermaid } from "vitepress-plugin-mermaid";


export default withMermaid({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh }
  },
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container 
  }
});
