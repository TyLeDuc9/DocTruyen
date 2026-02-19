import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateNotify } from "../../hooks/useCreateNotify";
import { useGetSelectStory } from "../../hooks/useGetSelectStory";
import { useSelectChapter } from "../../hooks/useSelectChapter";
export const CreateNotify = () => {
  const { loading, error, handleChange, handleSubmit, form } =
    useCreateNotify();
  const {
    selectStory,
    error: storyError,
    loading: storyLoading,
  } = useGetSelectStory();
  const navigate = useNavigate();
  const { selectChapter, error: chapterError } = useSelectChapter();
  const labelCss = "block font-medium mb-1 text-main";
  const inputCss =
    "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none";

  if (loading) return <div>Đang tải...</div>;
  if (error || storyError || chapterError)
    return <div>{error || storyError || chapterError}</div>;
  return (
    <>
      <button
        onClick={() => navigate("/admin/notify")}
        className="bg-main text-white text-sm p-2 rounded-sm cursor-pointer flex items-center gap-1"
      >
        <FaArrowLeft />
        Back Notify List
      </button>

      <div className="max-w-xl mx-auto p-6 mt-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-main">
          Create Notify
        </h1>

        <form onSubmit={handleSubmit} action="">
          <div>
            <label className={labelCss}>Title</label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              value={form.title}
              className={inputCss}
            />
          </div>
          <div className="mt-4">
            <label className={labelCss}>Link</label>
            <input
              onChange={handleChange}
              name="link"
              value={form.link}
              className={inputCss}
            />
          </div>
          <div className="mt-4">
            <label className={labelCss}>Story</label>
            <select
              name="storyId"
              value={form.storyId ?? ""}
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
          </div>
          <div className="mt-4">
            <label className={labelCss}>Chapter</label>
            <select
              name="chapterId"
              value={form.chapterId ?? ""}
              onChange={handleChange}
              className={inputCss}
            >
              <option value="">--Select chapter --</option>
              {selectChapter.map((chapter) => (
                <option value={chapter._id} key={chapter._id}>
                  {chapter.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className={labelCss}>Message</label>
            <textarea
              onChange={handleChange}
              name="message"
              value={form.message}
              rows={5}
              className={inputCss}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-main mt-8 text-white py-2.5 rounded-lg font-semibold cursor-pointer transition"
          >
            Created
          </button>
        </form>
      </div>
    </>
  );
};
