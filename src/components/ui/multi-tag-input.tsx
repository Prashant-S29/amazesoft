"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

interface MultiTagInputProps {
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  maxTags: number;
  validateTag: (tag: string) => boolean;
  validationFailedMessage?: string;
  maxLimitReachedMessage?: string;
}

export const MultiTagInput: React.FC<MultiTagInputProps> = ({
  placeholder = "Enter tag",
  value,
  onChange,
  maxTags,
  validateTag,
  validationFailedMessage,
  maxLimitReachedMessage,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (value.length >= maxTags) return;

      const newTag = inputValue.trim();
      if (!validateTag(newTag)) {
        toast.error(validationFailedMessage ?? "Invalid data");
        return;
      }
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Input
        ref={inputRef}
        type="text"
        placeholder={
          value.length < maxTags
            ? placeholder
            : (maxLimitReachedMessage ?? `Maximum ${maxTags} tags reached`)
        }
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={value.length >= maxTags}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="outline" className="gap-1 py-1 font-medium">
            {tag}
            <button type="button" tabIndex={-1} onClick={() => removeTag(tag)}>
              <X className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer" />
              <span className="sr-only">Remove {tag} tag</span>
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};
