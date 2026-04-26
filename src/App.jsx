import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Hotel,
  Info,
  Landmark,
  Languages,
  Luggage,
  MapPin,
  Navigation,
  ParkingCircle,
  Plane,
  Route,
  Search,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Train,
  Users,
  Utensils,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const gm = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const gd = (origin, destination, mode = "driving") =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;

const bi = (zh, en) => ({ zh, en });
const pick = (value, lang) => (typeof value === "string" ? value : value?.[lang] || value?.zh || "");

const A = {
  hotelBoston: "The Revolution Hotel, 40 Berkeley St, Boston, MA 02116",
  fenway: "Fenway Park, 4 Jersey St, Boston, MA 02215",
  leader: "Leader Bank Pavilion, 290 Northern Ave, Boston, MA 02210",
  northeastern: "Northeastern University, 360 Huntington Ave, Boston, MA 02115",
  backBayAvis: "Avis Boston Back Bay Station Garage, 100 Clarendon St, Boston, MA 02116",
  loganAvis: "Avis Boston Logan International Airport, 15 Transportation Way, East Boston, MA 02128",
  americanDream: "American Dream, 1 American Dream Way, East Rutherford, NJ 07073",
  hotelPhilly: "4211 Suites, 4211 Chestnut St, Philadelphia, PA 19104",
  avisJ5D: "Avis PHL Convention Ctr Parking, 1324 Arch St, Philadelphia, PA 19107",
  station30: "William H. Gray III 30th Street Station, 2955 Market St, Philadelphia, PA 19104",
  nationalMall: "National Mall, Washington, DC",
  nyPenn: "New York Penn Station, New York, NY 10001",
};

const langPack = {
  zh: {
    switch: "EN",
    search: "搜尋日期、地點、餐廳、交通或注意事項",
    all: "全部",
    boston: "波士頓",
    ceremony: "典禮",
    transport: "交通",
    philly: "費城",
    dc: "華盛頓特區",
    nyc: "紐約",
    maps: "地圖",
    risks: "注意事項",
    openMap: "開啟地圖",
    route: "路線",
    intensity: "強度",
    doNotAdd: "不要加排",
    mapLinks: "地圖連結",
    details: "查看細節",
  },
  en: {
    switch: "中",
    search: "Search dates, places, restaurants, transport, or notes",
    all: "All",
    boston: "Boston",
    ceremony: "Ceremonies",
    transport: "Transport",
    philly: "Philadelphia",
    dc: "Washington, DC",
    nyc: "New York",
    maps: "Maps",
    risks: "Notes",
    openMap: "Open map",
    route: "Route",
    intensity: "Intensity",
    doNotAdd: "Do not add",
    mapLinks: "Map links",
    details: "View details",
  },
};

const quickFacts = [
  {
    icon: Plane,
    zh: "4/26 早上抵達 Boston Logan，當天只休息與短距離活動。",
    en: "Arrive at Boston Logan on the morning of 4/26. Keep the day limited to rest and very light movement.",
  },
  {
    icon: GraduationCap,
    zh: "4/29 Fenway Park，Graduate Commencement 10:00 AM，畢業生 8:00 AM Gate B。",
    en: "4/29 Fenway Park, Graduate Commencement at 10:00 AM. Graduate report time is 8:00 AM at Gate B.",
  },
  {
    icon: GraduationCap,
    zh: "4/30 Leader Bank Pavilion，D’Amore-McKim Celebration 6:00 PM，畢業生 4:30 PM，來賓 5:00 PM。",
    en: "4/30 Leader Bank Pavilion, D’Amore-McKim Celebration at 6:00 PM. Graduate arrival 4:30 PM, guest arrival 5:00 PM.",
  },
  {
    icon: Car,
    zh: "5/2 優先試 Boston 市中心早取車；12:00 PM 取車太晚，不適合 American Dream 路線。",
    en: "For 5/2, try early city-center car pickup first. A 12:00 PM pickup is too late for the American Dream route.",
  },
  {
    icon: Train,
    zh: "5/5 費城到紐約用 Amtrak 或 NJ Transit，不是 LIRR。",
    en: "On 5/5, use Amtrak or NJ Transit from Philadelphia to New York. Do not use LIRR from Philadelphia.",
  },
];

const ceremonies = [
  {
    key: "fenway",
    title: bi("Graduate Commencement", "Graduate Commencement"),
    venue: "Fenway Park",
    date: bi("2026 年 4 月 29 日，星期三", "Wednesday, April 29, 2026"),
    time: bi("典禮 10:00 AM 開始", "Ceremony starts at 10:00 AM"),
    address: A.fenway,
    accent: "from-[#0b2a48] to-[#254d74]",
    visual: "fenway",
    rows: [
      [bi("畢業生報到與集合", "Graduate report and line-up"), bi("8:00 AM，Gate B，Van Ness Street", "8:00 AM, Gate B, Van Ness Street")],
      [bi("來賓入場", "Guest entry"), bi("8:00 AM，Gates A、D、E", "8:00 AM, Gates A, D, E")],
      [bi("進場遊行", "Procession"), bi("約 8:45 AM", "Approx. 8:45 AM")],
      [bi("典禮開始", "Ceremony start"), bi("10:00 AM", "10:00 AM")],
      [bi("入場要求", "Entry"), bi("需持有效票券，所有人需接受安檢", "Valid ticket required. All attendees are subject to security screening.")],
      [bi("再入場", "Re-entry"), bi("不可再次入場", "No re-entry")],
    ],
    bullets: [
      bi("畢業生穿著 cap、gown、hood、alumni pin。", "Graduate should wear cap, gown, hood, and alumni pin."),
      bi("來賓票券需事先準備，可列印或下載至手機。", "Guest tickets should be ready in advance, either printed or saved on a phone."),
      bi("當天不要安排觀光，典禮、拍照、散場與休息已足夠。", "Do not add sightseeing on this day. The ceremony, photos, exit, and rest are enough."),
    ],
    maps: [{ label: "Fenway Park", url: gm(A.fenway) }, { label: "Gate B / Van Ness Street", url: gm("Fenway Park Gate B Van Ness Street Boston MA") }],
  },
  {
    key: "leader",
    title: bi("D’Amore-McKim School of Business Graduate Celebration", "D’Amore-McKim School of Business Graduate Celebration"),
    venue: "Leader Bank Pavilion",
    date: bi("2026 年 4 月 30 日，星期四", "Thursday, April 30, 2026"),
    time: bi("典禮 6:00 PM 開始", "Ceremony starts at 6:00 PM"),
    address: A.leader,
    accent: "from-[#173e66] to-[#2e6f92]",
    visual: "leader",
    rows: [
      [bi("畢業生建議抵達", "Graduate arrival"), bi("4:30 PM，典禮前 90 分鐘", "4:30 PM, 90 minutes before ceremony")],
      [bi("畢業生入口", "Graduate entrance"), bi("Harborwalk graduate entrance，Main Entrance 左側遠端", "Harborwalk graduate entrance, far left of Main Entrance")],
      [bi("來賓建議抵達", "Guest arrival"), bi("5:00 PM，典禮前 60 分鐘", "5:00 PM, 60 minutes before ceremony")],
      [bi("來賓入口", "Guest entrance"), bi("Main Entrance", "Main Entrance")],
      [bi("典禮長度", "Ceremony length"), bi("約 2 小時", "Approx. 2 hours")],
      [bi("場地型態", "Venue type"), bi("戶外帳棚場地，請依天氣穿著", "Outdoor tented venue. Dress for the weather.")],
    ],
    bullets: [
      bi("包包尺寸上限 12 × 12 × 6 英寸。", "Bag size limit is 12 × 12 × 6 inches."),
      bi("Bag Check 每件 5 美元。", "Bag Check is available at $5 per item."),
      bi("畢業生強烈建議不要攜帶個人物品。", "Graduates are strongly encouraged not to bring personal items."),
      bi("可攜帶 1 瓶未開封 16 oz 飲用水，其餘外食與飲料不得帶入。", "One sealed 16 oz. water bottle is allowed. Other outside food and beverages are prohibited."),
      bi("Leader Bank Pavilion 不是附近的 Leader Bank Seaport branch，GPS 務必輸入 290 Northern Avenue。", "Leader Bank Pavilion is not the nearby Leader Bank Seaport branch. Use 290 Northern Avenue in GPS."),
    ],
    maps: [{ label: "Leader Bank Pavilion", url: gm(A.leader) }, { label: "World Trade Center Silver Line", url: gm("World Trade Center Silver Line Boston MA") }],
  },
];

