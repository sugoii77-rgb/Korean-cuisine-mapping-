// 한국 전통 요리 지도 - 4개 언어 지원 (통합형)
let map;
let markers = {};
let selectedCity = null;
let currentLanguage = 'ko';

// 번역 데이터 (통합)
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
    traditionalFoods: "의 전통 요리"
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
    traditionalFoods: " Traditional Foods"
  },
  zh: {
    pageTitle: "韩国传统美食地图 🍽️",
    mainTitle: "🗺️ 韩国传统美食地图",
    subtitle: "点击地区或搜索美食！",
    searchPlaceholder: "输入美食名称（例如：烤肉、拌饭）",
    searchBtn: "🔍 搜索",
    welcomeTitle: "🇰🇷 韩国美味之旅",
    welcomeText: "在地图上选择地区，发现当地的传统美食！",
    regionsTitle: "📍 主要地区",
    instructionsTitle: "💡 使用方法",
    instruction1: "🗺️ 点击地图上的蓝色标记",
    instruction2: "🔍 在上方搜索框中输入美食名称",
    instruction3: "📱 支持移动设备友好界面",
    statRegions: "个地区",
    statFoods: "道菜品",
    statTaste: "韩国味道",
    clickToSee: "点击查看传统美食",
    moreInfo: "了解更多 →",
    backTo: "← {city}",
    close: "×",
    searchNoResults: "未找到搜索结果。请从下面的列表中选择：",
    searchAllFoods: "🔍 全部美食列表",
    enterFoodName: "请输入美食名称！",
    historyTitle: "🏛️ 历史",
    geographyTitle: "🗺️ 地理",
    cultureTitle: "🎭 文化",
    funFactTitle: "💡 有趣事实",
    traditionalFoods: "的传统美食"
  },
  ja: {
    pageTitle: "韓国伝統料理マップ 🍽️",
    mainTitle: "🗺️ 韓国伝統料理マップ",
    subtitle: "地域をクリックするか料理を検索してください！",
    searchPlaceholder: "料理名を入力してください（例：プルコギ、ビビンバ）",
    searchBtn: "🔍 検索",
    welcomeTitle: "🇰🇷 韓国の美味しい旅",
    welcomeText: "地図で地域を選択すると、その地域の伝統料理に出会えます！",
    regionsTitle: "📍 主要地域",
    instructionsTitle: "💡 使い方",
    instruction1: "🗺️ 地図の青いマーカーをクリックしてください",
    instruction2: "🔍 上の検索ボックスに料理名を入力してください",
    instruction3: "📱 モバイルでも便利に使用できます",
    statRegions: "地域",
    statFoods: "料理",
    statTaste: "韓国の味",
    clickToSee: "クリックして伝統料理を見る",
    moreInfo: "詳しく見る →",
    backTo: "← {city}",
    close: "×",
    searchNoResults: "検索結果がありません。下のリストから選択してください：",
    searchAllFoods: "🔍 全料理リスト",
    enterFoodName: "料理名を入力してください！",
    historyTitle: "🏛️ 歴史",
    geographyTitle: "🗺️ 地理",
    cultureTitle: "🎭 文化",
    funFactTitle: "💡 面白い事実",
    traditionalFoods: "の伝統料理"
  }
};

