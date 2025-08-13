import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPageProps {
  onPageChange: (page: string) => void;
}

export function BlogPage({ onPageChange }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = ['all', 'Impact Stories', 'Mentorship', 'Diaspora Voices', 'Youth Success', 'Platform Updates'];

  const featuredPost = {
    id: 1,
    title: 'How Sarah Chen Transformed 50 Lives Through Code',
    excerpt: 'A deep dive into the Lagos Tech Bootcamp that changed everything for young developers in Nigeria.',
    author: 'Editorial Team',
    authorAvatar: 'ET',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Impact Stories',
    likes: 124,
    comments: 32,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: 'The Power of One-on-One Mentorship: A Mentor\'s Perspective',
      excerpt: 'Dr. James Osei shares insights from mentoring young agricultural entrepreneurs across Ghana.',
      author: 'Dr. James Osei',
      authorAvatar: 'JO',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Mentorship',
      likes: 89,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'From Mentee to Mentor: Fatima\'s Journey',
      excerpt: 'How a young woman from Lagos became a tech leader and is now mentoring the next generation.',
      author: 'Fatima Mohammed',
      authorAvatar: 'FM',
      date: '2024-01-10',
      readTime: '5 min read',
      category: 'Youth Success',
      likes: 156,
      comments: 42,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: 'Building Bridges: The Diaspora Connection',
      excerpt: 'Exploring how African diaspora professionals are creating lasting impact back home.',
      author: 'Kwame Asante',
      authorAvatar: 'KA',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'Diaspora Voices',
      likes: 201,
      comments: 67,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    },
    {
      id: 5,
      title: 'New Feature: AI-Powered Mentor Matching',
      excerpt: 'Introducing smart matching technology that connects mentors and mentees based on compatibility.',
      author: 'Product Team',
      authorAvatar: 'PT',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'Platform Updates',
      likes: 92,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: 6,
      title: 'Scaling Agriculture: Modern Farming Meets Traditional Knowledge',
      excerpt: 'How diaspora agricultural experts are helping local farmers embrace sustainable practices.',
      author: 'Dr. Amina Hassan',
      authorAvatar: 'AH',
      date: '2024-01-03',
      readTime: '6 min read',
      category: 'Impact Stories',
      likes: 134,
      comments: 28,
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=400&h=250&fit=crop'
    },
    {
      id: 7,
      title: 'The Art of Remote Mentorship',
      excerpt: 'Best practices for effective mentorship across time zones and cultural boundaries.',
      author: 'Lisa Wanjiku',
      authorAvatar: 'LW',
      date: '2024-01-01',
      readTime: '5 min read',
      category: 'Mentorship',
      likes: 78,
      comments: 22,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=250&fit=crop'
    },
    {
      id: 8,
      title: 'Youth Entrepreneurship: Starting Strong',
      excerpt: 'Success stories from young entrepreneurs who transformed their ideas into thriving businesses.',
      author: 'Michael Okafor',
      authorAvatar: 'MO',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'Youth Success',
      likes: 167,
      comments: 45,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop'
    },
    {
      id: 9,
      title: 'Diaspora Insights: Tech Trends Shaping Africa',
      excerpt: 'Technology leaders share their perspectives on emerging trends and opportunities.',
      author: 'Tech Leaders Panel',
      authorAvatar: 'TL',
      date: '2023-12-25',
      readTime: '9 min read',
      category: 'Diaspora Voices',
      likes: 245,
      comments: 58,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Stories of
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Impact</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              Discover inspiring stories, insights, and updates from our community of mentors, mentees, and partners creating change across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Featured Story</span>
            </div>
          </div>
          
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-square">
                <ImageWithFallback
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                  <h2 className="text-3xl font-bold">{featuredPost.title}</h2>
                  <p className="text-lg text-muted-foreground">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{featuredPost.authorAvatar}</AvatarFallback>
                      </Avatar>
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{featuredPost.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{featuredPost.comments}</span>
                    </div>
                  </div>
                  
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Full Story
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{post.authorAvatar}</AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No stories found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all categories.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Get the latest impact stories, mentorship insights, and platform updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
