import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  ExternalLink,
  Flag,
  GraduationCap,
  Hotel,
  Info,
  Landmark,
  Languages,
  Luggage,
  Map,
  MapPin,
  Menu,
  Museum,
  Navigation,
  ParkingCircle,
  Plane,
  Route,
  Search,
  ShieldCheck,
  ShipWheel,
  ShoppingBag,
  Ticket,
  Train,
  Umbrella,
  Users,
  Utensils,
  WalletCards,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mapSearch = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const mapDirections = (origin, destination, mode = "driving") =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;

const ICONS = {
  alert: AlertTriangle,
  badge: BadgeCheck,
  bag: ShoppingBag,
  briefcase: Briefcase,
  building: Building2,
  bus: Bus,
  calendar: CalendarDays,
  camera: Camera,
  car: Car,
  check: CheckCircle2,
  clock: Clock,
  coffee: Coffee,
  credit: CreditCard,
  dollar: DollarSign,
  flag: Flag,
  graduation: GraduationCap,
  hotel: Hotel,
  info: Info,
  landmark: Landmark,
  luggage: Luggage,
  map: Map,
  pin: MapPin,
  museum: Museum,
  navigation: Navigation,
  parking: ParkingCircle,
  plane: Plane,
  route: Route,
  shield: ShieldCheck,
  ship: ShipWheel,
  ticket: Ticket,
  train: Train,
  umbrella: Umbrella,
  users: Users,
  food: Utensils,
  wallet: WalletCards,
  x: XCircle,
};

const addresses = {
  bostonHotel: "The Revolution Hotel, 40 Berkeley St, Boston, MA 02116",
  fenway: "Fenway Park, 4 Jersey St, Boston, MA 02215",
  leader: "Leader Bank Pavilion, 290 Northern Ave, Boston, MA 02210",
  northeastern: "Northeastern University, 360 Huntington Ave, Boston, MA 02115",
  backBayAvis: "Avis Boston Back Bay Station Garage, 100 Clarendon St, Boston, MA 02116",
  loganAvis: "Avis Boston Logan International Airport, 15 Transportation Way, East Boston, MA 02128",
  americanDream: "American Dream, 1 American Dream Way, East Rutherford, NJ 07073",
  phillyHotel: "4211 Suites, 4211 Chestnut St, Philadelphia, PA 19104",
  avisJ5D: "Avis PHL Convention Ctr Parking, 1324 Arch St, Philadelphia, PA 19107",
  station30: "William H. Gray III 30th Street Station, 2955 Market St, Philadelphia, PA 19104",
  nationalMall: "National Mall, Washington, DC",
  nyPenn: "New York Penn Station, New York, NY 10001",
};

const uiText = {
  zh: {
    docTitle: "2026 東北大學畢業家庭行程視覺化指南",
    subtitle:
      "以畢業典禮為核心，整合波士頓、費城、華盛頓特區與紐約的住宿、交通、餐廳、景點、租車、停車、票券與風險控制。",
    defaultNote: "主要版本為中文。右下角可切換純英文版本。",
    quickNav: "快速導覽",
    searchPlaceholder: "搜尋日期、地點、餐廳、風險或交通",
    openMap: "開啟地圖",
    openSource: "開啟來源",
    routeMap: "城市與交通主線",
    routeMapNote: "此圖用來判斷地理動線，不是精準距離圖。",
    stickyTitle: "目前最重要的操作判斷",
    summary: "摘要",
    all: "全部",
    boston: "波士頓",
    ceremonies: "畢業典禮",
    transport: "交通與租車",
    philly: "費城",
    dc: "華盛頓特區",
    nyc: "紐約",
    risks: "風險與待確認",
    maps: "地圖目錄",
    sources: "官方來源",
    dayPlan: "逐日行程",
    ceremonyDetails: "畢業典禮細節",
    transportLogic: "交通與租車決策",
    riskBoard: "風險控制板",
    mapDirectory: "Google Maps 地圖目錄",
    sourceDirectory: "官方資訊來源與待確認項目",
    intensity: "強度",
    theme: "主軸",
    avoid: "不要加排",
    mapLinks: "相關地圖",
    readerMode: "讀者版",
    switchToEnglish: "English",
    switchToChinese: "中文",
    unresolved: "仍需確認",
    completeCheck: "完整性檢查",
  },
  en: {
    docTitle: "2026 Northeastern Commencement Family Travel Guide",
    subtitle:
      "A visual, reader-facing itinerary infrastructure for Boston, Philadelphia, Washington, DC, and New York, built around commencement logistics, family pacing, transportation, dining, maps, car rental, parking, tickets, and risk control.",
    defaultNote: "Chinese is the primary version. Use the floating button at the lower right to switch to English only.",
    quickNav: "Quick navigation",
    searchPlaceholder: "Search dates, places, food, risks, or transport",
    openMap: "Open map",
    openSource: "Open source",
    routeMap: "City and transport spine",
    routeMapNote: "This diagram explains geographic logic. It is not a precise distance map.",
    stickyTitle: "Current highest-priority operating decisions",
    summary: "Summary",
    all: "All",
    boston: "Boston",
    ceremonies: "Ceremonies",
    transport: "Transport and car rental",
    philly: "Philadelphia",
    dc: "Washington, DC",
    nyc: "New York",
    risks: "Risks and confirmations",
    maps: "Map directory",
    sources: "Official sources",
    dayPlan: "Daily itinerary",
    ceremonyDetails: "Commencement details",
    transportLogic: "Transport and rental decisions",
    riskBoard: "Risk control board",
    mapDirectory: "Google Maps directory",
    sourceDirectory: "Official sources and pending confirmations",
    intensity: "Intensity",
    theme: "Theme",
    avoid: "Do not add",
    mapLinks: "Map links",
    readerMode: "Reader mode",
    switchToEnglish: "English",
    switchToChinese: "中文",
    unresolved: "Still pending",
    completeCheck: "Completeness check",
  },
};

const stickyItems = [
  {
    icon: "car",
    tone: "amber",
    zh: "5/2 不應使用中午 12:00 取車。若保留 American Dream，需改成早上 8:00 至 8:30 左右取車，或至少能在上午離開波士頓。",
    en: "Do not keep a 12:00 PM pickup on May 2 if American Dream remains in the plan. Reprice an 8:00 to 8:30 AM city pickup, or at least leave Boston in the morning.",
  },
  {
    icon: "parking",
    tone: "red",
    zh: "Avis 30th Street Station PH4 已關閉。費城還車以 J5D Convention Center Parking 為主，並避免 after-hours return。",
    en: "Avis 30th Street Station PH4 is closed. Use J5D Convention Center Parking as the practical Philadelphia return point and avoid after-hours return.",
  },
  {
    icon: "graduation",
    tone: "blue",
    zh: "4/29 與 4/30 是畢業典禮核心日，不再加排重景點。票券、服裝、手機電量、小包與提早抵達優先。",
    en: "April 29 and April 30 are ceremony-first days. Do not add heavy sightseeing. Tickets, regalia, phone battery, small bags, and early arrival come first.",
  },
  {
    icon: "train",
    tone: "slate",
    zh: "費城到紐約應使用 Amtrak 或 NJ Transit。LIRR 不從費城發車，只在抵達紐約後可能有用。",
    en: "Philadelphia to New York should be Amtrak or NJ Transit. LIRR does not run from Philadelphia and matters only after reaching New York.",
  },
];

const routeNodes = [
  { id: "bos", label: { zh: "波士頓", en: "Boston" }, date: "4/26–5/2", icon: "graduation", note: { zh: "住宿、畢業典禮、哈佛、自由之路、水岸線", en: "Hotel, ceremonies, Harvard, Freedom Trail, waterfront" } },
  { id: "ad", label: { zh: "American Dream", en: "American Dream" }, date: "5/2", icon: "bag", note: { zh: "午餐與限時購物，取代 Texas Roadhouse", en: "Lunch and controlled shopping, replaces Texas Roadhouse" } },
  { id: "phl", label: { zh: "費城", en: "Philadelphia" }, date: "5/2–5/5", icon: "landmark", note: { zh: "4211 Suites、UPenn、還車與上 Amtrak", en: "4211 Suites, UPenn, car return, Amtrak" } },
  { id: "dc", label: { zh: "華盛頓特區", en: "Washington, DC" }, date: "5/4", icon: "flag", note: { zh: "開車一日遊，固定車庫，保守路線", en: "Driving day trip, one garage, conservative route" } },
  { id: "nyc", label: { zh: "紐約", en: "New York" }, date: "5/5–5/11", icon: "train", note: { zh: "住宿與航班未定，暫用模組化行程", en: "Hotel and flight pending, modular plan only" } },
];

