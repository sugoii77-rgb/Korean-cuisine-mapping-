// 한국 전통 요리 지도 - JSON 파일 기반 버전
let map;
let markers = {};
let selectedCity = null;
let currentLanguage = 'ko';
let foodData = null; // JSON에서 로드될 데이터

// 다국어 번역 데이터
const translations = {
  ko: {
    pageTitle: "한국 전통 요리 지도 🍽️",
    mainTitle: "🗺️ 한국 전통 요리 지도",
    subtitle: "지역을 클릭하거나 음식을 검색해보세요!",
    searchPlaceholder: "음식 이름을 입력하세요 (예: 불고기, 비빔밥)",
    searchBtn: "🔍 검색",
    welcomeTitle: "🇰🇷 한국의 맛있는 여행",
    welcomeText: "지도에서 지역을 선택하면 그 지역의 전통 요리를 만날 수 있어요!",
    regionsTitle: "📍 주요 지역",
    instructionsTitle: "💡 사용법",
    instruction1: "🗺️ 지도의 파란 마커를 클릭하세요",
    instruction2: "🔍 위의 검색창에 음식 이름을 입력하세요",
    instruction3: "📱 모바일에서도 편리하게 사용할 수 있어요",
    statRegions: "개 지역",
    statFoods: "가지 요리",
    statTaste: "한국의 맛",
    clickToSee: "클릭하여 전통 요리 보기",
    moreInfo: "자세히 보기 →",
    backTo: "← {city}",
    close: "×",
    searchNoResults: "검색 결과가 없습니다. 아래 목록에서 선택해보세요:",
    searchAllFoods: "🔍 전체 음식 목록",
    enterFoodName: "음식 이름을 입력해주세요!",
    historyTitle: "🏛️ 역사",
    geographyTitle: "🗺️ 지리",
    cultureTitle: "🎭 문화", 
    funFactTitle: "💡 흥미로운 사실",
    traditionalFoods: "의 전통 요리",
    loading: "데이터를 불러오는 중...",
    loadError: "데이터를 불러올 수 없습니다. 새로고침해주세요."
  },
  en: {
    pageTitle: "Korean Traditional Food Map 🍽️",
    mainTitle: "🗺️ Korean Traditional Food Map", 
    subtitle: "Click on regions or search for foods!",
    searchPlaceholder: "Enter food name (e.g., Bulgogi, Bibimbap)",
    searchBtn: "🔍 Search",
    welcomeTitle: "🇰🇷 Delicious Journey Through Korea",
    welcomeText: "Select a region on the map to discover its traditional dishes!",
    regionsTitle: "📍 Major Regions",
    instructionsTitle: "💡 How to Use",
    instruction1: "🗺️ Click the blue markers on the map",
    instruction2: "🔍 Type food names in the search box above",
    instruction3: "📱 Mobile-friendly interface available",
    statRegions: "Regions",
    statFoods: "Dishes",
    statTaste: "Korean Taste",
    clickToSee: "Click to see traditional foods",
    moreInfo: "Learn more →",
    backTo: "← {city}",
    close: "×",
    searchNoResults: "No results found. Please select from the list below:",
    searchAllFoods: "🔍 All Foods List",
    enterFoodName: "Please enter a food name!",
    historyTitle: "🏛️ History",
    geographyTitle: "🗺️ Geography", 
    cultureTitle: "🎭 Culture",
    funFactTitle: "💡 Fun Facts",
    traditionalFoods: " Traditional Foods",
    loading: "Loading data...",
    loadError: "Failed to load data. Please refresh."
  }
};

// JSON 데이터 로드 함수
async function loadFoodData() {
  try {
    const response = await fetch('foodData.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    foodData = await response.json();
    console.log('Food data loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading food data:', error);
    showError();
    return false;
  }
}

// 에러 표시 함수
function showError() {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="welcome-message">
      <h2 style="color: #e74c3c;">⚠️ ${translations[currentLanguage].loadError}</h2>
      <button onclick="location.reload()" style="margin-top: 20px;">🔄 새로고침</button>
    </div>
  `;
}

// 언어 변경 함수
function changeLanguage(lang) {
  console.log(`Changing language to: ${lang}`);
  currentLanguage = lang;
  
  // HTML lang 속성 변경
  document.getElementById('htmlRoot').lang = lang;
  
  // 언어 버튼 스타일 업데이트
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn${lang.charAt(0).toUpperCase() + lang.slice(1)}`).classList.add('active');
  
  // 페이지 텍스트 업데이트
  updatePageTexts();
  
  // 지도 팝업 업데이트
  if (foodData) {
    updateMapPopups();
    updateRegionCards();
  }
  
  // 사이드바가 열려있다면 업데이트
  if (selectedCity && foodData) {
    showCityFoods(selectedCity);
  }
  
  console.log(`Language changed to: ${currentLanguage}`);
}