// 음식 데이터 (통합)
const foodsData = {
  bulgogi: {
    name: {
      ko: "불고기",
      en: "Bulgogi",
      zh: "烤肉",
      ja: "プルコギ"
    },
    history: {
      ko: "조선시대 궁중요리에서 시작된 불고기는 원래 '너비아니'라고 불렸습니다. 고기를 얇게 저며 양념에 재워 구운 요리로, 서울 양반가의 대표적인 접대 음식이었습니다.",
      en: "Bulgogi originated from royal court cuisine during the Joseon Dynasty, originally called 'Neobiani'. This dish of thinly sliced, marinated grilled beef was a signature hospitality food of Seoul's aristocratic families.",
      zh: "烤肉起源于朝鲜王朝的宫廷料理，原名叫'너비아니'。这道菜是将牛肉切成薄片，用调料腌制后烤制而成，是首尔贵族家庭的代表性招待菜品。",
      ja: "プルコギは朝鮮時代の宮廷料理から始まり、元々は「ノビアニ」と呼ばれていました。肉を薄切りにして調味料に漬け込んで焼いた料理で、ソウルの両班家の代表的なもてなし料理でした。"
    },
    geography: {
      ko: "서울의 한강 유역은 예로부터 소를 기르기에 좋은 환경이었고, 궁궐과 양반가가 많아 고급 육류 요리 문화가 발달했습니다.",
      en: "Seoul's Han River basin provided ideal conditions for cattle farming, and the presence of palaces and noble families fostered the development of refined meat cuisine culture.",
      zh: "首尔的汉江流域自古以来就是养牛的理想环境，由于宫殿和贵族家庭众多，高级肉类料理文化得以发展。",
      ja: "ソウルの漢江流域は昔から牛を飼うのに良い環境で、宮殿と両班家が多く、高級肉料理文化が発達しました。"
    },
    culture: {
      ko: "불고기는 한국의 '정(情)' 문화를 대표하는 음식입니다. 가족이나 손님과 함께 둘러앉아 구워 먹으며 소통하는 한국인의 공동체 문화를 보여줍니다.",
      en: "Bulgogi represents Korea's 'jeong' (affection) culture. It embodies Korean communal culture where families and guests gather around to grill and share meals together.",
      zh: "烤肉代表了韩国的'情'文化。体现了韩国人围坐一起烤肉用餐，相互交流的共同体文化。",
      ja: "プルコギは韓国の「情（ジョン）」文化を代表する食べ物です。家族や客人と一緒に座って焼いて食べながら交流する韓国人の共同体文化を表しています。"
    },
    fun_fact: {
      ko: "불고기는 세계에서 가장 유명한 한국 음식 중 하나로, 'Korean BBQ'라는 이름으로 전 세계에 한국 음식을 알리는 대표 음식이 되었습니다.",
      en: "Bulgogi is one of the world's most famous Korean dishes, becoming the flagship food that introduced Korean cuisine globally under the name 'Korean BBQ'.",
      zh: "烤肉是世界上最著名的韩国料理之一，以'Korean BBQ'的名称向全世界推广韩国料理的代表性食品。",
      ja: "プルコギは世界で最も有名な韓国料理の一つで、「Korean BBQ」という名前で全世界に韓国料理を知らせる代表的な食べ物となりました。"
    }
  },
  bibimbap: {
    name: {
      ko: "비빔밥",
      en: "Bibimbap",
      zh: "拌饭",
      ja: "ビビンバ"
    },
    history: {
      ko: "조선왕조의 발상지 전주에서 시작된 비빔밥은 궁중에서 먹던 골동반에서 유래되었습니다.",
      en: "Originating in Jeonju, birthplace of the Joseon Dynasty, bibimbap derives from 'goldongban' eaten in the royal court.",
      zh: "起源于朝鲜王朝发祥地全州的拌饭，源自宫廷中食用的骨董饭。",
      ja: "朝鮮王朝の発祥地である全州で始まったビビンバは、宮中で食べられていた骨董飯に由来します。"
    },
    geography: {
      ko: "전라북도의 비옥한 평야지대에서 나는 다양한 채소와 곡물을 이용해 만든 음식입니다.",
      en: "Made with diverse vegetables and grains from Jeollabuk-do's fertile plains.",
      zh: "使用全罗北道肥沃平原地带出产的各种蔬菜和谷物制作。",
      ja: "全羅北道の肥沃な平野地帯で取れる様々な野菜と穀物を使って作った料理です。"
    },
    culture: {
      ko: "음양오행의 조화를 중시하는 한국의 전통 철학이 담긴 음식입니다.",
      en: "A dish embodying Korean traditional philosophy that values the harmony of yin-yang and five elements.",
      zh: "体现了重视阴阳五行和谐的韩国传统哲学。",
      ja: "陰陽五行の調和を重視する韓国の伝統哲学が込められた料理です。"
    },
    fun_fact: {
      ko: "2011년 CNN에서 선정한 '세계에서 가장 맛있는 음식 40선'에 선정되었습니다.",
      en: "Selected as one of CNN's '40 Most Delicious Foods in the World' in 2011.",
      zh: "被CNN评选为2011年'世界上最美味的40种食物'之一。",
      ja: "2011年CNNが選定した「世界で最も美味しい料理40選」に選ばれました。"
    }
  },
  milmyeon: {
    name: {
      ko: "밀면",
      en: "Milmyeon",
      zh: "小麦面条",
      ja: "ミルミョン"
    },
    history: {
      ko: "6.25 전쟁 당시 북한 실향민들이 평양냉면을 그리워하며 구하기 쉬운 밀가루로 만든 면요리입니다.",
      en: "Created by North Korean refugees during the Korean War who missed Pyeongyang naengmyeon and used wheat flour.",
      zh: "朝鲜战争期间，北韩难民思念平壤冷面，用容易获得的小麦粉制作的面条料理。",
      ja: "朝鮮戦争当時、北朝鮮の避難民が平壌冷麺を懐かしんで、小麦粉で作った麺料理です。"
    },
    geography: {
      ko: "부산항을 통해 들어온 미군 구호물자인 밀가루를 이용해 만든 음식입니다.",
      en: "Made with wheat flour from US relief supplies that came through Busan Port.",
      zh: "使用通过釜山港进入的美军救济物资小麦粉制作。",
      ja: "釜山港を通して入ってきた米軍救援物資の小麦粉を利用して作った料理です。"
    },
    culture: {
      ko: "전쟁의 아픔과 고향에 대한 그리움이 담긴 음식입니다.",
      en: "A dish that embodies the pain of war and longing for homeland.",
      zh: "承载着战争的痛苦和对故乡的思念的食物。",
      ja: "戦争の痛みと故郷への思いが込められた料理です。"
    },
    fun_fact: {
      ko: "냉면과 달리 면발이 쫄깃하고 탄력이 있어 '부산의 소울푸드'라고 불립니다.",
      en: "Unlike naengmyeon, it has chewy noodles, earning the nickname 'Busan's soul food'.",
      zh: "与冷面不同，面条具有筋道弹性的口感，被称为'釜山的灵魂食物'。",
      ja: "冷麺とは違って麺にコシがあり、「釜山のソウルフード」と呼ばれています。"
    }
  },
  dakgalbi: {
    name: {
      ko: "닭갈비",
      en: "Dakgalbi",
      zh: "辣炒鸡排",
      ja: "タッカルビ"
    },
    history: {
      ko: "1960년대 춘천의 한 식당에서 저렴한 닭고기를 이용해 만든 서민 음식에서 시작되었습니다.",
      en: "Started as a common people's dish using affordable chicken at a Chuncheon restaurant in the 1960s.",
      zh: "始于1960年代春川一家餐厅使用便宜鸡肉制作的平民料理。",
      ja: "1960年代に春川のある食堂で安価な鶏肉を使って作った庶民料理から始まりました。"
    },
    geography: {
      ko: "춘천 지역의 신선한 채소와 함께 철판에 볶아 먹는 음식입니다.",
      en: "Stir-fried on iron plate with fresh vegetables from Chuncheon.",
      zh: "与春川地区的新鲜蔬菜一起在铁板上炒制的料理。",
      ja: "春川地域の新鮮な野菜と一緒に鉄板で炒めて食べる料理です。"
    },
    culture: {
      ko: "연인들과 친구들이 함께 둘러앉아 먹는 음식으로, 젊은이들의 데이트 코스로 인기가 높습니다.",
      en: "Popular as a date course for young people, enjoyed by couples and friends sitting together.",
      zh: "恋人和朋友们围坐一起享用的料理，作为年轻人的约会课程很受欢迎。",
      ja: "恋人や友人が一緒に座って食べる料理で、若者のデートコースとして人気です。"
    },
    fun_fact: {
      ko: "마지막에 볶음밥을 해먹는 것이 정석이며, 이를 '추가밥'이라고 부릅니다.",
      en: "The standard practice is to make fried rice at the end, called 'chuga-bap'.",
      zh: "标准做法是最后做炒饭，这被称为'추가밥'。",
      ja: "最後にチャーハンを作って食べるのが定石で、これを「チュガバプ」と呼びます。"
    }
  },
  heukdwaeji: {
    name: {
      ko: "흑돼지",
      en: "Black Pork",
      zh: "黑猪肉",
      ja: "黒豚"
    },
    history: {
      ko: "제주도에서 자연 방목으로 키운 재래종 돼지로, 예로부터 제주 사람들의 중요한 단백질 공급원이었습니다.",
      en: "Native pigs raised naturally on Jeju Island, serving as an important protein source since ancient times.",
      zh: "在济州岛自然放牧饲养的本土猪种，自古以来就是济州人重要的蛋白质来源。",
      ja: "済州島で自然放牧で育てた在来種の豚で、昔から済州の人々の重要なタンパク質供給源でした。"
    },
    geography: {
      ko: "제주도의 청정 자연환경에서 자란 흑돼지는 화산토 토양과 청정 공기를 먹고 자라 육질이 뛰어납니다.",
      en: "Black pigs raised in Jeju's pristine environment with volcanic soil and clean air, resulting in excellent meat quality.",
      zh: "在济州岛清洁的自然环境中，火山土壤和清洁空气下成长的黑猪，肉质优良。",
      ja: "済州島の清浄な自然環境で火山土壌と清浄な空気の中で育った黒豚は肉質が優秀です。"
    },
    culture: {
      ko: "제주도의 돌하르방만큼 제주를 대표하는 특산품으로, 제주 사람들의 소박하고 건강한 식문화를 보여줍니다.",
      en: "As representative of Jeju as the stone grandfathers, showing Jeju people's simple and healthy food culture.",
      zh: "与济州岛的石头爷爷一样代表济州的特产，展现了济州人朴素健康的饮食文化。",
      ja: "済州島のトルハルバンと同じくらい済州を代表する特産品で、済州の人々の素朴で健康的な食文化を表しています。"
    },
    fun_fact: {
      ko: "제주 흑돼지는 스트레스를 적게 받아 육질이 부드럽고, 불포화지방산 함량이 높아 건강에 좋습니다.",
      en: "Jeju black pork experiences less stress resulting in tender meat with high unsaturated fatty acid content.",
      zh: "济州黑猪受压力较少，肉质柔嫩，不饱和脂肪酸含量高，对健康有益。",
      ja: "済州黒豚はストレスを少なく受けて肉質が柔らかく、不飽和脂肪酸含量が高くて健康に良いです。"
    }
  }
};

