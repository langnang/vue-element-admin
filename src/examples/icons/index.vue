<template>
  <div class="icons-container">
    <aside>
      <el-input v-model="input" clearable />
    </aside>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons.filter((v) => v.indexOf(input) > -1)" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons.filter((v) => v.indexOf(input) > -1)" :key="item" @click="handleClipboard(generateElementIconCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Font Awesome fas">
        <div class="grid">
          <div v-for="item of fas.filter((v) => v.indexOf(input) > -1)" :key="item" @click="handleClipboard(generateFontAwesomeIconCode('fas', item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateFontAwesomeIconCode("fas", item) }}
              </div>
              <div class="icon-item">
                <font-awesome-icon :icon="['fas', item]" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Font Awesome fab">
        <div class="grid">
          <div v-for="item of fab.filter((v) => v.indexOf(input) > -1)" :key="item" @click="handleClipboard(generateFontAwesomeIconCode('fab', item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateFontAwesomeIconCode("fab", item) }}
              </div>
              <div class="icon-item">
                <font-awesome-icon :icon="['fab', item]" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Font Awesome far">
        <div class="grid">
          <div v-for="item of far.filter((v) => v.indexOf(input) > -1)" :key="item" @click="handleClipboard(generateFontAwesomeIconCode('far', item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateFontAwesomeIconCode("far", item) }}
              </div>
              <div class="icon-item">
                <font-awesome-icon :icon="['far', item]" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";
import elementIcons from "./element-icons";
import { fas, fab, far } from "./fontawesome";

export default {
  name: "Icons",
  data() {
    return {
      input: "",
      svgIcons,
      elementIcons,
      fas,
      fab,
      far,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },
    generateFontAwesomeIconCode(type, symbol) {
      return `<font-awesome-icon :icon="['${type}', '${symbol}']"/>`;
    },
    handleClipboard(text, event) {
      console.log("🚀 ~ file: index.vue ~ line 115 ~ handleClipboard ~ text", text);
      console.log(typeof text);
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
