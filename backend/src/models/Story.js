const mongoose = require("mongoose");
const slugify = require("slugify");

const storySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    alternateName: [{ type: String, trim: true }],
    slug: { type: String, unique: true, index: true },
    author: String,
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "COMPLETED", "DROPPED"],
      default: "UPCOMING",
    },
    views: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    country: String,
    totalChapters: { type: Number, default: 0 },
    description: String,
    categoryId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);
storySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});
module.exports = mongoose.model("Story", storySchema);
