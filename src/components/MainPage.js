import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './Calendar';
import ColoredBarChart from './BarChart';
import Header from './Header';
import Navigation from './NavigationList';


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
  border-left: 2px solid #000000; 
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
    // const [setsFromDatabase, setSetsFromDatabase] = useState([]); // for DB // 현재 사용 X


    //DB연결 안 되어있어서 가상 데이터
    const dummySetsFromDatabase = [
        {
            id: 1,
            emotion: 'sad',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자여감자감자여감자여감자여감자여감ㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            date: new Date('2023-11-24T12:34:56')
        },
        {
            id: 2,
            emotion: 'happy',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬시크릿쥬쥬',
            date: new Date('2023-11-23T08:45:30')
        },
        {
            id: 3,
            emotion: 'angry',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: 'Black MambaMa Ma Ma MambaWoo oh ohMa Ma Ma MambaOh eh o eh o넌 광야를 떠돌고 있어Aya ya ya ya ya yaBlack MambaMa Ma Ma MambaWoo oh ohMa Ma Ma MambaOh eh o eh o넌 광야를 떠돌고 있어Aya ya ya ya ya yaBlack MambaMa Ma Ma MambaWoo oh ohMa Ma Ma MambaOh eh o eh o넌 광야를 떠돌고 있어',
            date: new Date('2023-11-22T15:20:10')
        },
        {
            id: 4,
            emotion: 'fear',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '어떻게 이별까지 사랑하겠어 널 사랑하는 거지 사랑이라는 이유로 서로를 포기하고 찢어질 것 같이 아파할 수 없어 난 어떻게 이별까지 사랑하겠어 널 사랑하는 거지 사랑이라는 이유로 서로를 포기하고 찢어질 것 같이 아파할 수 없어 난 어떻게 이별까지 사랑하겠어 널 사랑하는 거지 사랑이라는 이유로 서로를 포기하고 찢어질 것 같이 아파할 수 없어 난 어떻게 이별까지 사랑하겠어 널 사랑하는 거지 사랑이라는 이유로 서로를 포기하고 찢어질 것 같이 아파할 수 없어 난',
            date: new Date('2023-11-21T18:55:45')
        },
        {
            id: 5,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '하얗게 피어난 얼음 꽃 하나가 달가운 바람에 얼굴을 내밀어 아무 말 못했던 이름도 몰랐던 지나간 날들에 눈물이 흘러 차가운 바람에 숨어 있다 한줄기 햇살에 몸 녹이다 그렇게 너는 또 한번 내게 온다 좋았던 기억만 그리운 마음만 니가 떠나간 그 길 위에 이렇게 남아 서있다 잊혀질 만큼만 괜찮을 만큼만 눈물 머금고 기다린 떨림 끝에 다시 나를 피우리라 사랑은 피고 또 지는 타버리는 불꽃 빗물에 젖을까 두 눈을 감는다 어리고 작았던 나의 맘에 눈부시게 빛나던 추억 속에 그렇게 너를 또 한번 불러본다',
            date: new Date('2023-11-20T22:10:05')
        },
        {
            id: 6,
            emotion: 'angry',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '가나다라마바사 너와 나의 암호말 너만 생각하면 떠오르는 말이 있걸랑 사랑을 한단 말을 하고 있지만 그대와 나만 알아 듣는 말 아무도 몰라 가나다라마바사 사랑한단 뜻이야 아침에 전화를 하면 듣고 싶은 암호말 가나다라마바사 보고 싶다 뜻이야 오후 다섯시면 그대를 만나는 시간 까페에서 만날까 고수부지 걸을까 보자마자하고 싶은말 너와 나의 암호말 가나다라마바사 행복하단 뜻이야 아무도 모르는 사랑 가나다라마바사 ',
            date: new Date('2023-11-19T04:30:22')
        },
        {
            id: 7,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '긴긴 하루 끝에 집에 돌아와 씻지도 않고 누워 낮은 천장만 물끄러미 눈을 감으면 오늘 네가 했던 모든 말 또 내가 하려 했다 속으로만 삼키던 말 모두 떠올라 울렁거려 너의 말은 항상 옳고 한참 듣다 보면 하려던 말 까먹어서 우물쭈물 더듬대는 내 모습이 참 이게 아닌데 그니까 내 말은 지금 내가 좋아한다고 너를 말야 벌떡 일어나 또 한숨만 푹 눈을 감으면 나를 보던 너의 표정이 내 맘 들킨 듯 놀라 굳어버린 내 모습이 모두 떠올라 화끈거려 너의 말은 항상 옳고 한참 듣다 보면 나는 할 말 없어져서',
            date: new Date('2023-11-18T11:15:17')
        },
        {
            id: 8,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: 'The Olympic games are international sports event which include ___ summer and winter sports. The Olympics are held in different countries every four years. In addition the scale of Olympics is getting bigger and bigger, and lots of people are coming to see the Olympics to enjoy the vibe of it, it`s natural to be keen to hold a Olympics. Actually it`s a good chance not only for the venue but also the host country to hold the games and it`ll become more famous and developed than before.',
            date: new Date('2023-11-17T14:40:58')
        },
        {
            id: 9,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '박경석 전국장애인철폐연대 대표가 경찰의 퇴거명령에 불응해 현행범으로 체포됐다.24일 서울 혜화경찰서는 박 대표를 혜화역에서 현행범 체포했다고 밝혔다. 박 대표는 이날 오전 8시께 서울교통공사가 전장연의 지하철 시위를 원천봉쇄하자 이에 반발하며 기자회견을 열었다.경찰은 오전 8시 40분께 박 대표에게 퇴거명령을 내렸지만, 박 대표가 수차례 이에 불응하자 강제 연행한 것으로 알려졌다.',
            date: new Date('2023-11-16T20:05:34')
        },
        {
            id: 10,
            emotion: 'happy',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '손흥민은 "포스테코글루 감독이 인간으로서 코치로서 말하는 방식은 환상적이고 엄청나다"며 "난 31세로 인간으로서 많은 것을 배우고 충분히 알고 있다고 생각했는데, 포스테코글루 감독이 우리 팀에 오고 나서 와 난 아직 어린이였구나라고 느꼈다"고 말했다 포스테코글루 감독이 부임한 토트넘은 이번 시즌 12경기에서 8승 2무 2패로 선두 맨체스터시티에 승점 2점 뒤진 4위로 선두 싸움을 벌이고 있다.',
            date: new Date('2023-11-15T05:12:42')
        },
        {
            id: 11,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '대중음악 전문 공연장 ‘창동 서울아레나’에 대한 실시 계획이 승인됐다. 카카오 등이 총 투자비 3600억 원을 투자해 짓는 이 시설은 2027년 준공될 예정이다 24일 서울시 등에 따르면 시는 최근 ‘서울아레나 복합문화시설 민간투자사업’에 대한 실시 계획을 승인했다.아레나 공연장은 대중음악 공연뿐 아니라 중소 규모 스포츠 경기(농구·테니스·아이스링크 등)와 실내 서커스 등으로도 활용된다.',
            date: new Date('2023-11-14T17:08:03')
        },
        {
            id: 12,
            emotion: 'happy',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '서울 지하철 1~8호선을 운영하는 서울교통공사 노사가 막판 협상에서 극적으로 타결을 이뤘다. 이에 따라 무기한 2차 파업은 취소됐고 22일 지하철은 정상 운행된다. 공사는 21일 1·2노조 연합교섭단과 2023년 임금·단체협상에 최종 합의했다고 밝혔다.이번 합의안의 주요 내용을 보면 안전 인력이 필요한 분야에 대한 인력 충원을 노사가 협의해 추진하기로 했다. ',
            date: new Date('2023-11-13T01:55:27')
        },
        {
            id: 13,
            emotion: 'neutral',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '펜싱 국가대표 출신 남현희와 전청조씨의 사기 스캔들이 불거진 뒤 남자친구의 펜싱클럽이 경영난에 휩싸였다며 한 유투버가 피해를 호소했다. 구독자 약 12만명을 보유한 성주하씨는 유튜브 채널 술주하를 통해 지난 19일 올린 남자친구와의 결혼 계획이 엎어졌다고 털어놨다.  이날 성씨는 남자친구 A씨가 운영하는 펜싱클럽에 방문했다. 성씨가 하필이면 여기가 송파구다. 바로 옆에 (전청조가 살았던) 시그니엘이 있다. 되게 가깝다. 괜찮으시냐. 이 업계도 바닥이 좁지 않냐고 말문을 열었다.',
            date: new Date('2023-11-12T09:48:36')
        },
        {
            id: 14,
            emotion: 'fear',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '마약 투약 혐의를 받는 배우 이선균이 추가로 채취한 체모를 대상으로 한 2차 정밀감정에서도 음성 판정을 받은 가운데, 가수 지드래곤도 모발을 탈색하거나 염색하지 않은 사실이 확인되면서 물증을 찾지 못한 경찰이 궁지에 몰렸다. 24일 경찰 등에 따르면, 국과수는 최근 이선균의 체모를 추가로 정밀 감정한 결과 마약 음성 반응이 나왔다고 인천경찰청 마약범죄수사계에 통보했다.',
            date: new Date('2023-11-11T23:25:50')
        },
        {
            id: 15,
            emotion: 'sad',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '영국 국빈 방문을 마친 윤석열 대통령이 2030 엑스포 결정의 도시 프랑스 파리로 갔습니다. 윤 대통령은 국제박람회기구의 각국 대표들과 연쇄적으로 만나면서 부산으로 결정되면 역대 최대 규모로 지원하겠다며 적극적인 지지를 호소했습니다. 프랑스 파리에서 조태흠 기자의 보도입니다. 윤석열 대통령은 프랑스 파리에 도착해, 곧바로 국제박람회기구 각국 대표들부터 만났습니다. 대부분 28일 개최지 결정 투표에서 직접 한 표를 행사할 사람들입니다.',
            date: new Date('2023-11-10T06:37:14')
        },
        {
            id: 16,
            emotion: 'sad',
            title: '안녕하세요저희는시크릿쥬쥬감자입니다!',
            content: '확인용',
            date: new Date('2023-11-26T06:37:14')
        },
    ];


    //캘린더
    const handleCalendarChange = (value) => {
        setCalendarValue(value);
    }


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
            imageElement.src = newEmotionImage;
        }
    };

    const filteredSets = selectedEmotion
        ? dummySetsFromDatabase.filter((set) => set.emotion === selectedEmotion)
        : dummySetsFromDatabase;


    //페이지 기능
    const paginateSets = (sets) => {
        const startIndex = (currentPage - 1) * setsPerPage;
        const endIndex = startIndex + setsPerPage;
        return sets.slice(startIndex, endIndex);
    };


    //*더미 데이터, 현재 사용O
    useEffect(() => {
        // Fetch data or perform any side effect based on your needs
    }, []);

    //가상의 더미 데이터 대신에 서버에서 실제 데이터 가져오기, 현재 사용X 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/sets'); // 서버의 API 엔드포인트에 맞게 수정
    //             const data = await response.json();
    //             setSetsFromDatabase(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
                    <Navigation currentPage="main" />

                    {/* 막대그래프 */}
                    <ColoredBarChart/>


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
                            />

                            {/* 감정 이미지들 */}
                            {["happy", "angry", "neutral", "fear", "sad"].map((emotion) => (
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
                                key={set.id}
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
                                                // WebkitTextStroke: '0.00000000000000000000000000000000000000000001px black' ,
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
                                    backgroundColor: '#F7E2E1',
                                    border: 'none',
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
                                    backgroundColor: '#F7E2E1',
                                    border: 'none',
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
        </div>
    );
}

