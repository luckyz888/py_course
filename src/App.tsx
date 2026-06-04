import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonPage from './pages/LessonPage';
import Practice from './pages/Practice';
import Quiz from './pages/Quiz';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Bootcamp from './pages/Bootcamp';
import BootcampProject from './pages/BootcampProject';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:moduleId" element={<CourseDetail />} />
          <Route path="courses/:moduleId/:lessonId" element={<LessonPage />} />
          <Route path="practice/:exerciseId" element={<Practice />} />
          <Route path="quiz/:moduleId" element={<Quiz />} />
          <Route path="bootcamp" element={<Bootcamp />} />
          <Route path="bootcamp/:projectId" element={<BootcampProject />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
