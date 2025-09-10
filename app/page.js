"use client";

import { useState, useEffect } from "react";
import {
  Send,
  MessageSquare,
  Users,
} from "lucide-react";

// --- Initial Form State ---
const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  budget: "",
  skyColor: "",
  message: "",
};

// --- Contact Form ---
function ContactForm({ formData, handleInputChange, handleFileChange, handleSubmit, setCurrentView }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with team photos background */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="./Teams.png"
          alt="Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a1a70] bg-opacity-40"></div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto relative z-20 px-4 py-10 -mt-32 md:-mt-40">
        <div className="bg-[#e9ecf1] rounded-lg shadow-2xl p-8">
          <div className="text-center text-black">
            <h1 className="text-5xl font-bold mb-6">Contact us</h1>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-lg">I want to:</span>
              <button className="border-b-2 border-red-700 px-6 py-2 text-red-700 font-medium">
                Start a Project
              </button>
              <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded">
                Say Hello
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:px-14 px-5 md:py-24 py-5 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="First Name*"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    placeholder="Last Name*"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <input
                  placeholder="Email Address*"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                />
                <input
                  placeholder="Phone Number*"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                />
                <input
                  placeholder="Organization*"
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                />

                <div className="relative">
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="fileInput"
                    className="w-full p-3 border border-gray-300 rounded cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                  >
                    Upload
                  </label>
                </div>

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>

                <input
                  placeholder="What color is the sky?*"
                  type="text"
                  name="skyColor"
                  value={formData.skyColor}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Right Column - Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={12}
                placeholder="Tell us about your project..."
                className="w-full p-3 bg-white text-black rounded focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded inline-flex items-center"
              >
                Submit
                <Send className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Admin Access */}
        <div className="mt-8 text-center pb-8">
          <button
            onClick={() => setCurrentView("admin-login")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Admin Login ---
function AdminLogin({ adminPassword, setAdminPassword, handleAdminLogin, setCurrentView }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter admin password (hint: admin123)"
          />
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-lg font-medium"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setCurrentView("contact")}
          className="w-full mt-4 text-gray-600 hover:text-gray-800"
        >
          Back to Contact Form
        </button>
      </div>
    </div>
  );
}

