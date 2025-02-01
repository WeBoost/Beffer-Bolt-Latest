import React from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQTab {
  id: string;
  name: string;
  faqs: FAQ[];
}

interface FAQTabsProps {
  tabs: FAQTab[];
  defaultTab?: string;
}

export function FAQTabs({ tabs, defaultTab }: FAQTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0].id);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex items-center gap-8 border-b mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            {tab.faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg border hover:border-gray-300 transition-colors p-6"
              >
                <h3 className="font-medium text-gray-900 mb-4">{faq.question}</h3>
                <div className="prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}