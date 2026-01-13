import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, TrendingUp, Users, Calendar, Award } from "lucide-react";
import ResumeHistory from "@/components/ResumeHistory";
import ScoreChart from "@/components/ScoreChart";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const name = user?.firstName ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}` : user?.username || user?.emailAddresses?.[0]?.emailAddress || "there";

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {name}</h1>
        <p className="mt-1 text-gray-600">Here's your career dashboard overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Strength</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">85%</p>
              </div>
              <div className="h-12 w-12 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Award className="h-6 w-6 text-white/90" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Jobs Applied</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div className="h-12 w-12 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Briefcase className="h-6 w-6 text-white/90" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="h-12 w-12 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Calendar className="h-6 w-6 text-white/90" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Matches</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">28</p>
              </div>
              <div className="h-12 w-12 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-white/90" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Resume Analysis</CardTitle>
                  <CardDescription>Upload or update your resume</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button asChild className="w-full bg-chart-1 hover:bg-chart-1/90 text-white border-0">
                <Link href="/dashboard/resume">Analyze Resume</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Job Matches</CardTitle>
                  <CardDescription>View recommended positions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" asChild className="w-full border-chart-1/20 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1/30">
                <Link href="/dashboard/jobs">View Matches</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-linear-to-r from-chart-1 to-chart-1/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Applications</CardTitle>
                  <CardDescription>Track your job applications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button variant="outline" asChild className="w-full border-chart-1/20 text-chart-1 hover:bg-chart-1/10 hover:border-chart-1/30">
                <Link href="/dashboard/applied">View Applications</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resume Analysis History */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeHistory />
        <ScoreChart />
      </div>
    </div>
  );
}
