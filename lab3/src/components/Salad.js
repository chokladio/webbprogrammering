const inventory = require("./inventory.ES6");

export default class Salad {
  constructor() {
    this.foundation = [];
    this.protein = [];
    this.extra = [];
    this.dressing = [];
  }

  add(sel) {
    let ingredients = sel.map(m => ({
      name: m,
      ...inventory.default[m]
    }));
    ingredients.forEach((i) => {
      if (i.foundation) {
        this.foundation.push(i);
      } else if (i.protein) {
        this.protein.push(i);
      } else if (i.extra) {
        this.extra.push(i);
      } else if (i.dressing) {
        this.dressing.push(i);
      }
    });
  }

  //UTÖKA SENARE
  remove() {
    this.foundation = [];
    this.protein = [];
    this.extra = [];
    this.dressing = [];
  }

  price(discF = 1, discE = 1) {
    let pF = 0;
    let pP = 0;
    let pE = 0;
    let pD = 0;
    if (this.foundation.length) {
      pF = this.foundation.map(s => s.price).reduce((acc, next) => acc + next) * discF;
    }
    if (this.protein.length) {
      pP = this.protein.map(s => s.price).reduce((acc, next) => acc + next);
    }
    if (this.extra.length) {
      pE = this.extra.map(s => s.price).reduce((acc, next) => acc + next) * discE;
    }
    if (this.dressing.length) {
      pD = this.dressing.map(s => s.price).reduce((acc, next) => acc + next);
    }
    return (pF + pP + pE + pD);
  }

  toString() {
    let s = [];
    this.foundation.forEach((p) => {
      s.push(p.name)
    });
    this.protein.forEach((p) => {
      s.push(p.name)
    });
    this.extra.forEach((p) => {
      s.push(p.name)
    });
    this.dressing.forEach((p) => {
      s.push(p.name)
    });
    return (s.toString());
  }
}


class ExtraGreenSalad extends Salad {
  price() {
    super.price(1.3, 0.5);
  }
}


class GourmetSalad extends Salad {
  add(sel, quotas) {
    let ingredients = sel.map(m => ({
      name: m,
      ...inventory[m],
      quota: Object.is(quotas[m], undefined) ? 1 : quotas[m]
    }));
    ingredients.forEach((i) => {
      if (i.foundation) {
        this.foundation.push(i);
      } else if (i.protein) {
        this.protein.push(i);
      } else if (i.extra) {
        this.extra.push(i);
      } else if (i.dressing) {
        this.dressing.push(i);
      }
    });
  }

  price() {
    let pF = this.foundation.map(s => s.price * s.quota).reduce((acc, next) => acc + next);
    let pP = this.protein.map(s => s.price * s.quota).reduce((acc, next) => acc + next);
    let pE = this.extra.map(s => s.price * s.quota).reduce((acc, next) => acc + next);
    let pD = this.dressing.map(s => s.price * s.quota).reduce((acc, next) => acc + next);
    return (pF + pP + pE + pD);
  }
}
