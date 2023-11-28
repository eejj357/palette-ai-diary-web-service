import React, { useState, useEffect } from 'react';
import { CssBaseline} from '@mui/material';
import { styled } from '@mui/material/styles';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './Calendar';
import ColoredBarChart from './BarChart';
import Header from './Header'; 
import Navigation from './NavigationList';
import axios from 'axios'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: theme.spacing(8),
}));


//좌측 패널 
const LeftPanel = styled('div')`
  width: 350px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF; 
  height: 100vh;
`;

//우측 패널 
const RightPanel = styled('div')`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  margin-bottom: 20px;
  height: 100%;
  border-left: 3px solid #000000; 
`;

//우측 패널 상단 이미지 6개 
const ImageRow = styled('div')`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer; /* 이미지를 클릭 가능하도록 설정 */
  justify-content: center; 
`;


export default function Main() {
    const setsPerPage = 3;  //한페이지에 보여줄 set 수
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null); // for 필터링
    const [calendarValue, setCalendarValue] = useState(new Date()); // for 캘린더
    const [userDiaries, setUserDiaries] = useState([]);


    //캘린더
    const handleCalendarChange = (value) => {
        setCalendarValue(value);
    }

    //막대그래프
    const BarColor = '#B9DDF1';


    // 이미지 클릭 시 필터링 적용 및 이미지 변경
    const handleImageClick = (image) => {
        // 이미지 파일 이름에서 감정 추출
        const emotionFromImage = image.split('_')[1]; // 예: emo_happy_1.png -> 'happy'
        console.log('emotionFromImage:', emotionFromImage);

        // 이미지를 클릭할 때마다 감정이 바뀌도록 설정
        const newEmotionImage = selectedEmotion ? `emo_${emotionFromImage}_1.png` : `emo_${emotionFromImage}_2.png`;
        console.log('newEmotionImage:', newEmotionImage);

        // 이미 선택된 감정과 동일한 경우 선택 해제, 아닌 경우 선택
        setSelectedEmotion((prev) => (prev === emotionFromImage ? null : emotionFromImage));

        // 이미지 변경을 위한 로직 
        const imageElement = document.querySelector(`img[src="${image}"]`);
        console.log('imageElement:', imageElement);
        if (imageElement) {
            // // 이미지 클릭 시 이미지 상태 업데이트
            // setSelectedEmotion((prev) => (prev === emotionFromImage ? null : emotionFromImage));
            // 변경된 이미지 로딩
            imageElement.src = newEmotionImage;
        }
    };
    

    const filteredSets = selectedEmotion
        ? userDiaries.filter((set) => set.emotion === selectedEmotion)
        : userDiaries;


    //페이지 기능
    const paginateSets = (sets) => {
        const startIndex = (currentPage - 1) * setsPerPage;
        const endIndex = startIndex + setsPerPage;
        return sets.slice(startIndex, endIndex);
    };


    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 사용자의 일기를 가져옴
                const response = await axios.get('/api/get-my-diaries');

                if (response.data) {
                    setUserDiaries(response.data);
                } else {
                    console.error('서버로부터 일기를 가져오는 데 문제 발생');
                } 
            } catch (err) {
                console.error('오류 발생!', err);
            }
        };

        fetchData();  // fetchData 함수 호출
    }, [selectedEmotion]);  // selectedEmotion이 변경될 때만 useEffect가 실행되도록 변경

    const currentSets = paginateSets(filteredSets);

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            {/*  상단바 */}
            <Header />

            {/* 내용 */}
            <Content>
                {/* 좌측 패널*/}
                <LeftPanel>
                    {/* nav 목록*/}
                    <Navigation currentPage="my"  />

                    {/* 막대그래프 */}
                    <ColoredBarChart
                        title="나의 팔레트 ㅤㅤㅤㅤ"
                        color={BarColor}
                    />


                    {/* 캘린더 */}
                    <CustomCalendar
                        onChange={handleCalendarChange}
                        value={calendarValue}
                    />
                </LeftPanel>

                {/*우측패널 */}
                <RightPanel>
                    <div>
                        {/* 6개의 이미지 */}
                        <ImageRow>
                            {/* CLICK.png */}
                            <img
                                src="/CLICK.png"
                                alt="click"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick(null)} // null을 전달하여 선택된 감정 초기화
                            />

                            {/* 감정 이미지들 */}
                            {["happy", "angry", "neutral", "anxiety", "sad"].map((emotion) => (
                                <img
                                    key={emotion}
                                    src={`/emo_${emotion}_1.png`}
                                    alt={`emo ${emotion}`}
                                    style={{ width: '100px', height: '100px' }}
                                    onClick={() => handleImageClick(`/emo_${emotion}_1.png`)}
                                />
                            ))}
                        </ImageRow>

                        {/* 내용 넣을 부분 : SET(이미지 + 작성시간 + 타이틀 + 글)*/}
                        {currentSets.map((set) => (
                            <div
                                key={set.user}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '1000px',
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    marginTop: '30px',
                                }}
                            >
                                {/* 이미지 및 타이틀 작성시간 부분  : SET중이미지 + 타이틀 + 작성시간)*/}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: 'auto',
                                        overflow: 'hidden',
                                        borderRadius: '8px 8px 0 0',
                                    }}
                                >
                                    {/* 이미지와 제목을 감싸는 부모 컨테이너 */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                        <div>
                                            <img
                                                src={`emo_${set.emotion}_1.png`}
                                                alt="이미지 설명"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    marginLeft: '15px',
                                                    marginTop: '15px',
                                                }}
                                            />
                                        </div>

                                        {/* 제목을 이미지 바로 오른쪽에 추가 */}
                                        <div
                                            style={{
                                                marginLeft: '15px',
                                                marginTop: '10px',
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                            }}>{set.title}</div>
                                    </div>

                                    {/* 시간 : SET중(시간) */}
                                    <div style={{
                                        marginRight: '15px',
                                        marginTop: '-20px',
                                        fontSize: '14px',
                                    }}>
                                        <span style={{ fontWeight: 'bold' }}>
                                            {new Date(set.date).toLocaleString('ko-KR',
                                                {
                                                    hour12: false,
                                                    year: '2-digit',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                })}
                                        </span>
                                    </div>
                                </div>


                                {/* 글 내용 부분 : SET중(글) */}
                                <div style={{
                                    padding: '5px',
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    height: 'auto'
                                }}>
                                    {set.content}
                                </div>
                            </div>
                        ))}


                        {/* 이전 다음 페이지 전환 버튼 */}
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            marginTop: '30px',
                            justifyContent: 'center',  // 수평 정렬
                            alignItems: 'center',
                        }}>
                            <button
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '10px',
                                    width: '100px',  // 버튼 크기 조절
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    border: '2px solid black',
                                    borderRadius: '5px',
                                    cursor: 'pointer',         // 마우스 오버 시 포인터로 변경
                                    fontFamily: 'MapoFlowerIsland, sans-serif',
                                }}
                            >
                                이전
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentSets.length < setsPerPage}
                                style={{
                                    padding: '10px',
                                    width: '100px',  // 버튼 크기 조절
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    border: '2px solid black',
                                    borderRadius: '5px',
                                    cursor: 'pointer',         // 마우스 오버 시 포인터로 변경
                                    fontFamily: 'MapoFlowerIsland, sans-serif',
                                }}
                            >
                                다음
                            </button>
                        </div>

                    </div>
                </RightPanel>
            </Content>
            <ToastContainer autoClose={5000}/>
        </div>
    );
}