import React, { useState, useEffect } from 'react';
import { Moon, Sun, BarChart3, TrendingUp, Users, Calendar, Settings, LogOut, Home, Lightbulb, Share2, Eye, EyeOff, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// Types
type Page = 'login' | 'dashboard' | 'content-recommendations' | 'integrations' | 'settings';

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

interface Activity {
  id: string;
  message: string;
  time: string;
}

// Main App Component
const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dummy data
  const metrics: Metric[] = [
    { title: 'Total Engagements', value: '15,432', change: '+12.5%', trend: 'up', color: 'accent-blue' },
    { title: 'New Followers', value: '+1,287', change: '+8.2%', trend: 'up', color: 'accent-green' },
    { title: 'Average Reach', value: '7,890', change: '+15.3%', trend: 'up', color: 'accent-purple' },
    { title: 'Conversion Rate', value: '3.4%', change: '+2.1%', trend: 'up', color: 'accent-orange' }
  ];

  const activities: Activity[] = [
    { id: '1', message: 'New comment on your latest post', time: '2 minutes ago' },
    { id: '2', message: 'Weekly report generated successfully', time: '1 hour ago' },
    { id: '3', message: 'Instagram integration updated', time: '3 hours ago' },
    { id: '4', message: 'New follower milestone reached', time: '1 day ago' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setUsername('');
    setPassword('');
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'content-recommendations', label: 'Content Ideas', icon: Lightbulb },
    { id: 'integrations', label: 'Integrations', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-elevated border-card-border">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AnnexAI Insights
          </CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-dashboard-bg border-card-border focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dashboard-bg border-card-border focus:ring-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300">
              Sign In
            </Button>
            <div className="text-center">
              <button type="button" className="text-sm text-primary hover:text-primary-variant transition-colors">
                Forgot Password?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // Header Component
  const Header = () => (
    <header className="h-16 bg-card border-b border-card-border flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AnnexAI Insights
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Sun className="w-4 h-4 text-muted-foreground" />
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className="data-[state=checked]:bg-primary"
          />
          <Moon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground hidden sm:block">
            {username}
          </span>
        </div>
      </div>
    </header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border z-50
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:z-auto
      `}>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                  ${isActive 
                    ? 'bg-sidebar-accent text-sidebar-primary-foreground shadow-sm' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-sidebar-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );

  // Dashboard Page Component
  const DashboardPage = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-primary">
        <h2 className="text-2xl font-bold mb-2">Welcome Back, {username}!</h2>
        <p className="text-primary-foreground/90">Here's your daily digest of performance insights.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card border-card-border shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className={`text-sm font-medium ${metric.trend === 'up' ? 'text-accent-green' : 'text-destructive'}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}>
                  <TrendingUp className={`w-6 h-6 text-${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <Card className="bg-gradient-card border-card-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-accent-blue" />
              <span>Engagement Over Time</span>
            </CardTitle>
            <CardDescription>Daily engagement metrics for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end space-x-2 p-4">
              {[65, 78, 52, 89, 94, 76, 82].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div 
                    className="bg-gradient-to-t from-accent-blue to-accent-purple rounded-t-sm transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%`, minHeight: '8px' }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Performance Chart */}
        <Card className="bg-gradient-card border-card-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-accent-green" />
              <span>Content Performance</span>
            </CardTitle>
            <CardDescription>Performance by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Image Posts', value: 85, color: 'bg-accent-blue' },
                { label: 'Video Posts', value: 92, color: 'bg-accent-green' },
                { label: 'Text Updates', value: 67, color: 'bg-accent-orange' },
                { label: 'Stories', value: 74, color: 'bg-accent-purple' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card border-card-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-accent-purple" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-dashboard-accent/50 transition-colors">
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Content Recommendations Page
  const ContentRecommendationsPage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-primary">
        <h2 className="text-2xl font-bold mb-2">Content Recommendations</h2>
        <p className="text-primary-foreground/90">AI-powered suggestions to boost your engagement.</p>
      </div>

      {/* Suggested Topics */}
      <Card className="bg-gradient-card border-card-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-accent-orange" />
            <span>Trending Topics</span>
          </CardTitle>
          <CardDescription>Popular themes in your industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'AI in Marketing', engagement: '94%', trend: 'High' },
              { title: 'Sustainable Business', engagement: '87%', trend: 'Rising' },
              { title: 'User Engagement', engagement: '91%', trend: 'Stable' },
              { title: 'Digital Transformation', engagement: '89%', trend: 'High' },
              { title: 'Customer Experience', engagement: '85%', trend: 'Rising' },
              { title: 'Data Analytics', engagement: '92%', trend: 'High' }
            ].map((topic, index) => (
              <div key={index} className="p-4 rounded-lg border border-card-border hover:shadow-card transition-all duration-300 bg-dashboard-card">
                <h3 className="font-semibold text-foreground mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">Engagement: {topic.engagement}</p>
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                  topic.trend === 'High' ? 'bg-accent-green/10 text-accent-green' :
                  topic.trend === 'Rising' ? 'bg-accent-orange/10 text-accent-orange' :
                  'bg-accent-blue/10 text-accent-blue'
                }`}>
                  {topic.trend}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimal Posting Times */}
      <Card className="bg-gradient-card border-card-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-accent-purple" />
            <span>Optimal Posting Times</span>
          </CardTitle>
          <CardDescription>Best times to post based on your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { day: 'Monday', times: ['9:00 AM', '1:00 PM', '7:00 PM'], engagement: '87%' },
              { day: 'Tuesday', times: ['10:00 AM', '2:00 PM', '8:00 PM'], engagement: '91%' },
              { day: 'Wednesday', times: ['9:30 AM', '1:30 PM', '7:30 PM'], engagement: '89%' },
              { day: 'Thursday', times: ['10:30 AM', '2:30 PM', '8:30 PM'], engagement: '94%' },
              { day: 'Friday', times: ['11:00 AM', '3:00 PM', '6:00 PM'], engagement: '86%' }
            ].map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-card-border bg-dashboard-card">
                <div>
                  <h3 className="font-semibold text-foreground">{schedule.day}</h3>
                  <p className="text-sm text-muted-foreground">Average engagement: {schedule.engagement}</p>
                </div>
                <div className="flex space-x-2">
                  {schedule.times.map((time, timeIndex) => (
                    <span key={timeIndex} className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-md text-sm font-medium">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Integrations Page
  const IntegrationsPage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-primary">
        <h2 className="text-2xl font-bold mb-2">Integrations</h2>
        <p className="text-primary-foreground/90">Connect your social media accounts and tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Instagram', status: 'connected', color: 'accent-pink', users: '1.2M followers' },
          { name: 'Twitter/X', status: 'connected', color: 'accent-blue', users: '894K followers' },
          { name: 'Facebook', status: 'disconnected', color: 'accent-blue', users: 'Not connected' },
          { name: 'LinkedIn', status: 'connected', color: 'accent-blue', users: '45K connections' },
          { name: 'YouTube', status: 'disconnected', color: 'accent-orange', users: 'Not connected' },
          { name: 'TikTok', status: 'disconnected', color: 'accent-purple', users: 'Not connected' }
        ].map((platform, index) => (
          <Card key={index} className="bg-gradient-card border-card-border shadow-card hover:shadow-elevated transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${platform.color}/10 flex items-center justify-center`}>
                  <Share2 className={`w-6 h-6 text-${platform.color}`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  platform.status === 'connected' 
                    ? 'bg-accent-green/10 text-accent-green' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {platform.status === 'connected' ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{platform.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{platform.users}</p>
              <Button 
                variant={platform.status === 'connected' ? 'secondary' : 'default'}
                className="w-full"
                disabled={platform.status === 'connected'}
              >
                {platform.status === 'connected' ? 'Connected' : 'Connect'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Settings Page
  const SettingsPage = () => (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-primary">
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-primary-foreground/90">Manage your account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="bg-gradient-card border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Display Name</label>
              <Input value={username} className="mt-1 bg-dashboard-bg border-card-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input value="user@example.com" type="email" className="mt-1 bg-dashboard-bg border-card-border" />
            </div>
            <Button className="bg-gradient-primary">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-gradient-card border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Email Preferences
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main Layout
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gradient-dashboard">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );

  // Render current page
  if (currentPage === 'login') {
    return <LoginPage />;
  }

  return (
    <Layout>
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'content-recommendations' && <ContentRecommendationsPage />}
      {currentPage === 'integrations' && <IntegrationsPage />}
      {currentPage === 'settings' && <SettingsPage />}
    </Layout>
  );
};

export default Index;