const prohibitedItems = [
  bi("大型包包、背包、超尺寸或不透明包包", "Large bags, backpacks, oversized or opaque bags"),
  bi("外食與飲料，1 瓶未開封 16 oz 水除外", "Outside food and beverages, except one sealed 16 oz. water bottle"),
  bi("無法收合的雨傘、包裝禮物", "Non-collapsible umbrellas and wrapped gifts"),
  bi("酒精、毒品、違禁品", "Alcohol, drugs, and illegal substances"),
  bi("武器、刀具、工具", "Weapons, knives, and tools"),
  bi("氣球、布條、標語、非 Northeastern 核發旗幟", "Balloons, banners, signs, and non-Northeastern-issued flags"),
  bi("噪音裝置、無人機、雷射筆、自拍棒、專業影音設備", "Noisemakers, drones, laser pointers, selfie sticks, and professional A/V equipment"),
  bi("硬式冰桶、玻璃或金屬容器、hydration packs", "Hard-sided coolers, glass or metal containers, hydration packs"),
  bi("煙火或易燃裝置", "Fireworks or incendiary devices"),
  bi("面具、服裝或任何被認定具危險、干擾、仇恨或冒犯性的物品", "Masks, costumes, or any item deemed unsafe, disruptive, hateful, or offensive"),
];

