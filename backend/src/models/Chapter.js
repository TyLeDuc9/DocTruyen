const mongoose = require("mongoose");
const slugify = require("slugify");

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
      trim: true,
    },
    chapterMain: {
      type: Number,
      required: true, 
    },
    chapterSub: {
      type: Number,
      default: 0, 
    },
    displayNumber: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ["TEXT", "IMAGE", "MIXED"],
      default: "TEXT",
    },
    views: {
      type: Number,
      default: 0,
    },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
  },
  { timestamps: true }
);

chapterSchema.pre("save", function () {
  if (this.images.length > 0 && this.content) this.type = "MIXED";
  else if (this.images.length > 0) this.type = "IMAGE";
  else this.type = "TEXT";

  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

chapterSchema.index(
  { storyId: 1, chapterMain: 1, chapterSub: 1 },
  { unique: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
