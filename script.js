// 한국 전통 요리 지도 - 다국어 지원 (한국어/영어)
let map;
let markers = {};
let selectedCity = null;
let currentLanguage = 'ko';

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
    funFactTitle: "💡 흥미로운 사실"
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
    funFactTitle: "💡 Fun Facts"
  }
};

// 지역별 음식 데이터 (한국어/영어)
const foodData = {
  cities: {
    seoul: {
      name: { ko: "서울", en: "Seoul" },
      coords: [37.5665, 126.9780],
      foods: {
        bulgogi: {
          name: { ko: "불고기", en: "Bulgogi" },
          history: {
            ko: "조선시대 궁중요리에서 시작된 불고기는 원래 '너비아니'라고 불렸습니다. 고기를 얇게 저며 양념에 재워 구운 요리로, 서울 양반가의 대표적인 접대 음식이었습니다.",
            en: "Bulgogi originated from royal court cuisine during the Joseon Dynasty, originally called 'Neobiani'. This dish of thinly sliced, marinated grilled beef was a signature hospitality food of Seoul's aristocratic families."
          },
          geography: {
            ko: "서울의 한강 유역은 예로부터 소를 기르기에 좋은 환경이었고, 궁궐과 양반가가 많아 고급 육류 요리 문화가 발달했습니다.",
            en: "Seoul's Han River basin provided ideal conditions for cattle farming, and the presence of palaces and noble families fostered the development of refined meat cuisine culture."
          },
          culture: {
            ko: "불고기는 한국의 '정(情)' 문화를 대표하는 음식입니다. 가족이나 손님과 함께 둘러앉아 구워 먹으며 소통하는 한국인의 공동체 문화를 보여줍니다.",
            en: "Bulgogi represents Korea's 'jeong' (affection) culture. It embodies Korean communal culture where families and guests gather around to grill and share meals together."
          },
          fun_fact: {
            ko: "불고기는 세계에서 가장 유명한 한국 음식 중 하나로, 'Korean BBQ'라는 이름으로 전 세계에 한국 음식을 알리는 대표 음식이 되었습니다.",
            en: "Bulgogi is one of the world's most famous Korean dishes, becoming the flagship food that introduced Korean cuisine globally under the name 'Korean BBQ'."
          }
        },
        pyeongyang_naengmyeon: {
          name: { ko: "평양냉면", en: "Pyeongyang Naengmyeon" },
          history: {
            ko: "평양에서 시작된 냉면이 6.25 전쟁 이후 피난민들에 의해 서울로 전해졌습니다. 을지로와 명동 일대의 평양냉면집들이 그 전통을 이어가고 있습니다.",
            en: "This cold noodle dish from Pyeongyang was brought to Seoul by refugees after the Korean War. Restaurants in Euljiro and Myeongdong continue this tradition today."
          },
          geography: {
            ko: "원래 평양의 추운 겨울 날씨에 시원한 냉면을 먹는 문화에서 시작되었지만, 서울에서는 여름 별미로 자리잡았습니다.",
            en: "Originally from Pyeongyang's cold winter culture of eating cool noodles, it has established itself as a summer delicacy in Seoul."
          },
          culture: {
            ko: "분단의 아픔과 향수를 담은 음식입니다. 고향을 그리워하는 실향민들의 마음이 담긴 음식으로, 한국 현대사의 산증인이기도 합니다.",
            en: "A dish that carries the pain of division and nostalgia. It embodies the longing hearts of displaced people and serves as a witness to modern Korean history."
          },
          fun_fact: {
            ko: "진짜 평양냉면은 면을 가위로 자르지 않고 후루룩 소리내며 먹는 것이 예의입니다. 면을 끊는 것은 인연을 끊는다는 의미로 여겨졌기 때문입니다.",
            en: "Authentic Pyeongyang naengmyeon should be eaten by slurping without cutting the noodles with scissors, as cutting was believed to sever relationships."
          }
        }
      }
    },
    busan: {
      name: { ko: "부산", en: "Busan" },
      coords: [35.1796, 129.0756],
      foods: {
        milmyeon: {
          name: { ko: "밀면", en: "Milmyeon" },
          history: {
            ko: "6.25 전쟁 당시 북한 실향민들이 평양냉면을 그리워하며 구하기 쉬운 밀가루로 만든 면요리입니다. 1950년대 부산 피난촌에서 시작되었습니다.",
            en: "Created by North Korean refugees during the Korean War who missed Pyeongyang naengmyeon and used easily available wheat flour. It started in Busan refugee camps in the 1950s."
          },
          geography: {
            ko: "부산항을 통해 들어온 미군 구호물자인 밀가루를 이용해 만든 음식으로, 항구도시 부산의 역사를 보여줍니다.",
            en: "Made with wheat flour from US relief supplies that came through Busan Port, reflecting the history of this port city."
          },
          culture: {
            ko: "전쟁의 아픔과 고향에 대한 그리움, 그리고 새로운 환경에 적응하려는 강인한 생존력이 담긴 음식입니다.",
            en: "A dish that embodies the pain of war, longing for homeland, and the resilient survival spirit of adapting to new environments."
          },
          fun_fact: {
            ko: "밀면은 냉면과 달리 면발이 쫄깃하고 탄력이 있어 '부산의 소울푸드'라고 불립니다.",
            en: "Unlike naengmyeon, milmyeon has chewy and elastic noodles, earning it the nickname 'Busan's soul food'."
          }
        }
      }
    },
    jeonju: {
      name: { ko: "전주", en: "Jeonju" },
      coords: [35.8242, 127.1480],
      foods: {
        bibimbap: {
          name: { ko: "비빔밥", en: "Bibimbap" },
          history: {
            ko: "조선왕조의 발상지 전주에서 시작된 비빔밥은 궁중에서 먹던 골동반에서 유래되었습니다. 다양한 나물을 한 그릇에 담아 비벼 먹는 한국의 대표적인 건강식입니다.",
            en: "Originating in Jeonju, the birthplace of the Joseon Dynasty, bibimbap derives from 'goldongban' eaten in the royal court. It's Korea's representative healthy dish mixing various vegetables in one bowl."
          },
          geography: {
            ko: "전라북도의 비옥한 평야지대에서 나는 다양한 채소와 곡물을 이용해 만든 음식으로, 호남평야의 풍요로움을 보여줍니다.",
            en: "Made with diverse vegetables and grains from Jeollabuk-do's fertile plains, showcasing the abundance of the Honam Plain."
          },
          culture: {
            ko: "음양오행의 조화를 중시하는 한국의 전통 철학이 담긴 음식입니다. 다섯 가지 색깔의 나물로 건강과 조화를 추구합니다.",
            en: "A dish embodying Korean traditional philosophy that values the harmony of yin-yang and five elements, pursuing health and balance through five colored vegetables."
          },
          fun_fact: {
            ko: "전주 비빔밥은 2011년 CNN에서 선정한 '세계에서 가장 맛있는 음식 40선'에 선정되었습니다.",
            en: "Jeonju bibimbap was selected as one of CNN's '40 Most Delicious Foods in the World' in 2011."
          }
        }
      }
    }
    // 더 많은 도시들... (간소화를 위해 3개만 예시)
  }
};

