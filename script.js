// 한국 전통 요리 지도 - 완전판 (50가지 요리)
let map;
let markers = {};
let selectedCity = null;

// 50가지 한국 전통 요리 데이터
const foodData = {
  cities: {
    seoul: {
      name: "서울",
      coords: [37.5665, 126.9780],
      foods: {
        bulgogi: {
          name: "불고기",
          history: "조선시대 궁중요리에서 시작된 불고기는 원래 '너비아니'라고 불렸습니다. 고기를 얇게 저며 양념에 재워 구운 요리로, 서울 양반가의 대표적인 접대 음식이었습니다.",
          geography: "서울의 한강 유역은 예로부터 소를 기르기에 좋은 환경이었고, 궁궐과 양반가가 많아 고급 육류 요리 문화가 발달했습니다.",
          culture: "불고기는 한국의 '정(情)' 문화를 대표하는 음식입니다. 가족이나 손님과 함께 둘러앉아 구워 먹으며 소통하는 한국인의 공동체 문화를 보여줍니다.",
          fun_fact: "불고기는 세계에서 가장 유명한 한국 음식 중 하나로, 'Korean BBQ'라는 이름으로 전 세계에 한국 음식을 알리는 대표 음식이 되었습니다."
        },
        pyeongyang_naengmyeon: {
          name: "평양냉면",
          history: "평양에서 시작된 냉면이 6.25 전쟁 이후 피난민들에 의해 서울로 전해졌습니다. 을지로와 명동 일대의 평양냉면집들이 그 전통을 이어가고 있습니다.",
          geography: "원래 평양의 추운 겨울 날씨에 시원한 냉면을 먹는 문화에서 시작되었지만, 서울에서는 여름 별미로 자리잡았습니다.",
          culture: "분단의 아픔과 향수를 담은 음식입니다. 고향을 그리워하는 실향민들의 마음이 담긴 음식으로, 한국 현대사의 산증인이기도 합니다.",
          fun_fact: "진짜 평양냉면은 면을 가위로 자르지 않고 후루룩 소리내며 먹는 것이 예의입니다. 면을 끊는 것은 인연을 끊는다는 의미로 여겨졌기 때문입니다."
        },
        samgyetang: {
          name: "삼계탕",
          history: "조선시대부터 여름 보양식으로 먹어온 삼계탕은 '이열치열(以熱治熱)' 원리에 따라 더운 여름에 뜨거운 음식을 먹어 몸의 기운을 북돋는 지혜에서 나왔습니다.",
          geography: "서울을 중심으로 한 중부지방에서 발달한 궁중 보양식이 민간으로 전해진 음식입니다.",
          culture: "삼복(초복, 중복, 말복)에 먹는 대표적인 보양식으로, 가족의 건강을 염려하는 한국인의 정을 보여주는 음식입니다.",
          fun_fact: "삼계탕의 영어 이름 'Ginseng Chicken Soup'은 외국인들이 가장 좋아하는 한국 음식 중 하나입니다."
        }
      }
    },
    busan: {
      name: "부산",
      coords: [35.1796, 129.0756],
      foods: {
        milmyeon: {
          name: "밀면",
          history: "6.25 전쟁 당시 북한 실향민들이 평양냉면을 그리워하며 구하기 쉬운 밀가루로 만든 면요리입니다. 1950년대 부산 피난촌에서 시작되었습니다.",
          geography: "부산항을 통해 들어온 미군 구호물자인 밀가루를 이용해 만든 음식으로, 항구도시 부산의 역사를 보여줍니다.",
          culture: "전쟁의 아픔과 고향에 대한 그리움, 그리고 새로운 환경에 적응하려는 강인한 생존력이 담긴 음식입니다.",
          fun_fact: "밀면은 냉면과 달리 면발이 쫄깃하고 탄력이 있어 '부산의 소울푸드'라고 불립니다."
        },
        dwaeji_gukbap: {
          name: "돼지국밥",
          history: "일제강점기 부산항 노동자들이 저렴하고 영양가 높은 음식으로 먹기 시작한 서민 음식입니다. 돼지 뼈를 우린 진한 국물이 특징입니다.",
          geography: "부산항의 물류 노동자들과 어부들 사이에서 발달한 음식으로, 바다의 짠 바람과 고된 노동에 지친 몸을 보충하는 음식이었습니다.",
          culture: "부산 사람들의 후끈한 인정과 끈끈한 동료애가 담긴 음식입니다. '국밥 한 그릇의 정'이라는 말로 표현되는 따뜻한 마음을 보여줍니다.",
          fun_fact: "부산 돼지국밥은 새우젓으로 간을 맞추는 것이 특징이며, 이는 바다 도시 부산만의 독특한 맛을 만들어냅니다."
        },
        eomuk: {
          name: "어묵",
          history: "일제강점기 일본에서 전해진 '오뎅'이 부산 지역 어민들의 풍부한 어류 자원과 만나 독특한 부산 어묵으로 발전했습니다.",
          geography: "부산 앞바다의 신선한 생선을 이용해 만든 어묵은 영도구 동삼동이 원조로 알려져 있습니다.",
          culture: "길거리에서 따뜻한 어묵 국물을 마시며 추위를 이기는 부산 시민들의 일상 문화를 대표합니다.",
          fun_fact: "부산 어묵은 생선 함량이 높아 탄력이 좋고, 전국 어묵 생산량의 70% 이상을 차지합니다."
        }
      }
    },
    jeonju: {
      name: "전주",
      coords: [35.8242, 127.1480],
      foods: {
        bibimbap: {
          name: "비빔밥",
          history: "조선왕조의 발상지 전주에서 시작된 비빔밥은 궁중에서 먹던 골동반에서 유래되었습니다. 다양한 나물을 한 그릇에 담아 비벼 먹는 한국의 대표적인 건강식입니다.",
          geography: "전라북도의 비옥한 평야지대에서 나는 다양한 채소와 곡물을 이용해 만든 음식으로, 호남평야의 풍요로움을 보여줍니다.",
          culture: "음양오행의 조화를 중시하는 한국의 전통 철학이 담긴 음식입니다. 다섯 가지 색깔의 나물로 건강과 조화를 추구합니다.",
          fun_fact: "전주 비빔밥은 2011년 CNN에서 선정한 '세계에서 가장 맛있는 음식 40선'에 선정되었습니다."
        },
        kongnamul_gukbap: {
          name: "콩나물국밥",
          history: "조선시대 전주 장터 상인들이 간단하고 든든한 한 끼 식사로 즐겨 먹던 서민 음식입니다. 숙취 해소에도 효과가 좋아 애주가들에게 사랑받았습니다.",
          geography: "전라도의 질 좋은 콩으로 기른 콩나물을 이용한 음식으로, 전주 지역의 풍부한 농산물을 활용한 대표적인 향토 음식입니다.",
          culture: "소박하지만 정성이 담긴 서민들의 음식으로, 전주 사람들의 인심과 정을 보여주는 대표적인 음식입니다.",
          fun_fact: "전주 콩나물국밥은 새우젓과 마늘을 많이 넣어 시원하고 개큰한 맛이 특징입니다."
        },
        jeonju_hanjeongsik: {
          name: "전주한정식",
          history: "조선왕조 발상지인 전주의 궁중음식 전통과 전라도의 풍부한 식재료가 결합되어 만들어진 한국 전통 상차림의 정수입니다.",
          geography: "호남평야의 비옥한 토지에서 나는 다양한 농산물과 서해안의 해산물을 활용한 풍성한 밥상입니다.",
          culture: "손님을 극진히 대접하는 전라도 사람들의 인심을 보여주는 음식으로, '상다리가 부러질 정도'라는 표현이 어울리는 푸짐한 상차림입니다.",
          fun_fact: "전주한정식은 보통 20가지 이상의 반찬이 나오며, 계절에 따라 반찬 구성이 달라집니다."
        }
      }
    },
    andong: {
      name: "안동",
      coords: [36.5684, 128.7294],
      foods: {
        andong_jjimdak: {
          name: "안동찜닭",
          history: "1980년대 안동 구시장 골목에서 시작된 비교적 최근의 향토음식입니다. 닭을 간장 양념에 각종 채소와 함께 조린 음식으로 현재는 안동의 대표 음식이 되었습니다.",
          geography: "안동 지역의 전통적인 간장 발효 기술과 인근 지역의 신선한 채소를 활용한 음식입니다.",
          culture: "가족들이 둘러앉아 함께 나누어 먹는 음식으로, 안동 지역의 화목한 가정 문화를 보여줍니다.",
          fun_fact: "안동찜닭은 당면이 들어가는 것이 특징이며, 전국적으로 인기를 얻으면서 치킨 프랜차이즈의 메뉴로도 활용되고 있습니다."
        },
        andong_soju: {
          name: "안동소주",
          history: "조선시대부터 내려온 전통 증류식 소주로, 안동 지역의 명문가에서 비법을 전수해온 전통주입니다. 현재는 무형문화재로 지정되어 있습니다.",
          geography: "안동 지역의 맑은 물과 질 좋은 쌀, 그리고 적절한 기후 조건이 만들어낸 전통주입니다.",
          culture: "안동 양반가의 선비 문화와 함께 발달한 고급 전통주로, 특별한 날과 손님 접대에 사용되었습니다.",
          fun_fact: "안동소주는 알코올 도수가 45도로 높으며, 누룩으로 발효시켜 증류한 전통 방식으로 만들어집니다."
        }
      }
    },
    jeju: {
      name: "제주",
      coords: [33.4996, 126.5312],
      foods: {
        heukdwaeji: {
          name: "흑돼지",
          history: "제주도에서 자연 방목으로 키운 재래종 돼지로, 예로부터 제주 사람들의 중요한 단백질 공급원이었습니다. 고기 맛이 담백하고 잡내가 없는 것이 특징입니다.",
          geography: "제주도의 청정 자연환경에서 자란 흑돼지는 화산토 토양과 청정 공기, 풍부한 초목을 먹고 자라 육질이 뛰어납니다.",
          culture: "제주도의 돌하르방만큼 제주를 대표하는 특산품으로, 제주 사람들의 소박하고 건강한 식문화를 보여줍니다.",
          fun_fact: "제주 흑돼지는 스트레스를 적게 받아 육질이 부드럽고, 불포화지방산 함량이 높아 건강에 좋습니다."
        },
        galchi_jorim: {
          name: "갈치조림",
          history: "제주 근해에서 잡히는 싱싱한 갈치를 이용한 대표적인 제주 향토 음식입니다. 간장과 고춧가루로 양념하여 조린 음식입니다.",
          geography: "제주도 주변 바다는 갈치가 많이 잡히는 어장으로 유명하며, 특히 제주 갈치는 살이 두툼하고 맛이 좋기로 소문났습니다.",
          culture: "제주도의 해녀와 어부들의 바다 생활과 밀접한 관련이 있는 음식으로, 바다의 신선한 맛을 그대로 살린 소박한 요리입니다.",
          fun_fact: "제주 갈치는 크기가 크고 은백색이 아름다워 '제주의 바다 보석'이라고 불리기도 합니다."
        }
      }
    },
    gangneung: {
      name: "강릉",
      coords: [37.7519, 128.8761],
      foods: {
        chodang_sundubu: {
          name: "초당순두부",
          history: "조선시대 허균, 허난설헌 남매의 고향인 강릉 초당마을에서 시작된 순두부입니다. 바닷물을 간수로 사용하여 만든 독특한 제조법이 특징입니다.",
          geography: "강릉 앞바다의 청정 바닷물을 간수로 사용하고, 강원도의 질 좋은 콩으로 만들어 부드럽고 고소한 맛이 일품입니다.",
          culture: "선비 문화가 발달한 강릉 지역의 정갈하고 담백한 음식 문화를 대표하는 음식입니다.",
          fun_fact: "초당순두부는 바닷물로 응고시켜 일반 순두부보다 단백질 함량이 높고 미네랄이 풍부합니다."
        },
        memil_makguksu: {
          name: "메밀막국수",
          history: "강원도 산간 지역에서 재배한 메밀로 만든 면 요리로, 조선시대부터 강원도 사람들의 주요 식량이었습니다.",
          geography: "강원도의 서늘한 기후와 산간 지역은 메밀 재배에 적합하여 질 좋은 메밀이 생산됩니다.",
          culture: "강원도 사람들의 소박하고 건강한 식생활을 보여주는 대표적인 향토 음식입니다.",
          fun_fact: "메밀막국수는 루틴 성분이 풍부하여 혈관 건강에 좋고, 시원한 동치미 국물에 말아 먹는 것이 일반적입니다."
        }
      }
    },
    chuncheon: {
      name: "춘천",
      coords: [37.8813, 127.7298],
      foods: {
        dakgalbi: {
          name: "닭갈비",
          history: "1960년대 춘천의 한 식당에서 저렴한 닭고기를 이용해 만든 서민 음식에서 시작되었습니다. 현재는 춘천을 대표하는 관광 음식이 되었습니다.",
          geography: "춘천 지역의 신선한 채소와 함께 철판에 볶아 먹는 음식으로, 강원도의 청정 자연환경을 활용한 음식입니다.",
          culture: "연인들과 친구들이 함께 둘러앉아 먹는 음식으로, 젊은이들의 데이트 코스로 인기가 높습니다.",
          fun_fact: "춘천 닭갈비는 마지막에 볶음밥을 해먹는 것이 정석이며, 이를 '추가밥'이라고 부릅니다."
        }
      }
    },
    sokcho: {
      name: "속초",
      coords: [38.2070, 128.5919],
      foods: {
        ojingeo_sundae: {
          name: "오징어순대",
          history: "속초 앞바다에서 잡힌 신선한 오징어를 이용해 만든 독특한 순대로, 1960년대부터 속초의 명물로 자리잡았습니다.",
          geography: "동해안의 청정 바다에서 잡힌 싱싱한 오징어와 강원도 지역의 신선한 채소를 함께 사용합니다.",
          culture: "어항 도시 속초의 해양 문화와 강원도의 산나물 문화가 결합된 독특한 음식입니다.",
          fun_fact: "오징어순대는 일반 순대와 달리 오징어 몸통에 찹쌀과 채소를 넣고 쪄서 만드는 속초만의 특별한 음식입니다."
        }
      }
    },
    daegu: {
      name: "대구",
      coords: [35.8714, 128.6014],
      foods: {
        makchang: {
          name: "막창",
          history: "1960년대 대구 서문시장 일대에서 시작된 막창구이는 원래 서민들의 저렴한 술안주였지만, 현재는 대구를 대표하는 음식이 되었습니다.",
          geography: "대구는 내륙 지역으로 신선한 곱창류를 구하기 쉬워 곱창 요리가 발달했습니다.",
          culture: "대구 사람들의 진솔하고 호방한 성격을 보여주는 음식으로, 친구들과 함께 술과 함께 즐기는 문화가 발달했습니다.",
          fun_fact: "대구 막창은 특유의 쫄깃한 식감과 고소한 맛으로 전국적인 인기를 얻고 있습니다."
        },
        ttaro_gukbap: {
          name: "따로국밥",
          history: "대구 지역의 전통적인 국밥으로, 국과 밥을 따로 내어주는 것이 특징입니다. 1950년대부터 대구 시민들의 사랑을 받아온 서민 음식입니다.",
          geography: "대구 지역의 기후와 토질에 맞는 재료들을 사용하여 만든 지역 특색이 강한 음식입니다.",
          culture: "대구 사람들의 깔끔하고 정갈한 성격을 보여주는 음식으로, 간단하지만 정성이 담긴 한 끼를 제공합니다.",
          fun_fact: "따로국밥의 '따로'는 국과 밥을 따로 내어준다는 의미로, 국물과 밥을 각자 조절해서 먹을 수 있습니다."
        }
      }
    },
    gyeongju: {
      name: "경주",
      coords: [35.8562, 129.2247],
      foods: {
        hwangnam_ppang: {
          name: "황남빵",
          history: "1939년 경주 황남동에서 처음 만들어진 팥앙금이 들어간 빵으로, 경주를 대표하는 기념품이자 간식입니다.",
          geography: "신라의 고도 경주의 전통과 일제강점기 제빵 기술이 결합되어 탄생한 독특한 지역 특산품입니다.",
          culture: "관광객들이 경주를 방문했을 때 반드시 사가는 대표적인 기념품으로, 경주의 관광 문화와 밀접한 관련이 있습니다.",
          fun_fact: "황남빵은 국화꽃 모양으로 만들어지며, 경주 대릉원 근처에서만 정통 맛을 볼 수 있습니다."
        }
      }
    },
    pohang: {
      name: "포항",
      coords: [36.0190, 129.3435],
      foods: {
        mulhoe: {
          name: "물회",
          history: "포항을 비롯한 동해안 어촌에서 어부들이 바다에서 갓 잡은 생선을 즉석에서 회쳐서 차가운 물에 말아 먹던 어부들의 음식에서 시작되었습니다.",
          geography: "동해안의 청정 바다에서 잡힌 신선한 생선과 미역, 다시마 등 해조류를 이용한 대표적인 해안 지역 음식입니다.",
          culture: "바다에서 고된 작업을 마친 어부들이 간단하고 시원하게 먹을 수 있는 음식으로, 동해안 어촌 문화를 대표합니다.",
          fun_fact: "포항 물회는 고춧가루와 식초, 설탕 등으로 만든 새콤달콤한 양념이 특징이며, 여름철 보양식으로 인기가 높습니다."
        }
      }
    },
    mokpo: {
      name: "목포",
      coords: [34.8118, 126.3922],
      foods: {
        hongeo: {
          name: "홍어",
          history: "조선시대부터 목포와 흑산도 일대에서 잡힌 홍어를 삭혀서 먹는 전통이 있었습니다. 발효 과정을 거쳐 독특한 맛과 향을 가지게 됩니다.",
          geography: "서해 깊은 바다에서 잡힌 홍어를 목포 지역의 기후 조건을 이용해 자연 발효시킨 음식입니다.",
          culture: "전라도 사람들의 진취적이고 개방적인 성격을 보여주는 음식으로, 처음에는 거부감이 있지만 한번 맛을 들이면 중독성이 강합니다.",
          fun_fact: "홍어는 암모니아 냄새가 강한 것이 특징이며, 삼합(홍어+수육+김치)으로 먹는 것이 일반적입니다."
        }
      }
    },
    yeosu: {
      name: "여수",
      coords: [34.7604, 127.6622],
      foods: {
        dolsan_gat_kimchi: {
          name: "돌산갓김치",
          history: "여수 돌산도에서 자라는 특산물인 돌산갓으로 만든 김치로, 조선시대부터 이 지역의 대표적인 저장 음식이었습니다.",
          geography: "돌산도의 해양성 기후와 염분이 섞인 토양에서 자란 돌산갓은 일반 갓보다 맛이 진하고 향이 독특합니다.",
          culture: "여수 지역 어민들의 바다 생활과 밀접한 관련이 있는 음식으로, 비타민과 무기질이 풍부해 어부들의 건강식 역할을 했습니다.",
          fun_fact: "돌산갓김치는 매운맛이 강하고 시원한 맛이 일품이며, 라면에 넣어 먹으면 특별한 맛을 낼 수 있습니다."
        }
      }
    },
    tongyeong: {
      name: "통영",
      coords: [34.8544, 128.4332],
      foods: {
        chungmu_gimbap: {
          name: "충무김밥",
          history: "1960년대 통영(옛 충무시) 중앙시장에서 어부들과 상인들을 위해 만든 간편한 도시락에서 시작되었습니다.",
          geography: "통영 앞바다의 신선한 해산물과 김을 이용하고, 보관이 쉽도록 속재료 없이 밥만 싼 것이 특징입니다.",
          culture: "바쁜 어부들과 상인들이 한 손으로 간편하게 먹을 수 있도록 만든 실용적인 음식으로, 통영 사람들의 지혜가 담겨 있습니다.",
          fun_fact: "충무김밥은 김밥에 속재료가 들어가지 않고, 무김치와 오징어무침을 따로 내어주는 것이 특징입니다."
        }
      }
    },
    incheon: {
      name: "인천",
      coords: [37.4563, 126.7052],
      foods: {
        jajangmyeon: {
          name: "자장면",
          history: "1883년 인천항 개항과 함께 중국인들이 들어오면서 전해진 음식입니다. 중국의 작장면이 한국인의 입맛에 맞게 변화하여 현재의 자장면이 되었습니다.",
          geography: "인천항을 통해 들어온 중국 문화와 한국의 식재료가 만나 탄생한 대표적인 퓨전 음식입니다.",
          culture: "한국의 국민 음식으로 자리잡은 자장면은 중국계 한국인들의 정착사와 한국의 다문화 역사를 보여주는 음식입니다.",
          fun_fact: "자장면은 한국에서만 먹을 수 있는 독특한 음식으로, 중국의 원조 작장면과는 맛이 완전히 다릅니다."
        },
        ganghwa_sunmu: {
          name: "강화순무",
          history: "강화도의 특산물인 강화순무는 조선시대부터 재배되어 온 전통 채소입니다. 김치나 장아찌로 만들어 먹습니다.",
          geography: "강화도의 바닷바람과 염분이 섞인 토양에서 자란 순무는 일반 순무보다 아삭하고 단맛이 강합니다.",
          culture: "강화도 주민들의 소박한 농촌 생활과 밀접한 관련이 있는 향토 음식입니다.",
          fun_fact: "강화순무는 비타민C가 풍부하고 소화에 좋아 겨울철 건강식으로 인기가 높습니다."
        }
      }
    },
    suwon: {
      name: "수원",
      coords: [37.2636, 127.0286],
      foods: {
        suwon_galbi: {
          name: "수원갈비",
          history: "조선시대 정조대왕이 화성을 건설할 때 수원 지역에서 발달한 갈비 요리로, 왕실의 입맛에 맞게 발달했습니다.",
          geography: "수원 지역의 좋은 물과 목초지에서 기른 한우를 이용한 고급 갈비 요리입니다.",
          culture: "정조대왕의 효심과 수원화성의 역사가 담긴 음식으로, 수원을 대표하는 문화 유산입니다.",
          fun_fact: "수원갈비는 양념을 하지 않고 소금구이로 먹는 것이 전통이며, 고기 본연의 맛을 중시합니다."
        }
      }
    },
    gwangju: {
      name: "광주",
      coords: [35.1595, 126.8526],
      foods: {
        mudeungsan_baeksuk: {
          name: "무등산백숙",
          history: "광주 무등산 일대에서 자란 토종닭을 이용해 만든 백숙으로, 예로부터 광주 지역의 대표적인 보양식이었습니다.",
          geography: "무등산의 청정 자연환경에서 자란 토종닭과 지리산 일대의 약초를 함께 우린 건강식입니다.",
          culture: "광주 사람들의 정과 따뜻한 마음이 담긴 음식으로, 가족의 건강을 염려하는 마음을 보여줍니다.",
          fun_fact: "무등산백숙은 각종 한약재를 넣고 오래 끓여 국물이 진하고 영양가가 높습니다."
        }
      }
    },
    daejeon: {
      name: "대전",
      coords: [36.3504, 127.3845],
      foods: {
        seongsimang_ppang: {
          name: "성심당빵",
          history: "1956년 설립된 대전의 대표 베이커리 성심당에서 만든 빵들로, 대전 시민들의 소울푸드가 되었습니다.",
          geography: "대전의 교통 요충지 특성을 살려 전국 각지의 좋은 재료를 사용해 만든 빵입니다.",
          culture: "대전 시민들의 일상과 추억이 담긴 음식으로, 지역 사랑과 향토애를 보여주는 대표적인 사례입니다.",
          fun_fact: "성심당의 튀김소보로는 대전을 대표하는 명물로, 전국에서 맛보러 오는 사람들이 많습니다."
        }
      }
    },
    ulsan: {
      name: "울산",
      coords: [35.5384, 129.3114],
      foods: {
        jangsaengpo_gorae: {
          name: "장생포고래고기",
          history: "울산 장생포는 우리나라 최대의 포경기지였으며, 1986년 포경이 금지되기 전까지 고래고기가 이 지역의 주요 음식이었습니다.",
          geography: "동해안의 깊은 바다와 연결된 장생포 항구는 고래가 자주 출몰하는 지역이었습니다.",
          culture: "포경업에 종사했던 어부들과 그 가족들의 생활 문화가 담긴 음식으로, 울산의 해양 문화 역사를 보여줍니다.",
          fun_fact: "현재는 포경이 금지되어 자연사한 고래나 혼획된 고래만 유통되며, 장생포 고래박물관에서 그 역사를 확인할 수 있습니다."
        }
      }
    }
  }
};

