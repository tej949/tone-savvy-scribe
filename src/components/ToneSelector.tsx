
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UK, US, Japan } from "lucide-react";

type ToneSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const ToneSelector = ({ value, onChange }: ToneSelectorProps) => {
  const toneOptions = [
    {
      id: "british",
      label: "British",
      description: "Formal, polite and indirect communication style",
      icon: UK,
    },
    {
      id: "american",
      label: "American",
      description: "Direct, friendly and results-oriented approach",
      icon: US,
    },
    {
      id: "japanese",
      label: "Japanese",
      description: "Highly respectful with careful attention to hierarchy",
      icon: Japan,
    },
  ];

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Select Business Culture Tone:</h3>
      <TooltipProvider>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-wrap gap-2"
        >
          {toneOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 border rounded-md px-3 py-2 hover:bg-secondary cursor-pointer">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <option.icon className="h-4 w-4" />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{option.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </RadioGroup>
      </TooltipProvider>
    </div>
  );
};

export default ToneSelector;
