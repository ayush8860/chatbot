import PropTypes from 'prop-types';

export default function ChatMessage({ message, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isOwnMessage && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            {message.sender.username.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isOwnMessage
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {!isOwnMessage && (
          <div className="text-xs text-gray-500 mb-1">
            {message.sender.username}
          </div>
        )}
        <div>{message.content}</div>
        <div className="text-xs mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      username: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  isOwnMessage: PropTypes.bool.isRequired
};
 