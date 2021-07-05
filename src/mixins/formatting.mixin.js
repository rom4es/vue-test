export default {
  methods: {
    formattedDate(date) {
      return new Intl.DateTimeFormat('ru-RU').format(Date.parse(date));
    },
    formattedNumber(number) {
      const parts = number.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
  },
};
