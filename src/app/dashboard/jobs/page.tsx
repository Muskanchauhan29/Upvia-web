import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Building, Clock, Star } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Job Recommendations</h1>
        <p className="mt-1 text-gray-600">Personalized job matches based on your profile and preferences.</p>
      </div>

      {/* Filter Section */}
      <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Button className="bg-chart-1 hover:bg-chart-1/90 text-white border-0">
              All Jobs
            </Button>
            <Button variant="outline" className="border-chart-1/20 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1/30">
              Remote
            </Button>
            <Button variant="outline" className="border-chart-1/20 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1/30">
              Full-time
            </Button>
            <Button variant="outline" className="border-chart-1/20 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1/30">
              Senior Level
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Cards */}
      <div className="grid gap-4">
        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Senior Frontend Developer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-chart-1" />
                    TechCorp
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-chart-1" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-chart-1" />
                    Full-time
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-chart-1 fill-chart-1" />
                <span className="text-sm font-medium text-chart-1">95% Match</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">We're looking for an experienced frontend developer to join our growing team and help build amazing user experiences...</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">Node.js</span>
              </div>
              <Button className="bg-chart-1 hover:bg-chart-1/90 text-white border-0">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Full Stack Engineer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-chart-1" />
                    StartupXYZ
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-chart-1" />
                    Remote
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-chart-1" />
                    Full-time
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-chart-1 fill-chart-1" />
                <span className="text-sm font-medium text-chart-1">88% Match</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Join our innovative startup as a full stack engineer. You'll work on cutting-edge projects and help shape our product...</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">AWS</span>
              </div>
              <Button className="bg-chart-1 hover:bg-chart-1/90 text-white border-0">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">UI/UX Developer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-chart-1" />
                    DesignHub
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-chart-1" />
                    New York, NY
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-chart-1" />
                    Full-time
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-chart-1 fill-chart-1" />
                <span className="text-sm font-medium text-chart-1">82% Match</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">We're seeking a talented UI/UX developer who can create beautiful and functional user interfaces...</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">Figma</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">Vue.js</span>
                <span className="px-3 py-1 bg-chart-1/10 text-chart-1 rounded-full text-sm">CSS</span>
              </div>
              <Button className="bg-chart-1 hover:bg-chart-1/90 text-white border-0">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
