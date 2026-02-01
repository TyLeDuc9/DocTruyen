import { useLoading } from '../../context/LoadingContext';
export const ComponentLoading = () => {
  const { componentsLoading } = useLoading();
  if (!componentsLoading) return null;

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#639eae]/30 border-t-[#639eae] rounded-full animate-spin" />
    </div>
  );
};
