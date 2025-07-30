# 한국 전통 요리 지도 / Korean Traditional Food Map

한국 각 지역의 특색있는 전통 음식을 인터랙티브 지도로 탐험할 수 있는 웹 애플리케이션입니다.

An interactive web application to explore traditional foods unique to each region of Korea through an interactive map.

## 🌟 주요 기능 / Key Features

- **인터랙티브 지도**: OpenStreetMap 기반 Leaflet.js를 활용한 직관적인 지도 인터페이스
- **다국어 지원**: 한국어, 영어, 일본어, 중국어 4개 언어 지원
- **음식 검색**: 실시간 검색으로 원하는 음식과 해당 지역을 빠르게 찾기
- **상세 정보**: 각 음식의 유래, 역사적 배경, 지역적 특색에 대한 자세한 설명
- **반응형 디자인**: 데스크톱과 모바일 모든 기기에서 최적화된 경험

## 📁 파일 구조 / File Structure

```
korean-food-map/
├── index.html              # 메인 페이지
├── about.html              # 소개 페이지
├── style.css               # 스타일시트
├── script.js               # 메인 JavaScript
├── data/                   # JSON 데이터 폴더
│   ├── seoul.json          # 서울 음식 데이터
│   ├── busan.json          # 부산 음식 데이터
│   ├── jeonju.json         # 전주 음식 데이터
│   ├── jeju.json           # 제주 음식 데이터
│   ├── gangneung.json      # 강릉 음식 데이터
│   └── andong.json         # 안동 음식 데이터
└── README.md               # 프로젝트 설명서
```

## 🚀 설치 및 실행 / Installation & Setup

### GitHub Pages 배포

1. 이 저장소를 Fork하거나 Clone합니다.
2. GitHub 저장소 설정에서 Pages를 활성화합니다.
3. Source를 "Deploy from a branch"로 설정하고 main branch를 선택합니다.
4. 배포된 URL로 접속하여 앱을 확인합니다.

### 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/korean-food-map.git

# 폴더로 이동
cd korean-food-map

# 로컬 서버 실행 (Python 3 기준)
python -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

## 🗺️ 지원 도시 / Supported Cities

- **서울 (Seoul)**: 불고기, 김치찌개, 냉면
- **부산 (Busan)**: 돼지국밥, 밀면, 씨앗호떡
- **전주 (Jeonju)**: 비빔밥, 콩나물국밥, 한정식
- **제주 (Jeju)**: 흑돼지 구이, 옥돔구이, 전복죽
- **강릉 (Gangneung)**: 초당순두부, 강릉커피, 사천면
- **안동 (Andong)**: 안동찜닭, 간고등어, 헛제사밥

## 🛠️ 사용된 기술 / Technologies Used

- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, Flexbox, Grid
- **JavaScript (ES6+)**: 모듈식 프로그래밍
- **Leaflet.js**: 인터랙티브 지도
- **OpenStreetMap**: 지도 타일 제공
- **Google Analytics**: 사용자 분석

## 📱 사용 방법 / How to Use

1. **지도 탐색**: 지도에서 관심있는 도시 마커를 클릭하세요.
2. **음식 선택**: 팝업 모달에서 해당 지역의 대표 음식을 선택하세요.
3. **상세 정보**: 우측 패널에서 선택한 음식의 자세한 정보를 확인하세요.
4. **검색 기능**: 상단 검색창에서 특정 음식을 검색하면 해당 지역이 강조됩니다.
5. **언어 변경**: 상단 언어 버튼으로 원하는 언어로 전환하세요.

## 🔧 커스터마이징 / Customization

### 새로운 도시 추가

1. `script.js`의 `cities` 객체에 새 도시 정보 추가:
```javascript
newCity: { 
  name: 'newCity', 
  coords: [위도, 경도], 
  dataFile: 'newcity.json' 
}
```

2. `data/` 폴더에 해당 JSON 파일 생성:
```json
{
  "city_ko": "도시명",
  "city_en": "City Name",
  "city_ja": "都市名",
  "city_zh": "城市名",
  "foods": [...]
}
```

### 음식 데이터 추가

각 도시의 JSON 파일에서 `foods` 배열에 새로운 음식 객체를 추가하세요:

```json
{
  "name_ko": "음식명",
  "name_en": "Food Name", 
  "name_ja": "料理名",
  "name_zh": "菜名",
  "description": {
    "ko": "한국어 설명",
    "en": "English description",
    "ja": "日本語の説明", 
    "zh": "中文说明"
  }
}
```

## 🤝 기여하기 / Contributing

1. 이 저장소를 Fork하세요.
2. Feature 브랜치를 만드세요: `git checkout -b feature/new-feature`
3. 변경사항을 커밋하세요: `git commit -am 'Add new feature'`
4. 브랜치에 Push하세요: `git push origin feature/new-feature`
5. Pull Request를 제출하세요.

## 📄 라이센스 / License

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 🙏 오픈소스 크레딧 / Open Source Credits

- [Leaflet.js](https://leafletjs.com/) - BSD 2-Clause License
- [OpenStreetMap](https://www.openstreetmap.org/) - Open Database License (ODbL)

## 📞 문의 / Contact

프로젝트에 대한 문의사항이나 개선 제안이 있으시면 Issue를 생성해 주세요.

---

**한국의 아름다운 음식 문화를 세계에 알리는 데 함께해 주셔서 감사합니다! 🇰🇷**
