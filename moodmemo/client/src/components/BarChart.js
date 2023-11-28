import React, { useEffect, useState } from 'react';
import { BarChart, } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function ColoredBarChart({ title, color }) {
    const [diaryData, setDiaryData] = useState([]);

    useEffect(() => {
        // 서버에서 사용자의 일기 데이터를 가져오는 요청
        axios.get('/api/get-my-diaries')
            .then(response => {
                setDiaryData(response.data);
            })
            .catch(err => {
                console.error("데이터를 불러오는데 실패하였습니다", err);
            });
    }, []);

    //현재 날짜
    const currentDate = new Date();

    // 감정 카운트를 저장할 객체 초기화
    const emotionCount = {
        HAPPY: 0,
        ANGRY: 0,
        NEUTRAL: 0,
        ANXIETY: 0,
        SAD: 0,
    };

    // Dummy 데이터에서 감정 & 날짜 동시 카운트
    diaryData.forEach(data => {
        const emotion = data.emotion.toUpperCase(); // 감정 데이터를 대문자로 변환

        // 데이터의 날짜 정보를 추출
        const dataDate = new Date(data.date);

        // 데이터의 월 정보를 추출
        const dataMonth = dataDate.getMonth();

        //현재 날짜의 월 정보를 추출
        const currentMonth = currentDate.getMonth();


        if (emotionCount.hasOwnProperty(emotion) && dataMonth === currentMonth) {
            emotionCount[emotion]++;
        }
    });

    // BarChart에 전달할 데이터 형식으로 변환
    const barChartData = {
        xAxis: [
            {
                id: 'barCategories',
                data: ['기쁨', '분노', '중립', '불안', '슬픔'],
                // data: ['HAPPY', 'ANGRY', 'NEUTRAL', 'ANXIETY', 'SAD'],
                // data: ['🟨', '🟥', '⬛', '🟩', '🟦'],
                
                scaleType: 'band',
            },
        ],
        series: [
            {
                data: Object.values(emotionCount), // 감정 카운트 값들
                color: color,
            },
        ],
    };

    // 오늘 날짜의 월을 영어로 반환하는 함수
    const getMonthName = () => {
        const months = [
            '1월', '2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'
        ];

        const today = new Date();
        const monthIndex = today.getMonth();
        return months[monthIndex];
    };

    return (
        <div style={{
            position: 'relative',
            marginTop: '70px',
            marginBottom: '-10px',
            display: 'flex',
            flexDirection: 'column', // 컨테이너 안의 요소들을 세로로 배열하도록 수정
            alignItems: 'center',
        }}>
            <Typography
                variant="h6"
                gutterBottom
                style={{
                    marginLeft: '10px',
                    marginBottom: '-30px',
                    fontSize: '0.9rem'
                }}>
                {`${title}ㅤㅤㅤㅤㅤ ${getMonthName()}`}
            </Typography>

            <BarChart
                {...barChartData}
                width={350 *0.9}
                height={250 *0.9}
                leftAxis={null}
                rightAxis={null}
            />
        </div>
    );
}
