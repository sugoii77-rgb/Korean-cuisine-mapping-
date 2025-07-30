// 한국 전통 요리 지도 - 4개 언어 지원 (한국어/영어/중국어/일본어)
let map;
let markers = {};
let selectedCity = null;
let currentLanguage = 'ko';

// 데이터 저장 변수
let citiesData = null;
let foodsData = null;
let translationsData = null;

// 데이터 로딩 함수들
async function loadAllData() {
  try {
    showLoadingMessage();
    
    // 모든 JSON 파일을 병렬로 로드
    const [citiesResponse, foodsResponse, translationsResponse] = await Promise.all([
      fetch('cities.json'),
      fetch('foods.json'),
      fetch('translations.json')
    ]);
    
    if (!citiesResponse.ok || !foodsResponse.ok || !translationsResponse.ok) {
      throw new Error('Failed to fetch data files');
    }
    
    citiesData = await citiesResponse.json();
    foodsData = await foodsResponse.json();
    translationsData = await translationsResponse.json();
    
    console.log('All data loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading data:', error);
    showErrorMessage();
    return false;
  }
}

// 로딩 메시지 표시
function showLoadingMessage() {
  const sidebar = document.getElementById('sidebar');
  const currentTranslations = translationsData?.translations?.[currentLanguage] || {};
  const loadingText = currentTranslations.loading || "Loading data...";
  
  sidebar.innerHTML = `
    <div class="welcome-message">
      <h2>⏳ ${loadingText}</h2>
      <div style="text-align: center; margin-top: 20px;">
        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  `;
}

