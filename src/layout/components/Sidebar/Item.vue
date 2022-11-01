<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (typeof icon === "string") {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<svg-icon icon-class={icon} />);
      }
    } else {
      vnodes.push(<font-awesome-icon icon={icon} class="sub-el-icon" />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  &.svg-inline--fa {
    margin-left: 0 !important;
    font-size: 18px;
  }
}
</style>
