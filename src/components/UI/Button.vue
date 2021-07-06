<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="ui-button"
    :class="{ [`ui-button_${type}`]: type }"
    @click="cacheData"
  >
    <slot />
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  name: 'UiButton',

  props: {
    type: String,
    caching: Boolean,
  },

  methods: {
    ...mapActions([
      'load',
    ]),
    cacheData() {
      if (this.caching) {
        this.load({ clearCache: true });
      }
    },
  },
};
</script>
