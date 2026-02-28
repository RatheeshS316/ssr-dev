import { useState, useEffect } from 'react';
import { FolderOpen, Users, Star, IndianRupee, LogOut, CheckCircle2, Clock, AlertCircle, Trash2, Shield, ShieldOff, Power, Plus, X } from 'lucide-react';
import FadeInSection from '../components/FadeInSection';
import StatCard from '../components/StatCard';
import { useAuth } from '../hooks/useAuth.js';
import { authService } from '../services/api.js';
import api from '../services/api.js';

const STATS = [
  { icon: <FolderOpen   className="w-5 h-5 text-blue-400"   />, value: '20+',   label: 'Total Projects'  },
  { icon: <Users        className="w-5 h-5 text-green-400"  />, value: '10+',   label: 'Happy Clients'   },
  { icon: <Star         className="w-5 h-5 text-yellow-400" />, value: '4.9',   label: 'Avg Rating'      },
  { icon: <IndianRupee  className="w-5 h-5 text-purple-400" />, value: '₹2.5L', label: 'Revenue Earned'  },
];

const ACTIVITY = [
  { project: 'E-Commerce Platform',   client: 'ABC Store',       status: 'Completed',   date: 'Jan 2026' },
  { project: 'College Management',    client: 'XYZ College',     status: 'Completed',   date: 'Dec 2025' },
  { project: 'Resume Analyzer AI',    client: 'HR Tech Startup', status: 'In Progress', date: 'Feb 2026' },
  { project: 'Restaurant Booking App', client: 'Spice Garden',   status: 'Completed',   date: 'Nov 2025' },
];

const STATUS_MAP = {
  'Completed':   { Icon: CheckCircle2, cls: 'badge-green'  },
  'In Progress': { Icon: Clock,        cls: 'badge-yellow' },
  'On Hold':     { Icon: AlertCircle,  cls: 'badge-red'    },
};
const StatusBadge = ({ status }) => {
  const { Icon, cls } = STATUS_MAP[status] || STATUS_MAP['Completed'];
  return <span className={cls}><Icon className="w-3 h-3" />{status}</span>;
};

