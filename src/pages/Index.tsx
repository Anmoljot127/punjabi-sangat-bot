
import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LanguageToggle } from "@/components/LanguageToggle";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<string>("pa");

  const handleSend = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਹਿ",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  };

  const getPlaceholder = () => {
    return language === "pa"
      ? "ਆਪਣਾ ਸੁਆਲ ਇੱਥੇ ਲਿਖੋ..."
      : "Type your question here...";
  };

  return (
    <div className="min-h-screen bg-background font-mukta">
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <LanguageToggle onChange={setLanguage} />
        </div>
        
        <div className="mb-8 h-[calc(100vh-300px)] overflow-y-auto rounded-lg border border-muted bg-card p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              {language === "pa"
                ? "ਆਪਣਾ ਪਹਿਲਾ ਸੁਆਲ ਪੁੱਛੋ..."
                : "Ask your first question..."}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              {isLoading && (
                <ChatMessage
                  content=""
                  timestamp={new Date()}
                  isUser={false}
                  isLoading={true}
                />
              )}
            </div>
          )}
        </div>

        <ChatInput
          onSend={handleSend}
          maxLength={1000}
          placeholder={getPlaceholder()}
        />
      </div>
    </div>
  );
}
