export default function(schema, options) {
  schema.method("merge", function(other) {
    this.schema.eachPath((path) => {
      if (path === "_id" || path === "_v") {
        return
      }

      let value = other.get(path)

      if (typeof value !== "undefined") {
        this.set(path, value)
      }
    })

    return this
  })
}
