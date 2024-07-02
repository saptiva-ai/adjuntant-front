import { Button, Card, CardHeader } from "@nextui-org/react";

type TemplateCardProps = {
  template: {
    id: number;
    title: string;
    content: string;
  };
  onSelect: (content: string) => void;
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <span
      key={template.id}
      className='me-2 rounded bg-gray-100 px-2.5 py-0.5 text-center text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      onClick={() => onSelect(template.content)}
    >
      {template.title}
    </span>
  );
};

export default TemplateCard;