// 페이지 텍스트 업데이트
function updatePageTexts() {
  const t = translations[currentLanguage];
  
  // 기본 요소들
  document.getElementById('pageTitle').textContent = t.pageTitle;
  document.getElementById('mainTitle').textContent = t.mainTitle;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('searchInput').placeholder = t.searchPlaceholder;
  document.getElementById('searchBtn').textContent = t.searchBtn;
  
  // 환영 메시지
  document.getElementById('welcomeTitle').textContent = t.welcomeTitle;
  document.getElementById('welcomeText').textContent = t.welcomeText;
  document.getElementById('regionsTitle').textContent = t.regionsTitle;
  
  // 사용법
  document.getElementById('instructionsTitle').textContent = t.instructionsTitle;
  document.getElementById('instruction1').textContent = t.instruction1;
  document.getElementById('instruction2').textContent = t.instruction2;
  document.getElementById('instruction3').textContent = t.instruction3;
  
  // 통계
  document.getElementById('statRegions').textContent = t.statRegions;
  document.getElementById('statFoods').textContent = t.statFoods;
  document.getElementById('statTaste').textContent = t.statTaste;
}

// 지역 카드 업데이트
function updateRegionCards() {
  if (!foodData) return;
  
  // 도시 이름과 음식 목록 업데이트
  Object.keys(foodData.cities).forEach(cityKey => {
    const cityData = foodData.cities[cityKey];
    
    // 도시 이름 업데이트
    const cityElement = document.getElementById(cityKey);
    if (cityElement && cityData.name) {
      cityElement.textContent = cityData.name[currentLanguage];
    }
    
    // 음식 목록 업데이트
    const foodsElement = document.getElementById(cityKey + 'Foods');
    if (foodsElement && cityData.foods) {
      const foodNames = Object.values(cityData.foods).map(food => food.name[currentLanguage]);
      foodsElement.textContent = foodNames.join(', ');
    }
  });
}