// 도시 데이터 (통합)
const citiesData = {
  seoul: {
    name: {
      ko: "서울",
      en: "Seoul", 
      zh: "首尔",
      ja: "ソウル"
    },
    coords: [37.5665, 126.9780],
    foods: ["bulgogi"]
  },
  jeonju: {
    name: {
      ko: "전주",
      en: "Jeonju",
      zh: "全州",
      ja: "全州"
    },
    coords: [35.8242, 127.1480],
    foods: ["bibimbap"]
  },
  busan: {
    name: {
      ko: "부산",
      en: "Busan",
      zh: "釜山", 
      ja: "釜山"
    },
    coords: [35.1796, 129.0756],
    foods: ["milmyeon"]
  },
  chuncheon: {
    name: {
      ko: "춘천",
      en: "Chuncheon",
      zh: "春川",
      ja: "春川"
    },
    coords: [37.8813, 127.7298],
    foods: ["dakgalbi"]
  },
  jeju: {
    name: {
      ko: "제주",
      en: "Jeju",
      zh: "济州",
      ja: "済州"
    },
    coords: [33.4996, 126.5312],
    foods: ["heukdwaeji"]
  }
};

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
  
  // 페이지 텍스트 업데이트
  updatePageTexts();
  updateMapPopups();
  updateRegionCards();
  
  // 사이드바가 열려있다면 업데이트
  if (selectedCity) {
    showCityFoods(selectedCity);
  }
  
  console.log(`Language changed to: ${currentLanguage}`);
}