const ceremonies = [
  {
    key: "fenway",
    logo: "NU",
    tone: "blue",
    title: { zh: "第一場：Graduate Commencement", en: "Ceremony 1: Graduate Commencement" },
    date: { zh: "2026 年 4 月 29 日，星期三", en: "Wednesday, April 29, 2026" },
    time: { zh: "上午 10:00 開始", en: "10:00 AM start" },
    venue: { zh: "Fenway Park", en: "Fenway Park" },
    address: addresses.fenway,
    duration: { zh: "約 90 至 120 分鐘", en: "Approximately 90 to 120 minutes" },
    weather: { zh: "雨天照常舉行，需依天氣穿著", en: "Rain or shine. Dress for weather." },
    graduate: [
      { zh: "畢業生上午 8:00 於 Gate B 報到，位置在 Van Ness Street。", en: "Graduate arrival is 8:00 AM at Gate B on Van Ness Street." },
      { zh: "學生進場隊伍約上午 8:45 開始。", en: "Student procession begins around 8:45 AM." },
      { zh: "穿著 cap、gown、hood、alumni pin。", en: "Wear cap, gown, hood, and alumni pin." },
      { zh: "畢業生需先處理自己的 field ticket，再處理來賓票。", en: "The graduate must claim the field ticket before handling guest tickets." },
    ],
    guests: [
      { zh: "來賓上午 8:00 入場，入口為 Gates A、D、E。", en: "Guest gates open at 8:00 AM at Gates A, D, and E." },
      { zh: "每位符合資格的研究生最多可領 6 張來賓票。", en: "Each eligible graduate student may claim up to 6 guest tickets." },
      { zh: "2 歲以上兒童需要票。2 歲或以下若能坐在成人腿上，不需票，但嬰兒車禁止入場。", en: "Children older than 2 need tickets. Children 2 or younger sitting on an adult's lap do not need a ticket, but strollers are prohibited." },
      { zh: "Fenway concessions 在典禮開始前開放，並在典禮開始後關閉。", en: "Fenway concessions open before the ceremony and close once it begins." },
    ],
    rules: [
      { zh: "大型包、後背包、超過 12 × 12 × 6 英寸的包不得入場。", en: "Large bags, backpacks, and bags over 12 × 12 × 6 inches are prohibited." },
      { zh: "可攜帶 1 瓶未開封 16 oz 清水。", en: "One sealed 16 oz water bottle is permitted." },
      { zh: "所有人需接受安檢。", en: "All attendees are subject to security screening." },
      { zh: "此日不安排觀光，典禮、拍照、午餐、休息即可。", en: "No sightseeing should be added this day. Ceremony, photos, lunch, and rest are enough." },
    ],
    maps: [
      { label: { zh: "Fenway Park", en: "Fenway Park" }, url: mapSearch(addresses.fenway) },
      { label: { zh: "Gate B 與 Van Ness Street", en: "Gate B and Van Ness Street" }, url: mapSearch("Fenway Park Gate B Van Ness Street Boston MA") },
      { label: { zh: "飯店至 Fenway", en: "Hotel to Fenway" }, url: mapDirections(addresses.bostonHotel, addresses.fenway) },
    ],
  },
  {
    key: "dmsb",
    logo: "DMSB",
    tone: "plum",
    title: { zh: "第二場：D’Amore-McKim Graduate Celebration", en: "Ceremony 2: D’Amore-McKim Graduate Celebration" },
    date: { zh: "2026 年 4 月 30 日，星期四", en: "Thursday, April 30, 2026" },
    time: { zh: "晚上 6:00 開始", en: "6:00 PM start" },
    venue: { zh: "Leader Bank Pavilion", en: "Leader Bank Pavilion" },
    address: addresses.leader,
    duration: { zh: "約 2 小時，視學院規模可能接近 3 小時", en: "About 2 hours, but some college celebrations may approach 3 hours depending on size" },
    weather: { zh: "戶外帳棚場地，Seaport 晚上有風，需帶外套。", en: "Outdoor tented venue. Bring a jacket for Seaport evening wind." },
    graduate: [
      { zh: "畢業生應在典禮前 90 分鐘抵達，也就是下午 4:30。", en: "Graduates should arrive 90 minutes early, at 4:30 PM." },
      { zh: "畢業生入口在 Harborwalk，Main Entrance 左側遠端。", en: "Graduate lineup is on Harborwalk, far left of the Main Entrance." },
      { zh: "必須穿著 regalia。若同時參加大典，需保留完整畢業服。", en: "Regalia is required. Keep full regalia if also attending university commencement." },
      { zh: "畢業生強烈建議不要攜帶個人物品。", en: "Graduates are strongly encouraged not to bring personal items." },
    ],
    guests: [
      { zh: "來賓應在典禮前 60 分鐘抵達，也就是下午 5:00。", en: "Guests should arrive 60 minutes early, at 5:00 PM." },
      { zh: "每位畢業生可領最多 4 張 college celebration 來賓票。", en: "Each graduate may claim up to 4 college celebration guest tickets." },
      { zh: "票券為 general admission，座位先到先坐。", en: "Seating is ticketed general admission and first come, first served." },
      { zh: "Bag Check 位於主入口外，每件 5 美元。", en: "Bag Check is outside the main gates for $5 per item." },
    ],
    rules: [
      { zh: "Leader Bank Pavilion 地址是 290 Northern Avenue，不是附近的 Leader Bank Seaport branch。", en: "Use 290 Northern Avenue. It is not the nearby Leader Bank Seaport branch." },
      { zh: "包包尺寸上限為 12 × 12 × 6 英寸。大於 6 × 9 英寸的非透明包亦可能不被接受。", en: "Bag size limit is 12 × 12 × 6 inches. Non-clear bags larger than 6 × 9 inches may also be restricted." },
      { zh: "場館沒有現場停車。建議 Uber 或預留大量交通時間。", en: "There is no on-site parking. Use rideshare or build a large traffic buffer." },
      { zh: "不准攜帶外食飲料，例外為 1 瓶未開封 16 oz 清水。", en: "Outside food and beverages are prohibited except one sealed 16 oz water bottle." },
    ],
    maps: [
      { label: { zh: "Leader Bank Pavilion", en: "Leader Bank Pavilion" }, url: mapSearch(addresses.leader) },
      { label: { zh: "東北大學至 Leader Bank Pavilion", en: "Northeastern to Leader Bank Pavilion" }, url: mapDirections(addresses.northeastern, addresses.leader) },
      { label: { zh: "飯店至 Leader Bank Pavilion", en: "Hotel to Leader Bank Pavilion" }, url: mapDirections(addresses.bostonHotel, addresses.leader) },
    ],
  },
];

