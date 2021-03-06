<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" @change-money="changeMoney"/>
    </div>

    <div class="data-table__content">
      <div class="data-table__grid data-table__grid_header" :style="{gridTemplateColumns: getGrid}">
        <div class="data-table__row">
          <div
            class="data-table__item"
            v-for="column in columns"
            :key="column.prop"
          >{{column.label}}</div>
        </div>
      </div>
      <div class="data-table__grid" :style="{gridTemplateColumns: getGrid}">
        <div
          class="data-table__row"
          v-for="row in getList"
          :key="row.id">
          <div class="data-table__item"><div class="data-table__label">ID</div>{{row.id}}</div>
          <div class="data-table__item"><div class="data-table__label">Date</div>{{formattedDate(row.date)}}</div>
          <div class="data-table__item"><div class="data-table__label">Name</div>{{row.name}}</div>
          <div class="data-table__item"><div class="data-table__label">Money</div>{{formattedNumber(row.money)}}</div>
        </div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
import formattedMixin from '@/mixins/formatting.mixin';

export default {

  name: 'DataTable',
  mixins: [formattedMixin],
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.getFilterList.length / this.pageSize);
    },
    getGrid() {
      return this.columns.map((item) => item.width).join(' ');
    },
    getList() {
      const rows = this.getFilterList;
      return this.getPaginatedList(rows);
    },
    getFilterList() {
      return (this.moneyFilter > 0) ? this.rows.filter((row) => row.money <= this.moneyFilter) : this.rows;
    },
  },

  methods: {
    changeMoney(value) {
      this.moneyFilter = parseFloat(value.replace(/\s/g, ''));
      this.page = 1;
    },
    getPaginatedList(rows) {
      const from = (this.page - 1) * this.pageSize;
      const to = from + this.pageSize;
      return rows.slice(from, to);
    },
  },
};
</script>