// 에러 메시지 표시
function showErrorMessage() {
  const sidebar = document.getElementById('sidebar');
  const currentTranslations = translationsData?.translations?.[currentLanguage] || {};
  const errorText = currentTranslations.loadError || "Failed to load data. Please refresh.";
  
  sidebar.innerHTML = `
    <div class="welcome-message">
      <h2 style="color: #e74c3c;">⚠️ ${errorText}</h2>
      <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px;">🔄 새로고침 / Refresh / 刷新 / 更新</button>
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
  
  const langButtons = {
    'ko': 'btnKo',
    'en': 'btnEn', 
    'zh': 'btnZh',
    'ja': 'btnJa'
  };
  
  const buttonId = langButtons[lang];
  if (buttonId) {
    document.getElementById(buttonId)?.classList.add('active');
  }
  
  // 데이터가 로드되었을 때만 업데이트
  if (translationsData && citiesData) {
    updatePageTexts();
    updateMapPopups();
    updateRegionCards();
    
    // 사이드바가 열려있다면 업데이트
    if (selectedCity) {
      showCityFoods(selectedCity);
    }
  }
  
  console.log(`Language changed to: ${currentLanguage}`);
}

// 페이지 텍스트 업데이트
function updatePageTexts() {
  if (!translationsData) return;
  
  const t = translationsData.translations[currentLanguage];
  if (!t) return;
  
  // 기본 요소들
  const elements = {
    'pageTitle': t.pageTitle,
    'mainTitle': t.mainTitle,
    'subtitle': t.subtitle,
    'searchBtn': t.searchBtn,
    'welcomeTitle': t.welcomeTitle,
    'welcomeText': t.welcomeText,
    'regionsTitle': t.regionsTitle,
    'instructionsTitle': t.instructionsTitle,
    'instruction1': t.instruction1,
    'instruction2': t.instruction2,
    'instruction3': t.instruction3,
    'statRegions': t.statRegions,
    'statFoods': t.statFoods,
    'statTaste': t.statTaste
  };
  
  Object.keys(elements).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = elements[id];
    }
  });
  
  // 검색창 placeholder
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = t.searchPlaceholder;
  }
}

// 지역 카드 업데이트
function updateRegionCards() {
  if (!citiesData || !foodsData) return;
  
  Object.keys(citiesData.cities).forEach(cityKey => {
    const cityData = citiesData.cities[cityKey];
    
    // 도시 이름 업데이트
    const cityElement = document.getElementById(cityKey);
    if (cityElement && cityData.name) {
      cityElement.textContent = cityData.name[currentLanguage] || cityData.name.ko;
    }
    
    // 음식 목록 업데이트
    const foodsElement = document.getElementById(cityKey + 'Foods');
    if (foodsElement && cityData.foods) {
      const foodNames = cityData.foods.map(foodId => {
        const food = foodsData.foods[foodId];
        return food ? (food.name[currentLanguage] || food.name.ko) : foodId;
      });
      foodsElement.textContent = foodNames.join(', ');
    }
  });
}

// 지도 팝업 업데이트
function updateMapPopups() {
  if (!citiesData || !translationsData) return;
  
  const t = translationsData.translations[currentLanguage];
  if (!t) return;
  
  Object.keys(markers).forEach(cityKey => {
    const city = citiesData.cities[cityKey];
    if (city && city.name) {
      const cityName = city.name[currentLanguage] || city.name.ko;
      const popup = `<strong>${cityName}</strong><br>${t.clickToSee}`;
      markers[cityKey].setPopupContent(popup);
    }
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
  // 기본 언어 설정
  document.getElementById('btnKo')?.classList.add('active');
  
  // 데이터 로드
  const dataLoaded = await loadAllData();
  
  if (dataLoaded) {
    // 텍스트 업데이트
    updatePageTexts();
    updateRegionCards();
    
    // 지도 초기화
    setTimeout(() => {
      initMap();
    }, 300);
  }
});

// 지도 초기화
function initMap() {
  if (!citiesData) {
    console.error('Cities data not loaded');
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
  if (!citiesData || !translationsData) return;
  
  console.log("Adding city markers...");
  const t = translationsData.translations[currentLanguage];
  
  Object.keys(citiesData.cities).forEach(cityKey => {
    const city = citiesData.cities[cityKey];
    const cityName = city.name[currentLanguage] || city.name.ko;
    
    console.log(`Adding marker for ${cityName} at ${city.coords}`);
    
    // 기본 파란색 마커 사용
    const marker = L.marker(city.coords)
      .addTo(map)
      .bindPopup(`<strong>${cityName}</strong><br>${t.clickToSee}`)
      .on('click', () => {
        console.log(`Clicked on ${cityName}`);
        showCityFoods(cityKey);
      });
    
    markers[cityKey] = marker;
  });
  
  console.log(`Added ${Object.keys(markers).length} markers`);
}

// 도시 음식 표시
function showCityFoods(cityKey) {
  if (!citiesData || !foodsData || !translationsData) return;
  
  const city = citiesData.cities[cityKey];
  const t = translationsData.translations[currentLanguage];
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
  const cityName = city.name[currentLanguage] || city.name.ko;
  let sidebarContent = `
    <div class="city-header">
      <h2>${cityName}${t.traditionalFoods}</h2>
      <button id="closeSidebar" onclick="closeSidebar()">${t.close}</button>
    </div>
    <div class="food-cards">
  `;
  
  city.foods.forEach(foodId => {
    const food = foodsData.foods[foodId];
    if (food) {
      const foodName = food.name[currentLanguage] || food.name.ko;
      const foodHistory = food.history[currentLanguage] || food.history.ko;
      
      sidebarContent += `
        <div class="food-card" onclick="showFoodDetail('${cityKey}', '${foodId}')">
          <h3>${foodName}</h3>
          <p class="food-preview">${foodHistory.substring(0, 50)}...</p>
          <span class="click-hint">${t.moreInfo}</span>
        </div>
      `;
    }
  });
  
  sidebarContent += '</div>';
  sidebar.innerHTML = sidebarContent;
  sidebar.classList.add('active');
}

// 음식 상세 정보 표시
function showFoodDetail(cityKey, foodId) {
  if (!citiesData || !foodsData || !translationsData) return;
  
  const city = citiesData.cities[cityKey];
  const food = foodsData.foods[foodId];
  const t = translationsData.translations[currentLanguage];
  const sidebar = document.getElementById('sidebar');
  
  const cityName = city.name[currentLanguage] || city.name.ko;
  const foodName = food.name[currentLanguage] || food.name.ko;
  const backText = t.backTo.replace('{city}', cityName);
  
  const detailContent = `
    <div class="city-header">
      <button onclick="showCityFoods('${cityKey}')" class="back-btn">${backText}</button>
      <button id="closeSidebar" onclick="closeSidebar()">${t.close}</button>
    </div>
    <div class="food-detail">
      <h2>${foodName}</h2>
      
      <div class="detail-section">
        <h3>${t.historyTitle}</h3>
        <p>${food.history[currentLanguage] || food.history.ko}</p>
      </div>
      
      <div class="detail-section">
        <h3>${t.geographyTitle}</h3>
        <p>${food.geography[currentLanguage] || food.geography.ko}</p>
      </div>
      
      <div class="detail-section">
        <h3>${t.cultureTitle}</h3>
        <p>${food.culture[currentLanguage] || food.culture.ko}</p>
      </div>
      
      <div class="detail-section fun-fact">
        <h3>${t.funFactTitle}</h3>
        <p>${food.fun_fact[currentLanguage] || food.fun_fact.ko}</p>
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
  if (!foodsData || !citiesData || !translationsData) return;
  
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const t = translationsData.translations[currentLanguage];
  
  if (!searchTerm) {
    alert(t.enterFoodName);
    return;
  }
  
  let found = false;
  let foundCity = null;
  let foundFood = null;
  
  // 모든 도시의 음식 검색
  Object.keys(citiesData.cities).forEach(cityKey => {
    const city = citiesData.cities[cityKey];
    city.foods.forEach(foodId => {
      const food = foodsData.foods[foodId];
      if (food) {
        const foodName = food.name[currentLanguage] || food.name.ko;
        if (foodName.toLowerCase().includes(searchTerm)) {
          found = true;
          foundCity = cityKey;
          foundFood = foodId;
        }
      }
    });
  });
  
  if (found) {
    // 해당 도시로 이동
    const city = citiesData.cities[foundCity];
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
  if (!citiesData || !foodsData || !translationsData) return;
  
  const sidebar = document.getElementById('sidebar');
  const t = translationsData.translations[currentLanguage];
  let foodList = [];
  
  Object.keys(citiesData.cities).forEach(cityKey => {
    const city = citiesData.cities[cityKey];
    city.foods.forEach(foodId => {
      const food = foodsData.foods[foodId];
      if (food) {
        const foodName = food.name[currentLanguage] || food.name.ko;
        const cityName = city.name[currentLanguage] || city.name.ko;
        
        foodList.push({
          name: foodName,
          city: cityName,
          cityKey: cityKey,
          foodId: foodId
        });
      }
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