const itinerary = [
  {
    date: "4/26",
    weekday: bi("星期日", "Sunday"),
    city: "Boston",
    title: bi("抵達 Boston，恢復體力", "Arrive in Boston and recover"),
    intensity: bi("低", "Low"),
    theme: bi("連續多段長途飛行後，不安排正式景點。", "After multiple long-haul segments, do not schedule formal sightseeing."),
    timeline: [
      ["07:12", bi("預計抵達 Boston Logan Airport。航線為 BR872 香港至臺北、BR026 臺北至西雅圖、AS536 西雅圖至 Boston。", "Expected arrival at Boston Logan Airport after BR872 Hong Kong to Taipei, BR026 Taipei to Seattle, and AS536 Seattle to Boston.")],
      ["08:30 至 09:30", bi("出關、領行李、Uber 至 The Revolution Hotel。", "Immigration, baggage claim, then Uber to The Revolution Hotel.")],
      ["09:30 至 11:00", bi("寄放行李，附近 Tatte 或同類型店家簡單早午餐。", "Leave luggage at hotel and have a simple brunch at Tatte or a similar nearby option.")],
      ["11:00 至 14:00", bi("若仍有精神，只在 Boston Common 或 Public Garden 短走，主軸是坐下休息。", "If energy allows, take a very short walk at Boston Common or Public Garden. Sitting and resting is the priority.")],
      ["15:00", bi("入住後休息 2 至 3 小時。", "Check in and rest for 2 to 3 hours.")],
      ["18:30", bi("Chipotle 或飯店附近輕食。", "Chipotle or a light meal near the hotel.")],
    ],
    avoid: [bi("Newbury Street 購物", "Newbury Street shopping"), bi("Freedom Trail", "Freedom Trail"), bi("Harvard", "Harvard"), bi("博物館", "Museums")],
    maps: [
      ["The Revolution Hotel", gm(A.hotelBoston)],
      ["Boston Public Garden", gm("Boston Public Garden Boston MA")],
      ["Tatte Tremont", gm("Tatte Bakery Cafe Tremont Street Boston MA")],
      ["Chipotle Park Plaza", gm("Chipotle 8 Park Plaza Boston MA")],
    ],
  },
  {
    date: "4/27",
    weekday: bi("星期一", "Monday"),
    city: "Boston",
    title: bi("Freedom Trail 精簡段與 North End", "Concise Freedom Trail and North End"),
    intensity: bi("中", "Medium"),
    theme: bi("從 Boston Common 往 North End 一路走，不做完整長線。", "Move from Boston Common toward North End without forcing the full trail."),
    timeline: [
      ["上午", bi("Tatte 早餐後，Boston Common、Massachusetts State House 外觀、Beacon Hill、Granary Burying Ground。", "After breakfast at Tatte, visit Boston Common, Massachusetts State House exterior, Beacon Hill, and Granary Burying Ground.")],
      ["中午", bi("Faneuil Hall 或 Quincy Market 午餐。", "Lunch around Faneuil Hall or Quincy Market.")],
      ["下午", bi("Old State House、Paul Revere House 外觀、North End 慢走。", "Old State House, Paul Revere House exterior, and a slow North End walk.")],
      ["17:30", bi("The Daily Catch North End。請備現金，且接受可能排隊。", "The Daily Catch North End. Bring cash and expect possible waiting.")],
      ["晚餐後", bi("Mike’s Pastry 外帶甜點。", "Take away dessert from Mike’s Pastry.")],
    ],
    avoid: [bi("不要這天加 USS Constitution，週一不適合安排軍艦參觀。", "Do not add USS Constitution on this day. Monday is not the right day for the ship visit."), bi("不要硬走完整 Freedom Trail 到 Charlestown。", "Do not force the full Freedom Trail to Charlestown.")],
    maps: [
      ["Boston Common", gm("Boston Common Boston MA")],
      ["Beacon Hill", gm("Beacon Hill Boston MA")],
      ["Faneuil Hall", gm("Faneuil Hall Boston MA")],
      ["The Daily Catch", gm("The Daily Catch North End 323 Hanover St Boston MA")],
      ["Mike’s Pastry", gm("Mike's Pastry 300 Hanover St Boston MA")],
    ],
  },
  {
    date: "4/28",
    weekday: bi("星期二", "Tuesday"),
    city: "Cambridge",
    title: bi("Harvard 校園與一間博物館", "Harvard campus and one museum"),
    intensity: bi("中", "Medium"),
    theme: bi("Cambridge 獨立成一天，只選一條博物館路線。", "Keep Cambridge as one day and choose one museum track."),
    timeline: [
      ["上午", bi("搭 Red Line 或 Uber 到 Harvard Square。", "Take the Red Line or Uber to Harvard Square.")],
      ["上午", bi("Harvard Yard、John Harvard Statue、Widener Library 外觀、校園拍照。", "Harvard Yard, John Harvard Statue, Widener Library exterior, and campus photos.")],
      ["中午", bi("Harvard Square 午餐，選可坐下休息的餐廳。", "Lunch at Harvard Square, preferably somewhere seated and comfortable.")],
      ["下午", bi("Harvard Art Museums 或 Harvard Museum of Natural History 二選一。", "Choose either Harvard Art Museums or Harvard Museum of Natural History.")],
      ["傍晚", bi("若體力尚可，Weeks Footbridge 附近 Charles River 短走。", "If energy allows, take a short Charles River walk near Weeks Footbridge.")],
    ],
    avoid: [bi("不要同時做兩個完整博物館。", "Do not do two full museums."), bi("不要加 MIT 或 North End。", "Do not add MIT or North End.")],
    maps: [
      ["Harvard Square", gm("Harvard Square Cambridge MA")],
      ["Harvard Yard", gm("Harvard Yard Cambridge MA")],
      ["Harvard Art Museums", gm("Harvard Art Museums 32 Quincy St Cambridge MA")],
      ["Harvard Museum of Natural History", gm("Harvard Museum of Natural History 26 Oxford St Cambridge MA")],
      ["Weeks Footbridge", gm("Weeks Footbridge Cambridge MA")],
    ],
  },
  {
    date: "4/29",
    weekday: bi("星期三", "Wednesday"),
    city: "Boston",
    title: bi("Graduate Commencement at Fenway Park", "Graduate Commencement at Fenway Park"),
    intensity: bi("中高", "Medium-high"),
    theme: bi("典禮日，不排觀光。", "Ceremony day. Do not add sightseeing."),
    timeline: [
      ["06:30", bi("起床、早餐、確認票券、手機電量、cap、gown、hood、alumni pin。", "Wake up, breakfast, confirm tickets, phone battery, cap, gown, hood, and alumni pin.")],
      ["07:10", bi("Uber 前往 Fenway Park。", "Uber to Fenway Park.")],
      ["07:30 至 07:45", bi("抵達 Fenway Park 附近，畢業生與來賓準備分流。", "Arrive near Fenway Park and prepare separate graduate and guest entry routes.")],
      ["08:00", bi("畢業生 Gate B 報到，來賓 Gates A、D、E 入場。", "Graduate reports at Gate B. Guests enter through Gates A, D, and E.")],
      ["08:45", bi("進場遊行約此時開始。", "Procession begins around this time.")],
      ["10:00", bi("典禮開始。", "Ceremony starts.")],
      ["中午後", bi("簡單午餐後回飯店休息。", "Have a simple lunch, then return to hotel and rest.")],
      ["晚上", bi("Back Bay 或 South End 慶祝晚餐，不安排太遠。", "Celebration dinner in Back Bay or South End. Avoid distant plans.")],
    ],
    avoid: [bi("Harvard", "Harvard"), bi("Freedom Trail", "Freedom Trail"), bi("Waterfront ferry", "Waterfront ferry"), bi("大型購物", "Heavy shopping")],
    maps: [["Fenway Park", gm(A.fenway)], ["The Revolution Hotel 至 Fenway", gd(A.hotelBoston, A.fenway)]],
  },
  {
    date: "4/30",
    weekday: bi("星期四", "Thursday"),
    city: "Boston",
    title: bi("Northeastern 校園與 D’Amore-McKim Celebration", "Northeastern campus and D’Amore-McKim Celebration"),
    intensity: bi("中高", "Medium-high"),
    theme: bi("上午拍照，下午休息，傍晚準時到 Leader Bank Pavilion。", "Campus photos in the morning, rest in the afternoon, and arrive on time at Leader Bank Pavilion."),
    timeline: [
      ["上午", bi("Northeastern 校園拍照，建議 ISEC、Snell Library、Centennial Common、D’Amore-McKim 相關區域。", "Take Northeastern campus photos, including ISEC, Snell Library, Centennial Common, and D’Amore-McKim areas if useful.")],
      ["中午", bi("校園、Symphony 或 Back Bay 附近午餐。", "Lunch near campus, Symphony, or Back Bay.")],
      ["14:00 至 15:30", bi("回飯店休息、整理服裝與票券。", "Return to hotel, rest, and organize clothing and tickets.")],
      ["16:00", bi("Uber 前往 Leader Bank Pavilion。", "Uber to Leader Bank Pavilion.")],
      ["16:30", bi("畢業生抵達 Harborwalk graduate entrance。", "Graduate arrives at Harborwalk graduate entrance.")],
      ["17:00", bi("來賓抵達 Main Entrance。", "Guests arrive at Main Entrance.")],
      ["18:00", bi("D’Amore-McKim Celebration 開始。", "D’Amore-McKim Celebration starts.")],
      ["20:00 後", bi("視體力簡單晚餐或直接回飯店。", "Have a simple dinner if energy allows, or return directly to hotel.")],
    ],
    avoid: [bi("大包包", "Large bags"), bi("錯把 GPS 設成 Leader Bank Seaport branch", "Using the nearby Leader Bank Seaport branch in GPS"), bi("典禮後排複雜晚餐", "Complicated post-ceremony dinner")],
    maps: [["Northeastern University", gm(A.northeastern)], ["Leader Bank Pavilion", gm(A.leader)], ["飯店至 Leader Bank Pavilion", gd(A.hotelBoston, A.leader)]],
  },
  {
    date: "5/1",
    weekday: bi("星期五", "Friday"),
    city: "Boston",
    title: bi("Waterfront、James Hook 與 Charlestown", "Waterfront, James Hook, and Charlestown"),
    intensity: bi("中", "Medium"),
    theme: bi("沿水邊路線安排，不再拉回 Cambridge 或遠距離購物。", "Stay along the waterfront line. Do not pull the day back to Cambridge or distant shopping."),
    timeline: [
      ["上午", bi("Charles River Esplanade 或 Public Garden 二選一短走。", "Choose either Charles River Esplanade or Public Garden for a short walk.")],
      ["中午", bi("James Hook & Co 午餐。", "Lunch at James Hook & Co.")],
      ["下午", bi("Long Wharf 至 Charlestown Navy Yard，參觀 USS Constitution 或 USS Constitution Museum。", "Go from Long Wharf to Charlestown Navy Yard for USS Constitution or USS Constitution Museum.")],
      ["16:00 前", bi("把軍艦相關參觀視為 4:00 PM 前完成。", "Treat 4:00 PM as the practical cutoff for ship-related visits.")],
      ["傍晚", bi("視體力回 North End 或直接回飯店整理行李。", "Return through North End if energy allows, or go straight back to hotel and pack.")],
    ],
    avoid: [bi("Harvard", "Harvard"), bi("重型博物館行程", "Museum-heavy plans"), bi("晚間才開始整理行李", "Starting packing late at night")],
    maps: [["James Hook & Co", gm("James Hook & Co 440 Atlantic Ave Boston MA")], ["Long Wharf", gm("Long Wharf Boston MA")], ["USS Constitution Museum", gm("USS Constitution Museum Charlestown MA")], ["Charlestown Navy Yard", gm("Charlestown Navy Yard Boston MA")]],
  },
  {
    date: "5/2",
    weekday: bi("星期六", "Saturday"),
    city: "Boston → New Jersey → Philadelphia",
    title: bi("租車前往費城，中停 American Dream", "Drive to Philadelphia with American Dream stop"),
    intensity: bi("高", "High"),
    theme: bi("這是移動日加限時購物，不是完整景點日。", "This is a travel day with limited shopping, not a full attraction day."),
    timeline: [
      ["早上", bi("優先試 Boston 市中心 Avis 早取車，Back Bay Station Garage 地理上最合理。", "Try early city-center Avis pickup first. Back Bay Station Garage is geographically strongest.")],
      ["注意", bi("目前截圖的 12:00 PM 取車太晚，不適合 American Dream 版本。", "The current 12:00 PM pickup shown in the screenshot is too late for the American Dream version.")],
      ["8:30 至 9:00", bi("理想離開 Boston 時間。", "Ideal Boston departure window.")],
      ["中午", bi("抵達 American Dream，午餐與限時購物。", "Arrive at American Dream for lunch and limited shopping.")],
      ["上限 3 至 3.5 小時", bi("只購物，不玩水上樂園、室內滑雪、主題樂園或其他耗時設施。", "Shopping only. Do not visit the water park, indoor skiing, theme park, or other time-heavy attractions.")],
      ["15:30", bi("離開 American Dream 前往 Philadelphia。", "Leave American Dream for Philadelphia.")],
      ["18:00 至 18:30", bi("抵達 4211 Suites，停車、入住、附近簡單晚餐。", "Arrive at 4211 Suites, park, check in, and have a simple nearby dinner.")],
    ],
    avoid: [bi("不要再加 Texas Roadhouse。", "Do not add Texas Roadhouse."), bi("不要在停車場打開行李整理。", "Do not open and reorganize luggage in the parking lot."), bi("不要讓護照、錢包、電腦留在車上。", "Do not leave passports, wallets, or laptops in the car.")],
    maps: [["Back Bay Avis", gm(A.backBayAvis)], ["American Dream", gm(A.americanDream)], ["American Dream 至 4211 Suites", gd(A.americanDream, A.hotelPhilly)], ["4211 Suites", gm(A.hotelPhilly)]],
  },
  {
    date: "5/3",
    weekday: bi("星期日", "Sunday"),
    city: "Philadelphia",
    title: bi("UPenn 與費城精華", "UPenn and Philadelphia highlights"),
    intensity: bi("中，晚啟動", "Medium, late start"),
    theme: bi("前一天移動較長，這天從 UPenn 附近慢慢開始。", "The previous day is long, so start slowly from the UPenn area."),
    timeline: [
      ["09:00 至 10:00", bi("慢早餐與恢復體力。", "Slow breakfast and recovery.")],
      ["10:30", bi("從 4211 Suites 附近前往 UPenn。", "Start from 4211 Suites toward UPenn.")],
      ["上午", bi("Locust Walk、College Hall 外觀、Fisher Fine Arts Library 外觀。", "Locust Walk, College Hall exterior, and Fisher Fine Arts Library exterior.")],
      ["中午", bi("University City 午餐。", "Lunch in University City.")],
      ["下午", bi("Philadelphia Museum of Art 外觀、Rocky Steps、Schuylkill River。", "Philadelphia Museum of Art exterior, Rocky Steps, and Schuylkill River.")],
      ["傍晚", bi("Rittenhouse Square 或 Reading Terminal Market 二選一。", "Choose either Rittenhouse Square or Reading Terminal Market.")],
      ["晚上", bi("早點回 4211 Suites，準備 DC 開車日。", "Return early to 4211 Suites and prepare for the DC driving day.")],
    ],
    avoid: [bi("不要同時塞進 Independence Hall 與 Liberty Bell，除非刪掉其他項目。", "Do not add Independence Hall and Liberty Bell unless something else is removed."), bi("不要晚睡。", "Do not stay out late.")],
    maps: [["4211 Suites", gm(A.hotelPhilly)], ["UPenn Locust Walk", gm("Locust Walk University of Pennsylvania Philadelphia PA")], ["Philadelphia Museum of Art", gm("Philadelphia Museum of Art Philadelphia PA")], ["Rittenhouse Square", gm("Rittenhouse Square Philadelphia PA")], ["Reading Terminal Market", gm("Reading Terminal Market Philadelphia PA")]],
  },
  {
    date: "5/4",
    weekday: bi("星期一", "Monday"),
    city: "Philadelphia → Washington, DC → Philadelphia",
    title: bi("DC 開車一日遊，保守版", "Conservative DC driving day"),
    intensity: bi("最高", "Highest"),
    theme: bi("尊重開車想法，但 DC 內只停一次車，只走核心線。", "Respect the driving preference, but park once and follow one core route in DC."),
    timeline: [
      ["06:30", bi("起床與簡單早餐。", "Wake up and have a simple breakfast.")],
      ["07:00", bi("從 Philadelphia 出發。", "Depart Philadelphia.")],
      ["10:00 至 10:30", bi("抵達 DC，停在 National Mall、L’Enfant Plaza 或 Reagan Building 附近固定車庫。", "Arrive in DC and use one garage near National Mall, L’Enfant Plaza, or Reagan Building.")],
      ["10:30 至 12:00", bi("U.S. Capitol 外觀與 National Mall 東段。", "U.S. Capitol exterior and the east side of National Mall.")],
      ["12:00 至 13:00", bi("午餐與休息。", "Lunch and rest.")],
      ["13:00 至 15:30", bi("Washington Monument 外觀、WWII Memorial、Reflecting Pool、Lincoln Memorial。", "Washington Monument exterior, WWII Memorial, Reflecting Pool, and Lincoln Memorial.")],
      ["15:30 至 16:30", bi("咖啡休息，或短暫 Smithsonian 停留。博物館不是主軸。", "Coffee break or a short Smithsonian stop. Museums are not the main goal.")],
      ["17:00", bi("離開 DC。", "Leave DC.")],
      ["20:00 至 21:00", bi("回 Philadelphia，附近簡單晚餐。", "Return to Philadelphia and have a simple nearby dinner.")],
    ],
    avoid: [bi("Georgetown", "Georgetown"), bi("Arlington Cemetery", "Arlington Cemetery"), bi("白宮繞路", "White House detour"), bi("多次停車", "Multiple parking stops"), bi("三間博物館", "Three museums")],
    maps: [["4211 Suites 至 National Mall", gd(A.hotelPhilly, A.nationalMall)], ["National Mall", gm(A.nationalMall)], ["L’Enfant Plaza 停車", gm("parking near L'Enfant Plaza Washington DC")], ["Lincoln Memorial", gm("Lincoln Memorial Washington DC")]],
  },
  {
    date: "5/5",
    weekday: bi("星期二", "Tuesday"),
    city: "Philadelphia → New York",
    title: bi("還車、搭鐵路到 New York，完成交接", "Return car, rail to New York, and complete handoff"),
    intensity: bi("中", "Medium"),
    theme: bi("重點是行李、還車、車站集合、紐約入住，不是觀光。", "The focus is luggage, car return, station coordination, New York check-in, not sightseeing."),
    timeline: [
      ["09:00", bi("4211 Suites 退房，全員與行李上車。", "Check out from 4211 Suites with everyone and all luggage in the car.")],
      ["09:15", bi("先到 30th Street Station 放下媽媽、妹妹與大件行李。", "First drop mother, sister, and large luggage at 30th Street Station.")],
      ["09:15 至 09:30", bi("約定固定等待位置，建議在 Amtrak 出發看板下方。", "Agree on a fixed waiting point, preferably under the Amtrak departure board.")],
      ["09:30", bi("Eugene 單獨開車去 Avis J5D 還車。", "Eugene drives alone to Avis J5D to return the car.")],
      ["09:45 至 10:15", bi("確認油表、里程、車損紀錄、e-Toll、收據。", "Confirm fuel, mileage, damage record, e-Toll, and receipt.")],
      ["10:15 至 10:35", bi("Uber 回 30th Street Station。", "Uber back to 30th Street Station.")],
      ["11:15 後", bi("搭 Amtrak 前往 New York Penn Station 或 Moynihan Train Hall。", "Take Amtrak to New York Penn Station or Moynihan Train Hall.")],
      ["下午", bi("先陪家人到 New York 住宿完成入住，再分別回 Boston。", "Help family reach the New York lodging and complete check-in before returning separately to Boston.")],
    ],
    avoid: [bi("不要買太早班次。", "Do not book a train that is too early."), bi("不要從 Philadelphia 找 LIRR。", "Do not look for LIRR from Philadelphia."), bi("不要讓家人在紐約第一次入住時完全自行處理。", "Do not leave family to handle the first New York check-in entirely alone.")],
    maps: [["4211 Suites 至 30th Street Station", gd(A.hotelPhilly, A.station30)], ["30th Street Station", gm(A.station30)], ["Avis J5D", gm(A.avisJ5D)], ["New York Penn Station", gm(A.nyPenn)]],
  },
  {
    date: "5/5 至 5/11",
    weekday: bi("星期二至星期一", "Tuesday to Monday"),
    city: "New York",
    title: bi("New York 分區安排", "New York by geographic module"),
    intensity: bi("依住宿調整", "Adjust after lodging is known"),
    theme: bi("住宿地址與 5/11 航班未定前，只能用分區模組，不做精準逐時。", "Until the hotel and 5/11 flight are known, use geographic modules rather than a fixed hour-by-hour plan."),
    timeline: [
      ["Midtown", bi("Times Square、Bryant Park、New York Public Library、Grand Central、Fifth Avenue、Rockefeller Center。", "Times Square, Bryant Park, New York Public Library, Grand Central, Fifth Avenue, and Rockefeller Center.")],
      ["Lower Manhattan", bi("Wall Street、9/11 Memorial、Oculus、Battery Park，或 Staten Island Ferry 遠看 Statue of Liberty。", "Wall Street, 9/11 Memorial, Oculus, Battery Park, or Staten Island Ferry for a distant Statue of Liberty view.")],
      ["Central Park", bi("Central Park 加 The Met 或 American Museum of Natural History 二選一。", "Central Park plus either The Met or American Museum of Natural History.")],
      ["Brooklyn", bi("DUMBO、Brooklyn Bridge Park，可視體力走 Brooklyn Bridge。", "DUMBO and Brooklyn Bridge Park, with optional Brooklyn Bridge walk if energy allows.")],
      ["SoHo / Chelsea", bi("SoHo、Chelsea Market、High Line。", "SoHo, Chelsea Market, and High Line.")],
      ["5/11", bi("依機場與航班時間決定出發時間。", "Departure timing depends on airport and flight time.")],
    ],
    avoid: [bi("不要一天混排 Brooklyn、Lower Manhattan 與 Midtown。", "Do not mix Brooklyn, Lower Manhattan, and Midtown in one day."), bi("不要假設所有地鐵站都有電梯。", "Do not assume every subway station has an elevator.")],
    maps: [["New York Penn Station", gm(A.nyPenn)], ["Times Square", gm("Times Square New York NY")], ["The Met", gm("The Metropolitan Museum of Art New York NY")], ["DUMBO", gm("DUMBO Brooklyn NY")], ["Chelsea Market", gm("Chelsea Market New York NY")]],
  },
];

