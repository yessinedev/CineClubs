import { useState } from 'react';
import { Camera, Lock, Settings, LogOut } from 'lucide-react';
import UserStats from '@/components/Profile/UserStats';
import UserClubs from '@/components/Profile/UserClubs';
import UserThreads from '@/components/Profile/UserThreads';
import ChangePasswordModal from '@/components/Profile/ChangePasswordModal';
import ProfilePictureModal from '@/components/Profile/ProfilePictureModal';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('clubs');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-pink-500">
            <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="w-24 h-24 rounded-xl border-4 border-gray-900 object-cover"
                />
                <button 
                  onClick={() => setShowProfilePictureModal(true)}
                  className="absolute -right-2 -bottom-2 p-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-white">David Miller</h1>
                <p className="text-gray-300">Joined March 2024</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-black/20 hover:bg-black/40 text-white rounded-xl backdrop-blur-sm transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Change Password</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-black/20 hover:bg-black/40 text-white rounded-xl backdrop-blur-sm transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-black/20 hover:bg-black/40 text-white rounded-xl backdrop-blur-sm transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 px-8">
            <UserStats />
          </div>

          {/* Navigation Tabs */}
          <div className="px-8 mt-8 border-b border-gray-800">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('clubs')}
                className={`px-4 py-4 font-medium ${
                  activeTab === 'clubs'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Joined Clubs
              </button>
              <button
                onClick={() => setActiveTab('threads')}
                className={`px-4 py-4 font-medium ${
                  activeTab === 'threads'
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                My Threads
              </button>
            </nav>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {activeTab === 'clubs' ? <UserClubs /> : <UserThreads />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
      {showProfilePictureModal && (
        <ProfilePictureModal onClose={() => setShowProfilePictureModal(false)} />
      )}
    </div>
  );
}