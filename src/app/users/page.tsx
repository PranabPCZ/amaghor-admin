'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'staff' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastLogin: string;
  permissions: string[];
  avatar: string;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Rahman Ahmed',
      email: 'rahman@amaghor.com',
      phone: '+880 1712345678',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-15',
      lastLogin: '2024-12-18 14:30',
      permissions: ['all'],
      avatar: '👨‍💼'
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@amaghor.com',
      phone: '+880 1712345679',
      role: 'manager',
      status: 'active',
      joinedDate: '2024-02-10',
      lastLogin: '2024-12-18 12:15',
      permissions: ['hotel_management', 'booking_management', 'customer_support'],
      avatar: '👩‍💼'
    },
    {
      id: '3',
      name: 'Karim Hassan',
      email: 'karim.hassan@gmail.com',
      phone: '+880 1712345680',
      role: 'customer',
      status: 'active',
      joinedDate: '2024-03-05',
      lastLogin: '2024-12-17 18:45',
      permissions: ['booking', 'profile_management'],
      avatar: '👨'
    },
    {
      id: '4',
      name: 'Nasir Ali',
      email: 'nasir@amaghor.com',
      phone: '+880 1712345681',
      role: 'staff',
      status: 'active',
      joinedDate: '2024-04-20',
      lastLogin: '2024-12-18 09:00',
      permissions: ['front_desk', 'room_management'],
      avatar: '👨‍🔧'
    },
    {
      id: '5',
      name: 'Rashida Begum',
      email: 'rashida.begum@gmail.com',
      phone: '+880 1712345682',
      role: 'customer',
      status: 'suspended',
      joinedDate: '2024-05-12',
      lastLogin: '2024-12-15 16:20',
      permissions: ['booking', 'profile_management'],
      avatar: '👩'
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as const,
    permissions: [] as string[]
  });

  const rolePermissions = {
    admin: ['all'],
    manager: ['hotel_management', 'booking_management', 'customer_support', 'analytics', 'staff_management'],
    staff: ['front_desk', 'room_management', 'customer_service'],
    customer: ['booking', 'profile_management', 'reviews']
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.phone.includes(searchQuery);
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'staff': return 'bg-green-100 text-green-700';
      case 'customer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddUser = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      permissions: rolePermissions[newUser.role],
      avatar: newUser.role === 'admin' ? '👨‍💼' : newUser.role === 'manager' ? '👩‍💼' : 
             newUser.role === 'staff' ? '👨‍🔧' : '👤'
    };
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', phone: '', role: 'customer', permissions: [] });
    setShowAddUser(false);
    setIsLoading(false);
    alert('User added successfully!');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      
      <div className="w-full max-w-[95%] md:max-w-7xl mx-auto px-2 md:px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-sm md:text-base text-gray-600">Manage users, roles, and permissions</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  ← Back to Admin
                </Button>
              </Link>
              <Button 
                onClick={() => setShowAddUser(true)}
                className="bg-green-600 hover:bg-green-700 text-xs md:text-sm px-4"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Users</p>
                  <p className="text-lg font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Active Users</p>
                  <p className="text-lg font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Admins</p>
                  <p className="text-lg font-bold text-red-600">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <Shield className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Customers</p>
                  <p className="text-lg font-bold text-gray-600">{users.filter(u => u.role === 'customer').length}</p>
                </div>
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <div className="flex gap-2">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <p>Joined: {new Date(user.joinedDate).toLocaleDateString()}</p>
                      <p>Last login: {user.lastLogin}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id)}
                        className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        {user.status === 'active' ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteUser(user.id)} className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No users found matching your criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Add User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New User</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowAddUser(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <Select value={newUser.role} onValueChange={(value: any) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowAddUser(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
                    {isLoading ? 'Adding...' : 'Add User'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}