const transportNotes = [
  {
    icon: Car,
    title: bi("Boston 取車策略", "Boston pickup strategy"),
    body: bi("人已在市中心，優先試 Boston Back Bay Station Garage 或其他市中心 Avis。只有市中心點無法 one-way 到 J5D、車型不足、時間太晚、價格明顯高出太多時，才改 BOS Logan。", "Because everyone is already downtown, try Boston Back Bay Station Garage or another city-center Avis first. Use BOS Logan only if city-center pickup fails on one-way availability, vehicle class, timing, or price."),
  },
  {
    icon: AlertTriangle,
    title: bi("目前 Avis 截圖問題", "Current Avis screenshot issue"),
    body: bi("截圖顯示 5/2 12:00 PM 取車，若保留 American Dream，這個時間太晚。需要改試 8:00 或 8:30 AM 取車。", "The screenshot shows 12:00 PM pickup on 5/2. If American Dream remains in the plan, that is too late. Reprice for 8:00 or 8:30 AM pickup."),
  },
  {
    icon: ParkingCircle,
    title: bi("Philadelphia 還車", "Philadelphia return"),
    body: bi("Avis PH4 30th Street Station 已關閉，不使用。J5D Convention Center Parking 是目前最合理的市中心還車點，但無 after-hours return。", "Avis PH4 at 30th Street Station is closed and should not be used. J5D Convention Center Parking is the strongest city-center return option, but there is no after-hours return."),
  },
  {
    icon: CreditCard,
    title: bi("保險與加購", "Insurance and add-ons"),
    body: bi("不要隨意刪除責任險，除非已確認信用卡、個人車險或旅遊保險明確涵蓋美國租車第三方責任。LDW 是否刪除需看信用卡車損保障。", "Do not casually remove liability coverage unless a credit card, personal auto policy, or travel insurance clearly covers third-party liability for a U.S. rental. LDW depends on confirmed credit card collision coverage."),
  },
  {
    icon: DollarSign,
    title: bi("過路費", "Tolls"),
    body: bi("5/2 與 5/4 會經過多個電子收費路段。取車時詢問 standard e-Toll 與 e-Toll Unlimited 的實際費用，通常不應等事後 toll-by-plate 加行政費。", "5/2 and 5/4 cross several electronic toll zones. Ask at pickup about standard e-Toll and e-Toll Unlimited pricing. Avoid toll-by-plate administrative surprises."),
  },
  {
    icon: Train,
    title: bi("費城至紐約鐵路", "Philadelphia to New York rail"),
    body: bi("從 Philadelphia 到 New York 是 Amtrak 或 NJ Transit。LIRR 不從 Philadelphia 發車，只在抵達 New York 後，若住宿方向需要，才可能轉乘。", "From Philadelphia to New York, use Amtrak or NJ Transit. LIRR does not depart from Philadelphia. It may only matter after arrival in New York if lodging requires it."),
  },
];

