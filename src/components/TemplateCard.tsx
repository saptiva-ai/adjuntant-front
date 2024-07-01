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
    <Card className="mb-0.5 p-1">
      <CardHeader className="p-0.5 flex justify-between items-center">
        <h4 className="text-xs font-medium">{template.title}</h4>
        <Button size="sm" className="ml-1" onClick={() => onSelect(template.content)}>
          Seleccionar
        </Button>
      </CardHeader>
    </Card>
  );
};

export default TemplateCard;
