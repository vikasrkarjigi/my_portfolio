'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Bot, Send, User, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { getChatbotResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


type Message =  {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          role: 'assistant',
          text: "Hi there! I'm Vikas's AI assistant. Feel free to ask me anything about his skills, experience, or projects.",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getChatbotResponse(input);

    if (result.success && result.data) {
        const assistantMessage: Message = {
            id: Date.now() + 1,
            role: 'assistant',
            text: result.data,
        };
        setMessages((prev) => [...prev, assistantMessage]);
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Something went wrong. Please try again.',
            variant: 'destructive',
        });
        // Optionally add the error message back to the chat
         const errorMessage: Message = {
            id: Date.now() + 1,
            role: 'assistant',
            text: "Sorry, I couldn't get a response right now. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
    }
    
    setIsLoading(false);
  };
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-sm h-[60vh] sm:h-[70vh] max-h-[600px] z-50"
          >
            <div className="flex flex-col h-full bg-card border rounded-xl shadow-2xl">
              <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            <Bot className="w-5 h-5"/>
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">Vikas's AI Assistant</h3>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </header>
              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-4 space-y-6">
                    {messages.map((message) => (
                        <div key={message.id} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                           {message.role === 'assistant' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>
                                        <Bot className="w-4 h-4"/>
                                    </AvatarFallback>
                                </Avatar>
                           )}
                           <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm", 
                                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            )}>
                                <p>{message.text}</p>
                           </div>
                           {message.role === 'user' && (
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>
                                        <User className="w-4 h-4"/>
                                    </AvatarFallback>
                                </Avatar>
                           )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                             <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                    <Bot className="w-4 h-4"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
              </ScrollArea>
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience..."
                    className="pr-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:right-6 rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform duration-200 z-50"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
            </motion.div>
        </AnimatePresence>
      </Button>
    </>
  );
}