const checklist = [
  {
    title: bi("出發前確認", "Before departure"),
    items: [
      bi("New York 住宿地址。", "New York lodging address."),
      bi("5/11 離開 New York 的機場與航班時間。", "5/11 departure airport and flight time."),
      bi("Avis 市中心早取車實際報價，尤其 Back Bay Station Garage 至 J5D。", "Actual early city-center Avis quote, especially Back Bay Station Garage to J5D."),
      bi("4211 Suites 停車費、是否需預約、5/4 車輛離開是否仍計費。", "4211 Suites parking fee, reservation need, and whether 5/4 is charged while the car is out."),
      bi("媽媽與妹妹手機網路、eSIM 或漫遊。", "Mother and sister's phone data, eSIM, or roaming."),
    ],
  },
  {
    title: bi("American Dream 注意", "American Dream notes"),
    items: [
      bi("停車要付費，不假設免費。", "Parking is paid. Do not assume it is free."),
      bi("New Jersey 服飾與鞋類常見免稅，但毛皮、配件、運動與防護用品等可能不免稅。", "New Jersey clothing and footwear are commonly tax-exempt, but fur, accessories, sports gear, and protective equipment may not be."),
      bi("購物上限 3 至 3.5 小時。", "Shopping limit is 3 to 3.5 hours."),
      bi("不要玩付費大型設施。", "Do not visit paid major attractions."),
    ],
  },
  {
    title: bi("家人交接", "Family handoff"),
    items: [
      bi("5/5 在 30th Street Station 約定固定等待點。", "Set a fixed waiting point at 30th Street Station on 5/5."),
      bi("把 New York 飯店地址、Penn Station 至飯店路線、緊急聯絡方式存離線。", "Save New York hotel address, Penn Station to hotel route, and emergency contacts offline."),
      bi("Eugene 應先陪家人到 New York 住宿完成入住，再自行回 Boston。", "Eugene should help family check in at the New York lodging before returning to Boston."),
    ],
  },
];

