'use strict';
const imported = require("./inventory.js");

var foundationList = [];
var proteinList = [];
var extraList = [];
var dressingList = [];

for (var o in imported.inventory) {
  for (var p in imported.inventory[o]) {
    if (p == 'foundation') {
      foundationList.push(o);
    } else if (p == 'protein') {
      proteinList.push(o);
    } else if (p == 'extra') {
      extraList.push(o);
    } else if (p == 'dressing') {
      dressingList.push(o);
    }
  }
}


// console.log("Foundations:" + foundationList);
// console.log("Proteins:" + proteinList);
// console.log("Extras:" + extraList);
// console.log("Dressings:" + dressingList);

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

class Salad {
  constructor() {
    this.foundation = [];
    this.protein = [];
    this.extra = [];
    this.dressing = [];
  }

  add(sel) {
    let ingredients = sel.map(m => ({
      name: m,
      ...imported.inventory[m]
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

  // OLD ADD()
  // add(sel){
  //   Object.keys(sel).forEach((p) => {
  //     if (sel[p]['foundation']) {
  //       this.foundation.push({[p]:sel[p]});
  //     } else if (sel[p]['protein']) {
  //       this.protein.push({[p]:sel[p]});
  //     } else if (sel[p]['extra']) {
  //       this.extra.push({[p]:sel[p]});
  //     } else if (sel[p]['dressing']) {
  //       this.dressing.push({[p]:sel[p]});
  //     }
  //   });
  // }

  //UTÖKA SENARE
  remove() {
    this.foundation = [];
    this.protein = [];
    this.extra = [];
    this.dressing = [];
  }

  price(discF = 1, discE = 1) {
    let pF = this.foundation.map(s => s.price).reduce((acc, next) => acc + next) * discF;
    let pP = this.protein.map(s => s.price).reduce((acc, next) => acc + next);
    let pE = this.extra.map(s => s.price).reduce((acc, next) => acc + next) * discE;
    let pD = this.dressing.map(s => s.price).reduce((acc, next) => acc + next);
    console.log(pF + pP + pE + pD);
  }

  toString() {
    let s = [];
    this.foundation.forEach((p) => {s.push(p.name)});
    this.protein.forEach((p) => {s.push(p.name)});
    this.extra.forEach((p) => {s.push(p.name)});
    this.dressing.forEach((p) => {s.push(p.name)});
    console.log(s.toString());
  }
}


class ExtraGreenSalad extends Salad{
  price(){
    super.price(1.3, 0.5);
  }
}


class GourmetSalad extends Salad {
  add(sel, quotas) {
    let ingredients = sel.map(m => ({
      name: m, ...imported.inventory[m], quota:Object.is(quotas[m], undefined) ? 1 : quotas[m]}));
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

    console.log(this.foundation);
    console.log(this.protein);
    console.log(this.extra);
    console.log(this.dressing);
  }

  price() {
    let pF = this.foundation.map(s => s.price*s.quota).reduce((acc, next) => acc + next);
    let pP = this.protein.map(s => s.price*s.quota).reduce((acc, next) => acc + next);
    let pE = this.extra.map(s => s.price*s.quota).reduce((acc, next) => acc + next);
    let pD = this.dressing.map(s => s.price*s.quota).reduce((acc, next) => acc + next);
    console.log(pF + pP + pE + pD);
  }
}

const ceasarsallad = ['Sallad', 'Kycklingfilé', 'Tomat', 'Krutonger', 'Inlagd lök', 'Parmesan', 'Ceasardressing'];

let myCesarSalad = new Salad();
myCesarSalad.add(ceasarsallad);
myCesarSalad.toString();
myCesarSalad.price();

let mySalad = new ExtraGreenSalad();
// mySalad is a prototype of ExtraGreenSalad which in turn is a prototype of Salad.
mySalad.add(ceasarsallad);

myCesarSalad.toString();
mySalad.price();

let myExpensiveSalad = new GourmetSalad();
const customAmount = {'Sallad':0.8, 'Kycklingfilé':1.5, 'Inlagd lök':0.6, 'Parmesan':3}; //Generated when selecting you ingredients in frontend
myExpensiveSalad.add(ceasarsallad, customAmount);
myExpensiveSalad.price();
