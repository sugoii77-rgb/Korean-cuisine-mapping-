// Global variables
let map;
let currentLang = 'ko';
let cityMarkers = {};
let allFoodsData = {};
let highlightedMarker = null;

// Translation data
const translations = {
    ko: {
        appTitle: '한국 전통 요리 지도',
        searchPlaceholder: '음식 이름으로 검색...',
        selectFood: '음식을 선택해주세요',
        selectFoodDesc: '지도에서 도시를 클릭하고 음식을 선택하면 상세 정보가 표시됩니다.',
        cityFoods: '도시 음식',
        about: '소개'
    },
    en: {
        appTitle: 'Korean Traditional Food Map',
        searchPlaceholder: 'Search for food...',
        selectFood: 'Select a Food',
        selectFoodDesc: 'Click on a city on the map and select a food to view detailed information.',
        cityFoods: 'City Foods',
        about: 'About'
    },
    ja: {
        appTitle: '韓国伝統料理マップ',
        searchPlaceholder: '料理名で検索...',
        selectFood: '料理を選択してください',
        selectFoodDesc: '地図上の都市をクリックして料理を選択すると、詳細情報が表示されます。',
        cityFoods: '都市の料理',
        about: '紹介'
    },
    zh: {
        appTitle: '韩国传统料理地图',
        searchPlaceholder: '搜索料理名称...',
        selectFood: '请选择料理',
        selectFoodDesc: '点击地图上的城市并选择料理，即可查看详细信息。',
        cityFoods: '城市料理',
        about: '介绍'
    }
};

// City coordinates and data
const cities = {
    seoul: { name: 'seoul', coords: [37.5665, 126.9780], dataFile: 'seoul.json' },
    busan: { name: 'busan', coords: [35.1796, 129.0756], dataFile: 'busan.json' },
    jeonju: { name: 'jeonju', coords: [35.8242, 127.1480], dataFile: 'jeonju.json' },
    jeju: { name: 'jeju', coords: [33.4996, 126.5312], dataFile: 'jeju.json' },
    gangneung: { name: 'gangneung', coords: [37.7556, 128.8760], dataFile: 'gangneung.json' },
    andong: { name: 'andong', coords: [36.5684, 128.7294], dataFile: 'andong.json' }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet is not loaded!');
        return;
    }
    
    initializeMap();
    initializeEventListeners();
    loadInitialData();
    
    console.log('App initialization complete');
});

function initializeMap() {
    // Initialize Leaflet map
    map = L.map('map').setView([36.5, 127.5], 7);
    
    // Add OpenStreetMap tiles with error handling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        detectRetina: true,
        crossOrigin: true
    }).addTo(map).on('tileerror', function(error) {
        console.error('Tile loading error:', error);
        // Fallback to alternative tile server
        L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    });
    
    // Add city markers
    Object.keys(cities).forEach(cityKey => {
        const city = cities[cityKey];
        const marker = L.marker(city.coords, {
            icon: L.divIcon({
                className: 'custom-marker',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(map);
        
        marker.cityKey = cityKey;
        marker.on('click', () => handleCityClick(cityKey));
        cityMarkers[cityKey] = marker;
    });
}

function initializeEventListeners() {
    // Language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('food-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', showSearchResults);
    searchInput.addEventListener('blur', () => {
        setTimeout(hideSearchResults, 200);
    });
    
    // Modal close buttons
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-overlay')) {
            closeModal();
        }
    });
    
    // Details panel close button
    document.getElementById('close-panel').addEventListener('click', closeDetailsPanel);
}

async function loadInitialData() {
    try {
        // First try to load Seoul data from JSON file
        await loadCityData('seoul');
        updateUI();
        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Error loading initial data:', error);
        // If JSON loading fails, ensure mock data is available
        if (!allFoodsData['seoul']) {
            getMockCityData('seoul');
        }
        updateUI();
    }
}

