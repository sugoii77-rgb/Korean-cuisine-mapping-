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
const additionalFoodsData = {
  // 안동 - 안동소주 추가
  andong_soju: {
    name: { ko: "안동소주", en: "Andong Soju", zh: "安东烧酒", ja: "安東焼酎" },
    history: {
      ko: "조선시대부터 안동 지역에서 전승되어온 전통 증류주입니다. 안동 김씨 가문에서 대대로 내려오는 비법으로 만들어지며, 일제강점기에도 명맥을 유지한 귀한 전통주입니다.",
      en: "Traditional distilled liquor passed down in Andong since the Joseon Dynasty. Made with secret recipes handed down through generations of the Andong Kim family, maintaining its tradition even during Japanese occupation.",
      zh: "自朝鲜时代以来在安东地区传承的传统蒸馏酒。以安东金氏家族世代相传的秘方制作，即使在日占时期也保持了传统。",
      ja: "朝鮮時代から安東地域で受け継がれてきた伝統蒸留酒です。安東金氏家門で代々伝わる秘法で作られ、日本統治時代にも命脈を維持した貴重な伝統酒です。"
    },
    geography: {
      ko: "낙동강 상류의 청정 지역인 안동의 좋은 물과 한국 전통 누룩 기술이 만들어낸 명주입니다. 안동의 서늘한 기후가 발효에 최적의 조건을 제공합니다.",
      en: "Premium liquor created with clean water from Andong's upper Nakdong River region and traditional Korean nuruk fermentation techniques. Andong's cool climate provides optimal fermentation conditions.",
      zh: "利用洛东江上游安东清洁地区的好水和韩国传统酒曲技术制作的名酒。安东凉爽的气候为发酵提供了最佳条件。",
      ja: "洛東江上流の清浄地域である安東の良い水と韓国伝統の麹技術が作り出した名酒です。安東の涼しい気候が発酵に最適の条件を提供します。"
    },
    culture: {
      ko: "조선시대 유교 문화의 중심지였던 안동에서 선비들이 즐겨 마시던 고급 술로, 제사상에도 올리는 신성한 의미가 있습니다.",
      en: "A premium liquor enjoyed by scholars in Andong, the center of Confucian culture during Joseon Dynasty, with sacred meaning as it's offered in ancestral rites.",
      zh: "在朝鲜时代儒教文化中心地安东，学者们喜爱饮用的高级酒，在祭祀桌上也有神圣的意义。",
      ja: "朝鮮時代の儒教文化の中心地だった安東で士大夫が好んで飲んだ高級酒で、祭祀にも供える神聖な意味があります。"
    },
    fun_fact: {
      ko: "안동소주는 한국 전통주 중 최초로 지리적표시 보호를 받은 술로, 알코올 도수가 45도에 달하는 독한 술입니다.",
      en: "Andong Soju was the first Korean traditional liquor to receive geographical indication protection, with high alcohol content reaching 45%.",
      zh: "安东烧酒是韩国传统酒中首个获得地理标识保护的酒，酒精度高达45度。",
      ja: "安東焼酎は韓国伝統酒の中で初めて地理的表示保護を受けた酒で、アルコール度数が45度に達する強い酒です。"
    }
  },

  // 제주 - 갈치조림 추가
  galchi_jorim: {
    name: { ko: "갈치조림", en: "Braised Cutlassfish", zh: "炖带鱼", ja: "太刀魚の煮付け" },
    history: {
      ko: "제주 연안에서 잡히는 싱싱한 갈치를 이용한 제주도의 대표적인 생선 요리입니다. 무와 함께 조려내어 담백하고 시원한 맛이 특징입니다.",
      en: "Representative fish dish of Jeju using fresh cutlassfish caught in Jeju waters. Braised with radish for a light and refreshing taste.",
      zh: "使用济州近海捕获的新鲜带鱼制作的济州代表性鱼类料理。与萝卜一起炖煮，口感清淡爽口。",
      ja: "済州近海で獲れる新鮮な太刀魚を使った済州島の代表的な魚料理です。大根と一緒に煮付けて淡白で爽やかな味が特徴です。"
    },
    geography: {
      ko: "제주도 주변의 청정 바다에서 잡히는 갈치는 육질이 단단하고 비린내가 적어 조림 요리에 최적입니다. 제주의 화산토에서 자란 무와의 조화가 뛰어납니다.",
      en: "Cutlassfish from Jeju's clean surrounding waters has firm flesh with less fishy smell, perfect for braising. Excellent harmony with radish grown in Jeju's volcanic soil.",
      zh: "济州岛周围清洁海域捕获的带鱼肉质紧实、腥味少，最适合炖煮。与济州火山土中生长的萝卜搭配极佳。",
      ja: "済州島周辺の清浄な海で獲れる太刀魚は身が締まって生臭さが少なく、煮付け料理に最適です。済州の火山土で育った大根との調和が優れています。"
    },
    culture: {
      ko: "제주도 어민들의 소박한 바다 음식 문화를 대표하는 요리로, 가족들이 함께 둘러앉아 먹는 정겨운 식탁의 중심입니다.",
      en: "Represents Jeju fishermen's simple sea food culture, serving as the heart of warm family dining tables.",
      zh: "代表济州岛渔民朴素的海洋饮食文化，是家人围坐用餐时温馨餐桌的中心。",
      ja: "済州島の漁民の素朴な海の食文化を代表する料理で、家族が一緒に囲んで食べる情のある食卓の中心です。"
    },
    fun_fact: {
      ko: "제주 갈치는 다른 지역보다 크기가 크고 살이 두꺼워 '제주 은갈치'라고 불리며 최고급 갈치로 인정받습니다.",
      en: "Jeju cutlassfish is larger and thicker than other regions, called 'Jeju silver cutlassfish' and recognized as premium grade.",
      zh: "济州带鱼比其他地区的更大更厚，被称为'济州银带鱼'，被认为是最高级的带鱼。",
      ja: "済州の太刀魚は他地域より大きくて身が厚く、「済州銀太刀魚」と呼ばれ最高級の太刀魚として認められています。"
    }
  },

  // 강릉 - 초당순두부 추가
  chodang_sundubu: {
    name: { ko: "초당순두부", en: "Chodang Soft Tofu", zh: "草堂嫩豆腐", ja: "草堂スンドゥブ" },
    history: {
      ko: "강릉 초당마을에서 시작된 순두부로, 조선시대 허균·허난설헌 남매의 고향으로 유명한 곳입니다. 바닷물로 간을 맞춘 독특한 제조법이 특징입니다.",
      en: "Soft tofu originated in Chodang village, Gangneung, famous as the hometown of Joseon Dynasty siblings Heo Gyun and Heo Nanseolheon. Features unique production method using seawater for coagulation.",
      zh: "起源于江陵草堂村的嫩豆腐，该地以朝鲜时代许筠、许兰雪轩兄妹的故乡而闻名。以海水调味的独特制作方法为特色。",
      ja: "江陵の草堂村で始まったスンドゥブで、朝鮮時代の許筠・許蘭雪軒兄妹の故郷として有名な場所です。海水で塩分を調節した独特な製造法が特徴です。"
    },
    geography: {
      ko: "동해의 청정 바닷물과 강릉 지역의 질 좋은 콩, 그리고 오대산에서 흘러내리는 맑은 물이 만나 최고의 순두부를 만들어냅니다.",
      en: "The finest soft tofu is created by combining clean East Sea water, quality beans from Gangneung region, and clear water flowing from Odaesan Mountain.",
      zh: "东海的清洁海水、江陵地区的优质大豆，以及从五台山流下的清澈山水相结合，造就了最优质的嫩豆腐。",
      ja: "東海の清浄な海水と江陵地域の質の良い大豆、そして五台山から流れ下る清らかな水が出会って最高のスンドゥブを作り出します。"
    },
    culture: {
      ko: "강릉의 문화와 예술 전통이 깃든 음식으로, 단순하면서도 깊은 맛의 철학이 담겨 있습니다.",
      en: "A dish imbued with Gangneung's cultural and artistic traditions, containing philosophy of simple yet profound taste.",
      zh: "蕴含江陵文化艺术传统的食物，包含着简单而深刻的味觉哲学。",
      ja: "江陵の文化と芸術の伝統が込められた料理で、シンプルながら深い味の哲学が込められています。"
    },
    fun_fact: {
      ko: "초당순두부는 바닷물의 간간한 맛이 두부에 그대로 스며들어 다른 지역 순두부와는 전혀 다른 독특한 맛을 자랑합니다.",
      en: "Chodang soft tofu boasts a unique taste completely different from other regions as the salty flavor of seawater permeates the tofu.",
      zh: "草堂嫩豆腐因海水的咸味渗透到豆腐中，拥有与其他地区嫩豆腐完全不同的独特味道。",
      ja: "草堂スンドゥブは海水の塩味が豆腐にそのまま染み込み、他地域のスンドゥブとは全く異なる独特な味を誇ります。"
    }
  },

  // 강릉 - 메밀막국수 추가  
  memil_makguksu: {
    name: { ko: "메밀막국수", en: "Buckwheat Makguksu", zh: "荞麦凉面", ja: "そば冷麺" },
    history: {
      ko: "강원도 산간지역에서 메밀을 재배하며 시작된 향토음식으로, 평창, 봉평 일대의 메밀을 사용해 만든 시원한 국수입니다.",
      en: "Local dish that began with buckwheat cultivation in Gangwon-do's mountainous regions, made with buckwheat from Pyeongchang and Bongpyeong areas as a refreshing noodle dish.",
      zh: "始于江原道山间地区种植荞麦的乡土料理，使用平昌、蓬坪一带的荞麦制作的清爽面条。",
      ja: "江原道の山間地域でそばを栽培しながら始まった郷土料理で、平昌、蓬坪一帯のそばを使って作った爽やかな麺料理です。"
    },
    geography: {
      ko: "강원도 고원지대의 서늘한 기후는 메밀 재배에 최적의 조건을 제공하며, 깨끗한 산수가 면의 맛을 더욱 좋게 만듭니다.",
      en: "The cool climate of Gangwon-do's highland provides optimal conditions for buckwheat cultivation, and clean mountain water enhances the noodle's taste.",
      zh: "江原道高原地带的凉爽气候为荞麦种植提供了最佳条件，清洁的山水使面条味道更加美味。",
      ja: "江原道高原地帯の涼しい気候はそば栽培に最適の条件を提供し、きれいな山水が麺の味をより良くします。"
    },
    culture: {
      ko: "농번기에 간편하게 먹을 수 있는 서민 음식으로 시작되어, 지금은 여름철 대표 별미가 되었습니다.",
      en: "Started as a simple common people's food during busy farming seasons, now became a representative summer delicacy.",
      zh: "始于农忙时期可以简单食用的平民食物，现在已成为夏季代表性美食。",
      ja: "農繁期に簡単に食べられる庶民料理として始まり、今は夏の代表的な名物となりました。"
    },
    fun_fact: {
      ko: "막국수의 '막'은 '거칠게, 대충'이라는 뜻으로, 정성스럽게 만들지 않고 간단히 만들어 먹는다는 의미에서 유래되었습니다.",
      en: "The 'mak' in makguksu means 'roughly, carelessly', derived from making it simply without elaborate preparation.",
      zh: "凉面中的'막'意思是'粗糙地、随便地'，源于不用精心制作而简单制作食用的含义。",
      ja: "冷麺の「マク」は「荒く、だいたい」という意味で、手の込んだ作り方をせずに簡単に作って食べるという意味から由来しました。"
    }
  },

  // 속초 - 오징어순대 추가
  ojingeo_sundae: {
    name: { ko: "오징어순대", en: "Squid Sundae", zh: "鱿鱼血肠", ja: "イカスンデ" },
    history: {
      ko: "속초 앞바다에서 잡힌 신선한 오징어에 찹쌀과 채소를 넣어 만든 속초의 대표 음식입니다. 1960년대부터 속초 중앙시장에서 시작되었습니다.",
      en: "Sokcho's representative dish made by stuffing fresh squid caught in Sokcho waters with glutinous rice and vegetables. Started in Sokcho Central Market from the 1960s.",
      zh: "使用属草近海捕获的新鲜鱿鱼，填入糯米和蔬菜制作的属草代表性食物。从1960年代在属草中央市场开始。",
      ja: "束草沖で獲れた新鮮なイカにもち米と野菜を入れて作った束草の代表的な食べ物です。1960年代から束草中央市場で始まりました。"
    },
    geography: {
      ko: "동해안의 차가운 바다에서 잡힌 오징어는 살이 쫄깃하고 단맛이 강해 순대 재료로 최적입니다.",
      en: "Squid caught in the cold East Sea waters has chewy texture and strong sweetness, making it optimal for sundae ingredients.",
      zh: "在东海岸寒冷海域捕获的鱿鱼肉质有嚼劲且甜味浓郁，是制作血肠的最佳材料。",
      ja: "東海岸の冷たい海で獲れたイカは身が歯応えがあり甘みが強く、スンデの材料として最適です。"
    },
    culture: {
      ko: "속초 관광객들이 반드시 맛봐야 하는 명물로, 바다 냄새가 나는 시장 골목의 정취를 함께 느낄 수 있습니다.",
      en: "A must-try specialty for Sokcho tourists, allowing them to experience the atmosphere of sea-scented market alleys.",
      zh: "是属草游客必须品尝的名物，可以一同感受带有海洋气息的市场胡同情趣。",
      ja: "束草観光客が必ず味わうべき名物で、海の匂いがする市場の路地の情趣を一緒に感じることができます。"
    },
    fun_fact: {
      ko: "오징어순대는 일반 순대와 달리 오징어의 탱탱한 식감과 바다 향이 어우러져 독특한 맛을 자랑합니다.",
      en: "Unlike regular sundae, squid sundae boasts unique taste combining the firm texture of squid with ocean flavor.",
      zh: "鱿鱼血肠与一般血肠不同，结合了鱿鱼的紧实口感和海洋香味，拥有独特的味道。",
      ja: "イカスンデは一般的なスンデとは違い、イカの弾力のある食感と海の香りが調和した独特な味を誇ります。"
    }
  },

  // 대구 - 막창, 따로국밥 추가
  makchang: {
    name: { ko: "막창", en: "Makchang (Grilled Intestines)", zh: "烤肠", ja: "マクチャン" },
    history: {
      ko: "1960년대 대구 서문시장 인근에서 시작된 막창구이는 값싼 부산물로 서민들이 즐겨 먹던 음식에서 시작되었습니다.",
      en: "Makchang grilling started near Daegu's Seomun Market in the 1960s, beginning as an affordable offal dish enjoyed by common people.",
      zh: "1960年代在大邱西门市场附近开始的烤肠，始于平民们喜爱食用的廉价副产品。",
      ja: "1960年代に大邱西門市場近くで始まったマクチャン焼きは、安価な副産物として庶民が好んで食べた料理から始まりました。"
    },
    geography: {
      ko: "대구 지역의 건조한 내륙 기후는 막창을 보관하고 숙성시키는 데 유리한 조건을 제공했습니다.",
      en: "Daegu's dry inland climate provided favorable conditions for storing and aging makchang.",
      zh: "大邱地区干燥的内陆气候为保存和腌制烤肠提供了有利条件。",
      ja: "大邱地域の乾燥した内陸気候はマクチャンを保管し熟成させるのに有利な条件を提供しました。"
    },
    culture: {
      ko: "대구 사람들의 소탈하고 진솔한 성격을 보여주는 음식으로, 친구들과 함께 모여 먹는 대표적인 안주입니다.",
      en: "A dish showing Daegu people's unpretentious and genuine character, a representative drinking food enjoyed with friends.",
      zh: "展现大邱人朴实真诚性格的食物，是朋友聚会时的代表性下酒菜。",
      ja: "大邱の人々の素朴で真率な性格を表す料理で、友人と一緒に集まって食べる代表的なつまみです。"
    },
    fun_fact: {
      ko: "대구 막창은 특별한 양념과 숯불 직화로 구워내어 쫄깃한 식감과 고소한 맛이 일품입니다.",
      en: "Daegu makchang is grilled with special seasoning over charcoal fire, creating excellent chewy texture and savory taste.",
      zh: "大邱烤肠用特殊调料和炭火直烤，口感筋道味道香美。",
      ja: "大邱マクチャンは特別な調味料と炭火直火で焼いて、歯応えのある食感と香ばしい味が絶品です。"
    }
  },

  ttaro_gukbap: {
    name: { ko: "따로국밥", en: "Ttaro-gukbap", zh: "分开汤饭", ja: "タロクッパ" },
    history: {
      ko: "1960년대 대구 서문시장에서 시작된 음식으로, 국과 밥을 따로 내어주는 독특한 방식으로 유명합니다.",
      en: "A dish that started in Daegu's Seomun Market in the 1960s, famous for its unique method of serving soup and rice separately.",
      zh: "始于1960年代大邱西门市场的料理，以汤和饭分开盛装的独特方式而闻名。",
      ja: "1960年代に大邱西門市場で始まった料理で、スープとご飯を別々に出す独特な方式で有名です。"
    },
    geography: {
      ko: "대구 분지의 더운 여름 날씨에 시원하게 먹을 수 있도록 고안된 지역 특색 음식입니다.",
      en: "Regional specialty food designed to be eaten refreshingly during the hot summer weather of Daegu basin.",
      zh: "为了在大邱盆地炎热的夏季天气中清爽食用而设计的地方特色食物。",
      ja: "大邱盆地の暑い夏の天気に爽やかに食べられるように考案された地域特色料理です。"
    },
    culture: {
      ko: "각자 취향에 맞게 국물과 밥의 양을 조절할 수 있어 개인의 기호를 존중하는 대구 문화를 보여줍니다.",
      en: "Shows Daegu culture of respecting individual preferences by allowing people to adjust soup and rice portions to their taste.",
      zh: "可以根据个人喜好调节汤和饭的分量，体现了尊重个人喜好的大邱文化。",
      ja: "それぞれの好みに合わせてスープとご飯の量を調節できて、個人の嗜好を尊重する大邱文化を表しています。"
    },
    fun_fact: {
      ko: "따로국밥의 '따로'는 '따로따로'의 줄임말로, 국과 밥을 각각 나누어 주는 것을 의미합니다.",
      en: "The 'ttaro' in ttaro-gukbap is short for 'ttaro-ttaro', meaning to serve soup and rice separately.",
      zh: "'분리'中的'따로'是'따로따로'的缩写，意思是将汤和饭分别盛装。",
      ja: "タロクッパの「タロ」は「タロタロ」の短縮形で、スープとご飯をそれぞれ分けて出すことを意味します。"
    }
  },

  // 경주 - 황남빵 추가
  hwangnam_ppang: {
    name: { ko: "황남빵", en: "Hwangnam Bread", zh: "皇南饼", ja: "皇南パン" },
    history: {
      ko: "1939년 경주 황남동에서 시작된 팥빵으로, 80년이 넘는 전통을 자랑하는 경주의 대표 특산품입니다.",
      en: "Red bean bread that started in Gyeongju's Hwangnam-dong in 1939, Gyeongju's representative specialty with over 80 years of tradition.",
      zh: "1939年在庆州皇南洞开始的红豆饼，是拥有80多年传统的庆州代表性特产。",
      ja: "1939年に慶州皇南洞で始まったあんパンで、80年以上の伝統を誇る慶州の代表的な特産品です。"
    },
    geography: {
      ko: "경주 지역의 질 좋은 팥과 밀가루를 사용하며, 천년 고도 경주의 역사와 함께 성장한 빵입니다.",
      en: "Made with quality red beans and flour from Gyeongju region, a bread that grew alongside the history of the millennium-old capital Gyeongju.",
      zh: "使用庆州地区优质红豆和面粉制作，与千年古都庆州的历史一同成长的面包。",
      ja: "慶州地域の質の良い小豆と小麦粉を使用し、千年古都慶州の歴史と共に成長したパンです。"
    },
    culture: {
      ko: "경주를 찾는 관광객들이 반드시 구입하는 대표 기념품으로, 신라의 문화유산과 함께 경주의 맛을 대표합니다.",
      en: "A must-buy representative souvenir for tourists visiting Gyeongju, representing Gyeongju's taste alongside Silla's cultural heritage.",
      zh: "是访问庆州的游客必买的代表性纪念品，与新罗文化遗产一起代表庆州的味道。",
      ja: "慶州を訪れる観光客が必ず購入する代表的なお土産で、新羅の文化遺産と共に慶州の味を代表します。"
    },
    fun_fact: {
      ko: "황남빵은 국화꽃 모양으로 만들어지며, 하루에 수만 개씩 생산되어 전국으로 배송됩니다.",
      en: "Hwangnam bread is made in chrysanthemum flower shape, with tens of thousands produced daily and shipped nationwide.",
      zh: "皇南饼制作成菊花形状，每天生产数万个并销往全国各地。",
      ja: "皇南パンは菊の花の形に作られ、1日に数万個生産されて全国に配送されます。"
    }
  },

  // 포항 - 물회 추가
  mulhoe: {
    name: { ko: "물회", en: "Mulhoe (Raw Fish Soup)", zh: "生鱼汤", ja: "ムルフェ" },
    history: {
      ko: "포항과 경상북도 동해안 어촌에서 시작된 향토음식으로, 어부들이 바다에서 잡은 신선한 생선을 즉석에서 차가운 물에 말아 먹던 것에서 유래되었습니다.",
      en: "Local dish that originated in Pohang and Gyeongsangbuk-do's East Coast fishing villages, derived from fishermen eating fresh caught fish immediately with cold water.",
      zh: "起源于浦项和庆尚北道东海岸渔村的乡土料理，源于渔民将海上捕获的新鲜鱼类用冷水拌食的做法。",
      ja: "浦項と慶尚北道東海岸の漁村で始まった郷土料理で、漁師が海で獲った新鮮な魚をその場で冷たい水に入れて食べたことに由来します。"
    },
    geography: {
      ko: "동해의 차가운 바닷물에서 자란 싱싱한 생선과 포항 지역의 깨끗한 지하수가 만나 최고의 물회를 만들어냅니다.",
      en: "Fresh fish grown in East Sea's cold waters combined with Pohang's clean groundwater creates the finest mulhoe.",
      zh: "在东海寒冷海水中生长的新鲜鱼类与浦项地区清洁的地下水相结合，造就了最优质的生鱼汤。",
      ja: "東海の冷たい海水で育った新鮮な魚と浦項地域のきれいな地下水が出会って最高のムルフェを作り出します。"
    },
    culture: {
      ko: "무더운 여름철 동해안 사람들의 대표적인 보양식으로, 시원하고 개운한 맛으로 더위를 날려줍니다.",
      en: "Representative summer health food of East Coast people during hot weather, refreshing and invigorating taste that beats the heat.",
      zh: "是炎热夏季东海岸人民的代表性滋补食品，以清爽振奋的味道驱散暑热。",
      ja: "蒸し暑い夏の東海岸の人々の代表的な保養食で、爽やかでさっぱりした味で暑さを吹き飛ばします。"
    },
    fun_fact: {
      ko: "물회는 '물'과 '회'가 합쳐진 말로, 차가운 물에 회를 말아 먹는다는 뜻입니다. 고추장이나 초고추장으로 간을 맞춥니다.",
      en: "Mulhoe combines 'mul' (water) and 'hoe' (raw fish), meaning raw fish eaten with cold water. Seasoned with gochujang or vinegar gochujang.",
      zh: "生鱼汤由'물'(水)和'회'(生鱼片)组成，意思是用冷水拌生鱼片食用。用韩式辣椒酱或醋辣椒酱调味。",
      ja: "ムルフェは「ムル」(水)と「フェ」(刺身)が合わさった言葉で、冷たい水に刺身を入れて食べるという意味です。コチュジャンや酢コチュジャンで味を調えます。"
    }
  },

  // 목포 - 홍어 추가
  hongeo: {
    name: { ko: "홍어", en: "Fermented Skate", zh: "发酵鳐鱼", ja: "ガンギエイ" },
    history: {
      ko: "전라남도 흑산도에서 잡힌 홍어를 자연 발효시켜 먹는 전통이 수백 년간 이어져 온 목포의 대표 음식입니다.",
      en: "Mokpo's representative food with a tradition of naturally fermenting skate caught from Heuksando Island for hundreds of years.",
      zh: "将全罗南道黑山岛捕获的鳐鱼自然发酵食用的传统延续数百年的木浦代表性食物。",
      ja: "全羅南道黒山島で獲ったガンギエイを自然発酵させて食べる伝統が数百年間続いてきた木浦の代表的な食べ物です。"
    },
    geography: {
      ko: "서해의 거친 바다에서 자란 홍어는 살이 단단하고, 목포의 해양성 기후가 발효에 최적의 조건을 제공합니다.",
      en: "Skate grown in the rough West Sea has firm flesh, and Mokpo's maritime climate provides optimal fermentation conditions.",
      zh: "在西海粗糙海域生长的鳐鱼肉质坚实，木浦的海洋性气候为发酵提供了最佳条件。",
      ja: "西海の荒い海で育ったガンギエイは身が締まっており、木浦の海洋性気候が発酵に最適の条件を提供します。"
    },
    culture: {
      ko: "전라도 사람들의 독특한 미식 문화를 보여주는 음식으로, 강렬한 맛과 향으로 호불호가 극명하게 갈립니다.",
      en: "A dish showing Jeolla-do people's unique culinary culture, with intense taste and aroma that creates extreme like-or-dislike reactions.",
      zh: "展现全罗道人独特美食文化的料理，以强烈的味道和香气形成极端的喜恶分化。",
      ja: "全羅道の人々の独特な美食文化を表す料理で、強烈な味と香りで好き嫌いが極端に分かれます。"
    },
    fun_fact: {
      ko: "홍어는 암모니아 냄새가 강해 '삼합'이라 하여 삶은 돼지고기, 김치와 함께 먹어 맛의 조화를 이룹니다.",
      en: "Skate has strong ammonia smell, so it's eaten as 'samhap' with boiled pork and kimchi to create taste harmony.",
      zh: "鳐鱼有强烈的氨味，因此称为'三合'，与煮猪肉、泡菜一起食用以达到味道的和谐。",
      ja: "ガンギエイは強いアンモニア臭があるため「三合」と言って茹でた豚肉、キムチと一緒に食べて味の調和を成します。"
    }
  },

  // 여수 - 돌산갓김치 추가
  dolsan_gat_kimchi: {
    name: { ko: "돌산갓김치", en: "Dolsan Mustard Leaf Kimchi", zh: "突山芥菜泡菜", ja: "突山カラシナキムチ" },
    history: {
      ko: "여수 돌산도에서 재배되는 특산 돌산갓으로 담근 김치로, 조선시대부터 이 지역의 대표적인 김치였습니다.",
      en: "Kimchi made with specialty Dolsan mustard leaf grown on Yeosu's Dolsando Island, the region's representative kimchi since Joseon Dynasty.",
      zh: "用丽水突山岛栽培的特产突山芥菜制作的泡菜，自朝鲜时代起就是该地区的代表性泡菜。",
      ja: "麗水突山島で栽培される特産の突山カラシナで漬けたキムチで、朝鮮時代からこの地域の代表的なキムチでした。"
    },
    geography: {
      ko: "돌산도의 해양성 기후와 미네랄이 풍부한 토양에서 자란 갓은 매운맛과 단맛이 조화를 이룹니다.",
      en: "Mustard leaf grown in Dolsando's maritime climate and mineral-rich soil achieves harmony between spicy and sweet flavors.",
      zh: "在突山岛海洋性气候和富含矿物质的土壤中生长的芥菜，辣味和甜味达到了和谐。",
      ja: "突山島の海洋性気候とミネラル豊富な土壌で育ったカラシナは辛味と甘味が調和を成しています。"
    },
    culture: {
      ko: "여수 지역 어민들의 밥상에 빠질 수 없는 반찬으로, 바다의 짠맛과 갓의 알싸한 맛이 어우러진 독특한 맛을 자랑합니다.",
      en: "Indispensable side dish on Yeosu fishermen's dining tables, boasting unique taste combining sea's saltiness with mustard's pungent flavor.",
      zh: "是丽水地区渔民餐桌上不可缺少的小菜，以海洋的咸味和芥菜的辛辣味相结合的独特味道而自豪。",
      ja: "麗水地域の漁民の食卓に欠かせないおかずで、海の塩味とカラシナのピリッとした味が調和した独特な味を誇ります。"
    },
    fun_fact: {
      ko: "돌산갓김치는 일반 갓김치보다 잎이 두껍고 아삭한 식감이 뛰어나며, 비타민 C가 매우 풍부합니다.",
      en: "Dolsan mustard leaf kimchi has thicker leaves and superior crispy texture compared to regular mustard kimchi, very rich in vitamin C.",
      zh: "突山芥菜泡菜比一般芥菜泡菜叶子更厚，口感更脆，维生素C含量非常丰富。",
      ja: "突山カラシナキムチは一般的なカラシナキムチより葉が厚く、シャキシャキした食感が優れており、ビタミンCが非常に豊富です。"
    }
  },

  // 통영 - 충무김밥 추가
  chungmu_gimbap: {
    name: { ko: "충무김밥", en: "Chungmu Gimbap", zh: "忠武紫菜包饭", ja: "忠武キンパ" },
    history: {
      ko: "1960년대 통영(옛 충무시) 중앙시장에서 시작된 김밥으로, 배를 타고 나가는 어부들을 위해 만든 간편식이었습니다.",
      en: "Gimbap that started in Tongyeong's (former Chungmu City) Central Market in the 1960s, originally a convenient food made for fishermen going out to sea.",
      zh: "始于1960年代统营(原忠武市)中央市场的紫菜包饭，原本是为出海渔民制作的便民食品。",
      ja: "1960年代に統営（旧忠武市）中央市場で始まったキンパで、船に乗って出かける漁師のために作った簡便食でした。"
    },
    geography: {
      ko: "한려수도의 아름다운 바다에 둘러싸인 통영의 신선한 해산물과 김을 이용한 지역 특색 음식입니다.",
      en: "Regional specialty food using fresh seafood and seaweed from Tongyeong, surrounded by the beautiful Hallyeosu waters.",
      zh: "利用被韩丽水道美丽海洋环绕的统营新鲜海产品和紫菜制作的地方特色食品。",
      ja: "閑麗水道の美しい海に囲まれた統営の新鮮な海産物と海苔を利用した地域特色料理です。"
    },
    culture: {
      ko: "속을 채우지 않고 김과 밥만으로 만든 소박한 김밥과 오징어무침, 무김치가 한 세트를 이루는 독특한 구성입니다.",
      en: "Unique composition forming a set with simple gimbap made only with seaweed and rice without filling, plus seasoned squid and radish kimchi.",
      zh: "由不加馅料只用紫菜和米饭制作的朴素紫菜包饭，配上凉拌鱿鱼和萝卜泡菜组成独特的套餐。",
      ja: "具を入れずに海苔とご飯だけで作った素朴なキンパと、イカの和え物、大根キムチが一つのセットを成す独特な構成です。"
    },
    fun_fact: {
      ko: "충무김밥은 여름철 상하지 않도록 속을 넣지 않고, 대신 별도의 반찬으로 오징어무침을 함께 제공합니다.",
      en: "Chungmu gimbap has no filling to prevent spoilage in summer heat, instead providing seasoned squid as a separate side dish.",
      zh: "忠武紫菜包饭为防止夏季变质而不加馅料，而是单独提供凉拌鱿鱼作为配菜。",
      ja: "忠武キンパは夏に傷まないよう具を入れず、代わりに別のおかずとしてイカの和え物を一緒に提供します。"
    }
  },

  // 인천 - 자장면, 강화순무 추가
  jajangmyeon: {
    name: { ko: "자장면", en: "Jajangmyeon", zh: "炸酱面", ja: "ジャージャー麺" },
    history: {
      ko: "1883년 인천 차이나타운에서 중국 산동성 출신 화교들이 처음 만든 면요리로, 한국식으로 변화하며 국민 음식이 되었습니다.",
      en: "Noodle dish first made by Chinese immigrants from Shandong Province in Incheon's Chinatown in 1883, becoming a national food as it adapted to Korean taste.",
      zh: "1883年在仁川中华街由来自中国山东省的华侨首次制作的面条料理，经过韩式变化成为国民美食。",
      ja: "1883年に仁川のチャイナタウンで中国山東省出身の華僑が初めて作った麺料理で、韓国式に変化しながら国民的な食べ物になりました。"
    },
    geography: {
      ko: "인천항을 통해 들어온 중국 문화와 한국의 식재료가 만나 탄생한 대표적인 융합 음식입니다.",
      en: "Representative fusion food born from Chinese culture entering through Incheon Port meeting Korean ingredients.",
      zh: "通过仁川港传入的中国文化与韩国食材相结合诞生的代表性融合料理。",
      ja: "仁川港を通して入ってきた中国文化と韓国の食材が出会って誕生した代表的な融合料理です。"
    },
    culture: {
      ko: "한국인의 생일, 이사, 졸업 등 특별한 날에 먹는 대표적인 축하 음식이 되었습니다.",
      en: "Became representative celebration food eaten on special Korean occasions like birthdays, moving, graduation.",
      zh: "成为韩国人生日、搬家、毕业等特殊日子食用的代表性庆祝食品。",
      ja: "韓国人の誕生日、引っ越し、卒業など特別な日に食べる代表的なお祝い料理になりました。"
    },
    fun_fact: {
      ko: "한국의 자장면은 중국 원조와 달리 춘장에 설탕을 넣어 달콤한 맛이 특징이며, 4월 14일은 '블랙데이'로 자장면을 먹는 날입니다.",
      en: "Korean jajangmyeon differs from Chinese original by adding sugar to chunjang for sweet taste, and April 14th is 'Black Day' for eating jajangmyeon.",
      zh: "韩国炸酱面与中国原版不同，在春酱中加糖呈现甜味，4月14日是吃炸酱面的'黑色情人节'。",
      ja: "韓国のジャージャー麺は中国の元祖とは違ってチュンジャンに砂糖を入れて甘い味が特徴で、4月14日は「ブラックデー」でジャージャー麺を食べる日です。"
    }
  },

  ganghwa_sunmu: {
    name: { ko: "강화순무", en: "Ganghwa Turnip", zh: "江华萝卜", ja: "江華カブ" },
    history: {
      ko: "고려시대부터 강화도에서 재배되어온 특산 순무로, 조선시대 궁중에도 진상되었던 귀한 채소입니다.",
      en: "Specialty turnip cultivated in Ganghwado since Goryeo Dynasty, precious vegetable that was even presented to the royal court during Joseon Dynasty.",
      zh: "自高丽时代起在江华岛栽培的特产萝卜，是朝鲜时代连宫廷都进贡的珍贵蔬菜。",
      ja: "高麗時代から江華島で栽培されてきた特産カブで、朝鮮時代には宮中にも進上された貴重な野菜です。"
    },
    geography: {
      ko: "강화도의 해양성 기후와 갯벌의 미네랄이 풍부한 토양에서 자라 특유의 아삭하고 단맛이 뛰어납니다.",
      en: "Grown in Ganghwado's maritime climate and mineral-rich tidal flat soil, producing distinctive crispy texture and excellent sweetness.",
      zh: "在江华岛海洋性气候和富含矿物质的滩涂土壤中生长，具有独特的爽脆口感和优秀的甜味。",
      ja: "江華島の海洋性気候と干潟のミネラル豊富な土壌で育ち、特有のシャキシャキとした食感と優れた甘味があります。"
    },
    culture: {
      ko: "강화도 사람들의 소박한 농업 문화를 보여주는 대표적인 농산물로, 김치나 장아찌로 주로 먹습니다.",
      en: "Representative agricultural product showing Ganghwado people's simple farming culture, mainly eaten as kimchi or pickled vegetables.",
      zh: "展现江华岛人朴素农业文化的代表性农产品，主要制作成泡菜或腌菜食用。",
      ja: "江華島の人々の素朴な農業文化を表す代表的な農産物で、主にキムチや漬物にして食べます。"
    },
    fun_fact: {
      ko: "강화순무는 일반 순무보다 크기가 작지만 당도가 높고 아삭한 식감이 뛰어나 '황금순무'라고도 불립니다.",
      en: "Ganghwa turnip is smaller than regular turnips but has higher sugar content and superior crispy texture, also called 'golden turnip'.",
      zh: "江华萝卜比一般萝卜小但糖度高、口感爽脆优秀，也被称为'黄金萝卜'。",
      ja: "江華カブは一般的なカブより小さいですが糖度が高くシャキシャキした食感が優れており、「黄金カブ」とも呼ばれます。"
    }
  },

  // 수원 - 수원갈비 추가
  suwon_galbi: {
    name: { ko: "수원갈비", en: "Suwon Galbi", zh: "水原排骨", ja: "水原カルビ" },
    history: {
      ko: "조선시대 정조대왕이 화성을 건설할 때 수원에 정착한 상인들이 시작한 갈비구이로, 200년 넘는 전통을 자랑합니다.",
      en: "Galbi grilling started by merchants who settled in Suwon during King Jeongjo's Hwaseong construction in Joseon Dynasty, boasting over 200 years of tradition.",
      zh: "朝鲜时代正祖大王建设华城时定居水原的商人开始的烤排骨，拥有200多年的传统。",
      ja: "朝鮮時代の正祖大王が華城を建設する時に水原に定着した商人が始めたカルビ焼きで、200年以上の伝統を誇ります。"
    },
    geography: {
      ko: "경기도 수원 지역의 질 좋은 한우와 전통 양념 기법이 결합되어 만든 최고급 갈비 요리입니다.",
      en: "Premium galbi dish combining quality Korean beef from Suwon, Gyeonggi-do with traditional seasoning techniques.",
      zh: "结合京畿道水原地区优质韩牛和传统调味技法制作的最高级排骨料理。",
      ja: "京畿道水原地域の質の良い韓牛と伝統調味技法が結合して作った最高級カルビ料理です。"
    },
    culture: {
      ko: "화성행궁과 함께 수원을 대표하는 문화유산으로, 가족 단위 외식문화의 중심이 되었습니다.",
      en: "Cultural heritage representing Suwon alongside Hwaseong Haenggung Palace, becoming the center of family dining culture.",
      zh: "与华城行宫一起代表水原的文化遗产，成为家庭聚餐文化的中心。",
      ja: "華城行宮と共に水原を代表する文化遺産で、家族単位の外食文化の中心となりました。"
    },
    fun_fact: {
      ko: "수원갈비는 양념을 하지 않고 소금구이로 먹는 것이 원조 방식이며, 고기 본연의 맛을 즐길 수 있습니다.",
      en: "Original Suwon galbi is eaten grilled with salt without marinade, allowing enjoyment of the meat's natural flavor.",
      zh: "水原排骨的原始做法是不腌制直接用盐烤，可以享受肉类的原始味道。",
      ja: "水原カルビは調味料を使わず塩焼きで食べるのが元祖の方式で、肉本来の味を楽しむことができます。"
    }
  },

  // 광주 - 무등산백숙 추가
  mudeungsan_baeksuk: {
    name: { ko: "무등산백숙", en: "Mudeungsan Baeksuk", zh: "无等山白熟鸡", ja: "無等山ペクスク" },
    history: {
      ko: "광주의 명산 무등산에서 자란 약초와 함께 끓인 닭백숙으로, 조선시대부터 보양식으로 즐겨왔습니다.",
      en: "Chicken baeksuk boiled with medicinal herbs from Gwangju's famous Mudeungsan Mountain, enjoyed as health food since Joseon Dynasty.",
      zh: "用光州名山无等山生长的药草一起煮制的鸡白熟，自朝鲜时代起就作为滋补食品享用。",
      ja: "光州の名山無等山で育った薬草と一緒に煮た鶏のペクスクで、朝鮮時代から保養食として親しまれてきました。"
    },
    geography: {
      ko: "무등산의 청정 자연환경에서 자란 다양한 약초와 맑은 계곡물이 만들어내는 깊고 진한 국물 맛이 특징입니다.",
      en: "Characterized by deep, rich broth flavor created by various medicinal herbs grown in Mudeungsan's pristine natural environment and clear valley water.",
      zh: "以无等山清洁自然环境中生长的各种药草和清澈谷水制成的深厚浓郁汤味为特色。",
      ja: "無等山の清浄な自然環境で育った様々な薬草と清らかな谷水が作り出す深くて濃いスープの味が特徴です。"
    },
    culture: {
      ko: "광주 사람들의 건강을 중시하는 식문화와 무등산에 대한 자부심이 담긴 대표적인 향토 요리입니다.",
      en: "Representative local dish containing Gwangju people's health-conscious food culture and pride in Mudeungsan Mountain.",
      zh: "体现光州人重视健康的饮食文化和对无等山自豪感的代表性乡土料理。",
      ja: "光州の人々の健康を重視する食文化と無等山への自負心が込められた代表的な郷土料理です。"
    },
    fun_fact: {
      ko: "무등산백숙은 인삼, 황기, 당귀 등 다양한 한약재를 넣어 끓여 몸보신에 최고로 여겨집니다.",
      en: "Mudeungsan baeksuk is considered the best for body nourishment, boiled with various herbal medicines like ginseng, astragalus, and angelica.",
      zh: "无等山白熟鸡加入人参、黄芪、当归等各种中药材煮制，被认为是最佳的滋补食品。",
      ja: "無等山ペクスクは人参、黄耆、当帰など様々な漢方薬材を入れて煮て、体の滋養に最高とされています。"
    }
  },

  // 대전 - 성심당빵 추가
  seongsimang_ppang: {
    name: { ko: "성심당빵", en: "Seongsimang Bread", zh: "圣心堂面包", ja: "聖心堂パン" },
    history: {
      ko: "1956년 대전에서 시작된 성심당 제과점의 대표 빵으로, 70년 가까이 대전 시민들의 사랑을 받아온 명물입니다.",
      en: "Representative bread of Seongsimang Bakery that started in Daejeon in 1956, a specialty beloved by Daejeon citizens for nearly 70 years.",
      zh: "始于1956年大田的圣心堂糕点店的代表面包，近70年来深受大田市民喜爱的名物。",
      ja: "1956年に大田で始まった聖心堂製菓店の代表的なパンで、70年近く大田市民の愛を受けてきた名物です。"
    },
    geography: {
      ko: "대전의 중심가에 위치한 성심당은 교통의 요지로서 전국 각지에서 찾아오는 사람들이 즐겨 찾는 대전의 랜드마크가 되었습니다.",
      en: "Located in downtown Daejeon, Seongsimang became a Daejeon landmark enjoyed by visitors from all over the country as a transportation hub.",
      zh: "位于大田市中心的圣心堂作为交通要地，成为全国各地游客喜爱光顾的大田地标。",
      ja: "大田の中心街に位置する聖心堂は交通の要衝として全国各地から訪れる人々が好んで訪れる大田のランドマークとなりました。"
    },
    culture: {
      ko: "대전 시민들의 일상과 특별한 날을 함께해온 향토 기업으로, 세대를 이어가며 사랑받는 추억의 맛입니다.",
      en: "Local company that has shared Daejeon citizens' daily lives and special occasions, a nostalgic taste beloved across generations.",
      zh: "与大田市民的日常和特殊日子共同度过的本土企业，是跨越世代深受喜爱的回忆之味。",
      ja: "大田市民の日常と特別な日を共にしてきた郷土企業で、世代を継いで愛され続ける思い出の味です。"
    },
    fun_fact: {
      ko: "성심당의 대표 메뉴인 '튀김소보로'는 대전역에서 KTX를 타는 승객들이 꼭 사가는 대전의 대표 선물입니다.",
      en: "Seongsimang's signature 'fried soboro' is Daejeon's representative gift that KTX passengers at Daejeon Station must buy.",
      zh: "圣心堂的代表菜单'炸酥波萝'是在大田站乘坐KTX的乘客必买的大田代表性礼品。",
      ja: "聖心堂の代表メニューである「揚げソボロ」は大田駅でKTXに乗る乗客が必ず買っていく大田の代表的なお土産です。"
    }
  },

  // 울산 - 장생포고래고기 추가
  jangsaengpo_gorae: {
    name: { ko: "장생포고래고기", en: "Jangsaengpo Whale Meat", zh: "长生浦鲸鱼肉", ja: "長生浦クジラ肉" },
    history: {
      ko: "울산 장생포는 한국 포경업의 중심지였으며, 1986년 상업적 포경 금지 이전까지 고래고기는 이 지역의 대표 음식이었습니다.",
      en: "Ulsan's Jangsaengpo was the center of Korea's whaling industry, and whale meat was the region's representative food until commercial whaling was banned in 1986.",
      zh: "蔚山长生浦是韩国捕鲸业的中心，直到1986年禁止商业捕鲸之前，鲸鱼肉都是该地区的代表性食物。",
      ja: "蔚山長生浦は韓国捕鯨業の中心地で、1986年に商業捕鯨が禁止されるまでクジラ肉はこの地域の代表的な食べ物でした。"
    },
    geography: {
      ko: "동해의 깊은 바다와 만나는 울산 연안은 예로부터 고래들의 회유 경로였으며, 이를 바탕으로 포경 문화가 발달했습니다.",
      en: "Ulsan's coast meeting the deep East Sea was traditionally a whale migration route, leading to the development of whaling culture.",
      zh: "与东海深海相接的蔚山沿岸自古以来就是鲸鱼的洄游路线，以此为基础发展了捕鲸文化。",
      ja: "東海の深い海と出会う蔚山沿岸は昔からクジラの回遊経路で、これを基に捕鯨文化が発達しました。"
    },
    culture: {
      ko: "현재는 포경이 금지되어 냉동 고래고기나 좌초된 고래만 식용할 수 있으며, 장생포 고래문화마을에서 그 역사를 보존하고 있습니다.",
      en: "Currently whaling is banned and only frozen whale meat or stranded whales can be consumed, with Jangsaengpo Whale Culture Village preserving this history.",
      zh: "目前禁止捕鲸，只能食用冷冻鲸鱼肉或搁浅的鲸鱼，长生浦鲸鱼文化村保存着这一历史。",
      ja: "現在は捕鯨が禁止されて冷凍クジラ肉や座礁したクジラのみ食用でき、長生浦クジラ文化村でその歴史を保存しています。"
    },
    fun_fact: {
      ko: "장생포에는 국내 유일의 고래박물관이 있으며, 고래고기는 단백질이 풍부하고 철분 함량이 높아 영양가가 뛰어납니다.",
      en: "Jangsaengpo has Korea's only whale museum, and whale meat is rich in protein with high iron content, making it highly nutritious.",
      zh: "长生浦有国内唯一的鲸鱼博物馆，鲸鱼肉富含蛋白质和铁分，营养价值很高。",
      ja: "長生浦には国内唯一のクジラ博物館があり、クジラ肉はタンパク質が豊富で鉄分含量が高く栄養価が優れています。"
    }
  }
};
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
