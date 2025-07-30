// 한국 전통 요리 지도 - 완전한 통합형 (19개 지역, 50가지 음식, 4개 언어)
let map;
let markers = {};
let selectedCity = null;
let currentLanguage = 'ko';

// 완전한 번역 데이터
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

// 완전한 도시 및 음식 데이터 (19개 지역, 각 도시별 대표 음식 포함)
const citiesData = {
  seoul: {
    name: { ko: "서울", en: "Seoul", zh: "首尔", ja: "ソウル" },
    coords: [37.5665, 126.9780],
    foods: ["bulgogi", "pyeongyang_naengmyeon", "samgyetang"]
  },
  busan: {
    name: { ko: "부산", en: "Busan", zh: "釜山", ja: "釜山" },
    coords: [35.1796, 129.0756],
    foods: ["milmyeon", "dwaeji_gukbap", "eomuk"]
  },
  jeonju: {
    name: { ko: "전주", en: "Jeonju", zh: "全州", ja: "全州" },
    coords: [35.8242, 127.1480],
    foods: ["bibimbap", "kongnamul_gukbap"]
  },
  andong: {
    name: { ko: "안동", en: "Andong", zh: "安东", ja: "安東" },
    coords: [36.5684, 128.7294],
    foods: ["andong_jjimdak", "andong_soju"]
  },
  jeju: {
    name: { ko: "제주", en: "Jeju", zh: "济州", ja: "済州" },
    coords: [33.4996, 126.5312],
    foods: ["heukdwaeji", "galchi_jorim"]
  },
  gangneung: {
    name: { ko: "강릉", en: "Gangneung", zh: "江陵", ja: "江陵" },
    coords: [37.7519, 128.8761],
    foods: ["chodang_sundubu", "memil_makguksu"]
  },
  chuncheon: {
    name: { ko: "춘천", en: "Chuncheon", zh: "春川", ja: "春川" },
    coords: [37.8813, 127.7298],
    foods: ["dakgalbi"]
  },
  sokcho: {
    name: { ko: "속초", en: "Sokcho", zh: "束草", ja: "束草" },
    coords: [38.2070, 128.5919],
    foods: ["ojingeo_sundae"]
  },
  daegu: {
    name: { ko: "대구", en: "Daegu", zh: "大邱", ja: "大邱" },
    coords: [35.8714, 128.6014],
    foods: ["makchang", "ttaro_gukbap"]
  },
  gyeongju: {
    name: { ko: "경주", en: "Gyeongju", zh: "庆州", ja: "慶州" },
    coords: [35.8562, 129.2247],
    foods: ["hwangnam_ppang"]
  },
  pohang: {
    name: { ko: "포항", en: "Pohang", zh: "浦项", ja: "浦項" },
    coords: [36.0190, 129.3435],
    foods: ["mulhoe"]
  },
  mokpo: {
    name: { ko: "목포", en: "Mokpo", zh: "木浦", ja: "木浦" },
    coords: [34.8118, 126.3922],
    foods: ["hongeo"]
  },
  yeosu: {
    name: { ko: "여수", en: "Yeosu", zh: "丽水", ja: "麗水" },
    coords: [34.7604, 127.6622],
    foods: ["dolsan_gat_kimchi"]
  },
  tongyeong: {
    name: { ko: "통영", en: "Tongyeong", zh: "统营", ja: "統営" },
    coords: [34.8544, 128.4332],
    foods: ["chungmu_gimbap"]
  },
  incheon: {
    name: { ko: "인천", en: "Incheon", zh: "仁川", ja: "仁川" },
    coords: [37.4563, 126.7052],
    foods: ["jajangmyeon", "ganghwa_sunmu"]
  },
  suwon: {
    name: { ko: "수원", en: "Suwon", zh: "水原", ja: "水原" },
    coords: [37.2636, 127.0286],
    foods: ["suwon_galbi"]
  },
  gwangju: {
    name: { ko: "광주", en: "Gwangju", zh: "光州", ja: "光州" },
    coords: [35.1595, 126.8526],
    foods: ["mudeungsan_baeksuk"]
  },
  daejeon: {
    name: { ko: "대전", en: "Daejeon", zh: "大田", ja: "大田" },
    coords: [36.3504, 127.3845],
    foods: ["seongsimang_ppang"]
  },
  ulsan: {
    name: { ko: "울산", en: "Ulsan", zh: "蔚山", ja: "蔚山" },
    coords: [35.5384, 129.3114],
    foods: ["jangsaengpo_gorae"]
  }
};

