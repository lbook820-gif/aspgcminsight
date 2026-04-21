interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  updateDate?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  updateDate,
}: HeroSectionProps) {
  return (
    <section className="bg-[#fafafa] pt-20 pb-6 px-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[28px] font-bold text-[#171717] leading-tight">
          {title}
        </h1>
        <p className="text-sm text-[#525252] mt-2 tracking-wide">
          {subtitle}
        </p>
        <p className="text-sm text-[#525252] mt-3 leading-relaxed">
          {description}
        </p>
        {updateDate && (
          <p className="text-xs text-[#737373] mt-2">
            网站更新于：{updateDate}
          </p>
        )}
      </div>
    </section>
  );
}