const dailyPlans = [
  {
    id: "d0426",
    filter: "boston",
    date: { zh: "4/26 星期日", en: "Sun Apr 26" },
    city: { zh: "波士頓", en: "Boston" },
    title: { zh: "抵達與恢復日", en: "Arrival and recovery day" },
    intensity: { zh: "低", en: "Low" },
    status: { zh: "不安排正式觀光", en: "No formal sightseeing" },
    theme: {
      zh: "媽媽與妹妹經香港、臺北、西雅圖抵達波士頓，疲勞與時差是主風險。這天只能做最低限度活動。",
      en: "Mother and sister arrive after a long HKG, Taipei, Seattle, Boston routing. Fatigue and jet lag are the main risks. Keep the day minimal.",
    },
    steps: [
      { time: "07:12", icon: "plane", zh: "預計抵達 Boston Logan Airport。", en: "Expected arrival at Boston Logan Airport." },
      { time: "08:30 至 09:30", icon: "car", zh: "出關、領行李後 Uber 至 The Revolution Hotel。", en: "Immigration, baggage claim, then Uber to The Revolution Hotel." },
      { time: "09:30 至 11:00", icon: "coffee", zh: "飯店寄放行李，附近 Tatte 或同級早餐、早午餐。", en: "Leave luggage at the hotel. Breakfast or brunch at Tatte or similar." },
      { time: "11:00 至 14:00", icon: "map", zh: "若精神尚可，只在 Boston Common 或 Public Garden 坐著休息與短走，不超過 1 小時主動步行。", en: "If energy allows, sit and take a very short walk at Boston Common or Public Garden. Keep active walking under 1 hour." },
      { time: "15:00", icon: "hotel", zh: "標準入住後休息 2 至 3 小時。", en: "Check in and rest for 2 to 3 hours." },
      { time: "18:30 至 19:30", icon: "food", zh: "Chipotle 或飯店附近簡餐。這是體驗型快速餐，不是正式晚餐。", en: "Chipotle or a simple meal near the hotel. This is a casual experience, not a formal dinner." },
      { time: "20:00 後", icon: "clock", zh: "回飯店早睡。", en: "Return to hotel and sleep early." },
    ],
    avoid: [
      { zh: "不要排 Freedom Trail。", en: "Do not schedule Freedom Trail." },
      { zh: "不要排 Harvard 或博物館。", en: "Do not schedule Harvard or museums." },
      { zh: "不要用 Newbury Street 或 Trader Joe's 消耗體力。", en: "Do not spend energy on Newbury Street or Trader Joe's." },
    ],
    maps: [
      { label: { zh: "The Revolution Hotel", en: "The Revolution Hotel" }, url: mapSearch(addresses.bostonHotel) },
      { label: { zh: "Tatte Tremont 附近", en: "Tatte near Tremont" }, url: mapSearch("Tatte Bakery Cafe Tremont Boston MA") },
      { label: { zh: "Boston Public Garden", en: "Boston Public Garden" }, url: mapSearch("Boston Public Garden Boston MA") },
      { label: { zh: "Chipotle Park Plaza", en: "Chipotle Park Plaza" }, url: mapSearch("Chipotle 8 Park Plaza Boston MA") },
    ],
  },
  {
    id: "d0427",
    filter: "boston",
    date: { zh: "4/27 星期一", en: "Mon Apr 27" },
    city: { zh: "波士頓", en: "Boston" },
    title: { zh: "自由之路精簡段與 North End", en: "Concise Freedom Trail and North End" },
    intensity: { zh: "中", en: "Medium" },
    status: { zh: "歷史核心日", en: "Historic Boston day" },
    theme: {
      zh: "從住宿區往北推進，串連 Boston Common、Beacon Hill、Downtown、North End，不硬走到 Charlestown。",
      en: "Move north from the hotel area through Boston Common, Beacon Hill, Downtown, and North End without forcing the full Charlestown extension.",
    },
    steps: [
      { time: "上午", icon: "landmark", zh: "Tatte 早餐後，Boston Common、Massachusetts State House 外觀、Beacon Hill、Granary Burying Ground。", en: "After Tatte breakfast, visit Boston Common, Massachusetts State House exterior, Beacon Hill, and Granary Burying Ground." },
      { time: "中午", icon: "food", zh: "Faneuil Hall 或 Quincy Market 午餐與休息。", en: "Lunch and rest at Faneuil Hall or Quincy Market." },
      { time: "下午", icon: "map", zh: "Old State House、Paul Revere House 外觀，慢慢進 North End。", en: "Old State House, Paul Revere House exterior, then slow walk into North End." },
      { time: "17:30 目標", icon: "food", zh: "The Daily Catch North End。North End 店為 first come, first serve，且 Gift Cards 與 Cash Only。", en: "The Daily Catch North End. The North End location is first come, first serve, and accepts gift cards and cash only." },
      { time: "晚餐後", icon: "bag", zh: "Mike's Pastry 外帶，不單獨為甜點跨區。", en: "Mike's Pastry takeaway. Do not make a separate cross-town dessert trip." },
    ],
    avoid: [
      { zh: "不要把 USS Constitution 放在星期一。", en: "Do not put USS Constitution on Monday." },
      { zh: "若時差仍明顯，不走完整 Freedom Trail。", en: "Do not complete the full Freedom Trail if jet lag remains strong." },
    ],
    maps: [
      { label: { zh: "Boston Common", en: "Boston Common" }, url: mapSearch("Boston Common Boston MA") },
      { label: { zh: "Massachusetts State House", en: "Massachusetts State House" }, url: mapSearch("Massachusetts State House Boston MA") },
      { label: { zh: "Faneuil Hall", en: "Faneuil Hall" }, url: mapSearch("Faneuil Hall Boston MA") },
      { label: { zh: "Paul Revere House", en: "Paul Revere House" }, url: mapSearch("Paul Revere House Boston MA") },
      { label: { zh: "The Daily Catch North End", en: "The Daily Catch North End" }, url: mapSearch("The Daily Catch North End 323 Hanover St Boston MA") },
      { label: { zh: "Mike's Pastry", en: "Mike's Pastry" }, url: mapSearch("Mike's Pastry 300 Hanover St Boston MA") },
    ],
  },
  {
    id: "d0428",
    filter: "boston",
    date: { zh: "4/28 星期二", en: "Tue Apr 28" },
    city: { zh: "Cambridge", en: "Cambridge" },
    title: { zh: "Harvard 校園與一間博物館", en: "Harvard campus and one museum" },
    intensity: { zh: "中", en: "Medium" },
    status: { zh: "Cambridge 獨立成日", en: "Cambridge as one cluster" },
    theme: {
      zh: "Harvard 區域獨立完成，不與波士頓市中心或 North End 混排。博物館只選一條主線。",
      en: "Treat Harvard as its own day. Do not mix it with Downtown Boston or North End. Choose one museum track only.",
    },
    steps: [
      { time: "上午", icon: "train", zh: "搭 Uber 或 MBTA Red Line 至 Harvard Square。", en: "Take Uber or MBTA Red Line to Harvard Square." },
      { time: "上午", icon: "graduation", zh: "Harvard Yard、John Harvard Statue、Widener Library 外觀與校園拍照。", en: "Harvard Yard, John Harvard Statue, Widener Library exterior, and campus photos." },
      { time: "中午", icon: "food", zh: "Harvard Square 午餐，選可坐下休息的店。", en: "Lunch in Harvard Square, preferably a seated option." },
      { time: "下午", icon: "museum", zh: "二選一：Harvard Art Museums，或 Harvard Museum of Natural History 搭配 Peabody Museum 輕量參觀。", en: "Choose one: Harvard Art Museums, or Harvard Museum of Natural History with a light Peabody pairing." },
      { time: "傍晚", icon: "map", zh: "若體力足夠，可在 Weeks Footbridge 或 Charles River Cambridge 側短走。", en: "If energy remains, take a short walk near Weeks Footbridge or the Cambridge side of the Charles River." },
      { time: "晚上", icon: "car", zh: "回波士頓飯店附近輕鬆吃。", en: "Return to Boston and eat near the hotel." },
    ],
    avoid: [
      { zh: "不要同日完整逛兩條博物館主線。", en: "Do not fully complete both museum tracks on the same day." },
      { zh: "不要加 MIT、North End 或 Back Bay 購物。", en: "Do not add MIT, North End, or Back Bay shopping." },
    ],
    maps: [
      { label: { zh: "Harvard Square", en: "Harvard Square" }, url: mapSearch("Harvard Square Cambridge MA") },
      { label: { zh: "Harvard Yard", en: "Harvard Yard" }, url: mapSearch("Harvard Yard Cambridge MA") },
      { label: { zh: "Harvard Art Museums", en: "Harvard Art Museums" }, url: mapSearch("Harvard Art Museums 32 Quincy St Cambridge MA") },
      { label: { zh: "Harvard Museum of Natural History", en: "Harvard Museum of Natural History" }, url: mapSearch("Harvard Museum of Natural History 26 Oxford St Cambridge MA") },
      { label: { zh: "Weeks Footbridge", en: "Weeks Footbridge" }, url: mapSearch("Weeks Footbridge Cambridge MA") },
    ],
  },
  {
    id: "d0429",
    filter: "ceremonies",
    date: { zh: "4/29 星期三", en: "Wed Apr 29" },
    city: { zh: "波士頓", en: "Boston" },
    title: { zh: "第一場畢業典禮：Fenway Park", en: "Ceremony 1 at Fenway Park" },
    intensity: { zh: "中高", en: "Medium high" },
    status: { zh: "典禮優先", en: "Ceremony first" },
    theme: {
      zh: "這天只服務畢業典禮。等待、入場、安檢、隊伍、拍照與散場本身就會消耗體力。",
      en: "This day serves the ceremony only. Waiting, entry, security, procession, photos, and exit will already consume energy.",
    },
    steps: [
      { time: "06:30", icon: "shield", zh: "起床、早餐、確認票券、手機電量、cap、gown、hood、alumni pin。", en: "Wake up, breakfast, confirm tickets, phone battery, cap, gown, hood, and alumni pin." },
      { time: "07:10", icon: "car", zh: "Uber 從 The Revolution Hotel 前往 Fenway Park。", en: "Uber from The Revolution Hotel to Fenway Park." },
      { time: "07:30 至 07:45", icon: "pin", zh: "抵達 Fenway 附近，畢業生與來賓分流。", en: "Arrive near Fenway and separate graduate and guest flows." },
      { time: "08:00", icon: "ticket", zh: "畢業生 Gate B 報到，來賓 Gates A、D、E 入場。", en: "Graduate reports at Gate B. Guests enter through Gates A, D, and E." },
      { time: "08:45", icon: "route", zh: "學生隊伍約開始進場。", en: "Student procession begins around this time." },
      { time: "10:00", icon: "graduation", zh: "Graduate Commencement 開始。", en: "Graduate Commencement begins." },
      { time: "中午後", icon: "food", zh: "Fenway 附近簡單午餐後回飯店休息。", en: "Simple lunch near Fenway, then return to hotel to rest." },
      { time: "晚上", icon: "food", zh: "Back Bay 或 South End 慶祝晚餐，不跑太遠。", en: "Celebration dinner in Back Bay or South End. Keep it close." },
    ],
    avoid: [
      { zh: "不要排 Freedom Trail。", en: "Do not schedule Freedom Trail." },
      { zh: "不要排 Harvard。", en: "Do not schedule Harvard." },
      { zh: "不要安排遠距離晚餐。", en: "Do not book a distant dinner." },
    ],
    maps: [
      { label: { zh: "Fenway Park", en: "Fenway Park" }, url: mapSearch(addresses.fenway) },
      { label: { zh: "飯店至 Fenway", en: "Hotel to Fenway" }, url: mapDirections(addresses.bostonHotel, addresses.fenway) },
      { label: { zh: "Gate B 位置搜尋", en: "Gate B location search" }, url: mapSearch("Fenway Park Gate B Van Ness Street Boston MA") },
    ],
  },
  {
    id: "d0430",
    filter: "ceremonies",
    date: { zh: "4/30 星期四", en: "Thu Apr 30" },
    city: { zh: "波士頓", en: "Boston" },
    title: { zh: "Northeastern 校園與 D’Amore-McKim Celebration", en: "Northeastern campus and D’Amore-McKim Celebration" },
    intensity: { zh: "中高", en: "Medium high" },
    status: { zh: "校園拍照加晚間典禮", en: "Campus photos and evening ceremony" },
    theme: {
      zh: "上午拍校園照，下午完整休息，傍晚前往 Seaport。這天的風險是交通、海風、包包尺寸與錯誤 GPS。",
      en: "Campus photos in the morning, full rest in the afternoon, then Seaport. The risks are traffic, sea wind, bag size, and wrong GPS destination.",
    },
    steps: [
      { time: "上午", icon: "camera", zh: "Northeastern 校園拍照：ISEC、Snell Library、Centennial Common、D’Amore-McKim 相關區域。", en: "Northeastern campus photos: ISEC, Snell Library, Centennial Common, and D’Amore-McKim related areas." },
      { time: "中午", icon: "food", zh: "校園、Symphony 或 Back Bay 附近午餐，不繞遠。", en: "Lunch near campus, Symphony, or Back Bay. Do not detour far." },
      { time: "14:00 至 15:30", icon: "hotel", zh: "回飯店休息、整理服裝、票券與小包。", en: "Return to hotel to rest and organize clothing, tickets, and small bag." },
      { time: "16:00", icon: "car", zh: "Uber 至 Leader Bank Pavilion。不要壓線使用大眾運輸。", en: "Uber to Leader Bank Pavilion. Do not rely on tight public transit timing." },
      { time: "16:30", icon: "users", zh: "畢業生於 Harborwalk graduate entrance 報到。", en: "Graduate arrival at Harborwalk graduate entrance." },
      { time: "17:00", icon: "users", zh: "來賓於 Main Entrance 入場。", en: "Guest arrival at Main Entrance." },
      { time: "18:00", icon: "graduation", zh: "D’Amore-McKim Graduate Celebration 開始。", en: "D’Amore-McKim Graduate Celebration begins." },
      { time: "20:00 後", icon: "clock", zh: "視體力決定直接回飯店，或在 Seaport 簡單吃。", en: "Depending on energy, return directly or eat a simple dinner in Seaport." },
    ],
    avoid: [
      { zh: "不要帶大包。", en: "Do not bring a large bag." },
      { zh: "不要把 GPS 設到 Leader Bank Seaport branch。", en: "Do not set GPS to the Leader Bank Seaport branch." },
      { zh: "不要安排複雜餐廳訂位。", en: "Do not schedule a complicated dinner reservation." },
    ],
    maps: [
      { label: { zh: "Northeastern University", en: "Northeastern University" }, url: mapSearch(addresses.northeastern) },
      { label: { zh: "Leader Bank Pavilion", en: "Leader Bank Pavilion" }, url: mapSearch(addresses.leader) },
      { label: { zh: "飯店至 Leader Bank Pavilion", en: "Hotel to Leader Bank Pavilion" }, url: mapDirections(addresses.bostonHotel, addresses.leader) },
    ],
  },
  {
    id: "d0501",
    filter: "boston",
    date: { zh: "5/1 星期五", en: "Fri May 1" },
    city: { zh: "波士頓", en: "Boston" },
    title: { zh: "Waterfront、James Hook 與 Charlestown", en: "Waterfront, James Hook, and Charlestown" },
    intensity: { zh: "中", en: "Medium" },
    status: { zh: "水岸線精華日", en: "Waterfront day" },
    theme: {
      zh: "畢業典禮已結束，這天串 Waterfront、James Hook、Long Wharf、Charlestown、USS Constitution。North End 視體力追加。",
      en: "After the ceremonies, link Waterfront, James Hook, Long Wharf, Charlestown, and USS Constitution. Add North End only if energy remains.",
    },
    steps: [
      { time: "上午", icon: "map", zh: "二選一短走：Charles River Esplanade 或 Public Garden。不要兩個都做滿。", en: "Choose one short walk: Charles River Esplanade or Public Garden. Do not fully do both." },
      { time: "中午", icon: "food", zh: "James Hook & Co 午餐。", en: "Lunch at James Hook & Co." },
      { time: "下午", icon: "ship", zh: "Long Wharf 至 Charlestown Navy Yard。若 ferry 時間不順，可直接 rideshare。", en: "Long Wharf to Charlestown Navy Yard. If ferry timing is poor, use rideshare." },
      { time: "下午主段", icon: "museum", zh: "USS Constitution 與 USS Constitution Museum。船艦開放時間需出發前再確認。", en: "USS Constitution and USS Constitution Museum. Reconfirm ship hours before departure." },
      { time: "傍晚", icon: "ship", zh: "返回 Long Wharf 或 North End。", en: "Return toward Long Wharf or North End." },
      { time: "晚上", icon: "luggage", zh: "若 4/27 未補到 Mike's Pastry，可放這天。否則回飯店整理行李，準備隔天去費城。", en: "If Mike's Pastry was missed on Apr 27, add it here. Otherwise return to pack for Philadelphia." },
    ],
    avoid: [
      { zh: "不要加 Harvard 或大型博物館。", en: "Do not add Harvard or another major museum." },
      { zh: "不要把購物排成主行程。", en: "Do not turn shopping into the main plan." },
    ],
    maps: [
      { label: { zh: "Charles River Esplanade", en: "Charles River Esplanade" }, url: mapSearch("Charles River Esplanade Boston MA") },
      { label: { zh: "James Hook & Co", en: "James Hook & Co" }, url: mapSearch("James Hook & Co 440 Atlantic Ave Boston MA") },
      { label: { zh: "Long Wharf", en: "Long Wharf" }, url: mapSearch("Long Wharf Boston MA") },
      { label: { zh: "Charlestown Navy Yard", en: "Charlestown Navy Yard" }, url: mapSearch("Charlestown Navy Yard Boston MA") },
      { label: { zh: "USS Constitution Museum", en: "USS Constitution Museum" }, url: mapSearch("USS Constitution Museum Charlestown MA") },
    ],
  },
  {
    id: "d0502",
    filter: "transport",
    date: { zh: "5/2 星期六", en: "Sat May 2" },
    city: { zh: "波士頓至 New Jersey 至費城", en: "Boston to New Jersey to Philadelphia" },
    title: { zh: "租車移動日與 American Dream 限時停靠", en: "Rental car travel day with limited American Dream stop" },
    intensity: { zh: "高", en: "High" },
    status: { zh: "移動加購物，不是完整景點日", en: "Travel plus shopping, not a full attraction day" },
    theme: {
      zh: "American Dream 可加入，但只能作為午餐與限時購物停靠點。若要這樣走，租車時間必須提早。",
      en: "American Dream can be included only as a lunch and controlled shopping stop. This requires an early rental pickup.",
    },
    steps: [
      { time: "優先試算", icon: "car", zh: "先試 Boston Back Bay Station Garage 或其他市中心 Avis。人在市中心，不應先預設跑去 BOS。", en: "First test Boston Back Bay Station Garage or another city Avis. Since the family is downtown, BOS should not be the default." },
      { time: "需要修正", icon: "alert", zh: "目前截圖的 12:00 PM 取車太晚。若保留 American Dream，應改成早上 8:00 或 8:30 左右。", en: "The current 12:00 PM pickup in the screenshot is too late. If American Dream remains, change to around 8:00 or 8:30 AM." },
      { time: "目標離開", icon: "route", zh: "盡量在上午離開波士頓。", en: "Leave Boston in the morning if possible." },
      { time: "中午", icon: "bag", zh: "抵達 American Dream。午餐在 mall 內解決。", en: "Arrive at American Dream. Eat lunch inside the mall." },
      { time: "最多 3 至 3.5 小時", icon: "clock", zh: "只購物，不玩水上樂園、室內滑雪、主題樂園或水族館。", en: "Shopping only. Do not visit the water park, indoor skiing, theme park, or aquarium." },
      { time: "15:30 左右", icon: "car", zh: "離開 American Dream 前往費城。", en: "Leave American Dream for Philadelphia." },
      { time: "18:00 至 18:30 目標", icon: "hotel", zh: "抵達 4211 Suites，停車、入住、簡單晚餐。", en: "Arrive at 4211 Suites, park, check in, and have a simple dinner." },
    ],
    avoid: [
      { zh: "若加入 American Dream，就取消 Texas Roadhouse。", en: "If American Dream is included, cancel Texas Roadhouse." },
      { zh: "不要在停車場打開行李箱整理行李。", en: "Do not open the trunk and reorganize luggage in the parking lot." },
      { zh: "護照、錢包、電腦與貴重物品隨身帶。", en: "Keep passports, wallets, computers, and valuables with the family." },
    ],
    maps: [
      { label: { zh: "Back Bay Avis", en: "Back Bay Avis" }, url: mapSearch(addresses.backBayAvis) },
      { label: { zh: "BOS Avis 備案", en: "BOS Avis backup" }, url: mapSearch(addresses.loganAvis) },
      { label: { zh: "The Revolution Hotel 至 American Dream", en: "Hotel to American Dream" }, url: mapDirections(addresses.bostonHotel, addresses.americanDream) },
      { label: { zh: "American Dream", en: "American Dream" }, url: mapSearch(addresses.americanDream) },
      { label: { zh: "American Dream 至 4211 Suites", en: "American Dream to 4211 Suites" }, url: mapDirections(addresses.americanDream, addresses.phillyHotel) },
    ],
  },
  {
    id: "d0503",
    filter: "philly",
    date: { zh: "5/3 星期日", en: "Sun May 3" },
    city: { zh: "費城", en: "Philadelphia" },
    title: { zh: "UPenn 與費城西往東精華線", en: "UPenn and west to east Philadelphia highlights" },
    intensity: { zh: "中，晚啟動", en: "Medium, late start" },
    status: { zh: "UPenn 為主軸", en: "UPenn as anchor" },
    theme: {
      zh: "5/2 已是長途移動日，因此 5/3 不早起。從住宿附近的 UPenn 開始，逐步往東，不塞滿 Old City。",
      en: "May 2 is already a long travel day, so May 3 should not start early. Begin with UPenn near the hotel and move east gradually without overloading Old City.",
    },
    steps: [
      { time: "09:00 至 10:00", icon: "coffee", zh: "悠閒早餐與恢復。", en: "Slow breakfast and recovery." },
      { time: "10:30", icon: "graduation", zh: "從 4211 Chestnut 區域出發逛 UPenn。", en: "Start the UPenn walk from the 4211 Chestnut area." },
      { time: "上午", icon: "building", zh: "Locust Walk、College Hall 外觀、Fisher Fine Arts Library 外觀。", en: "Locust Walk, College Hall exterior, and Fisher Fine Arts Library exterior." },
      { time: "中午", icon: "food", zh: "University City 午餐。", en: "Lunch in University City." },
      { time: "下午", icon: "museum", zh: "Philadelphia Museum of Art 外觀、Rocky Steps、Schuylkill River。", en: "Philadelphia Museum of Art exterior, Rocky Steps, and Schuylkill River." },
      { time: "傍晚", icon: "map", zh: "Rittenhouse Square 或 Reading Terminal Market 二選一，視體力決定。", en: "Choose either Rittenhouse Square or Reading Terminal Market depending on energy." },
      { time: "晚上", icon: "hotel", zh: "早回 4211 Suites，準備隔天 DC。", en: "Return early to 4211 Suites and prepare for DC." },
    ],
    avoid: [
      { zh: "不要同日硬塞 Independence Hall、Liberty Bell、Old City，除非刪掉 Art Museum 或 Rittenhouse。", en: "Do not force Independence Hall, Liberty Bell, or Old City unless Art Museum or Rittenhouse is removed." },
      { zh: "不要晚睡。隔天是全程最高強度日。", en: "Do not sleep late. The next day is the highest intensity day." },
    ],
    maps: [
      { label: { zh: "4211 Suites", en: "4211 Suites" }, url: mapSearch(addresses.phillyHotel) },
      { label: { zh: "UPenn Locust Walk", en: "UPenn Locust Walk" }, url: mapSearch("Locust Walk University of Pennsylvania Philadelphia PA") },
      { label: { zh: "College Hall", en: "College Hall" }, url: mapSearch("College Hall University of Pennsylvania Philadelphia PA") },
      { label: { zh: "Philadelphia Museum of Art", en: "Philadelphia Museum of Art" }, url: mapSearch("Philadelphia Museum of Art Philadelphia PA") },
      { label: { zh: "Rittenhouse Square", en: "Rittenhouse Square" }, url: mapSearch("Rittenhouse Square Philadelphia PA") },
      { label: { zh: "Reading Terminal Market", en: "Reading Terminal Market" }, url: mapSearch("Reading Terminal Market Philadelphia PA") },
    ],
  },
  {
    id: "d0504",
    filter: "dc",
    date: { zh: "5/4 星期一", en: "Mon May 4" },
    city: { zh: "費城至華盛頓特區往返", en: "Philadelphia to Washington, DC round trip" },
    title: { zh: "DC 開車一日遊保守版", en: "Conservative DC driving day" },
    intensity: { zh: "全程最高", en: "Highest" },
    status: { zh: "只做核心線", en: "Core route only" },
    theme: {
      zh: "尊重開車想法，但這天真正累的是開車、停車、步行與回程高速疊加。DC 內只停一次車，只走 National Mall 核心線。",
      en: "Respect the driving preference, but the real burden is the combination of driving, parking, walking, and the return drive. Park once and cover only the National Mall core route.",
    },
    steps: [
      { time: "06:30", icon: "coffee", zh: "起床與簡單早餐。", en: "Wake up and simple breakfast." },
      { time: "07:00", icon: "car", zh: "從費城出發。", en: "Depart Philadelphia." },
      { time: "10:00 至 10:30", icon: "parking", zh: "抵達 DC，停在 National Mall、L'Enfant Plaza 或 Reagan Building 附近固定車庫。", en: "Arrive in DC and use one fixed garage near National Mall, L'Enfant Plaza, or Reagan Building." },
      { time: "10:30 至 12:00", icon: "landmark", zh: "U.S. Capitol 外觀與 National Mall 東段。", en: "U.S. Capitol exterior and National Mall east side." },
      { time: "12:00 至 13:00", icon: "food", zh: "午餐與休息。", en: "Lunch and rest." },
      { time: "13:00 至 15:30", icon: "route", zh: "Washington Monument 外觀、WWII Memorial、Reflecting Pool、Lincoln Memorial。", en: "Washington Monument exterior, WWII Memorial, Reflecting Pool, and Lincoln Memorial." },
      { time: "15:30 至 16:30", icon: "coffee", zh: "咖啡休息或短暫 Smithsonian。博物館不是主目標。", en: "Coffee rest or a brief Smithsonian stop. The museum is not the main objective." },
      { time: "17:00", icon: "car", zh: "離開 DC。", en: "Leave DC." },
      { time: "20:00 至 21:00", icon: "hotel", zh: "回費城，住宿附近簡單晚餐。", en: "Return to Philadelphia and eat near lodging." },
    ],
    avoid: [
      { zh: "不去 Georgetown。", en: "Do not go to Georgetown." },
      { zh: "不去 Arlington Cemetery。", en: "Do not go to Arlington Cemetery." },
      { zh: "不繞白宮。", en: "Do not detour to the White House." },
      { zh: "不換多個停車點。", en: "Do not use multiple parking locations." },
      { zh: "不把 12,000 步上限用滿。", en: "Do not use the full 12,000-step limit." },
    ],
    maps: [
      { label: { zh: "4211 Suites 至 National Mall", en: "4211 Suites to National Mall" }, url: mapDirections(addresses.phillyHotel, addresses.nationalMall) },
      { label: { zh: "National Mall", en: "National Mall" }, url: mapSearch(addresses.nationalMall) },
      { label: { zh: "L'Enfant Plaza 停車搜尋", en: "L'Enfant Plaza parking search" }, url: mapSearch("parking near L'Enfant Plaza Washington DC") },
      { label: { zh: "Ronald Reagan Building 停車", en: "Ronald Reagan Building parking" }, url: mapSearch("Ronald Reagan Building parking Washington DC") },
      { label: { zh: "Lincoln Memorial", en: "Lincoln Memorial" }, url: mapSearch("Lincoln Memorial Washington DC") },
    ],
  },
  {
    id: "d0505",
    filter: "transport",
    date: { zh: "5/5 星期二", en: "Tue May 5" },
    city: { zh: "費城至紐約，Eugene 另回波士頓", en: "Philadelphia to New York, Eugene separately returns to Boston" },
    title: { zh: "還車、Amtrak 與紐約交接日", en: "Car return, Amtrak, and New York handoff" },
    intensity: { zh: "中", en: "Medium" },
    status: { zh: "操作安全優先", en: "Operational safety first" },
    theme: {
      zh: "這天的目標不是觀光，而是行李、還車、車站等候、上車、紐約入住與 Eugene 回波士頓的安全交接。",
      en: "The objective is not sightseeing. It is luggage handling, car return, station waiting, boarding, New York check-in, and Eugene's safe return to Boston.",
    },
    steps: [
      { time: "09:00", icon: "luggage", zh: "4211 Suites 退房，全員與行李上車。", en: "Check out from 4211 Suites. Everyone and all luggage get in the car." },
      { time: "09:15", icon: "train", zh: "先到 30th Street Station，放下媽媽、妹妹與大件行李。", en: "First go to 30th Street Station and drop mother, sister, and large luggage." },
      { time: "09:15 至 09:30", icon: "pin", zh: "約定固定等候點，例如 Amtrak 出發看板下方。確認手機網路可用。", en: "Set a fixed waiting point, such as under the Amtrak departure board. Confirm phone data works." },
      { time: "09:30", icon: "car", zh: "Eugene 單獨開車至 Avis J5D Convention Center Parking。", en: "Eugene drives alone to Avis J5D Convention Center Parking." },
      { time: "09:45 至 10:15", icon: "shield", zh: "還車，確認油量、里程、損傷紀錄、e-Toll 與收據。", en: "Return the car. Confirm fuel, mileage, damage record, e-Toll, and receipt." },
      { time: "10:15 至 10:35", icon: "car", zh: "Uber 回 30th Street Station。", en: "Uber back to 30th Street Station." },
      { time: "11:15 之後", icon: "train", zh: "搭 Amtrak 至 New York Penn Station 或 Moynihan Train Hall。不要買太早班次。", en: "Take Amtrak to New York Penn Station or Moynihan Train Hall. Do not buy a too-early train." },
      { time: "下午", icon: "users", zh: "Eugene 應陪她們抵達紐約住宿並完成入住，再自己回波士頓。", en: "Eugene should help them reach and check into the New York lodging before returning to Boston." },
      { time: "晚上", icon: "food", zh: "她們只在飯店附近吃簡單晚餐，不排遠景點。", en: "They should eat near the hotel only. No distant sightseeing." },
    ],
    avoid: [
      { zh: "不要從費城找 LIRR。", en: "Do not look for LIRR from Philadelphia." },
      { zh: "不要全家拖行李去 J5D。", en: "Do not drag all luggage to J5D." },
      { zh: "不要讓她們在沒有網路與地址備份下單獨留在紐約。", en: "Do not leave them in New York without phone data and address backups." },
    ],
    maps: [
      { label: { zh: "4211 Suites 至 30th Street Station", en: "4211 Suites to 30th Street Station" }, url: mapDirections(addresses.phillyHotel, addresses.station30) },
      { label: { zh: "30th Street Station", en: "30th Street Station" }, url: mapSearch(addresses.station30) },
      { label: { zh: "Avis J5D", en: "Avis J5D" }, url: mapSearch(addresses.avisJ5D) },
      { label: { zh: "30th Street Station 至 Avis J5D", en: "30th Street Station to Avis J5D" }, url: mapDirections(addresses.station30, addresses.avisJ5D) },
      { label: { zh: "New York Penn Station", en: "New York Penn Station" }, url: mapSearch(addresses.nyPenn) },
    ],
  },
  {
    id: "d0505ny",
    filter: "nyc",
    date: { zh: "5/5 至 5/11", en: "May 5 to May 11" },
    city: { zh: "紐約", en: "New York" },
    title: { zh: "紐約模組化行程", en: "Modular New York plan" },
    intensity: { zh: "視住宿而定", en: "Depends on lodging" },
    status: { zh: "等待住宿與航班資訊", en: "Hotel and flight pending" },
    theme: {
      zh: "目前缺紐約住宿地址與 5/11 航班資訊，因此不能做精準逐時版。先用地理模組，等地址確認後再排序。",
      en: "The New York hotel address and May 11 flight details are still missing, so an exact hourly plan is not safe. Use geographic modules first and sort after lodging is confirmed.",
    },
    steps: [
      { time: "模組 A", icon: "building", zh: "Midtown：Times Square、Bryant Park、New York Public Library、Grand Central、Fifth Avenue、Rockefeller Center、Top of the Rock。", en: "Midtown: Times Square, Bryant Park, New York Public Library, Grand Central, Fifth Avenue, Rockefeller Center, Top of the Rock." },
      { time: "模組 B", icon: "landmark", zh: "Lower Manhattan：Wall Street、9/11 Memorial、Oculus、Battery Park、Staten Island Ferry 遠看自由女神。", en: "Lower Manhattan: Wall Street, 9/11 Memorial, Oculus, Battery Park, Staten Island Ferry for distant Statue of Liberty view." },
      { time: "模組 C", icon: "museum", zh: "Central Park 與一間博物館：The Met 或 American Museum of Natural History 二選一。", en: "Central Park and one museum: The Met or American Museum of Natural History." },
      { time: "模組 D", icon: "route", zh: "Brooklyn：DUMBO、Brooklyn Bridge Park、可選 Brooklyn Bridge 步行，步數較高。", en: "Brooklyn: DUMBO, Brooklyn Bridge Park, optional Brooklyn Bridge walk. Higher walking load." },
      { time: "模組 E", icon: "bag", zh: "SoHo 與 Chelsea：SoHo、Chelsea Market、High Line。", en: "SoHo and Chelsea: SoHo, Chelsea Market, High Line." },
      { time: "模組 F", icon: "luggage", zh: "緩衝日：購物、伴手禮、洗衣、整理行李、天氣備案。", en: "Buffer day: shopping, souvenirs, laundry, packing, and weather backup." },
      { time: "5/11", icon: "plane", zh: "離境日需依機場與航班時間重排。國際線應保守抓提早抵達機場。", en: "Departure day must be rebuilt after airport and flight time are known. For international flights, use conservative airport timing." },
    ],
    avoid: [
      { zh: "不要一天混排 Brooklyn、Lower Manhattan 與 Midtown。", en: "Do not mix Brooklyn, Lower Manhattan, and Midtown in one day." },
      { zh: "不要假設每個地鐵站都有電梯。", en: "Do not assume every subway station has elevators." },
      { zh: "不要在 5/11 早上才決定機場交通。", en: "Do not decide airport transportation on the morning of May 11." },
    ],
    maps: [
      { label: { zh: "New York Penn Station", en: "New York Penn Station" }, url: mapSearch(addresses.nyPenn) },
      { label: { zh: "Times Square", en: "Times Square" }, url: mapSearch("Times Square New York NY") },
      { label: { zh: "New York Public Library", en: "New York Public Library" }, url: mapSearch("New York Public Library Bryant Park") },
      { label: { zh: "Grand Central Terminal", en: "Grand Central Terminal" }, url: mapSearch("Grand Central Terminal New York NY") },
      { label: { zh: "The Met", en: "The Met" }, url: mapSearch("Metropolitan Museum of Art New York NY") },
      { label: { zh: "DUMBO", en: "DUMBO" }, url: mapSearch("DUMBO Brooklyn NY") },
      { label: { zh: "Chelsea Market", en: "Chelsea Market" }, url: mapSearch("Chelsea Market New York NY") },
    ],
  },
];

