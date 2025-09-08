// pages/index.js
import { useState, useEffect } from 'react';
import { Mail, User, Phone, Building, DollarSign, Palette, Upload, Send, MessageSquare, Users, Settings } from 'lucide-react';

export default function ContactFormApp() {
  const [currentView, setCurrentView] = useState('contact'); // 'contact', 'admin'
  const [contacts, setContacts] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [coldEmailSubject, setColdEmailSubject] = useState('');
  const [coldEmailMessage, setColdEmailMessage] = useState('');

  // Contact form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    budget: '',
    skyColor: '',
    message: '',
    file: null
  });

  // Simulate loading contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage
  const saveContacts = (updatedContacts) => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      ...formData,
      fileName: formData.file?.name || null,
      submittedAt: new Date().toISOString(),
      status: 'new',
      replies: []
    };
    
    const updatedContacts = [...contacts, newContact];
    saveContacts(updatedContacts);
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      budget: '',
      skyColor: '',
      message: '',
      file: null
    });
    
    alert('Thank you! Your message has been submitted successfully.');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Simple password check (in real app, use proper authentication)
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      setCurrentView('admin');
    } else {
      alert('Invalid password');
    }
  };

  const handleReply = (contactId) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return {
          ...contact,
          replies: [...contact.replies, {
            id: Date.now(),
            message: replyMessage,
            sentAt: new Date().toISOString()
          }],
          status: 'replied'
        };
      }
      return contact;
    });
    
    saveContacts(updatedContacts);
    setReplyMessage('');
    setSelectedContact(null);
    alert('Reply sent successfully!');
  };

  const handleColdEmail = () => {
    if (!coldEmailSubject || !coldEmailMessage) {
      alert('Please fill in both subject and message');
      return;
    }
    
    // Simulate sending cold emails
    alert(`Cold email sent to ${contacts.length} contacts!\n\nSubject: ${coldEmailSubject}\n\nThis is a simulation - in a real app, this would integrate with an email service.`);
    setColdEmailSubject('');
    setColdEmailMessage('');
  };

  const markAsRead = (contactId) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId && contact.status === 'new') {
        return { ...contact, status: 'read' };
      }
      return contact;
    });
    saveContacts(updatedContacts);
  };

  // Contact Form Component
  const ContactForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with team photos */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Contact us</h1>
            <div className="flex items-center justify-center space-x-4">
              <span>I want to:</span>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium transition-colors">
                Start a Project
              </button>
              <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded transition-colors">
                Say Hello
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-6xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Building className="inline w-4 h-4 mr-2" />
                  Organization*
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Upload className="inline w-4 h-4 mr-2" />
                  RFP or Documentation (20MB)
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <DollarSign className="inline w-4 h-4 mr-2" />
                  Budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Palette className="inline w-4 h-4 mr-2" />
                  What color is the sky?*
                </label>
                <input
                  type="text"
                  name="skyColor"
                  value={formData.skyColor}
                  onChange={handleInputChange}
                  required
                  placeholder="This helps us prevent spam"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Column - Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Message or Project Description*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={12}
                placeholder="Tell us about your project..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
            >
              Submit
              <Send className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Admin Access */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentView('admin-login')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );

  // Admin Login Component
  const AdminLogin = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin password (hint: admin123)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setCurrentView('contact')}
          className="w-full mt-4 text-gray-600 hover:text-gray-800"
        >
          Back to Contact Form
        </button>
      </div>
    </div>
  );

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('contact')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                View Contact Form
              </button>
              <button
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  setCurrentView('contact');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter(c => c.status === 'new').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Send className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter(c => c.status === 'replied').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cold Email Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Send Cold Email</h2>
            <p className="text-gray-600">Send an email to all registered contacts</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={coldEmailSubject}
                  onChange={(e) => setColdEmailSubject(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Email subject..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={coldEmailMessage}
                  onChange={(e) => setColdEmailMessage(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Email message..."
                />
              </div>
            </div>
            <button
              onClick={handleColdEmail}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg inline-flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send to All ({contacts.length} contacts)
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {contacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No contact messages yet.
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                      <p className="text-sm text-gray-500">{contact.organization}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        contact.status === 'new' ? 'bg-red-100 text-red-800' :
                        contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {contact.status}
                      </span>
                      {contact.status === 'new' && (
                        <button
                          onClick={() => markAsRead(contact.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{contact.message}</p>
                    {contact.fileName && (
                      <p className="text-sm text-gray-500 mt-2">
                        📎 Attachment: {contact.fileName}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>Budget: {contact.budget || 'Not specified'}</span>
                    <span className="mx-2">•</span>
                    <span>Submitted: {new Date(contact.submittedAt).toLocaleDateString()}</span>
                  </div>

                  {/* Replies */}
                  {contact.replies && contact.replies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Replies:</h4>
                      {contact.replies.map((reply) => (
                        <div key={reply.id} className="bg-blue-50 rounded-lg p-3 mb-2">
                          <p className="text-gray-700">{reply.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Sent: {new Date(reply.sentAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {selectedContact === contact.id ? (
                    <div className="border-t pt-4">
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your reply..."
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleReply(contact.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                        >
                          Send Reply
                        </button>
                        <button
                          onClick={() => {
                            setSelectedContact(null);
                            setReplyMessage('');
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedContact(contact.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Reply to this message
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on current view
  if (currentView === 'admin-login') {
    return <AdminLogin />;
  }
  
  if (currentView === 'admin' && isAdminAuthenticated) {
    return <AdminDashboard />;
  }
  
  return <ContactForm />;
}