// 언어 변경 함수
function changeLanguage(lang) {
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
  updateMapPopups();
  
  // 사이드바가 열려있다면 업데이트
  if (selectedCity) {
    showCityFoods(selectedCity);
  }
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
  
  // 도시 이름들
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    const cityElement = document.getElementById(cityKey);
    if (cityElement) {
      cityElement.textContent = city.name[currentLanguage];
    }
  });
}

// 지도 팝업 업데이트
function updateMapPopups() {
  Object.keys(markers).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    const popup = `<strong>${city.name[currentLanguage]}</strong><br>${translations[currentLanguage].clickToSee}`;
    markers[cityKey].setPopupContent(popup);
  });
}

// 페이지 로드 시 지도 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기본 언어 설정
  document.getElementById('btnKo').classList.add('active');
  updatePageTexts();
  
  // DOM이 완전히 로드된 후 약간의 지연을 두고 지도 초기화
  setTimeout(() => {
    initMap();
  }, 300);
});

// 지도 초기화
function initMap() {
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
  
  // 지도 크기 강제 재조정 (여러 번 시도)
  setTimeout(() => {
    map.invalidateSize(true);
    // 모든 마커 추가
    addCityMarkers();
  }, 100);
  
  setTimeout(() => {
    map.invalidateSize(true);
  }, 500);
  
  setTimeout(() => {
    map.invalidateSize(true);
  }, 1000);
}

// 도시 마커 추가
function addCityMarkers() {
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
      <h2>${city.name[currentLanguage]}${currentLanguage === 'ko' ? '의 전통 요리' : ' Traditional Foods'}</h2>
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
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  
  if (!searchTerm) {
    alert(translations[currentLanguage].enterFoodName);
    return;
  }
  
  let found = false;
  let foundCity = null;
  let foundFood = null;
  
  // 모든 도시의 음식 검색 (현재 언어로)
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