const transportCards = [
  {
    icon: "car",
    title: { zh: "Boston 取車優先順序", en: "Boston pickup priority" },
    status: { zh: "先市中心，後 BOS", en: "City first, BOS second" },
    body: {
      zh: "人在 The Revolution Hotel，應先試 Back Bay Station Garage 或其他市中心 Avis 至 J5D。只有市中心點無法異地還車、價格明顯高、車型不足、營業時間不合，才退回 BOS Logan。",
      en: "Since the family is at The Revolution Hotel, first test Back Bay Station Garage or another city Avis to J5D. Use BOS Logan only if city pickup fails on one-way return, price, vehicle class, or opening time.",
    },
  },
  {
    icon: "alert",
    title: { zh: "目前截圖報價問題", en: "Issue with current screenshot quote" },
    status: { zh: "12:00 取車太晚", en: "12:00 pickup too late" },
    body: {
      zh: "截圖顯示 5/2 中午 12:00 在 Back Bay 取車、5/5 中午 12:00 在 J5D 還車，車輛本體約 247.07 美元，但加購項目約 265.41 美元，總額約 572.63 美元。時間不適合 American Dream 版，且加購項目需重看。",
      en: "The screenshot shows May 2 12:00 PM pickup at Back Bay and May 5 12:00 PM return at J5D. Vehicle rate is about $247.07, add-ons about $265.41, total about $572.63. The timing does not work for the American Dream plan, and add-ons need review.",
    },
  },
  {
    icon: "parking",
    title: { zh: "費城還車點", en: "Philadelphia return point" },
    status: { zh: "J5D 優先", en: "J5D preferred" },
    body: {
      zh: "Avis PH4 30th Street Station 已關閉，不可用。J5D 位於 Convention Center Parking，車輛現場停放，同點歸還，且不提供 after-hours return。",
      en: "Avis PH4 at 30th Street Station is closed and unusable. J5D is inside Convention Center Parking, vehicles are on site, returns are same as pickup, and after-hours return is not available.",
    },
  },
  {
    icon: "credit",
    title: { zh: "保險與加購", en: "Insurance and add-ons" },
    status: { zh: "不能盲刪", en: "Do not delete blindly" },
    body: {
      zh: "信用卡租車保障通常偏向車損，不一定涵蓋第三方責任。LDW 可否刪除取決於信用卡條款。ALI 若沒有其他責任險來源，需謹慎保留。Additional Driver 若只有 Eugene 開可刪。PAI、PEP、RSN 視既有保險與安心需求調整。",
      en: "Credit card rental coverage often focuses on vehicle damage and may not cover third-party liability. LDW depends on credit card terms. ALI should be considered carefully if there is no other liability coverage. Remove Additional Driver if only Eugene drives. PAI, PEP, and RSN depend on existing insurance and comfort level.",
    },
  },
  {
    icon: "dollar",
    title: { zh: "Toll pass", en: "Toll pass" },
    status: { zh: "櫃檯確認", en: "Confirm at counter" },
    body: {
      zh: "5/2 與 5/4 會經過多個電子收費區。需在 Avis 櫃檯確認 standard e-Toll 與 e-Toll Unlimited 的實際價格。若主要只有兩天產生 toll，standard e-Toll 可能較合理，但以現場條款為準。",
      en: "May 2 and May 4 cross multiple electronic toll zones. Confirm standard e-Toll versus e-Toll Unlimited at the Avis counter. If tolls mainly occur on two days, standard e-Toll may be more reasonable, but use the actual counter terms.",
    },
  },
  {
    icon: "train",
    title: { zh: "費城至紐約鐵路", en: "Philadelphia to New York rail" },
    status: { zh: "Amtrak 或 NJ Transit", en: "Amtrak or NJ Transit" },
    body: {
      zh: "LIRR 是紐約市與長島方向的鐵路，不從費城出發。可以跟媽媽說：鐵路方向是對的，但那段不是 LIRR，而是 Amtrak 或 NJ Transit 到 Penn Station。",
      en: "LIRR serves New York City and Long Island, not Philadelphia. The family-facing explanation: the rail idea is correct, but the Philadelphia to New York segment is Amtrak or NJ Transit to Penn Station, not LIRR.",
    },
  },
];

