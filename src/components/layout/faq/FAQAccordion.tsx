import React from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpen?: string[];
}

export function FAQAccordion({ faqs, defaultOpen = [] }: FAQAccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-white rounded-lg border hover:border-gray-300 transition-colors"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{faq.question}</h3>
              {faq.category && (
                <span className="text-sm text-gray-500">{faq.category}</span>
              )}
            </div>
            {openItems.includes(faq.id) ? (
              <Minus className="text-gray-400" size={20} />
            ) : (
              <Plus className="text-gray-400" size={20} />
            )}
          </button>
          {openItems.includes(faq.id) && (
            <div className="px-6 pb-4">
              <div className="prose prose-blue max-w-none">
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}