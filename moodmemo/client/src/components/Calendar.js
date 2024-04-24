import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios from 'axios';

function ServerDay(props) {
  const { diaryData, day, outsideCurrentMonth, ...other } = props;

  // diaryData가 undefined인 경우를 처리
  const isHighlighted = diaryData.some(
      (data) =>
        dayjs(data.date).isSame(day, 'day') &&
        ['sad', 'happy', 'anxiety', 'angry', 'neutral'].includes(data.emotion)
    );

  const customStyle = {
    backgroundColor: isHighlighted
      ? (() => {
        const emotionColorMap = {
          sad: '#97C9FE',
          happy: '#FAF37E',
          anxiety: '#95D7AF',
          angry: '#E88889',
          neutral: '#919191',
        };
        const emotion = diaryData.find((data) => dayjs(data.date).isSame(day, 'day'))?.emotion;
        const baseColor = emotionColorMap[emotion];
        return baseColor ? `${baseColor}80` : undefined; // "80"은 투명도를 나타냅니다. (50%)
      })()
      : undefined,
  };

  return (
    <Badge>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        style={customStyle}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest({ pageType }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userDiaries, setUserDiaries] = React.useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // 여기서 로그인 후에 저장된 토큰을 가져오는 로직을 추가
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const fetchFunction = async (headers) => {
    try {
      // 페이지 타입에 따라 다른 API 호출
      const apiEndpoint = pageType === 'my' ? '/api/get-my-diaries' : '/api/get-all-diaries';
      
      // 서버로부터 일기 데이터 가져오기
      const response = await axios.get(apiEndpoint, { headers });
      return response.data;
    } catch (err) {
      console.error("데이터를 불러오는데 실패하였습니다", err);
      throw err;
    }
  };


  const fetchData = async () => {
    try {
      if (!token) {
        console.error('토큰이 유효하지 않습니다');
        return;
      }

      // 서버에서 현재 로그인한 사용자의 일기를 가져오기 위해 토큰을 헤더에 추가
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // 서버로부터 일기 데이터 가져오기
      const data = await fetchFunction(headers);
      setUserDiaries(data);
    } catch (err) {
      console.error("데이터를 불러오는데 실패하였습니다", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, token]); // token이 변경될 때마다 fetchData 호출

  const handleMonthChange = (date) => {
    setIsLoading(true);
    fetchData();
  };

  const highlightedDays = userDiaries.map((data) => dayjs(data.date).date());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        highlightedDays={highlightedDays}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (props) => <ServerDay {...props} diaryData={userDiaries} />,
        }}
        style={{
          width: '300px',
          marginTop: '30px',
        }}
      />
    </LocalizationProvider>
  );
}