const riskGroups = [
  {
    icon: "hotel",
    title: { zh: "4211 Suites 停車", en: "4211 Suites parking" },
    items: [
      { zh: "確認 5/2 至 5/5 是否可連續停車。", en: "Confirm parking availability from May 2 to May 5." },
      { zh: "確認每日費用與是否需預約。", en: "Confirm nightly rate and whether reservation is required." },
      { zh: "確認 5/4 車開去 DC 當天是否仍計停車費。", en: "Confirm whether May 4 still counts as a parking day when the car leaves for DC." },
    ],
  },
  {
    icon: "bag",
    title: { zh: "American Dream", en: "American Dream" },
    items: [
      { zh: "只作午餐與限時購物，不作完整景點。", en: "Use only for lunch and controlled shopping, not as a full attraction." },
      { zh: "停車不是完全免費，需預留停車費。", en: "Parking is not fully free, so budget parking cost." },
      { zh: "New Jersey 多數服飾與鞋類免銷售稅，但毛皮、配件、運動或保護裝備等例外。", en: "Most New Jersey clothing and footwear are sales tax exempt, but fur, accessories, sports equipment, and protective equipment are exceptions." },
      { zh: "精品配件、珠寶、手錶、包款不應假設免稅。", en: "Do not assume luxury accessories, jewelry, watches, or bags are tax exempt." },
    ],
  },
  {
    icon: "shield",
    title: { zh: "畢業典禮安檢", en: "Ceremony security" },
    items: [
      { zh: "Leader Bank Pavilion 與 Fenway 均需注意 12 × 12 × 6 英寸包包限制。", en: "Both Leader Bank Pavilion and Fenway require attention to the 12 × 12 × 6 inch bag limit." },
      { zh: "可攜 1 瓶未開封 16 oz 清水。", en: "One sealed 16 oz water bottle is allowed." },
      { zh: "所有人需接受安檢，違規可能被拒入場或要求離場。", en: "All attendees are subject to security screening. Noncompliance may lead to denial of entry or removal." },
      { zh: "包包過大時需寄放、退回車上，或直接無法入場。", en: "Oversized bags may need checking, return to vehicle, or may block entry." },
    ],
  },
  {
    icon: "users",
    title: { zh: "紐約交接", en: "New York handoff" },
    items: [
      { zh: "紐約住宿地址仍缺，無法做精準日程排序。", en: "New York lodging address is still missing, so exact sequencing is not possible." },
      { zh: "5/11 機場與航班時間仍缺。", en: "May 11 airport and flight time are still missing." },
      { zh: "Eugene 離開前，需確認 eSIM、飯店地址、Uber 路線、緊急聯絡與離境交通。", en: "Before Eugene leaves, confirm eSIM, hotel address, Uber route, emergency contacts, and departure transportation." },
      { zh: "紐約第一晚不安排遠距離景點。", en: "Do not schedule distant sightseeing on the first New York evening." },
    ],
  },
];

