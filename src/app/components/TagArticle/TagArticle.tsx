interface TagProps {
  tag: string;
}

export const TagArticle = ({ tag }: TagProps) => {
  return (
    <div className="rounded-[2px] border-[1px] border-textColorSecondary py-[3px] px-[6px] flex items-center justify-center max-h-[20px]">
      <span className="text-textColorSecondary text-[12px] font-normal break-words"> {tag}</span>
    </div>
  );
};
