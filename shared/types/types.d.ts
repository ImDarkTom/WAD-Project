// Mongoose adds these fields by default, `_id` is the ref id, `__v` is I think revision id.
type MongooseSchema<T> = T & {
    _id: string,
    __v: number
}