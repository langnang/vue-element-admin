import ElViewTable from "./ElViewTable";
import ElViewForm from "./ElViewForm";

const components = [ElViewTable, ElViewForm];

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ElViewTable,
  ElViewForm,
};