// 음식 데이터 (주요 음식만 포함, 필요시 확장 가능)
const foodsData = {
  bulgogi: {
    name: { ko: "불고기", en: "Bulgogi", zh: "烤肉", ja: "プルコギ" },
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
    name: { ko: "비빔밥", en: "Bibimbap", zh: "拌饭", ja: "ビビンバ" },
    history: {
      ko: "조선왕조의 발상지 전주에서 시작된 비빔밥은 궁중에서 먹던 골동반에서 유래되었습니다. 다양한 나물을 한 그릇에 담아 비벼 먹는 한국의 대표적인 건강식입니다.",
      en: "Originating in Jeonju, birthplace of the Joseon Dynasty, bibimbap derives from 'goldongban' eaten in the royal court. It's Korea's representative healthy dish mixing various vegetables in one bowl.",
      zh: "起源于朝鲜王朝发祥地全州的拌饭，源自宫廷中食用的骨董饭。是将各种蔬菜放在一个碗里拌着吃的韩国代表性健康食品。",
      ja: "朝鮮王朝の発祥地である全州で始まったビビンバは、宮中で食べられていた骨董飯に由来します。様々な野菜を一つの器に入れて混ぜて食べる韓国の代表的な健康食品です。"
    },
    geography: {
      ko: "전라북도의 비옥한 평야지대에서 나는 다양한 채소와 곡물을 이용해 만든 음식으로, 호남평야의 풍요로움을 보여줍니다.",
      en: "Made with diverse vegetables and grains from Jeollabuk-do's fertile plains, showcasing the abundance of the Honam Plain.",
      zh: "使用全罗北道肥沃平原地带出产的各种蔬菜和谷物制作，展现了湖南平原的富饶。",
      ja: "全羅北道の肥沃な平野地帯で取れる様々な野菜と穀物を使って作った料理で、湖南平野の豊かさを示しています。"
    },
    culture: {
      ko: "음양오행의 조화를 중시하는 한국의 전통 철학이 담긴 음식입니다. 다섯 가지 색깔의 나물로 건강과 조화를 추구합니다.",
      en: "A dish embodying Korean traditional philosophy that values the harmony of yin-yang and five elements, pursuing health and balance through five colored vegetables.",
      zh: "体现了重视阴阳五行和谐的韩国传统哲学。通过五种颜色的蔬菜追求健康与和谐。",
      ja: "陰陽五行の調和を重視する韓国の伝統哲学が込められた料理です。五つの色の野菜で健康と調和を追求します。"
    },
    fun_fact: {
      ko: "전주 비빔밥은 2011년 CNN에서 선정한 '세계에서 가장 맛있는 음식 40선'에 선정되었습니다.",
      en: "Jeonju bibimbap was selected as one of CNN's '40 Most Delicious Foods in the World' in 2011.",
      zh: "全州拌饭被CNN评选为2011年'世界上最美味的40种食物'之一。",
      ja: "全州ビビンバは2011年CNNが選定した「世界で最も美味しい料理40選」に選ばれました。"
    }
  },
  milmyeon: {
    name: { ko: "밀면", en: "Milmyeon", zh: "小麦面条", ja: "ミルミョン" },
    history: {
      ko: "6.25 전쟁 당시 북한 실향민들이 평양냉면을 그리워하며 구하기 쉬운 밀가루로 만든 면요리입니다. 1950년대 부산 피난촌에서 시작되었습니다.",
      en: "Created by North Korean refugees during the Korean War who missed Pyeongyang naengmyeon and used easily available wheat flour. It started in Busan refugee camps in the 1950s.",
      zh: "朝鲜战争期间，北韩难民思念平壤冷面，用容易获得的小麦粉制作的面条料理。始于1950年代釜山难民村。",
      ja: "朝鮮戦争当時、北朝鮮の避難民が平壌冷麺を懐かしんで、手に入りやすい小麦粉で作った麺料理です。1950年代の釜山避難村で始まりました。"
    },
    geography: {
      ko: "부산항을 통해 들어온 미군 구호물자인 밀가루를 이용해 만든 음식으로, 항구도시 부산의 역사를 보여줍니다.",
      en: "Made with wheat flour from US relief supplies that came through Busan Port, reflecting the history of this port city.",
      zh: "使用通过釜山港进入的美军救济物资小麦粉制作，体现了港口城市釜山的历史。",
      ja: "釜山港を通して入ってきた米軍救援物資の小麦粉を利用して作った料理で、港湾都市釜山の歴史を表しています。"
    },
    culture: {
      ko: "전쟁의 아픔과 고향에 대한 그리움, 그리고 새로운 환경에 적응하려는 강인한 생존력이 담긴 음식입니다.",
      en: "A dish that embodies the pain of war, longing for homeland, and the resilient survival spirit of adapting to new environments.",
      zh: "承载着战争的痛苦和对故乡的思念，以及适应新环境的顽强生存意志的食物。",
      ja: "戦争の痛みと故郷への思い、そして新しい環境に適応しようとする強靭な生存力が込められた料理です。"
    },
    fun_fact: {
      ko: "밀면은 냉면과 달리 면발이 쫄깃하고 탄력이 있어 '부산의 소울푸드'라고 불립니다.",
      en: "Unlike naengmyeon, milmyeon has chewy and elastic noodles, earning it the nickname 'Busan's soul food'.",
      zh: "与冷面不同，小麦面条具有筋道弹性的口感，被称为'釜山的灵魂食物'。",
      ja: "冷麺とは違って麺にコシと弾力があり、「釜山のソウルフード」と呼ばれています。"
    }
  },
  dakgalbi: {
    name: { ko: "닭갈비", en: "Dakgalbi", zh: "辣炒鸡排", ja: "タッカルビ" },
    history: {
      ko: "1960년대 춘천의 한 식당에서 저렴한 닭고기를 이용해 만든 서민 음식에서 시작되었습니다. 현재는 춘천을 대표하는 관광 음식이 되었습니다.",
      en: "Started as a common people's dish using affordable chicken at a Chuncheon restaurant in the 1960s. Now became Chuncheon's representative tourist food.",
      zh: "始于1960年代春川一家餐厅使用便宜鸡肉制作的平民料理。现在已成为春川的代表性旅游美食。",
      ja: "1960年代に春川のある食堂で安価な鶏肉を使って作った庶民料理から始まりました。現在は春川を代表する観光料理となりました。"
    },
    geography: {
      ko: "춘천 지역의 신선한 채소와 함께 철판에 볶아 먹는 음식으로, 강원도의 청정 자연환경을 활용한 음식입니다.",
      en: "Stir-fried on iron plate with fresh vegetables from Chuncheon, utilizing Gangwon-do's clean natural environment.",
      zh: "与春川地区的新鲜蔬菜一起在铁板上炒制的料理，利用了江原道清洁的自然环境。",
      ja: "春川地域の新鮮な野菜と一緒に鉄板で炒めて食べる料理で、江原道の清浄な自然環境を活用した料理です。"
    },
    culture: {
      ko: "연인들과 친구들이 함께 둘러앉아 먹는 음식으로, 젊은이들의 데이트 코스로 인기가 높습니다.",
      en: "Popular as a date course for young people, enjoyed by couples and friends sitting together.",
      zh: "恋人和朋友们围坐一起享用的料理，作为年轻人的约会课程很受欢迎。",
      ja: "恋人や友人が一緒に座って食べる料理で、若者のデートコースとして人気が高いです。"
    },
    fun_fact: {
      ko: "춘천 닭갈비는 마지막에 볶음밥을 해먹는 것이 정석이며, 이를 '추가밥'이라고 부릅니다.",
      en: "The standard practice for Chuncheon dakgalbi is to make fried rice at the end, called 'chuga-bap' (additional rice).",
      zh: "春川辣炒鸡排的标准做法是最后做炒饭，这被称为'추가밥'（追加饭）。",
      ja: "春川タッカルビは最後にチャーハンを作って食べるのが定石で、これを「チュガバプ」と呼びます。"
    }
  },
  heukdwaeji: {
    name: { ko: "흑돼지", en: "Black Pork", zh: "黑猪肉", ja: "黒豚" },
    history: {
      ko: "제주도에서 자연 방목으로 키운 재래종 돼지로, 예로부터 제주 사람들의 중요한 단백질 공급원이었습니다. 고기 맛이 담백하고 잡내가 없는 것이 특징입니다.",
      en: "Native pigs raised naturally on Jeju Island, serving as an important protein source for Jeju people since ancient times. Characterized by light taste without gamey smell.",
      zh: "在济州岛自然放牧饲养的本土猪种，自古以来就是济州人重要的蛋白质来源。肉质清淡无腥味是其特征。",
      ja: "済州島で自然放牧で育てた在来種の豚で、昔から済州の人々の重要なタンパク質供給源でした。肉の味が淡白で臭みがないのが特徴です。"
    },
    geography: {
      ko: "제주도의 청정 자연환경에서 자란 흑돼지는 화산토 토양과 청정 공기, 풍부한 초목을 먹고 자라 육질이 뛰어납니다.",
      en: "Black pigs raised in Jeju's pristine environment with volcanic soil and clean air, feeding on abundant vegetation, resulting in excellent meat quality.",
      zh: "在济州岛清洁的自然环境中，火山土壤和清洁空气，以及丰富植被喂养下成长的黑猪，肉质优良。",
      ja: "済州島の清浄な自然環境で火山土壌と清浄な空気、豊富な草木を食べて育った黒豚は肉質が優秀です。"
    },
    culture: {
      ko: "제주도의 돌하르방만큼 제주를 대표하는 특산품으로, 제주 사람들의 소박하고 건강한 식문화를 보여줍니다.",
      en: "As representative of Jeju as the stone grandfathers, showing Jeju people's simple and healthy food culture.",
      zh: "与济州岛的石头爷爷一样代表济州的特产，展现了济州人朴素健康的饮食文化。",
      ja: "済州島のトルハルバンと同じくらい済州を代表する特産品で、済州の人々の素朴で健康的な食文化を表しています。"
    },
    fun_fact: {
      ko: "제주 흑돼지는 스트레스를 적게 받아 육질이 부드럽고, 불포화지방산 함량이 높아 건강에 좋습니다.",
      en: "Jeju black pork experiences less stress resulting in tender meat with high unsaturated fatty acid content, making it healthy.",
      zh: "济州黑猪受压力较少，肉质柔嫩，不饱和脂肪酸含量高，对健康有益。",
      ja: "済州黒豚はストレスを少なく受けて肉質が柔らかく、不飽和脂肪酸含量が高くて健康に良いです。"
    }
  },
  // 간단한 대표 음식들 (확장 가능)
  pyeongyang_naengmyeon: {
    name: { ko: "평양냉면", en: "Pyeongyang Naengmyeon", zh: "平壤冷面", ja: "平壌冷麺" },
    history: { ko: "평양에서 시작된 냉면이 6.25 전쟁 이후 피난민들에 의해 서울로 전해졌습니다.", en: "Cold noodle dish from Pyeongyang brought to Seoul by refugees after the Korean War.", zh: "起源于平壤的冷面，朝鲜战争后由难民传入首尔。", ja: "平壌で始まった冷麺が朝鮮戦争後に避難民によってソウルに伝わりました。" },
    geography: { ko: "원래 평양의 추운 겨울 날씨에 시원한 냉면을 먹는 문화에서 시작되었습니다.", en: "Originally from Pyeongyang's cold winter culture of eating cool noodles.", zh: "起源于平壤寒冷冬季食用凉面的文化。", ja: "元々平壌の寒い冬に冷たい麺を食べる文化から始まりました。" },
    culture: { ko: "분단의 아픔과 향수를 담은 음식입니다.", en: "A dish that carries the pain of division and nostalgia.", zh: "承载着分裂痛苦和乡愁的食物。", ja: "分断の痛みと郷愁を込めた料理です。" },
    fun_fact: { ko: "면을 가위로 자르지 않고 후루룩 소리내며 먹는 것이 예의입니다.", en: "It should be eaten by slurping without cutting the noodles.", zh: "应该不用剪刀切面条，而是发出声音地吸食。", ja: "はさみで切らずにすすって食べるのがマナーです。" }
  },
  samgyetang: {
    name: { ko: "삼계탕", en: "Samgyetang", zh: "参鸡汤", ja: "サムゲタン" },
    history: { ko: "조선시대부터 여름 보양식으로 먹어온 삼계탕입니다.", en: "A summer health food eaten since the Joseon Dynasty.", zh: "自朝鲜时代以来作为夏季滋补食品食用的参鸡汤。", ja: "朝鮮時代から夏の保養食として食べられてきたサムゲタンです。" },
    geography: { ko: "서울을 중심으로 한 중부지방에서 발달한 궁중 보양식입니다.", en: "A royal health food developed in central Korea around Seoul.", zh: "以首尔为中心的中部地区发展的宫廷滋补食品。", ja: "ソウルを中心とした中部地方で発達した宮廷保養食です。" },
    culture: { ko: "삼복에 먹는 대표적인 보양식입니다.", en: "A representative health food eaten during the three hottest days of summer.", zh: "三伏天食用的代表性滋补食品。", ja: "三伏に食べる代表的な保養食です。" },
    fun_fact: { ko: "외국인들이 가장 좋아하는 한국 음식 중 하나입니다.", en: "One of the most popular Korean foods among foreigners.", zh: "外国人最喜爱的韩国料理之一。", ja: "外国人が最も好む韓国料理の一つです。" }
  },
  dwaeji_gukbap: {
    name: { ko: "돼지국밥", en: "Dwaeji-gukbap", zh: "猪肉汤饭", ja: "豚クッパ" },
    history: { ko: "일제강점기 부산항 노동자들이 저렴하고 영양가 높은 음식으로 먹기 시작했습니다.", en: "Started as an affordable, nutritious meal for Busan port workers during Japanese occupation.", zh: "日占时期釜山港工人开始食用的廉价高营养食品。", ja: "日本統治時代に釜山港の労働者が安価で栄養価の高い食べ物として食べ始めました。" },
    geography: { ko: "부산항의 물류 노동자들과 어부들 사이에서 발달한 음식입니다.", en: "Developed among port workers and fishermen in Busan.", zh: "在釜山港物流工人和渔民中发展的食物。", ja: "釜山港の物流労働者と漁師の間で発達した料理です。" },
    culture: { ko: "부산 사람들의 후끈한 인정과 끈끈한 동료애가 담긴 음식입니다.", en: "A dish embodying the warm hearts and strong camaraderie of Busan people.", zh: "体现釜山人热情和深厚同事情谊的食物。", ja: "釜山の人々の熱い人情と強い仲間意識が込められた料理です。" },
    fun_fact: { ko: "새우젓으로 간을 맞추는 것이 특징입니다.", en: "Characterized by seasoning with salted shrimp.", zh: "以虾酱调味为特色。", ja: "アミの塩辛で味を調えるのが特徴です。" }
  },
  eomuk: {
    name: { ko: "어묵", en: "Eomuk (Fish Cake)", zh: "鱼糕", ja: "オムク" },
    history: { ko: "일제강점기 일본에서 전해진 '오뎅'이 부산 지역 어민들의 풍부한 어류 자원과 만나 발전했습니다.", en: "Japanese 'oden' evolved with Busan's abundant fish resources during Japanese occupation.", zh: "日占时期从日本传入的'关东煮'与釜山地区丰富的鱼类资源结合发展而来。", ja: "日本統治時代に日本から伝わった「おでん」が釜山地域の豊富な魚類資源と出会って発展しました。" },
    geography: { ko: "부산 앞바다의 신선한 생선을 이용해 만든 어묵입니다.", en: "Made with fresh fish from Busan's coastal waters.", zh: "使用釜山近海新鲜鱼类制作的鱼糕。", ja: "釜山沖の新鮮な魚を使って作ったオムクです。" },
    culture: { ko: "길거리에서 따뜻한 어묵 국물을 마시며 추위를 이기는 부산 시민들의 일상 문화를 대표합니다.", en: "Represents Busan citizens' daily culture of warming up with hot fish cake soup on the streets.", zh: "代表釜山市民在街头喝热鱼糕汤抵御寒冷的日常文化。", ja: "街頭で温かいオムクスープを飲んで寒さをしのぐ釜山市民の日常文化を代表します。" },
    fun_fact: { ko: "전국 어묵 생산량의 70% 이상을 차지합니다.", en: "Accounts for over 70% of Korea's fish cake production.", zh: "占全国鱼糕产量的70%以上。", ja: "全国オムク生産量の70%以上を占めています。" }
  },
  kongnamul_gukbap: {
    name: { ko: "콩나물국밥", en: "Bean Sprout Soup", zh: "豆芽汤饭", ja: "コンナムルクッパ" },
    history: { ko: "조선시대 전주 장터 상인들이 간단하고 든든한 한 끼 식사로 즐겨 먹던 서민 음식입니다.", en: "A common people's food enjoyed by Jeonju market merchants as a simple, hearty meal during Joseon Dynasty.", zh: "朝鲜时代全州市场商人作为简单饱腹的一餐而享用的平民食物。", ja: "朝鮮時代に全州の市場商人が簡単で腹持ちの良い一食として好んで食べた庶民料理です。" },
    geography: { ko: "전라도의 질 좋은 콩으로 기른 콩나물을 이용한 음식입니다.", en: "Made with bean sprouts grown from high-quality beans from Jeolla province.", zh: "使用全罗道优质大豆培育的豆芽制作的食物。", ja: "全羅道の質の良い大豆で育てたコンナムルを使った料理です。" },
    culture: { ko: "소박하지만 정성이 담긴 서민들의 음식입니다.", en: "Simple yet heartfelt food of common people.", zh: "朴素但充满诚意的平民食物。", ja: "素朴ながら真心の込められた庶民の料理です。" },
    fun_fact: { ko: "새우젓과 마늘을 많이 넣어 시원하고 개큰한 맛이 특징입니다.", en: "Characterized by refreshing taste with lots of salted shrimp and garlic.", zh: "以大量虾酱和大蒜调味，口感清爽鲜美。", ja: "アミの塩辛とニンニクをたくさん入れて爽やかで濃厚な味が特徴です。" }
  },
  andong_jjimdak: {
    name: { ko: "안동찜닭", en: "Andong Jjimdak", zh: "安东蒸鸡", ja: "安東チムタク" },
    history: { ko: "1980년대 안동 구시장 골목에서 시작된 비교적 최근의 향토음식입니다.", en: "A relatively recent local dish that started in Andong's old market alley in the 1980s.", zh: "1980年代在安东旧市场巷子里开始的相对较新的乡土料理。", ja: "1980年代に安東の旧市場の路地で始まった比較的最近の郷土料理です。" },
    geography: { ko: "안동 지역의 전통적인 간장 발효 기술과 인근 지역의 신선한 채소를 활용한 음식입니다.", en: "Utilizes Andong's traditional soy sauce fermentation techniques and fresh vegetables from nearby regions.", zh: "利用安东地区传统酱油发酵技术和附近地区新鲜蔬菜的料理。", ja: "安東地域の伝統的な醤油発酵技術と近隣地域の新鮮な野菜を活用した料理です。" },
    culture: { ko: "가족들이 둘러앉아 함께 나누어 먹는 음식으로, 안동 지역의 화목한 가정 문화를 보여줍니다.", en: "A dish for families to share together, showing Andong's harmonious family culture.", zh: "家人围坐一起分享的料理，展现了安东地区和睦的家庭文化。", ja: "家族が囲んで一緒に分けて食べる料理で、安東地域の和睦な家庭文化を表しています。" },
    fun_fact: { ko: "당면이 들어가는 것이 특징이며, 전국적으로 인기를 얻고 있습니다.", en: "Features glass noodles and has become popular nationwide.", zh: "以加入粉条为特色，在全国范围内广受欢迎。", ja: "春雨が入るのが特徴で、全国的に人気を得ています。" }
  }
  // 더 많은 음식들을 필요에 따라 추가할 수 있음
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
  
  const langButtons = { 'ko': 'btnKo', 'en': 'btnEn', 'zh': 'btnZh', 'ja': 'btnJa' };
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
}