const AdminPage = ({ handlePageChange }) => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [actionLoading, setActionLoading] = useState(null);
  const [projects, setProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    image: '',
    completionDate: '',
    clientName: '',
    category: '',
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch projects and reviews when tab changes
  useEffect(() => {
    if (activeTab === 'projects' || activeTab === 'reviews') {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const projectsRes = await api.get('/api/projects/recent');
      const reviewsRes = await api.get('/api/reviews/admin/all');

      if (projectsRes.data.success) {
        setProjects(projectsRes.data.data || []);
      }
      if (reviewsRes.data.success) {
        setReviews(reviewsRes.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await authService.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    handlePageChange('home');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      setActionLoading(userId);
      await authService.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      setActionLoading(userId);
      if (currentStatus) {
        await authService.disableUser(userId);
      } else {
        await authService.enableUser(userId);
      }
      await fetchUsers();
    } catch (err) {
      console.error('Failed to update user status:', err);
      alert('Failed to update user status');
    } finally {
      setActionLoading(null);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      setActionLoading(userId);
      await authService.changeUserRole(userId, newRole);
      await fetchUsers();
    } catch (err) {
      console.error('Failed to change user role:', err);
      alert('Failed to change user role');
    } finally {
      setActionLoading(null);
    }
  };

  // Project management handlers
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectFormData.title || !projectFormData.clientName) {
      alert('Title and client name are required');
      return;
    }

    try {
      setActionLoading('project');
      const res = await api.post('/api/projects/recent', projectFormData);
      if (res.data.success) {
        alert('Project created successfully');
        setShowProjectForm(false);
        setProjectFormData({
          title: '',
          description: '',
          image: '',
          completionDate: '',
          clientName: '',
          category: '',
        });
        await fetchData();
      } else {
        alert(res.data.message || 'Failed to create project');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create project');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setActionLoading(projectId);
      const res = await api.delete(`/api/projects/recent/${projectId}`);
      if (res.data.success) {
        setProjects(projects.filter(p => p.id !== projectId));
        alert('Project deleted successfully');
      } else {
        alert(res.data.message || 'Failed to delete project');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setActionLoading(null);
    }
  };

  // Review approval handler
  const handleApproveReview = async (reviewId) => {
    try {
      setActionLoading(reviewId);
      const res = await api.patch(`/api/reviews/${reviewId}/approve`);
      if (res.data.success) {
        await fetchData();
        alert('Review approved successfully');
      } else {
        alert(res.data.message || 'Failed to approve review');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve review');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      setActionLoading(reviewId);
      const res = await api.delete(`/api/reviews/${reviewId}`);
      if (res.data.success) {
        setReviews(reviews.filter(r => r.id !== reviewId));
        alert('Review deleted successfully');
      } else {
        alert(res.data.message || 'Failed to delete review');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="page-container pt-10 pb-24">

      {/* Header */}
      <FadeInSection>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-1">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome, {user?.name}! Here's an overview of SSRDev.</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-ghost !py-2 !px-4 !text-sm flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </FadeInSection>

      {/* Tabs */}
      <FadeInSection delay={30}>
        <div className="flex gap-2 mb-8 border-b border-slate-800 overflow-x-auto">
          {['dashboard', 'users', 'projects', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab === 'dashboard' && '📊 Dashboard'}
              {tab === 'users' && '👥 Users'}
              {tab === 'projects' && '📁 Projects'}
              {tab === 'reviews' && '⭐ Reviews'}
            </button>
          ))}
        </div>
      </FadeInSection>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <>
          {/* Stats */}
          <FadeInSection delay={60}>
            <section aria-label="Dashboard stats"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {STATS.map((s, i) => <StatCard key={i} {...s} />)}
            </section>
          </FadeInSection>

          {/* Recent activity table */}
          <FadeInSection delay={120}>
            <section aria-label="Recent project activity" className="mb-8">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h2>
              <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-surface border-b border-slate-800">
                        {['Project', 'Client', 'Status', 'Date'].map(h => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ACTIVITY.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-surface transition-colors">
                          <td className="px-5 py-3.5 text-sm font-semibold text-slate-200">{row.project}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-400">{row.client}</td>
                          <td className="px-5 py-3.5"><StatusBadge status={row.status} /></td>
                          <td className="px-5 py-3.5 text-sm text-slate-500">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* Quick actions */}
          <FadeInSection delay={180}>
            <section aria-label="Quick actions">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'View Portfolio',  page: 'portfolio' },
                  { label: 'Project History', page: 'history'   },
                  { label: 'Client Reviews',  page: 'review'    },
                  { label: 'Our Team',        page: 'team'      },
                ].map(({ label, page }) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold
                      bg-surface2 border border-slate-800 text-slate-400
                      hover:text-white hover:border-slate-600 hover:bg-brand/8 transition-all duration-150"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          </FadeInSection>
        </>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <FadeInSection>
          <section aria-label="User management" className="mb-8">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Registered Users</h2>
            
            {loadingUsers ? (
              <div className="text-center py-8 text-slate-400">Loading users...</div>
            ) : (
              <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface border-b border-slate-800">
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="border-b border-slate-800/50 hover:bg-surface transition-colors">
                          <td className="px-5 py-3.5 text-sm font-semibold text-slate-200">{u.name}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-400">{u.email}</td>
                          <td className="px-5 py-3.5">
                            {u.id === user?.id ? (
                              <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold">
                                {u.role}
                              </span>
                            ) : (
                              <select
                                value={u.role}
                                onChange={(e) => handleChangeRole(u.id, e.target.value)}
                                disabled={actionLoading === u.id}
                                className="px-2 py-1 rounded-md bg-surface border border-slate-700 text-xs font-semibold text-slate-300 cursor-pointer disabled:opacity-50"
                              >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                              </select>
                            )}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                              u.isActive 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {u.isActive ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex gap-2">
                              {u.id !== user?.id && (
                                <>
                                  <button
                                    onClick={() => handleToggleStatus(u.id, u.isActive)}
                                    disabled={actionLoading === u.id}
                                    className="p-1.5 rounded-md bg-surface border border-slate-700 hover:bg-slate-700 transition-colors disabled:opacity-50"
                                    title={u.isActive ? 'Disable user' : 'Enable user'}
                                  >
                                    {u.isActive ? (
                                      <Power className="w-4 h-4 text-yellow-400" />
                                    ) : (
                                      <Power className="w-4 h-4 text-slate-500" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(u.id)}
                                    disabled={actionLoading === u.id}
                                    className="p-1.5 rounded-md bg-surface border border-slate-700 hover:bg-red-500/20 hover:border-red-500/50 transition-colors disabled:opacity-50"
                                    title="Delete user"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-surface2 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Users</div>
                <div className="text-2xl font-black text-white">{users.length}</div>
              </div>
              <div className="bg-surface2 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Admins</div>
                <div className="text-2xl font-black text-blue-400">{users.filter(u => u.role === 'admin').length}</div>
              </div>
              <div className="bg-surface2 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Users</div>
                <div className="text-2xl font-black text-green-400">{users.filter(u => u.isActive).length}</div>
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Projects Management Tab */}
      {activeTab === 'projects' && (
        <FadeInSection>
          <section aria-label="Project management" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Projects</h2>
              <button
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="flex items-center gap-2 px-3 py-2 bg-brand hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {showProjectForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showProjectForm ? 'Cancel' : 'New Project'}
              </button>
            </div>

            {/* Project Form */}
            {showProjectForm && (
              <div className="bg-surface2 border border-slate-800 rounded-2xl p-6 mb-6">
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={projectFormData.title}
                      onChange={(e) => setProjectFormData({...projectFormData, title: e.target.value})}
                      className="px-4 py-2 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-brand"
                    />
                    <input
                      type="text"
                      placeholder="Client Name"
                      value={projectFormData.clientName}
                      onChange={(e) => setProjectFormData({...projectFormData, clientName: e.target.value})}
                      className="px-4 py-2 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-brand"
                    />
                  </div>
                  <textarea
                    placeholder="Project Description"
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-brand"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={projectFormData.image}
                      onChange={(e) => setProjectFormData({...projectFormData, image: e.target.value})}
                      className="px-4 py-2 bg-surface border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-brand"
                    />
                    <input
                      type="date"
                      value={projectFormData.completionDate}
                      onChange={(e) => setProjectFormData({...projectFormData, completionDate: e.target.value})}
                      className="px-4 py-2 bg-surface border border-slate-700 rounded-lg text-white focus:border-brand"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={actionLoading === 'project'}
                    className="w-full px-4 py-2 bg-brand hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
                  >
                    {actionLoading === 'project' ? 'Creating...' : 'Create Project'}
                  </button>
                </form>
              </div>
            )}

            {/* Projects List */}
            {loadingData ? (
              <div className="text-center py-8 text-slate-400">Loading projects...</div>
            ) : (
              <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface border-b border-slate-800">
                        {['Title', 'Client', 'Date', 'Actions'].map(h => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(p => (
                        <tr key={p.id} className="border-b border-slate-800/50 hover:bg-surface transition-colors">
                          <td className="px-5 py-3.5 text-sm font-semibold text-slate-200">{p.title}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-400">{p.clientName}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-500">{p.completionDate || 'N/A'}</td>
                          <td className="px-5 py-3.5">
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              disabled={actionLoading === p.id}
                              className="p-1.5 rounded-md bg-surface border border-slate-700 hover:bg-red-500/20 hover:border-red-500/50 transition-colors disabled:opacity-50"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </FadeInSection>
      )}

      {/* Reviews Management Tab */}
      {activeTab === 'reviews' && (
        <FadeInSection>
          <section aria-label="Review management" className="mb-8">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Pending Reviews</h2>

            {loadingData ? (
              <div className="text-center py-8 text-slate-400">Loading reviews...</div>
            ) : (
              <div className="bg-surface2 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-surface border-b border-slate-800">
                        {['User', 'Rating', 'Message', 'Status', 'Actions'].map(h => (
                          <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map(r => (
                        <tr key={r.id} className="border-b border-slate-800/50 hover:bg-surface transition-colors">
                          <td className="px-5 py-3.5 text-sm font-semibold text-slate-200">{r.userName}</td>
                          <td className="px-5 py-3.5 text-sm text-yellow-400">{'★'.repeat(r.rating)}</td>
                          <td className="px-5 py-3.5 text-sm text-slate-400 max-w-xs truncate">{r.message}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                              r.isApproved
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {r.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex gap-2">
                              {!r.isApproved && (
                                <button
                                  onClick={() => handleApproveReview(r.id)}
                                  disabled={actionLoading === r.id}
                                  className="p-1.5 rounded-md bg-surface border border-slate-700 hover:bg-green-500/20 hover:border-green-500/50 transition-colors disabled:opacity-50"
                                  title="Approve review"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteReview(r.id)}
                                disabled={actionLoading === r.id}
                                className="p-1.5 rounded-md bg-surface border border-slate-700 hover:bg-red-500/20 hover:border-red-500/50 transition-colors disabled:opacity-50"
                                title="Delete review"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Review Stats */}
                {reviews.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-3.5 border-t border-slate-800 text-xs text-slate-500">
                    <div>
                      <div className="text-slate-400 font-semibold">Total Reviews</div>
                      <div className="text-xl font-black text-white">{reviews.length}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-semibold">Approved</div>
                      <div className="text-xl font-black text-green-400">{reviews.filter(r => r.isApproved).length}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-semibold">Pending</div>
                      <div className="text-xl font-black text-yellow-400">{reviews.filter(r => !r.isApproved).length}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </FadeInSection>
      )}

    </div>
  );
};

export default AdminPage;
