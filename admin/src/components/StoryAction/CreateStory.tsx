import { Select } from "antd";
import { useSelectCategory } from "../../hooks/useSelectCategory";
import { useCreateStory } from "../../hooks/useCreateStory";
import { IoClose } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const CreateStory = () => {
  const { categories, loading, error } = useSelectCategory();
  const navigate = useNavigate();
  const {
    formData,
    previewUrl,
    fileInputRef,
    handleChange,
    handleAlternateNameChange,
    handleCategoryChange,
    handleThumbnailChange,
    removeThumbnail,
    handleSubmit,
    removeAlterName,
    loading: creating,
    error: createError,
    alterNameInputRef,
  } = useCreateStory();
  const labelCss = "block font-medium mb-1 text-main";
  const inputCss =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none";

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <button
        onClick={() => navigate("/admin/story-table")}
        className="bg-main text-white p-2 rounded-sm mb-4 text-sm cursor-pointer flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Story List
      </button>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Create Story
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Story name */}
          <div>
            <label className={labelCss}>Story name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputCss}
            />
          </div>

          {/* Alter name – nhiều tên */}
          <div>
            <label className={labelCss}>Alter name</label>
            <input
              ref={alterNameInputRef}
              placeholder="After entering the names..."
              type="text"
              className={inputCss}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (!value) return;

                  handleAlternateNameChange([...formData.alternateName, value]);
                  e.currentTarget.value = "";
                }
              }}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.alternateName.map((name, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-black text-white rounded text-sm"
                >
                  {name}

                  <button
                    type="button"
                    onClick={() => removeAlterName(index)}
                    className="text-white mt-0.5 cursor-pointer hover:text-red-500"
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
                value={formData.author}
                onChange={handleChange}
                className={inputCss}
              />
            </div>

            <div>
              <label className={labelCss}>Country</label>
              <input
                name="country"
                value={formData.country}
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

          {/* Thumbnail – FILE */}
          <div>
            <label className={labelCss}>Thumbnail</label>
            <input
              ref={fileInputRef}
              className={inputCss}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleThumbnailChange(e.target.files[0]);
                }
              }}
            />
          </div>

          {previewUrl && (
            <div className="mt-3 relative w-40">
              <img
                src={previewUrl}
                alt="preview"
                className="w-40 h-56 object-cover rounded"
              />

              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute -top-2 -right-2 bg-red-500 text-white
                cursor-pointer w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <IoClose size={16} />
              </button>
            </div>
          )}

          {/* Categories */}
          <label className={labelCss}>Category</label>
          <Select
            mode="multiple"
            placeholder="Select categories"
            className="w-full"
            value={formData.categoryId}
            onChange={handleCategoryChange}
            options={categories.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />

          {/* Description */}
          <div className="mt-4">
            <label className={labelCss}>Description</label>
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={inputCss}
            />
          </div>

          {/* Error */}
          {createError && <p className="text-red-500 text-sm">{createError}</p>}

          <button
            type="submit"
            disabled={creating}
            className="w-full bg-main text-white py-2.5 rounded-lg font-semibold"
          >
            {creating ? "Creating..." : "Create Story"}
          </button>
        </form>
      </div>
    </>
  );
};
