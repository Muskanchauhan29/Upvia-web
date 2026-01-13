'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Sparkles, Target, TrendingUp, AlertCircle, CheckCircle, Download } from "lucide-react";

interface AnalysisData {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  suggestions: string[];
  sections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
  };
}

interface HistoryItem {
  id: string;
  fileName: string;
  jobRole: string;
  atsScore: number;
  analysis: AnalysisData;
  timestamp: string;
}

export default function ResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  // Save analysis to MongoDB with Mongoose
  const saveToHistory = async (fileName: string, jobRole: string, analysis: AnalysisData) => {
    try {
      console.log('💾 Saving to MongoDB with Mongoose:', { fileName, jobRole, score: analysis.atsScore });
      
      // Get file content
      let fileContent = '';
      if (selectedFile) {
        const bytes = await selectedFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fileContent = buffer.toString('utf-8');
      } else {
        fileContent = resumeText;
      }
      
      const resumeData = {
        userId: 'current-user', // Will be replaced with actual Clerk user ID
        fileName,
        jobRole: jobRole || 'Not specified',
        atsScore: analysis.atsScore,
        analysis: {
          strengths: analysis.strengths || [],
          weaknesses: analysis.weaknesses || [],
          improvements: analysis.improvements || [],
          suggestions: analysis.suggestions || []
        },
        fileContent: fileContent || ''
      };
      
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      console.log('MongoDB Mongoose response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Resume saved to MongoDB with Mongoose:', result);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to save resume. Status:', response.status);
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTestAPI = async () => {
    console.log('Frontend: Testing API connection...');
    try {
      const response = await fetch('/api/test-resume', {
        method: 'GET',
      });
      
      console.log('Frontend: Test API response status:', response.status);
      const result = await response.json();
      console.log('Frontend: Test API result:', result);
      alert('API Test: ' + JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Frontend: API test failed:', error);
      alert('API Test Failed: ' + error);
    }
  };

  const handleAnalyze = async () => {
    console.log('Frontend: Starting analysis...');
    console.log('Frontend: File:', selectedFile?.name);
    console.log('Frontend: Job role:', jobRole);
    console.log('Frontend: Resume text length:', resumeText.length);
    
    if (!selectedFile && !resumeText.trim()) {
      alert('Please upload a file or enter resume text');
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      
      if (selectedFile) {
        formData.append('resume', selectedFile);
        console.log('Frontend: Added file to FormData');
      } else {
        // Create a text file from the textarea content
        const blob = new Blob([resumeText], { type: 'text/plain' });
        const file = new File([blob], 'resume.txt', { type: 'text/plain' });
        formData.append('resume', file);
        console.log('Frontend: Created text file from textarea');
      }
      
      if (jobRole.trim()) {
        formData.append('jobRole', jobRole.trim());
        console.log('Frontend: Added job role to FormData');
      }

      console.log('Frontend: Sending request to API...');
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      console.log('Frontend: Response status:', response.status);
      console.log('Frontend: Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Frontend: Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Frontend: Parsed response:', result);

      if (result.success) {
        console.log('Frontend: Analysis successful, score:', result.analysis.atsScore);
        setAnalysis(result.analysis);
        
        // Save to history
        const fileName = selectedFile?.name || 'pasted-text.txt';
        saveToHistory(fileName, jobRole, result.analysis);
      } else {
        console.error('Frontend: Analysis failed:', result.error);
        alert('Analysis failed: ' + result.error);
      }
    } catch (error) {
      console.error('Frontend: Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">AI Resume Analysis</h1>
        <p className="mt-1 text-gray-600">Upload your resume to get AI-powered insights and ATS optimization recommendations.</p>
      </div>

      {!analysis ? (
        <>
          {/* Upload Section */}
          <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-linear-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Upload Resume</CardTitle>
                  <CardDescription>Upload a PDF/TXT file or paste your resume text</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-purple-50/30 backdrop-blur-sm">
                  <FileText className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <Input 
                    type="file" 
                    accept=".pdf,.txt" 
                    onChange={handleFileSelect}
                    placeholder="Upload PDF/TXT resume" 
                    className="max-w-xs mx-auto border-purple-200 focus:border-purple-500" 
                  />
                  <p className="text-sm text-gray-600 mt-2">or drag and drop your file here</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-linear-to-br from-purple-50 via-white to-pink-50 text-gray-600">OR</span>
                  </div>
                </div>
                <Textarea 
                  placeholder="Or paste your resume text here" 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={8} 
                  className="border-purple-200 focus:border-purple-500 bg-white/50 backdrop-blur-sm resize-none"
                />
              </div>

              {/* Job Role Input */}
              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Job Role (Optional)
                </label>
                <Input
                  id="jobRole"
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g., Software Engineer, Product Manager"
                  className="border-purple-200 focus:border-purple-500"
                  disabled={isAnalyzing}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
                <Button 
                  onClick={handleTestAPI}
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                >
                  Test API
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <div className="h-8 w-8 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Sparkles className="h-4 w-4 text-purple-100" />
                  </div>
                  AI Analysis
                </CardTitle>
                <CardDescription>Get detailed insights about your skills and experience</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <div className="h-8 w-8 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Target className="h-4 w-4 text-purple-100" />
                  </div>
                  ATS Score
                </CardTitle>
                <CardDescription>See how your resume ranks against ATS systems</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <div className="h-8 w-8 bg-linear-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4 text-purple-100" />
                  </div>
                  Smart Suggestions
                </CardTitle>
                <CardDescription>Receive personalized improvement recommendations</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </>
      ) : (
        /* Analysis Results */
        <div className="space-y-6">
          <div className={`rounded-lg p-6 ${getScoreBgColor(analysis.atsScore)}`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Target className={`h-8 w-8 ${getScoreColor(analysis.atsScore)} mr-2`} />
                <h3 className="text-xl font-semibold">ATS Score</h3>
              </div>
              <div className="text-5xl font-bold">
                <span className={getScoreColor(analysis.atsScore)}>
                  {analysis.atsScore}
                </span>
                <span className="text-3xl text-gray-500">/100</span>
              </div>
            </div>
          </div>

          {/* Sections Overview */}
          <Card className="bg-white rounded-lg shadow p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
                Resume Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(analysis.sections).map(([section, present]) => (
                  <div key={section} className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      present ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {present ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium capitalize">{section}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <Card className="bg-white rounded-lg shadow p-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-4 flex items-center text-green-600">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Weaknesses */}
          {analysis.weaknesses.length > 0 && (
            <Card className="bg-white rounded-lg shadow p-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-4 flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Improvements */}
          {analysis.improvements.length > 0 && (
            <Card className="bg-white rounded-lg shadow p-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-4 flex items-center text-blue-600">
                  <Target className="h-5 w-5 mr-2" />
                  Recommended Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center mr-2 mt-0.5 shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* AI Suggestions */}
          {analysis.suggestions.length > 0 && (
            <Card className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-4 flex items-center text-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  AI-Powered Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white bg-opacity-70 rounded-lg p-4">
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analyze Another Button */}
          <div className="text-center">
            <Button
              onClick={() => {
                setAnalysis(null);
                setSelectedFile(null);
                setResumeText('');
                setJobRole('');
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Analyze Another Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
