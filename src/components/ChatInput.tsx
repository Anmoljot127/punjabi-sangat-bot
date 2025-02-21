
import { useState, useRef, useEffect } from "react";
import { Mic, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  maxLength?: number;
  placeholder?: string;
}

export function ChatInput({ onSend, maxLength = 1000, placeholder }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startVoiceInput = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = "pa-IN"; // Set language to Punjabi
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => prev + transcript);
      };

      recognition.start();
    } catch (error) {
      console.error("Speech recognition error:", error);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none rounded-lg border border-muted bg-card p-4 pr-24 font-mukta text-base focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ maxHeight: "200px" }}
        />
        <div className="absolute right-2 flex items-center space-x-2">
          <button
            type="button"
            onClick={startVoiceInput}
            className={`p-2 rounded-full transition-colors ${
              isRecording
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
            aria-label="Start voice input"
          >
            <Mic size={20} />
          </button>
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      <div className="mt-1 text-right text-xs text-muted-foreground">
        {message.length}/{maxLength}
      </div>
    </form>
  );
}