const mapDirectory = [
  { group: { zh: "住宿", en: "Lodging" }, links: [
    { label: { zh: "The Revolution Hotel", en: "The Revolution Hotel" }, url: mapSearch(addresses.bostonHotel), note: { zh: "波士頓住宿核心", en: "Boston base" } },
    { label: { zh: "4211 Suites", en: "4211 Suites" }, url: mapSearch(addresses.phillyHotel), note: { zh: "費城住宿與停車待確認", en: "Philadelphia lodging and parking pending" } },
    { label: { zh: "紐約飯店", en: "New York hotel" }, url: mapSearch("New York Penn Station hotels"), note: { zh: "尚未提供，暫以 Penn Station 為參考", en: "Not provided, Penn Station used as placeholder" } },
  ]},
  { group: { zh: "畢業典禮", en: "Commencement" }, links: [
    { label: { zh: "Fenway Park", en: "Fenway Park" }, url: mapSearch(addresses.fenway), note: { zh: "4/29 大典", en: "Apr 29 commencement" } },
    { label: { zh: "Gate B / Van Ness Street", en: "Gate B / Van Ness Street" }, url: mapSearch("Fenway Park Gate B Van Ness Street Boston MA"), note: { zh: "畢業生報到", en: "Graduate arrival" } },
    { label: { zh: "Leader Bank Pavilion", en: "Leader Bank Pavilion" }, url: mapSearch(addresses.leader), note: { zh: "4/30 DMSB 典禮", en: "Apr 30 DMSB celebration" } },
  ]},
  { group: { zh: "餐廳與補給", en: "Food and supplies" }, links: [
    { label: { zh: "Tatte Tremont 附近", en: "Tatte near Tremont" }, url: mapSearch("Tatte Bakery Cafe Tremont Boston MA"), note: { zh: "早餐或輕食", en: "Breakfast or light meal" } },
    { label: { zh: "Chipotle Park Plaza", en: "Chipotle Park Plaza" }, url: mapSearch("Chipotle 8 Park Plaza Boston MA"), note: { zh: "抵達日晚餐候選", en: "Arrival day dinner option" } },
    { label: { zh: "The Daily Catch North End", en: "The Daily Catch North End" }, url: mapSearch("The Daily Catch North End 323 Hanover St Boston MA"), note: { zh: "現金與先到先坐", en: "Cash and first come, first serve" } },
    { label: { zh: "Mike's Pastry", en: "Mike's Pastry" }, url: mapSearch("Mike's Pastry 300 Hanover St Boston MA"), note: { zh: "North End 搭配", en: "Pair with North End" } },
    { label: { zh: "James Hook & Co", en: "James Hook & Co" }, url: mapSearch("James Hook & Co 440 Atlantic Ave Boston MA"), note: { zh: "水岸午餐", en: "Waterfront lunch" } },
    { label: { zh: "Trader Joe's Back Bay", en: "Trader Joe's Back Bay" }, url: mapSearch("Trader Joe's 500 Boylston St Boston MA"), note: { zh: "有體力再去", en: "Only if energy remains" } },
  ]},
  { group: { zh: "租車、車站與城市移動", en: "Rental, rail, and intercity" }, links: [
    { label: { zh: "Avis Back Bay", en: "Avis Back Bay" }, url: mapSearch(addresses.backBayAvis), note: { zh: "優先試算", en: "First pricing test" } },
    { label: { zh: "Avis BOS Logan 備案", en: "Avis BOS Logan backup" }, url: mapSearch(addresses.loganAvis), note: { zh: "車型或價格不佳時才用", en: "Use if city pickup fails" } },
    { label: { zh: "American Dream", en: "American Dream" }, url: mapSearch(addresses.americanDream), note: { zh: "5/2 限時停靠", en: "May 2 controlled stop" } },
    { label: { zh: "Avis J5D", en: "Avis J5D" }, url: mapSearch(addresses.avisJ5D), note: { zh: "費城還車", en: "Philadelphia return" } },
    { label: { zh: "30th Street Station", en: "30th Street Station" }, url: mapSearch(addresses.station30), note: { zh: "Amtrak 至紐約", en: "Amtrak to New York" } },
    { label: { zh: "New York Penn Station", en: "New York Penn Station" }, url: mapSearch(addresses.nyPenn), note: { zh: "紐約抵達點", en: "New York arrival point" } },
  ]},
];

const sourceCards = [
  {
    label: { zh: "Northeastern Graduate Commencement", en: "Northeastern Graduate Commencement" },
    kind: { zh: "官方典禮資料", en: "Official ceremony information" },
    url: "https://commencement.northeastern.edu/events/graduate-ceremony-at-fenway/",
    summary: { zh: "確認 4/29、Fenway Park、10:00 AM、8:00 入場、Gate B、Gates A/D/E、8:45 procession、90 至 120 分鐘、最多 6 張來賓票。", en: "Confirms Apr 29, Fenway Park, 10:00 AM, 8:00 arrival, Gate B, Gates A/D/E, 8:45 procession, 90 to 120 minutes, and up to 6 guest tickets." },
  },
  {
    label: { zh: "Northeastern College Celebrations", en: "Northeastern College Celebrations" },
    kind: { zh: "官方學院典禮資料", en: "Official college celebration information" },
    url: "https://commencement.northeastern.edu/events/college-celebrations/",
    summary: { zh: "確認 D’Amore-McKim Graduate Celebration 為 4/30 6:00 PM，Leader Bank Pavilion。畢業生提前 90 分鐘，來賓提前 60 分鐘。", en: "Confirms D'Amore-McKim Graduate Celebration on Apr 30 at 6:00 PM at Leader Bank Pavilion. Graduates arrive 90 minutes early, guests 60 minutes early." },
  },
  {
    label: { zh: "Northeastern Venues and Travel", en: "Northeastern Venues and Travel" },
    kind: { zh: "場館與安檢", en: "Venue and security" },
    url: "https://commencement.northeastern.edu/venues-and-travel-information/",
    summary: { zh: "確認 Leader Bank Pavilion 地址、非 Leader Bank Seaport branch、無現場停車、Silver Line 距離、包包尺寸、Bag Check 與禁止攜帶物。", en: "Confirms Leader Bank Pavilion address, not Leader Bank Seaport branch, no on-site parking, Silver Line distance, bag size, Bag Check, and prohibited items." },
  },
  {
    label: { zh: "Avis J5D", en: "Avis J5D" },
    kind: { zh: "租車還車點", en: "Rental return point" },
    url: "https://www.avis.com/en/locations/nam/us/pa/philadelphia/j5d",
    summary: { zh: "確認 J5D 櫃檯位於 Convention Center Parking，車輛現場，同點歸還，且沒有 after-hours return。", en: "Confirms J5D counter is inside Convention Center Parking, vehicles are on site, returns are same as pickup, and after-hours return is unavailable." },
  },
  {
    label: { zh: "Avis Boston Back Bay", en: "Avis Boston Back Bay" },
    kind: { zh: "市中心取車點", en: "City pickup point" },
    url: "https://www.avis.com/en/locations/nam/us/ma/boston/bo4",
    summary: { zh: "確認 Back Bay 取車點位於 Back Bay Train Station 上方停車場。是否適合仍取決於實際日期、時間、車型、異地還車費。", en: "Confirms the Back Bay location is inside the garage over Back Bay Train Station. Suitability still depends on actual date, time, vehicle class, and one-way fee." },
  },
  {
    label: { zh: "Avis BOS Logan", en: "Avis BOS Logan" },
    kind: { zh: "機場備案", en: "Airport backup" },
    url: "https://www.avis.com/en/locations/nam/us/ma/boston/bos",
    summary: { zh: "確認 BOS Avis 位於 15 Transportation Way，24 小時營業。若市中心點不理想，可作備案。", en: "Confirms BOS Avis is at 15 Transportation Way and open 24 hours. Use as backup if city pickup is not viable." },
  },
  {
    label: { zh: "American Dream Parking", en: "American Dream Parking" },
    kind: { zh: "停車資訊", en: "Parking information" },
    url: "https://www.americandream.com/parking",
    summary: { zh: "確認 American Dream 停車不是完全免費，需把停車費納入預算。", en: "Confirms American Dream parking is not fully free, so budget for parking." },
  },
  {
    label: { zh: "New Jersey Sales Tax Guide", en: "New Jersey Sales Tax Guide" },
    kind: { zh: "服飾鞋類稅務", en: "Clothing and footwear tax" },
    url: "https://www.nj.gov/treasury/taxation/pdf/pubs/sales/su4.pdf",
    summary: { zh: "確認服飾與鞋類通常免 New Jersey Sales Tax，但毛皮、配件、運動或保護裝備等例外。", en: "Confirms clothing and footwear are generally exempt from New Jersey Sales Tax, with exceptions such as fur clothing, accessories, sports equipment, and protective equipment." },
  },
  {
    label: { zh: "Harvard Art Museums", en: "Harvard Art Museums" },
    kind: { zh: "博物館時間", en: "Museum hours" },
    url: "https://harvardartmuseums.org/policies/hours-closings",
    summary: { zh: "確認 Harvard Art Museums 週二至週日 10:00 AM 至 5:00 PM 開放。", en: "Confirms Harvard Art Museums are open Tuesday through Sunday, 10:00 AM to 5:00 PM." },
  },
  {
    label: { zh: "Harvard Museum of Natural History", en: "Harvard Museum of Natural History" },
    kind: { zh: "博物館時間", en: "Museum hours" },
    url: "https://www.hmnh.harvard.edu/plan-your-visit",
    summary: { zh: "確認 Harvard Museum of Natural History 每日 9:00 AM 至 5:00 PM 開放。", en: "Confirms Harvard Museum of Natural History is open daily from 9:00 AM to 5:00 PM." },
  },
  {
    label: { zh: "USS Constitution", en: "USS Constitution" },
    kind: { zh: "船艦參觀時間", en: "Ship visiting hours" },
    url: "https://www.navy.mil/USS-Constitution/Hours-Visitor-Info/",
    summary: { zh: "確認 USS Constitution 一般為週三至週日開放，需出發前再看當日異動。", en: "Confirms USS Constitution is generally open Wednesday through Sunday, but same-day changes should be checked before departure." },
  },
  {
    label: { zh: "The Daily Catch North End", en: "The Daily Catch North End" },
    kind: { zh: "餐廳資訊", en: "Restaurant information" },
    url: "https://thedailycatch.com/location/north-end/",
    summary: { zh: "確認 North End 店為 first come, first serve，付款為 Gift Cards 與 Cash Only。", en: "Confirms the North End location is first come, first serve, with payment by gift cards and cash only." },
  },
];