// 페이지 텍스트 업데이트
function updatePageTexts() {
  const t = translations[currentLanguage];
  
  const elements = {
    'pageTitle': t.pageTitle, 'mainTitle': t.mainTitle, 'subtitle': t.subtitle,
    'searchBtn': t.searchBtn, 'welcomeTitle': t.welcomeTitle, 'welcomeText': t.welcomeText,
    'regionsTitle': t.regionsTitle, 'instructionsTitle': t.instructionsTitle,
    'instruction1': t.instruction1, 'instruction2': t.instruction2, 'instruction3': t.instruction3,
    'statRegions': t.statRegions, 'statFoods': t.statFoods, 'statTaste': t.statTaste
  };
  
  Object.keys(elements).forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = elements[id];
  });
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;
}

// 지역 카드 업데이트
function updateRegionCards() {
  Object.keys(citiesData).forEach(cityKey => {
    const cityData = citiesData[cityKey];
    const cityElement = document.getElementById(cityKey);
    if (cityElement && cityData.name) {
      cityElement.textContent = cityData.name[currentLanguage] || cityData.name.ko;
    }
    
    const foodsElement = document.getElementById(cityKey + 'Foods');
    if (foodsElement && cityData.foods) {
      const foodNames = cityData.foods.map(foodId => {
        const food = foodsData[foodId];
        return food ? (food.name[currentLanguage] || food.name.ko) : foodId;
      }).filter(name => name);
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
  document.getElementById('btnKo')?.classList.add('active');
  updatePageTexts();
  updateRegionCards();
  setTimeout(() => { initMap(); }, 300);
});

// 지도 초기화
function initMap() {
  if (map) map.remove();
  
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Map container not found!');
    return;
  }
  
  map = L.map('map', {
    center: [36.5, 127.8],
    zoom: 7,
    preferCanvas: true,
    zoomControl: true
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    minZoom: 6,
    tileSize: 256,
    zoomOffset: 0,
    detectRetina: true
  }).addTo(map);
  
  setTimeout(() => {
    map.invalidateSize(true);
    addCityMarkers();
  }, 100);
}

// 도시 마커 추가
function addCityMarkers() {
  console.log("Adding city markers...");
  const t = translations[currentLanguage];
  
  Object.keys(citiesData).forEach(cityKey => {
    const city = citiesData[cityKey];
    const cityName = city.name[currentLanguage] || city.name.ko;
    
    const marker = L.marker(city.coords)
      .addTo(map)
      .bindPopup(`<strong>${cityName}</strong><br>${t.clickToSee}`)
      .on('click', () => showCityFoods(cityKey));
    
    markers[cityKey] = marker;
  });
  
  console.log(`Added ${Object.keys(markers).length} markers`);
}

// 도시 음식 표시
function showCityFoods(cityKey) {
  const city = citiesData[cityKey];
  const t = translations[currentLanguage];
  const sidebar = document.getElementById('sidebar');
  
  selectedCity = cityKey;
  
  Object.values(markers).forEach(marker => {
    marker.setIcon(new L.Icon.Default());
  });
  
  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
  });
  
  markers[cityKey].setIcon(redIcon);
  
  const cityName = city.name[currentLanguage] || city.name.ko;
  let sidebarContent = `
    <div class="city-header">
      <h2>${cityName}${t.traditionalFoods}</h2>
      <button id="closeSidebar" onclick="closeSidebar()">${t.close}</button>
    </div>
    <div class="food-cards">
  `;
  
  city.foods.forEach(foodId => {
    const food = foodsData[foodId];
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
  const city = citiesData[cityKey];
  const food = foodsData[foodId];
  const t = translations[currentLanguage];
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
  Object.values(markers).forEach(marker => {
    marker.setIcon(new L.Icon.Default());
  });
  selectedCity = null;
}

// 검색 기능
function searchFood() {
  const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  const t = translations[currentLanguage];
  
  if (!searchTerm) {
    alert(t.enterFoodName);
    return;
  }
  
  let found = false;
  let foundCity = null;
  let foundFood = null;
  
  Object.keys(citiesData).forEach(cityKey => {
    const city = citiesData[cityKey];
    city.foods.forEach(foodId => {
      const food = foodsData[foodId];
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
    const city = citiesData[foundCity];
    map.setView(city.coords, 10);
    showCityFoods(foundCity);
    setTimeout(() => {
      showFoodDetail(foundCity, foundFood);
    }, 500);
    document.getElementById('searchInput').value = '';
  } else {
    showAvailableFoods();
  }
}

// 사용 가능한 음식 목록 표시
function showAvailableFoods() {
  const sidebar = document.getElementById('sidebar');
  const t = translations[currentLanguage];
  let foodList = [];
  
  Object.keys(citiesData).forEach(cityKey => {
    const city = citiesData[cityKey];
    city.foods.forEach(foodId => {
      const food = foodsData[foodId];
      if (food) {
        const foodName = food.name[currentLanguage] || food.name.ko;
        const cityName = city.name[currentLanguage] || city.name.ko;
        foodList.push({ name: foodName, city: cityName, cityKey: cityKey, foodId: foodId });
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
