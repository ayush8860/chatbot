import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import GroupList from './GroupList';
import CreateGroupModal from './CreateGroupModal';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (currentGroup) {
      fetchMessages(currentGroup._id);
    }
  }, [currentGroup]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/groups');
      setGroups(response.data);
      if (response.data.length > 0) {
        setCurrentGroup(response.data[0]);
      }
    } catch (error) {
      setError('Failed to load groups');
    }
  };

  const fetchMessages = async (groupId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/messages/${groupId}`);
      setMessages(response.data.reverse());
      setError(null);
    } catch (error) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content) => {
    if (!currentGroup) return;
    
    try {
      const response = await axios.post(
        `http://localhost:4000/api/messages/${currentGroup._id}`,
        { content }
      );
      setMessages(prev => [...prev, response.data]);
    } catch (error) {
      setError('Failed to send message');
    }
  };

  const createGroup = async (groupData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/groups', groupData);
      setGroups(prev => [...prev, response.data.group]);
      setShowCreateGroup(false);
    } catch (error) {
      setError('Failed to create group');
    }
  };

  const leaveGroup = async () => {
    if (!currentGroup) return;

    try {
      await axios.post(`http://localhost:4000/api/groups/${currentGroup._id}/leave`);
      setGroups(groups.filter(g => g._id !== currentGroup._id));
      setCurrentGroup(null);
      setShowGroupMenu(false);
    } catch (error) {
      setError('Failed to leave group');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4">
        <button
          onClick={() => setShowCreateGroup(true)}
          className="w-full mb-4 bg-blue-500 text-white p-2 rounded"
        >
          Create New Group
        </button>
        <GroupList
          groups={groups}
          currentGroup={currentGroup}
          onSelectGroup={setCurrentGroup}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        {currentGroup ? (
          <>
            <div className="bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{currentGroup.name}</h2>
              <div className="relative">
                <button
                  onClick={() => setShowGroupMenu(!showGroupMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                {showGroupMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={leaveGroup}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Leave Group
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message._id}
                  message={message}
                  isOwnMessage={message.sender._id === user.id}
                />
              ))}
            </div>
            <ChatInput onSendMessage={sendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            Select a group or create a new one to start chatting
          </div>
        )}
      </div>

      {showCreateGroup && (
        <CreateGroupModal
          onClose={() => setShowCreateGroup(false)}
          onCreate={createGroup}
        />
      )}
    </div>
  );
}
