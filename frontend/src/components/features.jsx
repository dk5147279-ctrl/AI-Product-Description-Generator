import Card from './Card';

function Features() {
  const cardData = [
    {
      title: "⚡ Lightning Fast",
      description: "Generate mouth-watering descriptions, serving ideas, and logistic copy in under 5 seconds."
    },
    {
      title: "🥗 Tailored for Food Processing",
      description: "Outputs structured info for dietary claims, allergens, packaging, and commercial wholesale specs."
    },
    {
      title: "📈 SEO & Retail Optimized",
      description: "Automatically injects search keywords to boost rankings on Google, Amazon, and retail platforms."
    }
  ];

  return (
    <div className="py-24 px-6 md:px-16 bg-slate-100/50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-white/5 relative transition-colors duration-300">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight mb-16">
        Why Use <span className="bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">GourmetScribe?</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <Card 
            key={index}
            title={card.title}
            description={card.description}
            action={
              <span className="text-xs font-semibold text-violet-650 dark:text-violet-400 group-hover:text-violet-550 dark:group-hover:text-violet-300 transition-colors">
                Learn more &rarr;
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
