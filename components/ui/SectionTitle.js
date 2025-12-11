export default function SectionTitle({ title, subtitle, centered = false }) {
  const alignmentClass = centered ? 'text-center' : 'text-left';

  return (
    <div className={`mb-8 md:mb-12 ${alignmentClass}`}>
      {subtitle && (
        <p className="text-blue-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
        {title}
      </h2>
    </div>
  );
}
