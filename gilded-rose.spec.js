import { expect, describe, it } from "vitest";
import { Item, ConjuredItem, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("this item increases in quality when sellIn decreases", () => {
    const testItem = new Item("Aged Brie", 4, 4);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(5);
  });

  it("decreases quality by two for items with sellIn less than zero", () => {
    const testItem = new Item("basic", -3, 6);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(4);
  });

  it("does not decrease the quality of an item with 0 quality", () => {
    const testItem = new Item("basic", 3, 0);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
  });

  it("quality can not be above 50", () => {
    const testItem = new Item("Aged Brie", 4, 50);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(50);
  });

  it("Sulfuras, Hand of Ragnaros never has a sellIn date, so the value should be null", () => {
    const testItem = new Item("Sulfuras, Hand of Ragnaros", null, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.sellIn).toBe(null);
  });

  it("Sulfuras, Hand of Ragnaros never decreases in quality", () => {
    const testItem = new Item("Sulfuras, Hand of Ragnaros", null, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
  });

  it("Backstage passes to a TAFKAL80ETC concert increases by 2 in quality when there are 10 days or less", () => {
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(22);
  });
});

it("below five days backstage increases by 3", () => {
  const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10);
  items.push(testItem);

  updateQuality();

  expect(testItem.quality).toBe(13);
});

it("When concert is over, quality depletes to zero", () => {
  const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10);
  items.push(testItem);

  updateQuality();

  expect(testItem.quality).toBe(0);
});

it("below five days backstage increases by 3", () => {
  const testItem = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10);
  items.push(testItem);

  updateQuality();

  expect(testItem.quality).toBe(13);
});

it("Conjured item decrease quality twice as fast as normal item", () => {
  const testItem = new Item("Conjured Mana Cake", 4, 10);
  items.push(testItem);

  updateQuality();

  expect(testItem.quality).toBe(8);
});
