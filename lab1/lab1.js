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
    this.proteins = [];
    this.extras = [];
    this.dressing = [];
  }

  add(sel) {
    Object.keys(sel).forEach((p) => {
      if (sel[p]['foundation']) {
        this.foundation.push({[p]:sel[p]});
      } else if (sel[p]['protein']) {
        this.proteins.push({[p]:sel[p]});
      } else if (sel[p]['extra']) {
        this.extras.push({[p]:sel[p]});
      } else if (sel[p]['dressing']) {
        this.dressing.push({[p]:sel[p]});
      }
    });
  };

  //UTÖKA SENARE
  remove() {
    this.foundation = [];
    this.proteins = [];
    this.extras = [];
    this.dressing = [];
  }


  price() {
    console.log(this.foundation[Object.keys(this.foundation)]);

    //let price = this.extras.map((s) =>    ).reduce((acc, next) => acc + next);
    //console.log(price);


  }

  toString() {this.foundation.forEach((p) => {console.log(Object.keys(p))});
    this.proteins.forEach((p) => {console.log(Object.keys(p))});
    this.extras.forEach((p) => {console.log(Object.keys(p))});
    this.dressing.forEach((p) => {console.log(Object.keys(p))});
  }
}

let myCesarSalad = new Salad();
myCesarSalad.add({Sallad: {price: 10,  foundation: true,  vegan: true},'Norsk fjordlax': {price: 30,  protein: true},'Färsk koriander': {price: 10,  extra: true,  vegan: true},Gurka: {price: 5,  extra: true,  vegan: true},'Soltorkad tomat': {price: 5,  extra: true,  vegan: true},Rhodeisland: {price: 5,  dressing: true,  lactose: true}});
myCesarSalad.price();
 // myCesarSalad.toString();