// 지도 팝업 업데이트
function updateMapPopups() {
  if (!foodData) return;
  
  Object.keys(markers).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    if (city && city.name && city.name[currentLanguage]) {
      const popup = `<strong>${city.name[currentLanguage]}</strong><br>${translations[currentLanguage].clickToSee}`;
      markers[cityKey].setPopupContent(popup);
    }
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
  // 로딩 메시지 표시
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="welcome-message">
      <h2>⏳ ${translations[currentLanguage].loading}</h2>
    </div>
  `;
  
  // 기본 언어 설정
  document.getElementById('btnKo').classList.add('active');
  updatePageTexts();
  
  // 데이터 로드
  const dataLoaded = await loadFoodData();
  
  if (dataLoaded) {
    // 지역 카드 업데이트
    updateRegionCards();
    
    // 지도 초기화
    setTimeout(() => {
      initMap();
    }, 300);
  }
});

// 지도 초기화
function initMap() {
  if (!foodData) {
    console.error('Food data not loaded');
    return;
  }
  
  // 기존 지도가 있다면 제거
  if (map) {
    map.remove();
  }
  
  // 지도 컨테이너 확인
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Map container not found!');
    return;
  }
  
  // 지도 생성
  map = L.map('map', {
    center: [36.5, 127.8],
    zoom: 7,
    preferCanvas: true,
    zoomControl: true
  });
  
  // 타일 레이어 추가
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    minZoom: 6,
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true
  }).addTo(map);
  
  // 지도 크기 강제 재조정
  setTimeout(() => {
    map.invalidateSize(true);
    addCityMarkers();
  }, 100);
}

// 도시 마커 추가
function addCityMarkers() {
  if (!foodData) return;
  
  console.log("Adding city markers...");
  
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    console.log(`Adding marker for ${city.name[currentLanguage]} at ${city.coords}`);
    
    // 기본 파란색 마커 사용
    const marker = L.marker(city.coords)
      .addTo(map)
      .bindPopup(`<strong>${city.name[currentLanguage]}</strong><br>${translations[currentLanguage].clickToSee}`)
      .on('click', () => {
        console.log(`Clicked on ${city.name[currentLanguage]}`);
        showCityFoods(cityKey);
      });
    
    markers[cityKey] = marker;
  });
  
  console.log(`Added ${Object.keys(markers).length} markers`);
}

// 도시 음식 표시
function showCityFoods(cityKey) {
  if (!foodData) return;
  
  const city = foodData.cities[cityKey];
  const sidebar = document.getElementById('sidebar');
  
  selectedCity = cityKey;
  
  // 다른 마커들 스타일 초기화
  Object.values(markers).forEach(marker => {
    marker.setIcon(new L.Icon.Default());
  });
  
  // 선택된 마커 강조 (빨간색)
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  markers[cityKey].setIcon(redIcon);
  
  // 사이드바 내용 생성
  let sidebarContent = `
    <div class="city-header">
      <h2>${city.name[currentLanguage]}${translations[currentLanguage].traditionalFoods}</h2>
      <button id="closeSidebar" onclick="closeSidebar()">${translations[currentLanguage].close}</button>
    </div>
    <div class="food-cards">
  `;
  
  Object.keys(city.foods).forEach(foodKey => {
    const food = city.foods[foodKey];
    sidebarContent += `
      <div class="food-card" onclick="showFoodDetail('${cityKey}', '${foodKey}')">
        <h3>${food.name[currentLanguage]}</h3>
        <p class="food-preview">${food.history[currentLanguage].substring(0, 50)}...</p>
        <span class="click-hint">${translations[currentLanguage].moreInfo}</span>
      </div>
    `;
  });
  
  sidebarContent += '</div>';
  sidebar.innerHTML = sidebarContent;
  sidebar.classList.add('active');
}

// 음식 상세 정보 표시
function showFoodDetail(cityKey, foodKey) {
  if (!foodData) return;
  
  const city = foodData.cities[cityKey];
  const food = city.foods[foodKey];
  const sidebar = document.getElementById('sidebar');
  const t = translations[currentLanguage];
  
  const backText = t.backTo.replace('{city}', city.name[currentLanguage]);
  
  const detailContent = `
    <div class="city-header">
      <button onclick="showCityFoods('${cityKey}')" class="back-btn">${backText}</button>
      <button id="closeSidebar" onclick="closeSidebar()">${t.close}</button>
    </div>
    <div class="food-detail">
      <h2>${food.name[currentLanguage]}</h2>
      
      <div class="detail-section">
        <h3>${t.historyTitle}</h3>
        <p>${food.history[currentLanguage]}</p>
      </div>
      
      <div class="detail-section">
        <h3>${t.geographyTitle}</h3>
        <p>${food.geography[currentLanguage]}</p>
      </div>
      
      <div class="detail-section">
        <h3>${t.cultureTitle}</h3>
        <p>${food.culture[currentLanguage]}</p>
      </div>
      
      <div class="detail-section fun-fact">
        <h3>${t.funFactTitle}</h3>
        <p>${food.fun_fact[currentLanguage]}</p>
      </div>
    </div>
  `;
  
  sidebar.innerHTML = detailContent;
}

// 사이드바 닫기
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('active');
  
  // 모든 마커 스타일 초기화
  Object.values(markers).forEach(marker => {
    marker.setIcon(new L.Icon.Default());
  });
  
  selectedCity = null;
}

// 검색 기능
function searchFood() {
  if (!foodData) return;
  
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  if (!searchTerm) {
    alert(translations[currentLanguage].enterFoodName);
    return;
  }
  
  let found = false;
  let foundCity = null;
  let foundFood = null;
  
  // 모든 도시의 음식 검색
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    Object.keys(city.foods).forEach(foodKey => {
      const food = city.foods[foodKey];
      if (food.name[currentLanguage].toLowerCase().includes(searchTerm)) {
        found = true;
        foundCity = cityKey;
        foundFood = foodKey;
      }
    });
  });
  
  if (found) {
    // 해당 도시로 이동
    const city = foodData.cities[foundCity];
    map.setView(city.coords, 10);
    
    // 음식 상세 정보 표시
    showCityFoods(foundCity);
    setTimeout(() => {
      showFoodDetail(foundCity, foundFood);
    }, 500);
    
    // 검색창 초기화
    document.getElementById('searchInput').value = '';
  } else {
    // 검색 결과가 없을 때 사용 가능한 음식 목록 보여주기
    showAvailableFoods();
  }
}

// 사용 가능한 음식 목록 표시
function showAvailableFoods() {
  if (!foodData) return;
  
  const sidebar = document.getElementById('sidebar');
  const t = translations[currentLanguage];
  let foodList = [];
  
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    Object.keys(city.foods).forEach(foodKey => {
      const food = city.foods[foodKey];
      foodList.push({
        name: food.name[currentLanguage],
        city: city.name[currentLanguage],
        cityKey: cityKey,
        foodKey: foodKey
      });
    });
  });
  
  foodList.sort((a, b) => a.name.localeCompare(b.name));
  
  let content = `
    <div class="city-header">
      <h2>${t.searchAllFoods}</h2>
      <button id="closeSidebar" onclick="closeSidebar()">${t.close}</button>
    </div>
    <div class="search-results">
      <p>${t.searchNoResults}</p>
      <div class="food-list">
  `;
  
  foodList.forEach(item => {
    content += `
      <div class="food-item" onclick="searchSpecificFood('${item.name}')">
        <strong>${item.name}</strong> - ${item.city}
      </div>
    `;
  });
  
  content += '</div></div>';
  sidebar.innerHTML = content;
  sidebar.classList.add('active');
}

// 특정 음식 검색
function searchSpecificFood(foodName) {
  document.getElementById('searchInput').value = foodName;
  searchFood();
}

// Enter 키로 검색
function handleEnter(event) {
  if (event.key === 'Enter') {
    searchFood();
  }
}