async function loadCityData(cityKey) {
    if (allFoodsData[cityKey]) {
        return allFoodsData[cityKey];
    }
    
    try {
        const response = await fetch(`data/${cities[cityKey].dataFile}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allFoodsData[cityKey] = data;
        return data;
    } catch (error) {
        console.error(`Error loading data for ${cityKey}:`, error);
        // Return mock data if file doesn't exist
        return getMockCityData(cityKey);
    }
}

function getMockCityData(cityKey) {
    const mockData = {
        seoul: {
            city_ko: '서울', city_en: 'Seoul', city_ja: 'ソウル', city_zh: '首尔',
            foods: [
                {
                    name_ko: '초당순두부', name_en: 'Chodang Sundubu', name_ja: '草堂純豆腐', name_zh: '草堂嫩豆腐',
                    description: {
                        ko: '강릉 초당순두부는 바닷물로 만든 순두부로 유명합니다. 동해안의 깨끗한 바닷물을 간수로 사용하여 만든 순두부는 부드럽고 고소한 맛이 일품입니다.',
                        en: 'Gangneung Chodang Sundubu is famous for soft tofu made with seawater. The soft tofu made using clean East Sea water as a coagulant has an exceptionally smooth and nutty flavor.',
                        ja: '江陵草堂純豆腐は海水で作った純豆腐で有名です。東海岸のきれいな海水をにがりとして使用して作った純豆腐は、柔らかく香ばしい味が絶品です。',
                        zh: '江陵草堂嫩豆腐以用海水制作的嫩豆腐而闻名。使用东海岸清洁海水作为凝固剂制作的嫩豆腐，口感柔滑香醇。'
                    }
                }
            ]
        },
        andong: {
            city_ko: '안동', city_en: 'Andong', city_ja: '安東', city_zh: '安东',
            foods: [
                {
                    name_ko: '안동찜닭', name_en: 'Andong Jjimdak', name_ja: '安東チムタク', name_zh: '安东炖鸡',
                    description: {
                        ko: '안동찜닭은 닭고기와 각종 채소, 당면을 간장 양념에 조린 안동의 대표 음식입니다. 달콤짭짤한 맛과 쫄깃한 식감이 특징입니다.',
                        en: 'Andong Jjimdak is Andong\'s representative dish featuring chicken braised with various vegetables and glass noodles in soy sauce seasoning. It\'s characterized by sweet and savory flavors with chewy texture.',
                        ja: '安東チムタクは鶏肉と各種野菜、春雨を醤油ベースのタレで煮込んだ安東の代表料理です。甘辛い味ともちもちした食感が特徴です。',
                        zh: '安东炖鸡是用鸡肉和各种蔬菜、粉条用酱油调料炖制的安东代表料理。具有甜咸口味和有嚼劲的口感特色。'
                    }
                }
            ]
        }
    };
    
    const data = mockData[cityKey];
    allFoodsData[cityKey] = data;
    return data;
}

async function handleCityClick(cityKey) {
    try {
        const cityData = await loadCityData(cityKey);
        showCityFoodsModal(cityData);
    } catch (error) {
        console.error(`Error handling city click for ${cityKey}:`, error);
    }
}

function showCityFoodsModal(cityData) {
    const modal = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const foodsList = document.getElementById('foods-list');
    
    // Set modal title
    modalTitle.textContent = `${cityData[`city_${currentLang}`]} - ${translations[currentLang].cityFoods}`;
    
    // Clear previous foods
    foodsList.innerHTML = '';
    
    // Add foods to modal
    cityData.foods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <h4>${food[`name_${currentLang}`]}</h4>
            <p>${food.description[currentLang].substring(0, 100)}...</p>
        `;
        
        foodItem.addEventListener('click', () => {
            showFoodDetails(food);
            closeModal();
        });
        
        foodsList.appendChild(foodItem);
    });
    
    modal.classList.add('active');
}

