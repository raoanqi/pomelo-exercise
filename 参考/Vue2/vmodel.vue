<template>
  <div>
    <!--input事件：输入的字符一旦发生改变就会触发-->
    <!--change事件：当控件失去焦点时就会触发-->
    <input type="text" :value="value" @input="inputChange" />
  </div>
</template>

<script>
export default {
  name: 'vmodel',
  props: {
    value: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  methods: {
    inputChange(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