// 페이지 텍스트 업데이트
function updatePageTexts() {
  const t = translations[currentLanguage];
  
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
  Object.keys(citiesData).forEach(cityKey => {
    const cityData = citiesData[cityKey];
    
    // 도시 이름 업데이트
    const cityElement = document.getElementById(cityKey);
    if (cityElement && cityData.name) {
      cityElement.textContent = cityData.name[currentLanguage] || cityData.name.ko;
    }
    
    // 음식 목록 업데이트
    const foodsElement = document.getElementById(cityKey + 'Foods');
    if (foodsElement && cityData.foods) {
      const foodNames = cityData.foods.map(foodId => {
        const food = foodsData[foodId];
        return food ? (food.name[currentLanguage] || food.name.ko) : foodId;
      });
      foodsElement.textContent = foodNames.join(', ');
    }
  });
}

// 지도 팝업 업데이트
function updateMapPopups() {
  const t = translations[currentLanguage];
  
  Object.keys(markers).forEach(cityKey => {
    const city = citiesData[cityKey];
    if (city && city.name) {
      const cityName = city.name[currentLanguage] || city.name.ko;
      const popup = `<strong>${cityName}</strong><br>${t.clickToSee}`;
      markers[cityKey].setPopupContent(popup);
    }
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기본 언어 설정
  document.getElementById('btnKo')?.classList.add('active');
  updatePageTexts();
  updateRegionCards();
  
  // 지도 초기화
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
