import { useNavigate } from "react-router-dom";
export const useChapterNavigation = (chapters: { slug: string }[]) => {
  const navigate = useNavigate();
  const handleFirstChapter = () => {
    if (!chapters || chapters.length === 0) return;
    const firstChapter = chapters[0];
    navigate(`/chapter/detail/${firstChapter.slug}`);
  };

  const handleNewChapter = () => {
    if (!chapters || chapters.length === 0) return;

    const latestChapter = chapters[chapters.length - 1];
    navigate(`/chapter/detail/${latestChapter.slug}`);
  };

  return { handleFirstChapter, handleNewChapter };
};
