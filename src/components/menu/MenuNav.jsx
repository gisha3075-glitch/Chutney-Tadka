import { useScrollSpy } from '../../hooks/useRestaurant';

export function MenuNav({ sections, restaurantId }) {
  const sectionIds = sections.map((s) => `menu-${restaurantId}-${s}`);
  const activeSection = useScrollSpy(sectionIds, 200);

  const scrollToSection = (section, index) => {
    const el = document.getElementById(`menu-${restaurantId}-${section}`);
    if (el) {
      const offset = 180;
      const top = el.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Find the display name for the active section
  const activeIndex = sectionIds.indexOf(activeSection);
  const activeName = activeIndex >= 0 ? sections[activeIndex] : sections[0];

  return (
    <div className="sticky top-16 z-30 bg-white border-y border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section, index)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeSection === sectionIds[index]
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section}
              {index === 0 && <span className="ml-1 text-xs opacity-70">({sections.length - 1})</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
