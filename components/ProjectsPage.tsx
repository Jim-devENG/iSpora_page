import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Search,
  Filter,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectsPageProps {
  onPageChange: (page: string) => void;
}

export function ProjectsPage({ onPageChange }: ProjectsPageProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedRegion, setSelectedRegion] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const projects = [
    {
      id: 1,
      title: 'Tech Skills Bootcamp Lagos',
      summary: 'Intensive 12-week coding bootcamp for 50 youth in Lagos, focusing on web development and entrepreneurship.',
      founder: 'Sarah Chen',
      founderAvatar: 'SC',
      founderTitle: 'Senior Software Engineer at Google',
      country: 'Nigeria',
      region: 'West Africa',
      city: 'Lagos',
      category: 'Technology',
      status: 'Active',
      participants: 45,
      maxParticipants: 50,
      startDate: '2024-02-01',
      duration: '12 weeks',
      tags: ['Coding', 'Web Development', 'Entrepreneurship', 'Career Development'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      progress: 75,
      mentorsNeeded: 2,
      youthSpots: 5
    },
    {
      id: 2,
      title: 'Sustainable Agriculture Initiative',
      summary: 'Modern farming techniques and sustainable practices for rural communities in Ghana.',
      founder: 'James Osei',
      founderAvatar: 'JO',
      founderTitle: 'Agricultural Scientist',
      country: 'Ghana',
      region: 'West Africa',
      city: 'Kumasi',
      category: 'Agriculture',
      status: 'Recruiting',
      participants: 15,
      maxParticipants: 30,
      startDate: '2024-03-15',
      duration: '16 weeks',
      tags: ['Sustainable Farming', 'Rural Development', 'Food Security', 'Climate Action'],
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=400&h=200&fit=crop',
      progress: 25,
      mentorsNeeded: 3,
      youthSpots: 15
    },
    {
      id: 3,
      title: 'Digital Marketing Academy Nairobi',
      summary: 'Comprehensive digital marketing training program for youth entrepreneurs in Kenya.',
      founder: 'Lisa Wanjiku',
      founderAvatar: 'LW',
      founderTitle: 'Marketing Director at Shopify',
      country: 'Kenya',
      region: 'East Africa',
      city: 'Nairobi',
      category: 'Business',
      status: 'Completed',
      participants: 75,
      maxParticipants: 75,
      startDate: '2023-09-01',
      duration: '8 weeks',
      tags: ['Digital Marketing', 'Social Media', 'E-commerce', 'Entrepreneurship'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      progress: 100,
      mentorsNeeded: 0,
      youthSpots: 0
    },
    {
      id: 4,
      title: 'Health Education Program',
      summary: 'Community health education and preventive care training in rural South Africa.',
      founder: 'Dr. Michael Nkomo',
      founderAvatar: 'MN',
      founderTitle: 'Public Health Specialist',
      country: 'South Africa',
      region: 'Southern Africa',
      city: 'Johannesburg',
      category: 'Healthcare',
      status: 'Active',
      participants: 30,
      maxParticipants: 40,
      startDate: '2024-01-10',
      duration: '20 weeks',
      tags: ['Public Health', 'Community Care', 'Prevention', 'Education'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
      progress: 60,
      mentorsNeeded: 1,
      youthSpots: 10
    },
    {
      id: 5,
      title: 'Renewable Energy Workshop',
      summary: 'Solar panel installation and maintenance training for technical students in Ethiopia.',
      founder: 'Ahmed Hassan',
      founderAvatar: 'AH',
      founderTitle: 'Renewable Energy Engineer',
      country: 'Ethiopia',
      region: 'East Africa',
      city: 'Addis Ababa',
      category: 'Energy',
      status: 'Planning',
      participants: 0,
      maxParticipants: 25,
      startDate: '2024-04-01',
      duration: '6 weeks',
      tags: ['Solar Energy', 'Technical Training', 'Sustainability', 'Green Jobs'],
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop',
      progress: 10,
      mentorsNeeded: 4,
      youthSpots: 25
    },
    {
      id: 6,
      title: 'Financial Literacy Program',
      summary: 'Banking, investment, and entrepreneurship education for young adults in Uganda.',
      founder: 'Grace Nakamura',
      founderAvatar: 'GN',
      founderTitle: 'Investment Banker',
      country: 'Uganda',
      region: 'East Africa',
      city: 'Kampala',
      category: 'Finance',
      status: 'Recruiting',
      participants: 20,
      maxParticipants: 50,
      startDate: '2024-03-01',
      duration: '10 weeks',
      tags: ['Financial Literacy', 'Investment', 'Banking', 'Money Management'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      progress: 40,
      mentorsNeeded: 2,
      youthSpots: 30
    }
  ];

  const categories = ['all', 'Technology', 'Agriculture', 'Business', 'Healthcare', 'Energy', 'Finance'];
  const regions = ['all', 'West Africa', 'East Africa', 'Southern Africa', 'North Africa'];
  const statuses = ['all', 'Planning', 'Recruiting', 'Active', 'Completed'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || project.region === selectedRegion;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesRegion && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Planning':
        return <Clock className="h-4 w-4" />;
      case 'Recruiting':
        return <Users className="h-4 w-4" />;
      case 'Active':
        return <AlertCircle className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Recruiting':
        return 'bg-primary/10 text-primary';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Active Impact Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
              Discover ongoing projects across Africa where diaspora leaders are creating meaningful change with local youth.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, skills, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">
                      <MapPin className="h-3 w-3 mr-1" />
                      {project.city}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {project.summary}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{project.founderAvatar}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{project.founder}</p>
                      <p className="text-xs text-muted-foreground truncate">{project.founderTitle}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {project.participants}/{project.maxParticipants}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.duration}
                      </span>
                    </div>
                    
                    {project.status !== 'Completed' && (
                      <div className="space-y-2">
                        {project.youthSpots > 0 && (
                          <div className="text-sm">
                            <span className="text-green-600 font-medium">{project.youthSpots} youth spots</span> available
                          </div>
                        )}
                        {project.mentorsNeeded > 0 && (
                          <div className="text-sm">
                            <span className="text-primary font-medium">{project.mentorsNeeded} mentors</span> needed
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {project.status === 'Recruiting' || project.status === 'Active' ? (
                        <>
                          {project.youthSpots > 0 && (
                            <Button size="sm" className="flex-1" onClick={() => onPageChange('youth')}>
                              Apply as Youth
                            </Button>
                          )}
                          {project.mentorsNeeded > 0 && (
                            <Button size="sm" variant="outline" className="flex-1" onClick={() => onPageChange('mentorship')}>
                              Mentor
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="px-3">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md">
                <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms to find more projects.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Launch Your Own Project?
          </h2>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Join our community of diaspora leaders who are creating meaningful change across Africa.
          </p>
          <div className="mt-10">
            <Button size="lg" variant="secondary" onClick={() => onPageChange('diasporans')}>
              Start Your Project Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
