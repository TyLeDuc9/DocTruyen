import { Select } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUpdateStory } from "../../hooks/useUpdateStory";
import { useSelectCategory } from "../../hooks/useSelectCategory";
import { IoClose } from "react-icons/io5";
export const UpdateStory = () => {
  const navigate = useNavigate();
  const { categories } = useSelectCategory();

  const {
    formData,
    previewUrl,
    fileInputRef,
    handleChange,
    handleAlternateNameChange,
    handleCategoryChange,
    handleThumbnailChange,
    removeThumbnail,
    removeAlterName,
    updateStory,
    loading,
    error,
  } = useUpdateStory();

  const labelCss = "block font-medium mb-1 text-main";
  const inputCss =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none";

  return (
    <>
      {" "}
      <button
        onClick={() => navigate("/admin/story-table")}
        className="bg-main text-white p-2 rounded-sm mb-4 text-sm cursor-pointer flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Story List
      </button>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Update Story
        </h1>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            updateStory().then(() => navigate(-1));
          }}
        >
          {/* Story name */}
          <div>
            <label className={labelCss}>Story name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className={inputCss}
            />
          </div>

          {/* Alternate name */}
          <div>
            <label className={labelCss}>Alter name</label>
            <input
              placeholder="Enter name and press Enter"
              type="text"
              className={inputCss}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (!value) return;

                  handleAlternateNameChange([
                    ...(formData.alternateName || []),
                    value,
                  ]);
                  e.currentTarget.value = "";
                }
              }}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.alternateName?.map((name, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded text-sm"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeAlterName(index)}
                    className="hover:text-red-400"
                  >
                    <IoClose size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Author + Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCss}>Author</label>
              <input
                name="author"
                value={formData.author || ""}
                onChange={handleChange}
                className={inputCss}
              />
            </div>

            <div>
              <label className={labelCss}>Country</label>
              <input
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                className={inputCss}
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCss}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputCss}
              >
                <option value="UPCOMING">UPCOMING</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DROPPED">DROPPED</option>
              </select>
            </div>
            <div>
              <label className={labelCss}>TotalChapters</label>
              <input
                name="totalChapters"
                value={formData.totalChapters}
                onChange={handleChange}
                className={inputCss}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className={labelCss}>Thumbnail</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={inputCss}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleThumbnailChange(e.target.files[0]);
                }
              }}
            />
          </div>

          {previewUrl && (
            <div className="relative w-40">
              <img
                src={previewUrl}
                alt="preview"
                className="w-40 h-56 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute -top-2 -right-2 bg-red-500 text-white
              w-7 h-7 rounded-full flex items-center justify-center"
              >
                <IoClose size={16} />
              </button>
            </div>
          )}

          {/* Category */}
          <div>
            <label className={labelCss}>Category</label>
            <Select
              mode="multiple"
              className="w-full"
              value={formData.categoryId}
              onChange={handleCategoryChange}
              options={categories.map((c) => ({
                label: c.name,
                value: c._id,
              }))}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelCss}>Description</label>
            <textarea
              name="description"
              rows={5}
              value={formData.description || ""}
              onChange={handleChange}
              className={inputCss}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-main text-white py-2.5 rounded-lg font-semibold cursor-pointer"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};
