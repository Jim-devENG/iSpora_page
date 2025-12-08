import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Section } from './layout/Section';
import { PageHeader } from './layout/PageHeader';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { FloatingShapes, AnimatedBlob } from './animations/FloatingElements';
import { AnimatedDots } from './animations/AnimatedBackground';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Search,
  Tag,
  BookOpen,
  TrendingUp,
  Heart,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { cn } from './ui/utils';

interface BlogPageProps {
  onPageChange: (page: string) => void;
}

export function BlogPage({ onPageChange }: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Updates', 'Success Stories', 'Diaspora Voices', 'Youth Impact', 'Partnerships'];

  // Fetch blog posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?published=true');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          // Find featured post
          const featured = data.find((p: any) => p.featured);
          setFeaturedPost(featured || data[0] || null);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const displayPosts = posts;
  const displayFeatured = featuredPost;

  const filteredPosts = displayPosts.filter((post: any) => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <Section 
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32"
        style={{
          background: 'linear-gradient(135deg, hsl(220 100% 96%) 0%, hsl(220 100% 92%) 50%, hsl(220 100% 95%) 100%)'
        }}
      >
        <AnimatedBlob className="top-0 right-0 bg-primary/15" delay={0} size="w-96 h-96" />
        <AnimatedDots />
        
        <div className="relative z-10">
          <PageHeader
            title="Blog & News"
            description="Stay updated with the latest stories, insights, and updates from the iSpora community"
          />
        </div>
      </Section>

      {/* Featured Post */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 100% 96%) 50%, hsl(220 100% 98%) 100%)'
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: safeTransition({ duration: 0.6 })
            }
          }}
        >
          <Card className="overflow-hidden border-2 border-primary/20 hover:shadow-xl transition-all duration-300">
              {displayFeatured && (
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[300px]">
                    <img 
                      src={displayFeatured.image_url || displayFeatured.image || '/conference.jpg'} 
                      alt={displayFeatured.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="mb-4 w-fit bg-primary/10 text-primary border-primary/20">
                      Featured
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl mb-3 font-bold">
                      {displayFeatured.title}
                    </CardTitle>
                    <CardDescription className="text-base mb-4 leading-relaxed">
                      {displayFeatured.excerpt}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{displayFeatured.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(displayFeatured.published_at || displayFeatured.date || displayFeatured.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{displayFeatured.read_time || displayFeatured.readTime || '5 min read'}</span>
                      </div>
                    </div>
                    <Button className="w-full sm:w-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
          </Card>
        </motion.div>
      </Section>

      {/* Search and Filter */}
      <Section 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(220 100% 98%) 0%, hsl(0 0% 100%) 50%, hsl(220 100% 96%) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category || (category === 'All' && !selectedCategory) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: safeTransition({ delay: index * 0.1, duration: 0.5 })
                  }
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 overflow-hidden group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image_url || post.image || '/conference.jpg'} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold line-clamp-2 mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.published_at || post.date || post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments || 0}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Read
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