const mapDirectory = [
  ["Boston Hotel", A.hotelBoston],
  ["Fenway Park", A.fenway],
  ["Leader Bank Pavilion", A.leader],
  ["Northeastern University", A.northeastern],
  ["Boston Back Bay Avis", A.backBayAvis],
  ["American Dream", A.americanDream],
  ["4211 Suites", A.hotelPhilly],
  ["Avis J5D", A.avisJ5D],
  ["30th Street Station", A.station30],
  ["National Mall", A.nationalMall],
  ["New York Penn Station", A.nyPenn],
  ["James Hook & Co", "James Hook & Co 440 Atlantic Ave Boston MA"],
  ["The Daily Catch North End", "The Daily Catch North End 323 Hanover St Boston MA"],
  ["Mike’s Pastry", "Mike's Pastry 300 Hanover St Boston MA"],
  ["Harvard Yard", "Harvard Yard Cambridge MA"],
  ["UPenn Locust Walk", "Locust Walk University of Pennsylvania Philadelphia PA"],
];

const sources = [
  ["Northeastern Graduate Ceremony at Fenway", "https://commencement.northeastern.edu/events/graduate-ceremony-at-fenway/"],
  ["Northeastern College Celebrations", "https://commencement.northeastern.edu/events/college-celebrations/"],
  ["Northeastern Venues and Travel Information", "https://commencement.northeastern.edu/venues-and-travel-information/"],
  ["Avis Boston Back Bay Station Garage", "https://www.avis.com/en/locations/nam/us/ma/boston/bo4"],
  ["Avis PHL Convention Ctr Parking J5D", "https://www.avis.com/en/locations/nam/us/pa/philadelphia/j5d"],
  ["American Dream Parking", "https://www.americandream.com/parking"],
  ["New Jersey Sales Tax Guide", "https://www.nj.gov/treasury/taxation/pdf/pubs/sales/su4.pdf"],
  ["Amtrak Philadelphia 30th Street Station", "https://www.amtrak.com/stations/phl"],
];

function classNames(...items) {
  return items.filter(Boolean).join(" ");
}

function Seal() {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#b79b62] bg-[#fffaf0] text-[#0b2a48] shadow-sm md:h-24 md:w-24">
      <div className="absolute inset-2 rounded-full border border-[#d6c299]" />
      <GraduationCap className="h-8 w-8 md:h-10 md:w-10" />
      <span className="absolute bottom-4 text-[10px] font-semibold tracking-[0.18em] text-[#9a7a42]">2026</span>
    </div>
  );
}

