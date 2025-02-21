
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "en", name: "English", nativeName: "English" },
];

interface LanguageToggleProps {
  onChange: (code: string) => void;
}

export function LanguageToggle({ onChange }: LanguageToggleProps) {
  const [currentLang, setCurrentLang] = useState<string>("pa");

  const handleChange = (code: string) => {
    setCurrentLang(code);
    onChange(code);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? "default" : "outline"}
          onClick={() => handleChange(lang.code)}
          className="font-mukta"
        >
          {lang.nativeName}
        </Button>
      ))}
    </div>
  );
}