function showFoodDetails(food) {
    const panel = document.getElementById('details-panel');
    const panelTitle = document.getElementById('panel-title');
    const panelContent = document.getElementById('panel-content');
    
    panelTitle.textContent = food[`name_${currentLang}`];
    panelContent.innerHTML = `
        <div class="food-detail">
            <h4>${food[`name_${currentLang}`]}</h4>
            <p>${food.description[currentLang]}</p>
        </div>
    `;
    
    panel.classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function closeDetailsPanel() {
    document.getElementById('details-panel').classList.remove('active');
}

function handleSearch() {
    const searchTerm = document.getElementById('food-search').value.toLowerCase().trim();
    const searchResults = document.getElementById('search-results');
    
    if (searchTerm === '') {
        hideSearchResults();
        clearHighlights();
        return;
    }
    
    const results = [];
    
    Object.keys(allFoodsData).forEach(cityKey => {
        const cityData = allFoodsData[cityKey];
        cityData.foods.forEach(food => {
            const foodName = food[`name_${currentLang}`].toLowerCase();
            if (foodName.includes(searchTerm)) {
                results.push({
                    cityKey: cityKey,
                    cityName: cityData[`city_${currentLang}`],
                    food: food
                });
            }
        });
    });
    
    displaySearchResults(results);
    highlightMatchingCities(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.style.display = 'none';
        return;
    }
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <strong>${result.food[`name_${currentLang}`]}</strong> - ${result.cityName}
        `;
        
        resultItem.addEventListener('click', () => {
            showFoodDetails(result.food);
            hideSearchResults();
            document.getElementById('food-search').value = result.food[`name_${currentLang}`];
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

function showSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults.innerHTML.trim() !== '') {
        searchResults.style.display = 'block';
    }
}

function hideSearchResults() {
    document.getElementById('search-results').style.display = 'none';
}

function highlightMatchingCities(results) {
    clearHighlights();
    
    const matchingCities = [...new Set(results.map(r => r.cityKey))];
    
    matchingCities.forEach(cityKey => {
        const marker = cityMarkers[cityKey];
        if (marker) {
            const markerElement = marker.getElement();
            if (markerElement) {
                markerElement.classList.add('highlighted-marker');
            }
        }
    });
}

function clearHighlights() {
    Object.keys(cityMarkers).forEach(cityKey => {
        const marker = cityMarkers[cityKey];
        const markerElement = marker.getElement();
        if (markerElement) {
            markerElement.classList.remove('highlighted-marker');
        }
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    updateUI();
}

function updateUI() {
    // Update page title and text elements
    document.getElementById('app-title').textContent = translations[currentLang].appTitle;
    document.getElementById('food-search').placeholder = translations[currentLang].searchPlaceholder;
    document.getElementById('panel-title').textContent = translations[currentLang].selectFood;
    document.getElementById('panel-placeholder').textContent = translations[currentLang].selectFoodDesc;
    
    // Update about button title
    document.querySelector('.about-btn').title = translations[currentLang].about;
    
    // Update document title
    document.title = translations[currentLang].appTitle;
    
    // Clear search results when language changes
    document.getElementById('food-search').value = '';
    hideSearchResults();
    clearHighlights();
    closeDetailsPanel();
    closeModal();
}

// Utility function to get marker element (for Leaflet divIcon)
L.Marker.prototype.getElement = function() {
    return this._icon;
};ko: '불고기', name_en: 'Bulgogi', name_ja: 'プルコギ', name_zh: '烤肉',
                    description: {
                        ko: '불고기는 조선 시대부터 전해내려온 대표적인 한국 요리입니다. 얇게 썬 소고기를 간장 양념에 재워 구운 음식으로, 달콤하고 짭짤한 맛이 특징입니다.',
                        en: 'Bulgogi is a representative Korean dish that has been passed down since the Joseon Dynasty. It features thinly sliced beef marinated in soy sauce and grilled, known for its sweet and savory flavor.',
                        ja: 'プルコギは朝鮮王朝時代から伝わる代表的な韓国料理です。薄切りの牛肉を醤油ベースのタレに漬け込んで焼いた料理で、甘辛い味が特徴です。',
                        zh: '烤肉是从朝鲜王朝时期传承至今的代表性韩国料理。将薄切牛肉用酱油调料腌制后烧烤，具有甜咸的特色口味。'
                    }
                },
                {
                    name_ko: '김치찌개', name_en: 'Kimchi Jjigae', name_ja: 'キムチチゲ', name_zh: '泡菜汤',
                    description: {
                        ko: '김치찌개는 한국의 대표적인 국물 요리로, 신김치와 돼지고기, 두부 등을 넣고 끓인 매콤한 찌개입니다. 특히 추운 겨울철에 인기가 높습니다.',
                        en: 'Kimchi Jjigae is a representative Korean soup dish, a spicy stew made with aged kimchi, pork, and tofu. It is especially popular during cold winter months.',
                        ja: 'キムチチゲは韓国の代表的なスープ料理で、古漬けキムチと豚肉、豆腐などを入れて煮込んだ辛い鍋料理です。特に寒い冬に人気があります。',
                        zh: '泡菜汤是韩国代表性的汤类料理，用陈年泡菜、猪肉、豆腐等煮制的辣味汤品。在寒冷的冬季特别受欢迎。'
                    }
                }
            ]
        },
        busan: {
            city_ko: '부산', city_en: 'Busan', city_ja: '釜山', city_zh: '釜山',
            foods: [
                {
                    name_ko: '돼지국밥', name_en: 'Dwaeji Gukbap', name_ja: '豚クッパ', name_zh: '猪肉汤饭',
                    description: {
                        ko: '돼지국밥은 부산의 대표 향토음식으로, 돼지뼈를 우린 진한 국물에 밥을 말아먹는 음식입니다. 부산 사람들의 소울푸드로 불립니다.',
                        en: 'Dwaeji Gukbap is Busan\'s representative local dish, featuring rice served in a rich broth made from pork bones. It\'s called the soul food of Busan people.',
                        ja: '豚クッパは釜山の代表的な郷土料理で、豚骨で取った濃厚なスープにご飯を入れて食べる料理です。釜山の人々のソウルフードと呼ばれています。',
                        zh: '猪肉汤饭是釜山的代表性乡土料理，用猪骨熬制的浓郁汤汁泡饭食用。被称为釜山人的灵魂美食。'
                    }
                }
            ]
        },
        jeonju: {
            city_ko: '전주', city_en: 'Jeonju', city_ja: '全州', city_zh: '全州',
            foods: [
                {
                    name_ko: '비빔밥', name_en: 'Bibimbap', name_ja: 'ビビンバ', name_zh: '拌饭',
                    description: {
                        ko: '전주 비빔밥은 다양한 나물과 고기, 계란을 밥 위에 올리고 고추장을 넣어 비벼먹는 음식입니다. 영양 균형이 뛰어나고 색깔이 아름다운 대표적인 한식입니다.',
                        en: 'Jeonju Bibimbap is a dish where various seasoned vegetables, meat, and egg are placed on rice and mixed with gochujang. It\'s a representative Korean dish with excellent nutritional balance and beautiful colors.',
                        ja: '全州ビビンバは様々なナムルと肉、卵をご飯の上に載せ、コチュジャンを入れて混ぜて食べる料理です。栄養バランスが優れ、色彩が美しい代表的な韓国料理です。',
                        zh: '全州拌饭是将各种凉拌蔬菜、肉类、鸡蛋放在米饭上，加入韩式辣椒酱拌制食用的料理。营养均衡且色彩美丽的代表性韩式料理。'
                    }
                }
            ]
        },
        jeju: {
            city_ko: '제주', city_en: 'Jeju', city_ja: '済州', city_zh: '济州',
            foods: [
                {
                    name_ko: '흑돼지 구이', name_en: 'Black Pork BBQ', name_ja: '黒豚焼肉', name_zh: '黑猪肉烧烤',
                    description: {
                        ko: '제주 흑돼지는 제주도의 특산품으로, 일반 돼지고기보다 육질이 부드럽고 고소한 맛이 특징입니다. 제주도 여행의 필수 먹거리로 인기가 높습니다.',
                        en: 'Jeju Black Pork is a specialty of Jeju Island, characterized by tender meat and savory flavor compared to regular pork. It\'s a must-try food when traveling to Jeju Island.',
                        ja: '済州黒豚は済州島の特産品で、一般の豚肉より肉質が柔らかく、香ばしい味が特徴です。済州島旅行の必須グルメとして人気が高いです。',
                        zh: '济州黑猪肉是济州岛的特产，相比普通猪肉肉质更加柔嫩，味道香醇。是济州岛旅行的必尝美食。'
                    }
                }
            ]
        },
        gangneung: {
            city_ko: '강릉', city_en: 'Gangneung', city_ja: '江陵', city_zh: '江陵',
            foods: [
                {
                    name_
