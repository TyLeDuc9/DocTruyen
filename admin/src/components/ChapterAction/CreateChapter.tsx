import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useCreateChapter } from "../../hooks/useCreateChapter";
import { useGetSelectStory } from "../../hooks/useGetSelectStory";

export const CreateChapter = () => {
  const navigate = useNavigate();

  const {
    formData,
    loading,
    error,
    fileInputRef,
    handleChange,
    handleImagesChange,
    handleSubmit,
    removeImage,
  } = useCreateChapter();

  const {
    selectStory,
    loading: storyLoading,
    error: storyError,
  } = useGetSelectStory();

  const labelCss = "block font-medium mb-1 text-main";
  const inputCss =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none";

  return (
    <>
      {/* Back */}
      <button
        onClick={() => navigate("/admin/chapter")}
        className="bg-main text-white p-2 rounded-sm mb-4 text-sm cursor-pointer flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Chapter List
      </button>

      {/* Card */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Create Chapter
        </h1>

        {error && (
          <p className="mb-4 text-red-500 text-sm font-medium">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className={labelCss}>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputCss}
            />
          </div>
          {/* Chapter number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCss}>Chapter Main</label>
              <input
                type="number"
                name="chapterMain"
                value={formData.chapterMain}
                onChange={handleChange}
                className={inputCss}
              />
            </div>

            <div>
              <label className={labelCss}>Chapter Sub</label>
              <input
                type="number"
                name="chapterSub"
                value={formData.chapterSub}
                onChange={handleChange}
                className={inputCss}
              />
            </div>
          </div>
          {/* Story */}
          <div>
            <label className={labelCss}>Story</label>
            <select
              name="storyId"
              value={formData.storyId}
              onChange={handleChange}
              className={inputCss}
              disabled={storyLoading}
            >
              <option value="">-- Select story --</option>

              {selectStory.map((story) => (
                <option key={story._id} value={story._id}>
                  {story.name}
                </option>
              ))}
            </select>

            {storyError && (
              <p className="text-sm text-red-500 mt-1">{storyError}</p>
            )}
          </div>
          {/* Content */}
          <div>
            <label className={labelCss}>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className={inputCss}
            />
          </div>
          {/* Images */}
          <div>
            <label className={labelCss}>Chapter Images (IMAGE / MIXED)</label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImagesChange(e.target.files)}
              className={inputCss}
            />
            <p className="text-sm text-gray-400 mt-1">
              You can upload multiple images
            </p>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-3 relative grid grid-cols-6 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-32 h-48 object-cover rounded border border-gray-200"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white
                cursor-pointer w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Preview */}
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-main mb-2">Preview</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Display number: {formData.chapterMain}</p>
              <p>
                {formData.images.length > 0 && formData.content
                  ? "MIXED"
                  : formData.images.length > 0
                    ? "IMAGE"
                    : "TEXT"}
              </p>
              <p>Images: {formData.images.length}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-main text-white hover:bg-main/90 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Chapter"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
