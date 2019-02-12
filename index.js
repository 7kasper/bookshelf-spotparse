module.exports = (bookshelf) => {
  bookshelf.Model = bookshelf.Model.extend({
    format: function(attr) {
      return this.constructor.format(attr);
    },
    parse: function(attr) {
      return this.constructor.parse(attr);
    },
    spot: function(args) {
      return this.where(this.format(args));
    }
  }, {
    arrangement: {},
    format: function(attr) {
      return this.formatArrangement(attr);
    },
    parse: function(attr) {
      return this.parseArrangement(attr);
    },
    formatArrangement: function(attr) {
      for (let key in attr) {
        if (this.arrangement[key] !== undefined && typeof this.arrangement[key].format == 'function') {
          attr[key] = this.arrangement[key].format(attr[key]);
        }
      }
      return attr;
    },
    parseArrangement: function(attr) {
      for (let key in attr) {
        if (this.arrangement[key] !== undefined && typeof this.arrangement[key].parse == 'function') {
          attr[key] = this.arrangement[key].parse(attr[key]);
        }
      }
      return attr;
    },
    spot: function(args) {
      return this.where(this.format(args));
    }
  });
}