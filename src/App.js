import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import NavBar from './component/navbar';
import Message from './component/message';
import PersonalInformation from './component/personalInformation';
import Setting from './component/setting';
import Introduction from './component/introduction';
import Activities from './component/activities';
import MyConcern from './component/myConcern';
import FindFriends from './component/findFriends';
import auth from './services/authServices';
import UserList from './component/userlist';
import Content from './component/content';
import Toggle from './component/toggle';
import Register from './component/register';
import Login from './component/login';
import Logout from './component/logout';
import ProtectedRoute from './component/common/protectedRoute';
import AdminProtectedRoute from './component/common/adminProtectedRoute';
import './App.css';

import Test from './component/test';

function App() {
  const [theme, setTheme] = useState('daytime');
  const [query, setQuery] = useState({ option: 'userName', word: '' });
  const [user, setUser] = useState(null);
  const [deviceType, setDeviceType] = useState('computer');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await auth.getCurrentUser();
        const date = dateFormat('YYYY-mm-dd HH:MM:SS', new Date(user.registrationDate));
        user.registrationDate = date;
        setUser(user);
      } catch (ex) {
        // Handle failure
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updateDeviceType = () => {
      const newDeviceType = document.documentElement.clientWidth < 500 ? 'mobile' : 'computer';
      setDeviceType(newDeviceType);
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  const handleSwitch = (theme) => {
    const newTheme = theme === 'daytime' ? 'nighttime' : 'daytime';
    setTheme(newTheme);
  };

  const handleQueryOption = (e) => {
    setQuery((prevQuery) => ({ ...prevQuery, option: e.currentTarget.value }));
  };

  const handleQueryChange = (e) => {
    setQuery((prevQuery) => ({ ...prevQuery, word: e.currentTarget.value }));
  };

  const dateFormat = (fmt, date) => {
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString(),
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
      }
    }
    return fmt;
  };

  return (
    <React.Fragment>
      <NavBar theme={theme} user={user} onQuery={handleQueryChange} onQueryOption={handleQueryOption} />
      <Toggle theme={theme} device={deviceType} onSwitch={() => handleSwitch(theme)} />
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/test" element={<Test />} />
        <Route path="/message" element={<ProtectedRoute component={Message} />} />
        <Route path="/personal-information" element={<ProtectedRoute component={() => <PersonalInformation theme={theme} device={deviceType} user={user} />} />} />
        <Route path="/userlist" element={<AdminProtectedRoute component={() => <UserList theme={theme} device={deviceType} user={user} />} />} />
        <Route path="/setting" element={<ProtectedRoute component={() => <Setting theme={theme} device={deviceType} user={user} />} />} />
        <Route path="/introduction" element={<ProtectedRoute component={Introduction} />} />
        <Route path="/activities" element={<ProtectedRoute component={Activities} />} />
        <Route path="/my-concern" element={<ProtectedRoute component={MyConcern} />} />
        <Route path="/find-friends" element={<ProtectedRoute component={FindFriends} />} />
        <Route path="/register" element={<Register theme={theme} device={deviceType} />} />
        <Route path="/login" element={<Login theme={theme} device={deviceType} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Content theme={theme} device={deviceType} user={user} query={query} dateRevise={dateFormat} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