// 지도 초기화
function initMap() {
  // 지도 생성
  map = L.map('map').setView([36.5, 127.8], 7);
  
  // 타일 레이어 추가
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
    tileSize: 256,
    zoomOffset: 0
  }).addTo(map);
  
  // 지도 크기 재조정 (렌더링 문제 해결)
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
  
  // 도시 마커 추가
  addCityMarkers();
}

// 도시 마커 추가
function addCityMarkers() {
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    
    // 마커 생성
    const marker = L.marker(city.coords)
      .addTo(map)
      .bindPopup(`<strong>${city.name}</strong><br>클릭하여 전통 요리 보기`)
      .on('click', () => showCityFoods(cityKey));
    
    markers[cityKey] = marker;
  });
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
  
  // 선택된 마커 강조
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
      <h2>${city.name}의 전통 요리</h2>
      <button id="closeSidebar" onclick="closeSidebar()">×</button>
    </div>
    <div class="food-cards">
  `;
  
  Object.keys(city.foods).forEach(foodKey => {
    const food = city.foods[foodKey];
    sidebarContent += `
      <div class="food-card" onclick="showFoodDetail('${cityKey}', '${foodKey}')">
        <h3>${food.name}</h3>
        <p class="food-preview">${food.history.substring(0, 50)}...</p>
        <span class="click-hint">자세히 보기 →</span>
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
  
  const detailContent = `
    <div class="city-header">
      <button onclick="showCityFoods('${cityKey}')" class="back-btn">← ${city.name}</button>
      <button id="closeSidebar" onclick="closeSidebar()">×</button>
    </div>
    <div class="food-detail">
      <h2>${food.name}</h2>
      
      <div class="detail-section">
        <h3>🏛️ 역사</h3>
        <p>${food.history}</p>
      </div>
      
      <div class="detail-section">
        <h3>🗺️ 지리</h3>
        <p>${food.geography}</p>
      </div>
      
      <div class="detail-section">
        <h3>🎭 문화</h3>
        <p>${food.culture}</p>
      </div>
      
      <div class="detail-section fun-fact">
        <h3>💡 흥미로운 사실</h3>
        <p>${food.fun_fact}</p>
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
    alert('음식 이름을 입력해주세요!');
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
      if (food.name.toLowerCase().includes(searchTerm)) {
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
  let foodList = [];
  
  Object.keys(foodData.cities).forEach(cityKey => {
    const city = foodData.cities[cityKey];
    Object.keys(city.foods).forEach(foodKey => {
      const food = city.foods[foodKey];
      foodList.push({
        name: food.name,
        city: city.name,
        cityKey: cityKey,
        foodKey: foodKey
      });
    });
  });
  
  foodList.sort((a, b) => a.name.localeCompare(b.name));
  
  let content = `
    <div class="city-header">
      <h2>🔍 전체 음식 목록</h2>
      <button id="closeSidebar" onclick="closeSidebar()">×</button>
    </div>
    <div class="search-results">
      <p>검색 결과가 없습니다. 아래 목록에서 선택해보세요:</p>
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

// 페이지 로드 시 지도 초기화
document.addEventListener('DOMContentLoaded', function() {
  initMap();
});