function VenueSketch({ type }) {
  if (type === "leader") {
    return (
      <svg viewBox="0 0 420 150" className="h-full w-full" aria-hidden="true">
        <rect width="420" height="150" fill="#082443" />
        <path d="M20 122 Q120 68 210 38 Q300 68 400 122" fill="none" stroke="#d8c08a" strokeWidth="3" />
        <path d="M38 122 Q130 78 210 50 Q290 78 382 122" fill="none" stroke="#f7f1df" strokeWidth="1.4" opacity="0.75" />
        <line x1="210" y1="40" x2="210" y2="124" stroke="#f7f1df" strokeDasharray="4 4" opacity="0.45" />
        <line x1="18" y1="125" x2="402" y2="125" stroke="#d8c08a" strokeWidth="2" />
        <circle cx="84" cy="112" r="3" fill="#f7f1df" opacity="0.8" />
        <circle cx="336" cy="112" r="3" fill="#f7f1df" opacity="0.8" />
        <text x="210" y="142" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#f7f1df">Leader Bank Pavilion</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 420 150" className="h-full w-full" aria-hidden="true">
      <rect width="420" height="150" fill="#f5ead2" />
      <rect x="35" y="45" width="350" height="78" fill="none" stroke="#0b2a48" strokeWidth="3" />
      <rect x="72" y="24" width="276" height="36" fill="#0b2a48" />
      <text x="210" y="49" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fill="#f7f1df" letterSpacing="2">FENWAY PARK</text>
      <line x1="35" y1="72" x2="385" y2="72" stroke="#0b2a48" opacity="0.35" />
      <line x1="35" y1="94" x2="385" y2="94" stroke="#0b2a48" opacity="0.35" />
      <line x1="35" y1="116" x2="385" y2="116" stroke="#0b2a48" opacity="0.35" />
      <circle cx="210" cy="108" r="6" fill="#9a2f24" />
    </svg>
  );
}

function RouteDiagram({ lang }) {
  const nodes = [
    ["Boston", "4/26 至 5/2", "left-[4%] top-[28%]"],
    ["American Dream", "5/2", "left-[25%] top-[54%]"],
    ["Philadelphia", "5/2 至 5/5", "left-[46%] top-[36%]"],
    ["Washington, DC", "5/4", "left-[65%] top-[63%]"],
    ["New York", "5/5 至 5/11", "left-[82%] top-[25%]"],
  ];
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d2bd8b] bg-[#fffaf0] p-4 shadow-sm md:p-5">
      <div className="mb-3 flex items-center gap-2 text-[#0b2a48]">
        <Route className="h-5 w-5 text-[#9a7a42]" />
        <h3 className="text-base font-semibold md:text-lg">{lang === "zh" ? "城市動線" : "City route"}</h3>
      </div>
      <div className="relative h-56 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#ffffff,transparent_35%),linear-gradient(135deg,#f8efd9,#fcfaf2)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M9 43 C22 70, 34 76, 50 50 S74 68, 88 39" fill="none" stroke="#0b2a48" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.75" />
          <path d="M50 50 C57 56, 62 66, 68 75" fill="none" stroke="#9a7a42" strokeWidth="1" strokeDasharray="2 2" opacity="0.85" />
        </svg>
        {nodes.map(([name, date, pos], index) => (
          <div key={name} className={classNames("absolute w-32 -translate-x-1/2 rounded-2xl border border-[#d2bd8b] bg-white/90 p-3 text-center shadow-sm", pos)}>
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2a48] text-white">
              {index + 1}
            </div>
            <div className="text-xs font-semibold text-[#0b2a48] md:text-sm">{name}</div>
            <div className="text-[11px] text-[#80683e]">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapButton({ href, children }) {
  return (
    <Button asChild variant="outline" size="sm" className="h-8 rounded-full border-[#cbb37d] bg-white/80 px-3 text-xs text-[#0b2a48] hover:bg-[#fff6dc]">
      <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5">
        {children}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </Button>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7a42]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#0b2a48] md:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FactCard({ item, lang }) {
  const Icon = item.icon;
  return (
    <div className="flex gap-3 rounded-2xl border border-[#d2bd8b] bg-white/80 p-3 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2a48] text-white">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm leading-6 text-slate-700">{item[lang]}</p>
    </div>
  );
}

function CeremonyCard({ event, lang }) {
  return (
    <Card className="overflow-hidden border-[#d2bd8b] bg-white/90 shadow-sm">
      <div className={classNames("h-2 bg-gradient-to-r", event.accent)} />
      <CardHeader className="border-b border-[#eadfcf] bg-[#fffaf0] p-4 md:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_260px] md:items-stretch">
          <div>
            <Badge className="mb-3 rounded-full bg-[#0b2a48] text-white hover:bg-[#0b2a48]">{event.date[lang]}</Badge>
            <CardTitle className="text-xl leading-tight text-[#0b2a48] md:text-2xl">{pick(event.title, lang)}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-slate-700">{event.time[lang]} · {event.venue}</p>
            <p className="text-sm leading-6 text-slate-700">{event.address}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {event.maps.map(([label, url]) => <MapButton key={label} href={url}>{label}</MapButton>)}
            </div>
          </div>
          <div className="min-h-36 overflow-hidden rounded-2xl border border-[#d2bd8b]">
            <VenueSketch type={event.visual} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-[#eadfcf]">
            {event.rows.map(([label, value], idx) => (
              <div key={idx} className="grid grid-cols-[130px_1fr] gap-3 border-b border-[#eadfcf] px-3 py-3 last:border-b-0 md:grid-cols-[190px_1fr]">
                <div className="text-xs font-semibold text-[#80683e] md:text-sm">{label[lang]}</div>
                <div className="text-sm leading-6 text-slate-800">{value[lang]}</div>
              </div>
            ))}
          </div>
          <ul className="space-y-2 text-sm leading-6 text-slate-700">
            {event.bullets.map((item) => (
              <li key={item.zh} className="flex gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b2a48]" />
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function DayCard({ day, lang }) {
  const tone = day.intensity.zh.includes("高") || day.intensity.en.includes("High") ? "bg-[#fff0e7] text-[#8a3b19] border-[#e0b18c]" : day.intensity.zh.includes("低") || day.intensity.en.includes("Low") ? "bg-[#edf7ef] text-[#28623a] border-[#b9d8bf]" : "bg-[#fff7dd] text-[#7a5a13] border-[#dfc886]";
  return (
    <Card className="overflow-hidden border-[#d2bd8b] bg-white/90 shadow-sm">
      <CardHeader className="border-b border-[#eadfcf] bg-[#fffaf0] p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-[#0b2a48] text-white hover:bg-[#0b2a48]">{day.date}</Badge>
              <Badge variant="outline" className="rounded-full border-[#cbb37d] bg-white text-[#80683e]">{day.weekday[lang]}</Badge>
              <span className={classNames("rounded-full border px-3 py-1 text-xs font-semibold", tone)}>{pick(day.intensity, lang)}</span>
            </div>
            <CardTitle className="mt-3 text-xl leading-tight text-[#0b2a48] md:text-2xl">{pick(day.title, lang)}</CardTitle>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{pick(day.theme, lang)}</p>
          </div>
          <MapButton href={day.maps[0][1]}>{day.maps[0][0]}</MapButton>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#eadfcf]">
          {day.timeline.map(([time, item], idx) => (
            <div key={idx} className="grid gap-2 px-4 py-3 md:grid-cols-[130px_1fr] md:gap-4 md:px-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#80683e]"><Clock className="h-4 w-4" />{time}</div>
              <div className="text-sm leading-6 text-slate-800 md:text-[15px]">{pick(item, lang)}</div>
            </div>
          ))}
        </div>
        <details className="group border-t border-[#eadfcf] bg-[#fcfaf2]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-[#0b2a48] md:px-5">
            <span>{langPack[lang].details}</span>
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="grid gap-4 px-4 pb-4 md:grid-cols-2 md:px-5">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#8a3b19]"><AlertTriangle className="h-4 w-4" />{langPack[lang].doNotAdd}</p>
              <ul className="space-y-2 text-sm leading-6 text-slate-700">
                {day.avoid.map((item) => <li key={item.zh} className="flex gap-2"><XCircle className="mt-1 h-4 w-4 shrink-0 text-[#8a3b19]" />{pick(item, lang)}</li>)}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0b2a48]"><MapPin className="h-4 w-4" />{langPack[lang].mapLinks}</p>
              <div className="flex flex-wrap gap-2">
                {day.maps.map(([label, url]) => <MapButton key={label} href={url}>{label}</MapButton>)}
              </div>
            </div>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}

function NoteCard({ note, lang }) {
  const Icon = note.icon;
  return (
    <Card className="border-[#d2bd8b] bg-white/90 shadow-sm">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2 text-[#0b2a48]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2a48] text-white"><Icon className="h-4 w-4" /></div>
          <h3 className="font-semibold leading-tight">{pick(note.title, lang)}</h3>
        </div>
        <p className="text-sm leading-6 text-slate-700">{pick(note.body, lang)}</p>
      </CardContent>
    </Card>
  );
}

function App() {
  const [lang, setLang] = useState("zh");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const L = langPack[lang];

  const sections = [
    ["all", L.all],
    ["Boston", L.boston],
    ["ceremony", L.ceremony],
    ["transport", L.transport],
    ["Philadelphia", L.philly],
    ["Washington", L.dc],
    ["New York", L.nyc],
    ["risks", L.risks],
    ["maps", L.maps],
  ];

  const visibleDays = useMemo(() => {
    const q = query.trim().toLowerCase();
    return itinerary.filter((d) => {
      const filterOk = filter === "all" || d.city.includes(filter) || (filter === "ceremony" && ["4/29", "4/30"].includes(d.date));
      const hay = [d.date, d.city, d.title.zh, d.title.en, d.theme.zh, d.theme.en, ...d.timeline.flatMap(([time, text]) => [time, text.zh, text.en])].join(" ").toLowerCase();
      return filterOk && (!q || hay.includes(q));
    });
  }, [filter, query]);

  return (
    <main className="min-h-screen bg-[#fcfaf2] text-slate-900" style={{ fontFamily: "'PingFang TC', 'Noto Sans CJK TC', 'Microsoft JhengHei', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <section className="border-b border-[#d2bd8b] bg-[radial-gradient(circle_at_top_left,#fff7df,transparent_34%),linear-gradient(180deg,#fcfaf2,#f7efdf)]">
        <div className="mx-auto max-w-7xl px-4 py-7 md:px-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="flex gap-4 md:gap-5">
              <Seal />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7a42]">Northeastern University</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b2a48] md:text-6xl">2026 Commencement + Family Trip</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 md:text-base">
                  {lang === "zh"
                    ? "以畢業典禮為核心，安排 Boston、Philadelphia、Washington, DC 與 New York 的住宿、交通、餐廳、景點、租車、停車、票券與每日節奏。"
                    : "A ceremony-centered family itinerary for Boston, Philadelphia, Washington, DC, and New York, covering lodging, transport, restaurants, sights, car rental, parking, tickets, and daily pacing."}
                </p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {quickFacts.slice(0, 4).map((item) => <FactCard key={item.zh} item={item} lang={lang} />)}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-[#d2bd8b] bg-[#fcfaf2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
            {sections.map(([key, label]) => (
              <button key={key} type="button" onClick={() => setFilter(key)} className={classNames("whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition", filter === key ? "border-[#0b2a48] bg-[#0b2a48] text-white" : "border-[#d2bd8b] bg-white text-[#0b2a48] hover:bg-[#fff6dc]")}>{label}</button>
            ))}
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#80683e]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={L.search} className="h-10 w-full rounded-full border border-[#d2bd8b] bg-white pl-9 pr-3 text-sm outline-none ring-[#0b2a48]/15 focus:ring-4" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <RouteDiagram lang={lang} />
          <Card className="border-[#d2bd8b] bg-white/90 shadow-sm">
            <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-base text-[#0b2a48]"><ShieldCheck className="h-5 w-5 text-[#9a7a42]" />{lang === "zh" ? "當前關鍵判斷" : "Key operating decisions"}</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
              {quickFacts.slice(2).map((item) => <p key={item.zh} className="border-b border-[#eadfcf] pb-3 last:border-b-0 last:pb-0">{item[lang]}</p>)}
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-8">
          {(filter === "all" || filter === "ceremony") && (
            <Section id="ceremonies" eyebrow={lang === "zh" ? "固定時間" : "Fixed schedule"} title={lang === "zh" ? "畢業典禮" : "Commencement ceremonies"}>
              <div className="grid gap-5">
                {ceremonies.map((event) => <CeremonyCard key={event.key} event={event} lang={lang} />)}
                <Card className="border-[#d2bd8b] bg-[#fffaf0] shadow-sm">
                  <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-[#0b2a48]"><AlertTriangle className="h-5 w-5 text-[#8a3b19]" />{lang === "zh" ? "禁止攜帶物品摘要" : "Prohibited items summary"}</CardTitle></CardHeader>
                  <CardContent className="grid gap-2 text-sm leading-6 text-slate-700 md:grid-cols-2">
                    {prohibitedItems.map((item) => <div key={item.zh} className="flex gap-2"><XCircle className="mt-1 h-4 w-4 shrink-0 text-[#8a3b19]" />{pick(item, lang)}</div>)}
                  </CardContent>
                </Card>
              </div>
            </Section>
          )}

          {(filter === "all" || !["transport", "risks", "maps"].includes(filter)) && (
            <Section id="daily" eyebrow={lang === "zh" ? "逐日安排" : "Daily plan"} title={lang === "zh" ? "行程表" : "Itinerary"}>
              <div className="grid gap-5">
                {visibleDays.map((day) => <DayCard key={`${day.date}-${day.city}`} day={day} lang={lang} />)}
              </div>
            </Section>
          )}

          {(filter === "all" || filter === "transport") && (
            <Section id="transport" eyebrow={lang === "zh" ? "移動安排" : "Transport"} title={lang === "zh" ? "租車、鐵路與過路費" : "Car rental, rail, and tolls"}>
              <div className="grid gap-4 md:grid-cols-2">
                {transportNotes.map((note) => <NoteCard key={note.title.zh} note={note} lang={lang} />)}
              </div>
            </Section>
          )}

          {(filter === "all" || filter === "risks") && (
            <Section id="risks" eyebrow={lang === "zh" ? "行前檢查" : "Pre-trip checks"} title={lang === "zh" ? "注意事項" : "Practical notes"}>
              <div className="grid gap-4 md:grid-cols-3">
                {checklist.map((block) => (
                  <Card key={block.title.zh} className="border-[#d2bd8b] bg-white/90 shadow-sm">
                    <CardHeader className="pb-2"><CardTitle className="text-lg text-[#0b2a48]">{pick(block.title, lang)}</CardTitle></CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm leading-6 text-slate-700">
                        {block.items.map((item) => <li key={item.zh} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b2a48]" />{pick(item, lang)}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          )}

          {(filter === "all" || filter === "maps") && (
            <Section id="maps" eyebrow="Google Maps" title={lang === "zh" ? "地圖目錄" : "Map directory"}>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {mapDirectory.map(([label, queryText]) => (
                  <a key={label} href={gm(queryText)} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-[#d2bd8b] bg-white/90 p-4 text-sm font-medium text-[#0b2a48] shadow-sm transition hover:bg-[#fff6dc]">
                    <span className="flex min-w-0 items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-[#9a7a42]" /><span className="truncate">{label}</span></span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </Section>
          )}

          <Section id="sources" eyebrow={lang === "zh" ? "資訊來源" : "References"} title={lang === "zh" ? "官方連結" : "Official links"}>
            <div className="grid gap-3 md:grid-cols-2">
              {sources.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-[#d2bd8b] bg-white/70 p-4 text-sm text-[#0b2a48] hover:bg-white">
                  <span className="min-w-0 truncate">{label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <button type="button" onClick={() => setLang((v) => (v === "zh" ? "en" : "zh"))} className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d2bd8b] bg-[#0b2a48] text-sm font-semibold text-white shadow-lg transition hover:scale-105" aria-label="Switch language">
        <span className="sr-only">Switch language</span>
        <Languages className="h-4 w-4" />
        <span className="ml-1">{L.switch}</span>
      </button>
    </main>
  );
}

export default App;
