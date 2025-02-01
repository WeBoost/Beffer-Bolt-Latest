import React from 'react';
import { Send, Paperclip, Clock, User, Download } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  senderName: string;
  timestamp: string;
  attachments?: {
    name: string;
    size: number;
    url: string;
  }[];
}

interface TicketConversationProps {
  ticketId: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  subject: string;
  messages: Message[];
  onSendMessage: (content: string, files?: File[]) => Promise<void>;
}

export function TicketConversation({
  ticketId,
  status,
  subject,
  messages,
  onSendMessage
}: TicketConversationProps) {
  const [newMessage, setNewMessage] = React.useState('');
  const [files, setFiles] = React.useState<File[]>([]);
  const [sending, setSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && files.length === 0) return;

    try {
      setSending(true);
      await onSendMessage(newMessage, files);
      setNewMessage('');
      setFiles([]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: TicketConversationProps['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Ticket #{ticketId}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
              status
            )}`}
          >
            {status.replace('_', ' ')}
          </span>
        </div>
        <p className="text-gray-600">{subject}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              } rounded-lg px-6 py-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <User size={16} />
                <span className="font-medium">{message.senderName}</span>
                <span className="text-sm opacity-75">
                  <Clock size={14} className="inline mr-1" />
                  {message.timestamp}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {message.attachments.map((file) => (
                    <a
                      key={file.name}
                      href={file.url}
                      download
                      className={`flex items-center gap-2 p-2 rounded ${
                        message.sender === 'user'
                          ? 'bg-blue-500 hover:bg-blue-400'
                          : 'bg-gray-200 hover:bg-gray-300'
                      } transition-colors`}
                    >
                      <Download size={16} />
                      <span className="flex-1 truncate">{file.name}</span>
                      <span className="text-sm">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* New Message Input */}
      <div className="bg-white border-t p-4">
        {files.length > 0 && (
          <div className="mb-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <Paperclip size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-900">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="p-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Paperclip size={20} className="text-gray-600" />
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <button
              onClick={handleSendMessage}
              disabled={sending || (!newMessage.trim() && files.length === 0)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}