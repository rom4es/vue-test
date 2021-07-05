<template>
  <input
    type="text"
    v-model="valueInput"
    class="ui-money"
  />
</template>

<script>
import formattedMixin from '@/mixins/formatting.mixin';

export default {

  name: 'UiMoney',

  mixins: [formattedMixin],

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
    };
  },

  watch: {
    valueInput() {
      let number = this.valueInput
        .replace(/[^\d.,]/g, '')
        .replace(/,/g, '.')
        .replace(/^[0.]+/g, '');
      if (number.indexOf('.') > -1) {
        const arNumber = number.split('.');
        number = [arNumber[0], arNumber[1].slice(0, 2)].join('.');
      }
      this.valueInput = this.formattedNumber(number);
      this.$emit('change-money', this.valueInput);
    },
  },
};
</script>