// --- Admin Dashboard ---
function AdminDashboard({ contacts, coldEmailSubject, coldEmailMessage, setColdEmailSubject, setColdEmailMessage, handleColdEmail, markAsRead, selectedContact, setSelectedContact, replyMessage, setReplyMessage, handleReply, setIsAdminAuthenticated, setCurrentView }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView("contact")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              View Contact Form
            </button>
            <button
              onClick={() => {
                setIsAdminAuthenticated(false);
                setCurrentView("contact");
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <Users className="w-8 h-8 text-blue-600" />
          <p className="text-sm font-medium text-gray-600">Total Contacts</p>
          <p className="text-2xl font-bold">{contacts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <MessageSquare className="w-8 h-8 text-green-600" />
          <p className="text-sm font-medium text-gray-600">New Messages</p>
          <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "new").length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Send className="w-8 h-8 text-purple-600" />
          <p className="text-sm font-medium text-gray-600">Replied</p>
          <p className="text-2xl font-bold">{contacts.filter((c) => c.status === "replied").length}</p>
        </div>
      </div>

      {/* Cold Email */}
      <div className="bg-white rounded-lg shadow max-w-7xl mx-auto mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Send Cold Email</h2>
        <input
          type="text"
          value={coldEmailSubject}
          onChange={(e) => setColdEmailSubject(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Email subject..."
        />
        <textarea
          value={coldEmailMessage}
          onChange={(e) => setColdEmailMessage(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Email message..."
        />
        <button
          onClick={handleColdEmail}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg inline-flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Send to All ({contacts.length} contacts)
        </button>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Contact Messages</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No contact messages yet.</div>
          ) : (
            contacts.map((contact) => (
              <div key={contact._id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{contact.firstName} {contact.lastName}</h3>
                    <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                    <p className="text-sm text-gray-500">{contact.organization}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      contact.status === "new"
                        ? "bg-red-100 text-red-800"
                        : contact.status === "read"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {contact.status}
                    </span>
                    {contact.status === "new" && (
                      <button
                        onClick={() => markAsRead(contact._id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p>{contact.message}</p>
                  {contact.fileName && (
                    <p className="text-sm text-gray-500 mt-2">📎 Attachment: {contact.fileName}</p>
                  )}
                </div>

                {/* Replies */}
                {contact.replies && contact.replies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Replies:</h4>
                    {contact.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 rounded-lg p-3 mb-2">
                        <p>{reply.message}</p>
                        <p className="text-xs text-gray-500">Sent: {new Date(reply.sentAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {selectedContact === contact._id ? (
                  <div className="border-t pt-4">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                      placeholder="Type your reply..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReply(contact._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Send Reply
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContact(null);
                          setReplyMessage("");
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedContact(contact._id)}
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
  );
}

// --- Main HomePage ---
export default function HomePage() {
  const [currentView, setCurrentView] = useState("contact");
  const [contacts, setContacts] = useState([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [coldEmailSubject, setColdEmailSubject] = useState("");
  const [coldEmailMessage, setColdEmailMessage] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);

  // Load contacts from DB
  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Fetch contacts error:", err);
    }
  };
  useEffect(() => { fetchContacts(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => setFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, fileName: file?.name || null };
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Thank you! Your message has been submitted successfully.");
        setFormData(initialFormData);
        setFile(null);
        fetchContacts();
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    }
  };

const handleAdminLogin = async (e) => {
  e.preventDefault();
  
  const res = await fetch("/api/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: adminPassword }),
  });

  const data = await res.json();

  if (data.success) {
    setIsAdminAuthenticated(true);
    setCurrentView("admin");
  } else {
    alert(data.error || "Invalid password");
  }
};


  const handleReply = async (contactId) => {
    try {
      const res = await fetch("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, message: replyMessage }),
      });
      if (res.ok) {
        const { reply } = await res.json();
        setContacts((prev) =>
          prev.map((c) =>
            c._id === contactId ? { ...c, replies: [...c.replies, reply], status: "replied" } : c
          )
        );
        setReplyMessage("");
        setSelectedContact(null);
        alert("Reply sent successfully!");
      } else {
        alert("Failed to send reply");
      }
    } catch (err) {
      console.error("Reply error:", err);
      alert("Something went wrong while sending reply.");
    }
  };

  const handleColdEmail = async () => {
    if (!coldEmailSubject || !coldEmailMessage) {
      alert("Please fill in both subject and message");
      return;
    }
    try {
      const res = await fetch("/api/coldmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: coldEmailSubject, message: coldEmailMessage }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Cold email sent to ${data.sent} contacts!`);
        setColdEmailSubject("");
        setColdEmailMessage("");
      } else {
        alert("Failed to send cold email");
      }
    } catch (err) {
      console.error("Cold email error:", err);
      alert("Something went wrong while sending cold emails.");
    }
  };

  const markAsRead = async (contactId) => {
    try {
      const res = await fetch("/api/contacts/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === contactId ? { ...c, status: "read" } : c))
        );
      }
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  // --- Render ---
  if (currentView === "admin-login") {
    return (
      <AdminLogin
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        handleAdminLogin={handleAdminLogin}
        setCurrentView={setCurrentView}
      />
    );
  }
  if (currentView === "admin" && isAdminAuthenticated) {
    return (
      <AdminDashboard
        contacts={contacts}
        coldEmailSubject={coldEmailSubject}
        coldEmailMessage={coldEmailMessage}
        setColdEmailSubject={setColdEmailSubject}
        setColdEmailMessage={setColdEmailMessage}
        handleColdEmail={handleColdEmail}
        markAsRead={markAsRead}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        handleReply={handleReply}
        setIsAdminAuthenticated={setIsAdminAuthenticated}
        setCurrentView={setCurrentView}
      />
    );
  }
  return (
    <ContactForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      setCurrentView={setCurrentView}
    />
  );
}
