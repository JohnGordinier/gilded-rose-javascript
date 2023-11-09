export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    if (this.isNormalItem()) {
      this.handleNormalItem();
    } else if (this.isAgedBrie()) {
      this.handleAgedBrie();
    } else if (this.isBackstagePass()) {
      this.handleBackstagePass();
    } else if (this.isSulfuras()) {
      // Sulfuras does not change, no need to update
    } else if (this.isConjuredItem()) {
      this.handleConjuredItem();
    }
  }

  isNormalItem() {
    return (
      this.name !== "Aged Brie" &&
      this.name !== "Backstage passes to a TAFKAL80ETC concert" &&
      this.name !== "Sulfuras, Hand of Ragnaros" &&
      this.name !== "Conjured Mana Cake"
    );
  }

  isConjuredItem() {
    return (
      !this.isAgedBrie() &&
      !this.isBackstagePass() &&
      !this.isSulfuras() &&
      !this.isNormalItem()
    );
  }

  isAgedBrie() {
    return this.name === "Aged Brie";
  }
  isBackstagePass() {
    return this.name === "Backstage passes to a TAFKAL80ETC concert";
  }
  isSulfuras() {
    return this.name === "Sulfuras, Hand of Ragnaros";
  }

  handleNormalItem() {
    this.decreaseQuality();
    this.sellIn--;
    if (this.sellIn < 0) {
      this.decreaseQuality();
    }
  }

  handleConjuredItem() {
    this.decreaseQuality();
    this.decreaseQuality();
    this.sellIn--;
  }

  handleAgedBrie() {
    this.increaseQuality();
    this.sellIn--;
    if (this.sellIn < 0) {
      this.increaseQuality();
    }
  }

  handleBackstagePass() {
    this.increaseQuality();
    if (this.sellIn < 11) {
      this.increaseQuality();
    }
    if (this.sellIn < 6) {
      this.increaseQuality();
    }
    this.sellIn--;

    if (this.sellIn < 0) {
      this.quality = 0;
    }
  }

  decreaseQuality() {
    if (this.quality > 0 && !this.isSulfuras()) {
      this.quality--;
    }
  }

  increaseQuality() {
    if (this.quality < 50) {
      this.quality++;
    }
  }
}

export class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  handleConjuredItem() {
    this.decreaseQuality();
    this.sellIn--;
  }
}

export let items = [];
export const Items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Conjured Mana Cake", 3, 6),
];

export const updateQuality = () => {
  for (let item of items) {
    item.updateQuality();
  }
};
