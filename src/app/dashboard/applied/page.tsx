import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Building, MapPin, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AppliedPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Applied Jobs</h1>
        <p className="mt-1 text-gray-600">Track the status of your job applications in one place.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-purple-100" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Total Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-100" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-100" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-purple-100" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Senior Frontend Developer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-purple-500" />
                    TechCorp
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                    Applied 2 days ago
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Interview Scheduled</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Interview scheduled for tomorrow at 2:00 PM PST</p>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">Full Stack Engineer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-purple-500" />
                    StartupXYZ
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                    Remote
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                    Applied 5 days ago
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-700">In Review</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Application is currently under review by the hiring team</p>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">UI/UX Developer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-purple-500" />
                    DesignHub
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                    New York, NY
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                    Applied 1 week ago
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-700">Not Selected</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Thank you for your interest, but we've moved forward with other candidates</p>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-lg">React Developer</CardTitle>
                <CardDescription className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-purple-500" />
                    InnovateCo
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                    Austin, TX
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                    Applied 2 weeks ago
                  </span>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Offer Received</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Congratulations! You've received a job offer</p>
              <Button className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0">
                View Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