const sections = [
  { key: "all", icon: Menu },
  { key: "boston", icon: MapPin },
  { key: "ceremonies", icon: GraduationCap },
  { key: "transport", icon: Car },
  { key: "philly", icon: Landmark },
  { key: "dc", icon: Flag },
  { key: "nyc", icon: Train },
  { key: "risks", icon: ShieldCheck },
  { key: "maps", icon: Map },
  { key: "sources", icon: Info },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function tx(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.zh || value.en || "";
}

function iconOf(name, className = "h-4 w-4") {
  const Icon = ICONS[name] || Info;
  return <Icon className={className} />;
}

function toneClass(tone) {
  const map = {
    red: "border-red-200 bg-red-50 text-red-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    blue: "border-[#c7d7df] bg-[#edf5f7] text-[#214a57]",
    plum: "border-[#e3c7d7] bg-[#fbedf4] text-[#622954]",
    slate: "border-slate-200 bg-slate-50 text-slate-800",
    green: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };
  return map[tone] || map.slate;
}

function intensityClass(value) {
  const text = String(value).toLowerCase();
  if (text.includes("最高") || text.includes("highest")) return "border-red-200 bg-red-50 text-red-900";
  if (text.includes("高") || text.includes("high")) return "border-orange-200 bg-orange-50 text-orange-900";
  if (text.includes("中") || text.includes("medium")) return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-emerald-200 bg-emerald-50 text-emerald-900";
}

function BrandMark({ label, tone = "blue" }) {
  const color = tone === "plum" ? "bg-[#622954]" : tone === "gold" ? "bg-[#8a6d2f]" : "bg-[#2E5C6E]";
  return (
    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-[11px] font-black tracking-tight text-white shadow-sm", color)}>
      {label}
    </div>
  );
}

function MapButton({ href, children, variant = "outline" }) {
  return (
    <Button asChild variant={variant} size="sm" className="h-8 max-w-full rounded-xl px-3 text-xs">
      <a href={href} target="_blank" rel="noreferrer" className="min-w-0 truncate">
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <span className="truncate">{children}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </span>
      </a>
    </Button>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mb-4 min-w-0 md:mb-5">
      {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8a6d2f]">{eyebrow}</p> : null}
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#1f2933] md:text-3xl">{title}</h2>
      {children ? <p className="mt-2 max-w-5xl text-sm leading-6 text-slate-700 md:text-[15px]">{children}</p> : null}
    </div>
  );
}

function RouteDiagram({ lang }) {
  const t = uiText[lang];
  return (
    <Card className="overflow-hidden border-[#d9ccb4] bg-white/85 shadow-sm">
      <CardHeader className="border-b border-[#eadfcb] bg-[#fffaf0] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#1f2933] md:text-xl">
          <Route className="h-5 w-5 text-[#2E5C6E]" /> {t.routeMap}
        </CardTitle>
        <p className="text-sm leading-6 text-slate-600">{t.routeMapNote}</p>
      </CardHeader>
      <CardContent className="p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-5 md:items-stretch">
          {routeNodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div className="relative min-w-0 rounded-2xl border border-[#d9ccb4] bg-[#fcfaf2] p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2E5C6E] text-white">
                      {iconOf(node.icon, "h-4 w-4")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1f2933]">{tx(node.label, lang)}</p>
                      <p className="text-xs text-[#8a6d2f]">{node.date}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-5 text-slate-600 md:text-[13px]">{tx(node.note, lang)}</p>
              </div>
              {index < routeNodes.length - 1 ? (
                <div className="hidden items-center justify-center md:flex">
                  <ArrowRight className="h-5 w-5 text-[#8a6d2f]" />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StickySummary({ lang }) {
  const t = uiText[lang];
  return (
    <div className="sticky top-0 z-30 border-b border-[#d9ccb4] bg-[#fcfaf2]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fcfaf2]/85">
      <div className="mx-auto max-w-7xl px-3 py-2 md:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {stickyItems.map((item, index) => (
            <div key={index} className={cn("min-w-[280px] rounded-2xl border px-3 py-2 text-xs leading-5 md:min-w-0", toneClass(item.tone))}>
              <div className="mb-1 flex items-center gap-1.5 font-semibold">
                {iconOf(item.icon, "h-3.5 w-3.5 shrink-0")}
                <span>{t.stickyTitle}</span>
              </div>
              <p>{tx(item, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CeremonyCard({ event, lang }) {
  const t = uiText[lang];
  return (
    <Card className="overflow-hidden border-[#d9ccb4] bg-white/90 shadow-sm">
      <CardHeader className="border-b border-[#eadfcb] bg-[#fffaf0] p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 gap-3">
            <BrandMark label={event.logo} tone={event.tone} />
            <div className="min-w-0">
              <Badge className="mb-2 rounded-full bg-[#2E5C6E] text-white hover:bg-[#2E5C6E]">{t.ceremonyDetails}</Badge>
              <CardTitle className="break-words text-xl leading-tight text-[#1f2933] md:text-2xl">{tx(event.title, lang)}</CardTitle>
              <p className="mt-2 text-sm leading-6 text-slate-700">{tx(event.date, lang)} · {tx(event.time, lang)}</p>
              <p className="text-sm leading-6 text-slate-700">{tx(event.venue, lang)} · {event.address}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {event.maps.map((m) => <MapButton key={tx(m.label, lang)} href={m.url}>{tx(m.label, lang)}</MapButton>)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1.2fr_1.1fr]">
          <InfoList title={lang === "zh" ? "畢業生" : "Graduate"} icon="graduation" items={event.graduate} lang={lang} />
          <InfoList title={lang === "zh" ? "來賓" : "Guests"} icon="users" items={event.guests} lang={lang} />
          <InfoList title={lang === "zh" ? "規則與提醒" : "Rules and reminders"} icon="shield" items={event.rules} lang={lang} warning />
        </div>
        <div className="mt-4 grid gap-3 rounded-2xl border border-[#eadfcb] bg-[#fcfaf2] p-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <div className="flex gap-2"><Clock className="mt-1 h-4 w-4 shrink-0 text-[#8a6d2f]" /><span>{tx(event.duration, lang)}</span></div>
          <div className="flex gap-2"><Umbrella className="mt-1 h-4 w-4 shrink-0 text-[#8a6d2f]" /><span>{tx(event.weather, lang)}</span></div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoList({ title, icon, items, lang, warning = false }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#eadfcb] bg-white p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1f2933]">
        {iconOf(icon, "h-4 w-4 text-[#2E5C6E]")}
        {title}
      </h3>
      <ul className="space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={index} className="flex min-w-0 gap-2">
            {warning ? <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-amber-700" /> : <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />}
            <span className="min-w-0 break-words">{tx(item, lang)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DayCard({ day, lang }) {
  const t = uiText[lang];
  const [openMaps, setOpenMaps] = useState(false);
  return (
    <Card className="overflow-hidden border-[#d9ccb4] bg-white/90 shadow-sm">
      <CardHeader className="border-b border-[#eadfcb] bg-white p-4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className="rounded-full bg-[#1f2933] text-white hover:bg-[#1f2933]">{tx(day.date, lang)}</Badge>
              <Badge variant="outline" className="rounded-full border-[#d9ccb4] bg-[#fcfaf2] text-[#8a6d2f]">{tx(day.city, lang)}</Badge>
              <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-semibold", intensityClass(tx(day.intensity, lang)))}>{t.intensity}: {tx(day.intensity, lang)}</span>
              <span className="rounded-full border border-[#c7d7df] bg-[#edf5f7] px-2.5 py-0.5 text-xs font-semibold text-[#214a57]">{tx(day.status, lang)}</span>
            </div>
            <CardTitle className="break-words text-xl leading-tight text-[#1f2933] md:text-2xl">{tx(day.title, lang)}</CardTitle>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-700 md:text-[15px]"><strong>{t.theme}: </strong>{tx(day.theme, lang)}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {day.maps.slice(0, 2).map((m) => <MapButton key={tx(m.label, lang)} href={m.url}>{tx(m.label, lang)}</MapButton>)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#f0e7d7]">
          {day.steps.map((step, index) => (
            <div key={index} className="grid gap-2 px-4 py-3 md:grid-cols-[150px_1fr] md:gap-4 md:px-5">
              <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#8a6d2f]">
                {iconOf(step.icon, "h-4 w-4 shrink-0")}
                <span className="break-words">{step.time}</span>
              </div>
              <p className="min-w-0 break-words text-sm leading-6 text-slate-800 md:text-[15px]">{tx(step, lang)}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-0 border-t border-[#eadfcb] md:grid-cols-[1fr_1fr]">
          <div className="border-b border-[#eadfcb] bg-[#fff7ed] p-4 md:border-b-0 md:border-r">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900"><AlertTriangle className="h-4 w-4" />{t.avoid}</h4>
            <ul className="space-y-1.5 text-sm leading-6 text-amber-950">
              {day.avoid.map((item, index) => (
                <li key={index} className="flex gap-2"><XCircle className="mt-1 h-3.5 w-3.5 shrink-0" /><span className="break-words">{tx(item, lang)}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f8fbfc] p-4">
            <button type="button" onClick={() => setOpenMaps((v) => !v)} className="mb-2 flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-[#214a57]">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{t.mapLinks}</span>
              {openMaps ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            <div className={cn("flex flex-wrap gap-2", !openMaps && "max-h-[78px] overflow-hidden")}> 
              {day.maps.map((m) => <MapButton key={tx(m.label, lang)} href={m.url}>{tx(m.label, lang)}</MapButton>)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TransportCard({ item, lang }) {
  return (
    <Card className="border-[#d9ccb4] bg-white/90 shadow-sm">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf5f7] text-[#2E5C6E]">
            {iconOf(item.icon, "h-5 w-5")}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="break-words text-base font-semibold text-[#1f2933]">{tx(item.title, lang)}</h3>
              <Badge variant="outline" className="rounded-full border-[#d9ccb4] bg-[#fcfaf2] text-[#8a6d2f]">{tx(item.status, lang)}</Badge>
            </div>
            <p className="mt-2 break-words text-sm leading-6 text-slate-700">{tx(item.body, lang)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskCard({ group, lang }) {
  return (
    <Card className="border-[#d9ccb4] bg-white/90 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-[#1f2933]">
          {iconOf(group.icon, "h-5 w-5 text-[#2E5C6E]")}
          {tx(group.title, lang)}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2 text-sm leading-6 text-slate-700">
          {group.items.map((item, index) => (
            <li key={index} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" /><span className="break-words">{tx(item, lang)}</span></li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function MapDirectory({ lang }) {
  const t = uiText[lang];
  return (
    <div className="grid gap-5">
      {mapDirectory.map((group) => (
        <Card key={tx(group.group, lang)} className="border-[#d9ccb4] bg-white/90 shadow-sm">
          <CardHeader className="border-b border-[#eadfcb] bg-[#fffaf0] py-4">
            <CardTitle className="text-lg text-[#1f2933]">{tx(group.group, lang)}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
            {group.links.map((link) => (
              <div key={tx(link.label, lang)} className="min-w-0 rounded-2xl border border-[#eadfcb] bg-white p-3">
                <p className="truncate text-sm font-semibold text-[#1f2933]">{tx(link.label, lang)}</p>
                <p className="mt-1 min-h-[40px] text-xs leading-5 text-slate-600">{tx(link.note, lang)}</p>
                <div className="mt-3"><MapButton href={link.url}>{t.openMap}</MapButton></div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SourceDirectory({ lang }) {
  const t = uiText[lang];
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {sourceCards.map((source) => (
        <Card key={tx(source.label, lang)} className="border-[#d9ccb4] bg-white/90 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Badge variant="outline" className="mb-2 rounded-full border-[#d9ccb4] bg-[#fcfaf2] text-[#8a6d2f]">{tx(source.kind, lang)}</Badge>
                <h3 className="break-words text-base font-semibold text-[#1f2933]">{tx(source.label, lang)}</h3>
              </div>
              <Info className="h-5 w-5 shrink-0 text-[#2E5C6E]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{tx(source.summary, lang)}</p>
            <div className="mt-4"><MapButton href={source.url}>{t.openSource}</MapButton></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FilterBar({ lang, filter, setFilter, search, setSearch }) {
  const t = uiText[lang];
  return (
    <div className="border-b border-[#d9ccb4] bg-[#fcfaf2]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                type="button"
                key={section.key}
                onClick={() => setFilter(section.key)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  filter === section.key
                    ? "border-[#2E5C6E] bg-[#2E5C6E] text-white"
                    : "border-[#d9ccb4] bg-white text-[#1f2933] hover:bg-[#fffaf0]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {t[section.key]}
              </button>
            );
          })}
        </div>
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-10 w-full rounded-2xl border border-[#d9ccb4] bg-white pl-9 pr-3 text-sm outline-none ring-[#2E5C6E]/15 placeholder:text-slate-400 focus:ring-4"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState("zh");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const t = uiText[lang];

  const visibleDays = useMemo(() => {
    const q = search.trim().toLowerCase();
    return dailyPlans.filter((day) => {
      const matchesFilter = filter === "all" || day.filter === filter || (filter === "boston" && day.filter === "ceremonies" ? false : false);
      const text = [
        tx(day.date, lang),
        tx(day.city, lang),
        tx(day.title, lang),
        tx(day.status, lang),
        tx(day.theme, lang),
        ...day.steps.map((s) => `${s.time} ${tx(s, lang)}`),
        ...day.avoid.map((a) => tx(a, lang)),
      ].join(" ").toLowerCase();
      return matchesFilter && (!q || text.includes(q));
    });
  }, [filter, search, lang]);

  const showDays = filter === "all" || ["boston", "ceremonies", "transport", "philly", "dc", "nyc"].includes(filter);

  return (
    <main className={cn("min-h-screen bg-[#FCFAF2] text-slate-900", lang === "zh" ? "font-serif" : "font-serif")}>
      <section className="overflow-hidden border-b border-[#d9ccb4] bg-[radial-gradient(circle_at_10%_10%,#fff5d6,transparent_36%),linear-gradient(180deg,#FCFAF2,#f7efdf)]">
        <div className="mx-auto max-w-7xl px-3 py-7 md:px-6 md:py-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge className="rounded-full bg-[#2E5C6E] text-white hover:bg-[#2E5C6E]">{t.readerMode}</Badge>
                <Badge variant="outline" className="rounded-full border-[#d9ccb4] bg-white/75 text-[#8a6d2f]">Boston · Philadelphia · DC · New York</Badge>
                <Badge variant="outline" className="rounded-full border-[#d9ccb4] bg-white/75 text-[#8a6d2f]">4/26 至 5/11</Badge>
              </div>
              <h1 className="max-w-5xl break-words text-4xl font-semibold leading-tight tracking-tight text-[#1f2933] md:text-5xl lg:text-6xl">{t.docTitle}</h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-700 md:text-lg">{t.subtitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{t.defaultNote}</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: "graduation", zh: "畢業典禮不可壓線", en: "Ceremonies cannot be rushed" },
                  { icon: "car", zh: "取車需要提早", en: "Pickup must be earlier" },
                  { icon: "parking", zh: "PH4 已關閉", en: "PH4 is closed" },
                  { icon: "train", zh: "費城至紐約不是 LIRR", en: "Philadelphia to New York is not LIRR" },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-2 rounded-2xl border border-[#d9ccb4] bg-white/75 px-3 py-2 text-sm text-[#1f2933] shadow-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#edf5f7] text-[#2E5C6E]">
                      {iconOf(item.icon, "h-4 w-4")}
                    </div>
                    <span className="min-w-0 break-words font-semibold">{tx(item, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-[#d9ccb4] bg-white/85 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-[#1f2933]"><ShieldCheck className="h-5 w-5 text-[#2E5C6E]" />{t.completeCheck}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-slate-700">
                <p>{lang === "zh" ? "本版已納入畢業典禮、票券與入場時間、包包限制、住宿基準點、Boston 取車修正、Avis J5D 還車、American Dream、UPenn、DC 開車日與 New York 未定資訊。" : "This version includes ceremony logistics, ticket and arrival timing, bag restrictions, lodging bases, Boston pickup correction, Avis J5D return, American Dream, UPenn, DC driving day, and New York pending details."}</p>
                <p>{lang === "zh" ? "仍缺的不是行程邏輯，而是紐約住宿地址、5/11 航班資訊、Avis 實際早取車報價、4211 Suites 停車費。" : "What remains missing is not itinerary logic. It is the New York hotel address, May 11 flight details, the actual early-pickup Avis quote, and the 4211 Suites parking fee."}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <StickySummary lang={lang} />
      <FilterBar lang={lang} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />

      <div className="mx-auto max-w-7xl px-3 py-6 md:px-6 md:py-8">
        {(filter === "all" || filter === "transport") && <div className="mb-8"><RouteDiagram lang={lang} /></div>}

        {(filter === "all" || filter === "ceremonies") && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "固定不可動日程" : "Fixed schedule"} title={t.ceremonyDetails}>
              {lang === "zh" ? "兩場典禮是全程優先級最高的安排。任何觀光、餐廳與交通都不能壓縮入場時間。" : "The two ceremonies are the highest-priority fixed commitments. Sightseeing, dining, and transportation must not compress arrival time."}
            </SectionTitle>
            <div className="grid gap-5">
              {ceremonies.map((event) => <CeremonyCard key={event.key} event={event} lang={lang} />)}
            </div>
          </section>
        )}

        {showDays && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "逐日執行版" : "Daily execution plan"} title={t.dayPlan}>
              {lang === "zh" ? "每一天只保留一個主要地理群，避免跨區亂跑。長途飛行、畢業典禮、長途駕駛後都刻意降低強度。" : "Each day keeps one primary geographic cluster. Intensity is deliberately reduced after long flights, ceremonies, and long driving days."}
            </SectionTitle>
            <div className="grid gap-5">
              {visibleDays.map((day) => <DayCard key={day.id} day={day} lang={lang} />)}
              {visibleDays.length === 0 ? <Card className="border-[#d9ccb4] bg-white p-5 text-sm text-slate-700">{lang === "zh" ? "沒有符合搜尋條件的行程。" : "No matching itinerary item found."}</Card> : null}
            </div>
          </section>
        )}

        {(filter === "all" || filter === "transport") && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "操作邏輯" : "Operating logic"} title={t.transportLogic}>
              {lang === "zh" ? "這些決策比多排一個景點更重要。大部分風險來自取車時間、還車點、保險、toll、行李與車站交接。" : "These decisions matter more than adding another attraction. Most risk comes from pickup time, return location, insurance, tolls, luggage, and station handoff."}
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {transportCards.map((item) => <TransportCard key={tx(item.title, lang)} item={item} lang={lang} />)}
            </div>
          </section>
        )}

        {(filter === "all" || filter === "risks") && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "除錯與風險" : "Debug and risk control"} title={t.riskBoard}>
              {lang === "zh" ? "此區保留尚未定案與容易出錯的事項。讀者端版本不假裝所有資訊已完成。" : "This section preserves pending and failure-prone items. The reader-facing version does not pretend everything is final."}
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {riskGroups.map((group) => <RiskCard key={tx(group.title, lang)} group={group} lang={lang} />)}
            </div>
          </section>
        )}

        {(filter === "all" || filter === "maps") && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "地點索引" : "Location index"} title={t.mapDirectory}>
              {lang === "zh" ? "所有重要地點集中於此，避免臨時搜尋造成錯誤導航。" : "All important locations are centralized here to reduce last-minute navigation errors."}
            </SectionTitle>
            <MapDirectory lang={lang} />
          </section>
        )}

        {(filter === "all" || filter === "sources") && (
          <section className="mb-9">
            <SectionTitle eyebrow={lang === "zh" ? "資訊依據" : "Information basis"} title={t.sourceDirectory}>
              {lang === "zh" ? "此頁將可查證來源集中列出。仍會隨官方頁面更新而變動，出發前應再查一次。" : "This page centralizes verifiable sources. Details can still change, so check official pages again before departure."}
            </SectionTitle>
            <SourceDirectory lang={lang} />
          </section>
        )}

        <section className="rounded-3xl border border-[#d9ccb4] bg-[#1f2933] p-5 text-white shadow-sm md:p-7">
          <div className="grid gap-5 md:grid-cols-[1fr_1fr] md:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9c28c]">{lang === "zh" ? "最終原則" : "Final principle"}</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
                {lang === "zh" ? "先保護畢業典禮，再保護家人的城市交接。" : "Protect the ceremonies first, then protect the family handoff."}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                {lang === "zh" ? "波士頓是品質最高的主段，因為 Eugene 同行且畢業典禮固定。費城與 DC 要務實，紐約需等待住宿與航班資訊後再精排。" : "Boston is the highest-value segment because Eugene is present and the ceremonies are fixed. Philadelphia and DC should remain practical. New York should be sequenced after hotel and flight details are known."}
              </p>
            </div>
            <div className="grid gap-2 text-sm leading-6 text-slate-100">
              {[
                { zh: "5/2 若保留 American Dream，不用中午取車。", en: "If American Dream stays on May 2, do not use a noon pickup." },
                { zh: "費城還車不用 PH4，改用已驗證的 J5D 或其他可用分點。", en: "Do not use PH4 for Philadelphia return. Use verified J5D or another active location." },
                { zh: "費城至紐約不用 LIRR，使用 Amtrak 或 NJ Transit。", en: "Philadelphia to New York is not LIRR. Use Amtrak or NJ Transit." },
                { zh: "DC 只做核心線，不能把城市當完整深度旅遊日。", en: "DC should be a core route only, not a full deep-travel day." },
              ].map((item) => (
                <div key={tx(item, lang)} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" /><span>{tx(item, lang)}</span></div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setLang((current) => (current === "zh" ? "en" : "zh"))}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-[#d9ccb4] bg-[#1f2933]/95 px-4 py-3 text-sm font-semibold text-white shadow-xl backdrop-blur transition hover:bg-[#2E5C6E] md:bottom-6 md:right-6"
        aria-label="Toggle language"
      >
        <Languages className="h-4 w-4" />
        {lang === "zh" ? t.switchToEnglish : t.switchToChinese}
      </button>
    </main>
  );
}

export default App;
