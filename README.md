# KoBERT를 이용한 일기 감정 분석 웹 서비스 개발: 감정 팔레트  
**Sentiment Analysis Web Application Development Using BERT: Emotion Palette**  
**한국외국어대학교 바이오메디컬공학부 캡스톤 프로젝트**  




## &#128221; 프로젝트 소개
<img src="./web/client/public/info.png" alt="감정 팔레트">


## &#128101; 팀 소개

<table>
  <tr>
    <td><img src="![image](https://github.com/eejj357/palette-ai-diary-web-service/assets/84446424/ceaa37ae-8455-4e98-9c04-656e6eef5b38)" width="200"></td>
    <td>
      <table>
        <tr>
          <th>구성원</th>
          <th>할 일</th>
        </tr>
        <tr>
          <td>황지현</td>
          <td>- UI/UX 디자인<br>- 프론트엔드 구현<br>- 대화 데이터셋 구축 및 모델 학습</td>
        </tr>
        <tr>
          <td>여언주</td>
          <td>- DB 구축 및 백엔드 구현<br>- 모델 추론 결과를 반환하는 API 구축<br>- 대화 데이터셋 구축 및 모델 학습</td>
        </tr>
      </table>
    </td>
  </tr>
</table>


## &#128197; 프로젝트 진행 기간
**2023.09 - 2023.12 (3개월)**

## &#128187; 서비스 구조
### Service Architecture
![archi1](./srv/A-4/static/assets/img/portfolio/archi_1.png)
1. 사용자가 일기를 입력하면 일기 데이터를 감정 분류 모델과 키워드 추출 모델에 입력으로 전달한다.
2. 감정 분류 모델에서 일기의 상위 감정 3개가 추출된다.
3. 키워드 추출 모델에서 일기의 상위 키워드 3개가 추출된다.
4. 2과 3의 결과(감정, 키워드)과 DB의 도서 데이터와 비교하여 비슷한 키워드와 감정을 가진 도서를 추출한다.
5. 추출한 감정, 키워드와 추천하는 도서를 페이지에 출력한다.

### BERT Model
![archi2](./srv/A-4/static/assets/img/portfolio/bert_img2.png)
- [KcELECTRA_base](https://github.com/Beomi/KcELECTRA)
- [KcBERT_base](https://github.com/Beomi/KcBERT)
- [KlueRoberta_small](https://huggingface.co/klue/roberta-small)
- [KlueRoberta_base](https://huggingface.co/klue/roberta-base)
- [KlueBERT_base](https://huggingface.co/klue/bert-base)

다양한 한국어 코퍼스에 대해 사전 훈련된 다섯 가지 모델을 선정하여 모델의 감정 분석에 대한 성능을 비교  
정확도가 0.850로 가장 높았던 **KlueBERT-base**을 최종 모델로 선정 
  
## &#128736; Skills
사진

## &#127910; 시연
### 입력
![입력](./srv/A-4/static/assets/img/photos/시연1.png)
### 결과1
![결과1](./srv/A-4/static/assets/img/photos/시연2.png)
### 결과2
![결과2](./srv/A-4/static/assets/img/photos/시연3.png)
