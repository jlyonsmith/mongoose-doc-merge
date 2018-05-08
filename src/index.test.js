import mongoose from "mongoose"
import { Schema } from "mongoose"
import mergePlugin from "."

beforeAll(() => {
  mongoose.plugin(mergePlugin)
})

var thingSchema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65 },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true },
  },
})

test("test merge documents", () => {
  const Thing = mongoose.model("Thing", thingSchema)
  const first = new Thing({ name: "Zildjian", living: false, mixed: ["1"] })
  const second = new Thing({
    age: 20,
    ofString: ["A", "B", "C"],
    nested: {
      stuff: "Some Stuff",
    },
    mixed: null,
  })

  first.merge(second)

  expect(first.name).toBe("Zildjian")
  expect(first.age).toBe(20)
  ;["A", "B", "C"].forEach((item) => {
    expect(first.ofString).toContain(item)
  })
  expect(first.nested.stuff).toBe("some stuff")
  expect(first.mixed).toBeNull()
})
