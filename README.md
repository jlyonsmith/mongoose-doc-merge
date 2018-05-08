# mongoose-doc-merge

This is a Mongoose plugin that adds a `merge` method to all your documents.

## `doc.merge(otherDoc)`

The merge overwrites any path values in `doc` that exist in `otherDoc`.  Path values that that have a value of `undefined` are ignored, but path values that are `null`are merged.

The algorithm doesn't do anything fancy with arrays.  The new array overwrites the old one entirely.

# Why?

If you are updating documents from a partial update, for example as part of a `PUT` method in a REST API, you will want to merge new data in with existing data. It's got to be Mongoose document aware because a straight Javascript object merge doesn't work. You also don't need anything fancy. You just want the new path values to overwrite the old ones, leaving the rest of the document intact. That's what this method does.