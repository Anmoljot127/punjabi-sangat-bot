
import { format } from "date-fns";
import { Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  content: string;
  timestamp: Date;
  isUser: boolean;
  isLoading?: boolean;
}

export function ChatMessage({ content, timestamp, isUser, isLoading }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  const shareMessage = async () => {
    try {
      await navigator.share({
        text: content,
      });
    } catch (error) {
      toast.error("Unable to share message");
    }
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative max-w-[80%] rounded-lg p-4 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-muted"
        }`}
      >
        {isLoading ? (
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : (
          <>
            <p className="font-mukta text-lg whitespace-pre-wrap">{content}</p>
            <div className="mt-2 flex items-center justify-between text-xs opacity-70">
              <span>{format(timestamp, "HH:mm")}</span>
              {!isUser && isHovered && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-1 hover:text-accent transition-colors"
                    aria-label="Copy message"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={shareMessage}
                    className="p-1 hover:text-accent transition-colors"
                    aria-label="Share message"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
