import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { 
  BookOpen, 
  Award, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  Star,
  Upload,
  Download,
  Play,
  FileText,
  Video,
  Headphones
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

interface LearningPlatformProps {
  currentUser: any;
  courses: any[];
  certificates: any[];
  onEnrollInCourse: (courseId: string) => void;
  onSubmitAssignment?: (assignmentId: string, answers: any[]) => void;
  onGradeAssignment?: (submissionId: string, score: number, feedback: string) => void;
  onIssueCertificate?: (userId: string, courseId: string, score: number) => void;
}

export function LearningPlatform({
  currentUser,
  courses,
  certificates,
  onEnrollInCourse,
  onSubmitAssignment,
  onGradeAssignment,
  onIssueCertificate
}: LearningPlatformProps) {
  const { language } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [assignmentAnswers, setAssignmentAnswers] = useState<any[]>([]);
  const [showCertificates, setShowCertificates] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<any>(null);
  const [gradeScore, setGradeScore] = useState(0);
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Calculate user progress for a course
  const getCourseProgress = (course: any) => {
    if (!currentUser?.id || !course.enrolled_users?.includes(currentUser.id)) return 0;
    
    const totalLessons = course.lessons?.length || 0;
    const completedLessons = course.lessons?.filter((lesson: any) => lesson.isCompleted)?.length || 0;
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  // Check if user is enrolled in course
  const isEnrolled = (course: any) => {
    return course.enrolled_users?.includes(currentUser?.id);
  };

  // Handle assignment submission
  const handleSubmitAssignment = () => {
    if (!selectedAssignment || !onSubmitAssignment) return;
    
    onSubmitAssignment(selectedAssignment.id, assignmentAnswers);
    setAssignmentAnswers([]);
    setSelectedAssignment(null);
    toast.success(language === 'am' ? 'ቲስክ ተላከ' : 'Assignment submitted');
  };

  // Handle grading
  const handleGradeSubmission = () => {
    if (!gradingSubmission || !onGradeAssignment) return;
    
    onGradeAssignment(gradingSubmission.id, gradeScore, gradeFeedback);
    setGradingSubmission(null);
    setGradeScore(0);
    setGradeFeedback('');
    toast.success(language === 'am' ? 'ደረጃ ተሰጥቷል' : 'Assignment graded');
  };

  // User's enrolled courses
  const enrolledCourses = courses.filter(course => isEnrolled(course));
  
  // User's certificates
  const userCertificates = certificates.filter(cert => cert.userId === currentUser?.id);

  if (showCertificates) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {language === 'am' ? 'የእውቅና ሰርተፊኬቶች' : 'Certificates'}
          </h2>
          <Button onClick={() => setShowCertificates(false)}>
            {language === 'am' ? 'ወደ ትምህርቶች' : 'Back to Courses'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCertificates.map((certificate) => (
            <Card key={certificate.id} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <Badge variant="outline" className="text-xs">
                    {certificate.verified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{certificate.courseName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium">{certificate.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completed:</span>
                    <span>{new Date(certificate.completionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Issued by:</span>
                    <span>{certificate.issuedBy}</span>
                  </div>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      {language === 'am' ? 'አውርድ' : 'Download Certificate'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {userCertificates.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {language === 'am' ? 'ምንም ሰርተፊኬት የለም' : 'No Certificates Yet'}
              </h3>
              <p className="text-gray-500">
                {language === 'am' 
                  ? 'ትምህርቶችን ተጠናቀዉ ሰርተፊኬት ለማግኘት' 
                  : 'Complete courses to earn certificates'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedAssignment) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{selectedAssignment.title}</h2>
          <Button 
            variant="outline" 
            onClick={() => setSelectedAssignment(null)}
          >
            {language === 'am' ? 'ወደ ኋላ' : 'Back'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedAssignment.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedAssignment.description}
                </p>
              </div>
              <Badge variant="outline">
                {selectedAssignment.type}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Max Score: {selectedAssignment.maxScore}</span>
              {selectedAssignment.dueDate && (
                <span>Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}</span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedAssignment.type === 'quiz' ? (
              <div className="space-y-6">
                {selectedAssignment.questions?.map((question: any, qIndex: number) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">
                      {qIndex + 1}. {question.question} ({question.points} points)
                    </h4>
                    
                    {question.type === 'multiple_choice' && (
                      <RadioGroup
                        value={assignmentAnswers[qIndex]?.answer || ''}
                        onValueChange={(value) => {
                          const newAnswers = [...assignmentAnswers];
                          newAnswers[qIndex] = { questionId: question.id, answer: value };
                          setAssignmentAnswers(newAnswers);
                        }}
                      >
                        {question.options?.map((option: string, oIndex: number) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`q${qIndex}-o${oIndex}`} />
                            <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === 'short_answer' && (
                      <Textarea
                        placeholder={language === 'am' ? 'መልስዎን ይጻፉ...' : 'Write your answer...'}
                        value={assignmentAnswers[qIndex]?.answer || ''}
                        onChange={(e) => {
                          const newAnswers = [...assignmentAnswers];
                          newAnswers[qIndex] = { questionId: question.id, answer: e.target.value };
                          setAssignmentAnswers(newAnswers);
                        }}
                        rows={3}
                      />
                    )}

                    {question.type === 'essay' && (
                      <Textarea
                        placeholder={language === 'am' ? 'የእርሶን ጽሑፍ ይጻፉ...' : 'Write your essay...'}
                        value={assignmentAnswers[qIndex]?.answer || ''}
                        onChange={(e) => {
                          const newAnswers = [...assignmentAnswers];
                          newAnswers[qIndex] = { questionId: question.id, answer: e.target.value };
                          setAssignmentAnswers(newAnswers);
                        }}
                        rows={6}
                      />
                    )}
                  </div>
                ))}
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSubmitAssignment}>
                    {language === 'am' ? 'ላክ' : 'Submit Assignment'}
                  </Button>
                </div>
              </div>
            ) : selectedAssignment.type === 'project' ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Project Instructions</h4>
                  <p className="text-sm text-gray-700">{selectedAssignment.description}</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="font-medium mb-2">Upload Project Files</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Drop files here or click to browse
                  </p>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                <Textarea
                  placeholder={language === 'am' ? 'ተጨማሪ ማብራሪያ...' : 'Additional comments...'}
                  rows={4}
                />

                <div className="flex justify-end">
                  <Button onClick={handleSubmitAssignment}>
                    {language === 'am' ? 'ፕሮጀክት ላክ' : 'Submit Project'}
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedCourse && selectedLesson) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{selectedLesson.title}</h2>
          <Button 
            variant="outline" 
            onClick={() => setSelectedLesson(null)}
          >
            {language === 'am' ? 'ወደ ኋላ' : 'Back to Course'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lesson Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedCourse.title}</CardTitle>
                <Progress value={getCourseProgress(selectedCourse)} className="mt-2" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {selectedCourse.lessons?.map((lesson: any, index: number) => (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedLesson.id === lesson.id 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center space-x-2">
                          {lesson.isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded-full" />
                          )}
                          <span className="font-medium text-sm">
                            {index + 1}. {lesson.title}
                          </span>
                        </div>
                        {lesson.duration && (
                          <div className="flex items-center text-xs text-gray-500 mt-1 ml-6">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedLesson.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedLesson.description}</p>
                  </div>
                  <Badge variant="outline">
                    Lesson {selectedLesson.order}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Lesson Media */}
                {selectedLesson.videoUrl && (
                  <div className="mb-6">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4" />
                        <Button className="bg-white text-black hover:bg-gray-100">
                          <Play className="w-4 h-4 mr-2" />
                          Play Video
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedLesson.audioUrl && (
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Audio Lesson</h4>
                        <p className="text-sm text-gray-600">Duration: {selectedLesson.duration}</p>
                      </div>
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                    </div>
                  </div>
                )}

                {/* Lesson Text Content */}
                {selectedLesson.content && (
                  <div className="mb-6">
                    <div className="prose max-w-none">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-3">Lesson Content</h4>
                        <div className="text-gray-700 leading-relaxed">
                          {selectedLesson.content.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="mb-3">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lesson Documents */}
                {selectedLesson.documentUrl && (
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div className="flex-1">
                        <h4 className="font-medium">Lesson Materials</h4>
                        <p className="text-sm text-gray-600">Additional reading and resources</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {/* Lesson Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={selectedLesson.isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        // Mark lesson as complete
                        toast.success(language === 'am' ? 'Learning ተጠናቋል' : 'Lesson completed');
                      }}
                    >
                      {selectedLesson.isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>Mark Complete</>
                      )}
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Previous
                    </Button>
                    <Button size="sm">
                      Next Lesson
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Assignments */}
            {selectedCourse.assignments && selectedCourse.assignments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Course Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {selectedCourse.assignments.map((assignment: any) => (
                      <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Type: {assignment.type}</span>
                            <span>Max Score: {assignment.maxScore}</span>
                            {assignment.dueDate && (
                              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {assignment.submissions?.find((s: any) => s.userId === currentUser?.id)?.status || 'Not Submitted'}
                          </Badge>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedAssignment(assignment)}
                          >
                            {assignment.submissions?.find((s: any) => s.userId === currentUser?.id) 
                              ? 'View Submission' 
                              : 'Start Assignment'
                            }
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
          >
            {language === 'am' ? 'ወደ ኋላ' : 'Back to Courses'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2">{selectedCourse.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedCourse.enrolled_users?.length || 0} enrolled</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedCourse.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{selectedCourse.lessons?.length || 0} lessons</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {selectedCourse.difficulty}
                    </Badge>
                    <p className="text-sm text-gray-600">{selectedCourse.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEnrolled(selectedCourse) && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(getCourseProgress(selectedCourse))}% Complete
                      </span>
                    </div>
                    <Progress value={getCourseProgress(selectedCourse)} />
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium">Course Lessons</h4>
                  {selectedCourse.lessons?.map((lesson: any, index: number) => (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                        isEnrolled(selectedCourse) ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}
                      onClick={() => isEnrolled(selectedCourse) && setSelectedLesson(lesson)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {isEnrolled(selectedCourse) && lesson.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                              <span className="text-xs">{index + 1}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium">{lesson.title}</h5>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {lesson.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        )}
                        {lesson.videoUrl && <Video className="w-4 h-4" />}
                        {lesson.audioUrl && <Headphones className="w-4 h-4" />}
                        {lesson.documentUrl && <FileText className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Instructor</h4>
                  <p className="text-sm">{selectedCourse.instructor}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Duration</h4>
                  <p className="text-sm">{selectedCourse.duration}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Difficulty</h4>
                  <Badge variant="outline">{selectedCourse.difficulty}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <p className="text-sm">{selectedCourse.category}</p>
                </div>

                {!isEnrolled(selectedCourse) ? (
                  <Button 
                    className="w-full" 
                    onClick={() => onEnrollInCourse(selectedCourse.id)}
                  >
                    {language === 'am' ? 'ተመዝገብ' : 'Enroll Now'}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      {language === 'am' ? 'ይቀጥሉ' : 'Continue Learning'}
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setShowCertificates(true)}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      {language === 'am' ? 'ሰርተፊኬት' : 'View Certificate'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assignments Preview */}
            {selectedCourse.assignments && selectedCourse.assignments.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCourse.assignments.slice(0, 3).map((assignment: any) => (
                      <div key={assignment.id} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm">{assignment.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{assignment.type}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {assignment.maxScore} points
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {assignment.submissions?.length || 0} submissions
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main courses overview
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {language === 'am' ? 'የመማሪያ መድረክ' : 'Learning Platform'}
        </h2>
        <Button onClick={() => setShowCertificates(true)}>
          <Award className="w-4 h-4 mr-2" />
          {language === 'am' ? 'የእኔ ሰርተፊኬቶች' : 'My Certificates'}
        </Button>
      </div>

      {/* User's Progress Overview */}
      {enrolledCourses.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === 'am' ? 'የእኔ ትምህርቶች' : 'My Learning Progress'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.slice(0, 3).map((course) => (
                <div 
                  key={course.id} 
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedCourse(course)}
                >
                  <h4 className="font-medium mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{course.instructor}</span>
                    <span>{Math.round(getCourseProgress(course))}%</span>
                  </div>
                  <Progress value={getCourseProgress(course)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader onClick={() => setSelectedCourse(course)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {course.description}
                  </p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {course.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.enrolled_users?.length || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{course.lessons?.length || 0} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {course.instructor}
                </div>
                {isEnrolled(course) ? (
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-green-600">Enrolled</div>
                    <div className="w-12 h-12 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${getCourseProgress(course) * 1.25} 125`}
                          className="text-green-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {Math.round(getCourseProgress(course))}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnrollInCourse(course.id);
                    }}
                  >
                    {language === 'am' ? 'ተመዝገብ' : 'Enroll'}
                  </Button>
                )}
              </div>

              {isEnrolled(course) && getCourseProgress(course) > 0 && (
                <div className="mt-3">
                  <Progress value={getCourseProgress(course)} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}