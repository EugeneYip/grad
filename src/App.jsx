import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Plane,
  Train,
  Car,
  Bus,
  Utensils,
  Coffee,
  GraduationCap,
  Building,
  Building2,
  Hotel,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  CheckCheck,
  DollarSign,
  CreditCard,
  ParkingCircle,
  Users,
  Phone,
  ExternalLink,
  ChevronRight,
  Languages,
  Compass,
  Map,
  Anchor,
  Landmark,
  Flag,
  ShoppingBag,
  Briefcase,
  Sparkles,
  Cloud,
  Sun,
  Zap,
  Smartphone,
  Trees,
  Shield,
  HandCoins,
  Receipt,
  Luggage,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// =============================================================================
// HELPERS
// =============================================================================

const t = (obj, lang) => {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.zh ?? obj.en ?? "";
};

const bi = (zh, en) => ({ zh, en });

const mapLink = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// =============================================================================
// SVG LOGO + ILLUSTRATION COMPONENTS
// =============================================================================

const HuskyMark = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="50" y="38" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="currentColor" letterSpacing="2">NORTHEASTERN</text>
    <path d="M 32 48 L 38 42 L 44 48 L 50 42 L 56 48 L 62 42 L 68 48 L 68 60 Q 50 70 32 60 Z" fill="currentColor" opacity="0.85" />
    <circle cx="42" cy="55" r="2" fill="#fafaf7" />
    <circle cx="58" cy="55" r="2" fill="#fafaf7" />
    <text x="50" y="80" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="currentColor" letterSpacing="3">1898</text>
  </svg>
);

const FenwayBadge = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="10" y="40" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="20" y="20" width="60" height="25" fill="currentColor" opacity="0.9" />
    <text x="50" y="38" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#fafaf7" letterSpacing="1.5">FENWAY</text>
    <line x1="10" y1="55" x2="90" y2="55" stroke="currentColor" strokeWidth="0.5" />
    <line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" strokeWidth="0.5" />
    <line x1="10" y1="75" x2="90" y2="75" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="80" r="3" fill="currentColor" />
  </svg>
);

const LeaderBankBadge = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M 10 70 Q 50 30 90 70" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <path d="M 15 72 Q 50 35 85 72" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="10" y1="70" x2="10" y2="85" stroke="currentColor" strokeWidth="2" />
    <line x1="90" y1="70" x2="90" y2="85" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="35" x2="50" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
    <line x1="5" y1="85" x2="95" y2="85" stroke="currentColor" strokeWidth="2" />
    <path d="M 5 88 Q 50 95 95 88" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

const BostonMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M 20 80 L 20 60 L 30 60 L 30 50 L 40 50 L 40 35 L 50 25 L 60 35 L 60 50 L 70 50 L 70 60 L 80 60 L 80 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M 50 25 L 50 15 L 53 15 L 53 18 L 50 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PhillyMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M 35 25 Q 35 20 40 20 L 60 20 Q 65 20 65 25 L 65 35 L 70 35 L 70 75 L 30 75 L 30 35 L 35 35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="20" x2="50" y2="15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="55" r="4" fill="currentColor" opacity="0.6" />
    <line x1="20" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const NyMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <line x1="20" y1="80" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
    <line x1="35" y1="80" x2="35" y2="30" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="80" x2="50" y2="20" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
    <line x1="65" y1="80" x2="65" y2="35" stroke="currentColor" strokeWidth="2" />
    <line x1="80" y1="80" x2="80" y2="45" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const DcMark = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path d="M 30 75 L 30 60 Q 30 50 35 50 L 40 50 L 40 40 L 45 40 L 45 25 Q 50 20 55 25 L 55 40 L 60 40 L 60 50 L 65 50 Q 70 50 70 60 L 70 75 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="25" x2="50" y2="15" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="13" r="2" fill="currentColor" />
    <line x1="20" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TripRouteMap = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 600 220" className={className} aria-hidden="true">
    <defs>
      <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="3" cy="3" r="0.6" fill="currentColor" opacity="0.18" />
      </pattern>
    </defs>
    <rect width="600" height="220" fill="url(#dots)" />
    <path d="M 500 60 Q 420 90 360 100 Q 280 115 200 135 Q 130 150 80 145" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
    <g>
      <circle cx="500" cy="60" r="10" fill="currentColor" />
      <circle cx="500" cy="60" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="500" y="38" textAnchor="middle" fontSize="13" fill="currentColor" fontWeight="600" fontFamily="Georgia, serif">Boston</text>
      <text x="500" y="84" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">4/26 - 5/2</text>
    </g>
    <g>
      <circle cx="320" cy="105" r="5" fill="currentColor" opacity="0.55" />
      <text x="320" y="92" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">American Dream</text>
      <text x="320" y="124" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">5/2 stop</text>
    </g>
    <g>
      <circle cx="200" cy="138" r="10" fill="currentColor" />
      <circle cx="200" cy="138" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="200" y="116" textAnchor="middle" fontSize="13" fill="currentColor" fontWeight="600" fontFamily="Georgia, serif">Philadelphia</text>
      <text x="200" y="162" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">5/2 - 5/5</text>
    </g>
    <g>
      <circle cx="155" cy="178" r="4" fill="currentColor" opacity="0.55" />
      <text x="155" y="198" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">DC day trip · 5/4</text>
      <line x1="200" y1="142" x2="155" y2="174" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
    </g>
    <g>
      <circle cx="80" cy="145" r="10" fill="currentColor" />
      <circle cx="80" cy="145" r="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text x="80" y="123" textAnchor="middle" fontSize="13" fill="currentColor" fontWeight="600" fontFamily="Georgia, serif">New York</text>
      <text x="80" y="169" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">5/5 - 5/11</text>
    </g>
  </svg>
);

// =============================================================================
// META + SUMMARY
// =============================================================================

const meta = {
  title: bi("東岸畢業典禮行程", "East Coast Graduation Itinerary"),
  subtitle: bi(
    "Northeastern University 2026 屆畢業典禮暨家庭旅行",
    "Northeastern Class of 2026 Commencement & Family Trip"
  ),
  dates: "April 26 to May 11, 2026",
  travelers: bi("家庭兩位旅客", "Two travelers"),
  segments: [
    { city: "Boston", cityZh: "波士頓", icon: BostonMark, dateRange: bi("4/26 至 5/2", "April 26 to May 2"), nights: bi("六晚", "6 nights"), theme: bi("畢業典禮主軸", "Graduation week") },
    { city: "Philadelphia", cityZh: "費城", icon: PhillyMark, dateRange: bi("5/2 至 5/5", "May 2 to May 5"), nights: bi("三晚", "3 nights"), theme: bi("含 DC 一日往返", "With DC day trip") },
    { city: "New York", cityZh: "紐約", icon: NyMark, dateRange: bi("5/5 至 5/11", "May 5 to May 11"), nights: bi("六晚", "6 nights"), theme: bi("自由行段落", "Self-guided segment") },
  ],
};

// =============================================================================
// TRAVEL TIPS (reader-facing, replaces internal alerts)
// =============================================================================

const travelTips = [
  {
    id: "lirr",
    severity: "key",
    icon: Train,
    title: bi("從費城到紐約搭的是 Amtrak", "Philadelphia to New York runs on Amtrak"),
    body: bi(
      "Long Island Rail Road（LIRR）只行駛紐約市與長島之間，並不開到費城。費城至紐約這一段是 Amtrak Northeast Regional，從 30th Street Station 到 New York Penn Station／Moynihan Train Hall，車程約 1 小時 25 分鐘。下車後若還要前往長島，再從 Penn Station 轉 LIRR 即可。",
      "Long Island Rail Road (LIRR) only operates between New York City and Long Island. It does not serve Philadelphia. The Philadelphia to New York leg is Amtrak Northeast Regional, running from 30th Street Station to New York Penn Station / Moynihan Train Hall, about 1 hour 25 minutes. After arriving at Penn Station, transfer to LIRR if Long Island is the next stop."
    ),
  },
  {
    id: "avis-ph4",
    severity: "key",
    icon: AlertTriangle,
    title: bi("Avis 30th Street Station 已關閉", "Avis at 30th Street Station has closed"),
    body: bi(
      "Avis 在 Philadelphia 30th Street Station 的分點（PH4）自 2025 年 2 月 1 日起停業。本次行程改用 Convention Center Parking 分點（J5D），地址 1324 Arch Street，5/5 星期二營業時間 07:00 至 19:00。",
      "The Avis branch at Philadelphia 30th Street Station (PH4) closed on February 1, 2025. This itinerary uses the Convention Center Parking branch (J5D) at 1324 Arch Street instead. Tuesday May 5 hours: 07:00 to 19:00."
    ),
  },
  {
    id: "daily-catch",
    severity: "important",
    icon: HandCoins,
    title: bi("The Daily Catch 只收現金", "The Daily Catch is cash only"),
    body: bi(
      "波士頓 North End 的 The Daily Catch（323 Hanover Street）不接受信用卡、不接受訂位、店面很小。建議 17:30 抵達避開排隊高峰，並事先準備美金現金。",
      "The Daily Catch in Boston's North End (323 Hanover Street) does not take credit cards, does not take reservations, and the dining room is small. Arrive by 5:30 PM to avoid the queue and bring USD in cash."
    ),
  },
  {
    id: "leader-bank-bag",
    severity: "important",
    icon: Briefcase,
    title: bi("Leader Bank Pavilion 包包尺寸限 12 × 12 × 6 英寸", "Leader Bank Pavilion bag limit is 12 × 12 × 6 inches"),
    body: bi(
      "4/30 畢業慶祝會場的包包尺寸是硬規定，超過尺寸無法入場。場館有 Bag Check 寄放服務，每件 5 美元。建議當天直接攜帶小包，不要把採買袋帶進場。",
      "The bag size limit at the April 30 ceremony venue is strict. Oversized bags cannot enter. Bag check is available on site for $5 per item. Bring a small bag from the start, not a shopping tote."
    ),
  },
  {
    id: "venue-confusion",
    severity: "note",
    icon: MapPin,
    title: bi("Leader Bank Pavilion 不是 Leader Bank Seaport 分行", "Leader Bank Pavilion is not the Leader Bank Seaport branch"),
    body: bi(
      "場館真實地址是 290 Northern Avenue。附近有一家同名銀行分行，導航時請務必輸入完整地址，避免誤導。",
      "The venue address is 290 Northern Avenue. A same-name bank branch exists nearby. Use the full address in your GPS to avoid confusion."
    ),
  },
  {
    id: "nj-tax",
    severity: "note",
    icon: Receipt,
    title: bi("紐澤西免稅僅限服飾與鞋類", "New Jersey tax exemption is for clothing and footwear only"),
    body: bi(
      "5/2 American Dream 購物時，毛皮製品、配件（手錶、珠寶、皮帶、領帶）、運動裝備仍須課 6.625% 銷售稅。真正划算的品類是 Uniqlo、Zara、H&M、PRIMARK、lululemon、UGG、Vans 等服飾與鞋類旗艦店。",
      "When shopping at American Dream on May 2, fur, accessories (watches, jewelry, belts, ties), and sports equipment remain subject to 6.625% sales tax. The genuine savings are at clothing and footwear flagships such as Uniqlo, Zara, H&M, PRIMARK, lululemon, UGG, and Vans."
    ),
  },
  {
    id: "american-dream-parking",
    severity: "note",
    icon: ParkingCircle,
    title: bi("American Dream 停車費為 6 美元", "American Dream parking is $6"),
    body: bi(
      "前 15 分鐘免費，超過後每車每次造訪 6 美元。請預留進預算。",
      "The first 15 minutes are free, then $6 per visit per vehicle. Budget accordingly."
    ),
  },
];

// =============================================================================
// PRACTICAL INFO
// =============================================================================

const practicalInfo = [
  {
    id: "weather",
    icon: Cloud,
    title: bi("天氣與穿著", "Weather & Clothing"),
    items: [
      { label: bi("氣溫範圍", "Temperature range"), value: bi("攝氏 8 至 18 度（華氏 50 至 65 度）", "8 to 18 °C (50 to 65 °F)") },
      { label: bi("早晚溫差", "Day to night swing"), value: bi("早晚較涼，可達攝氏 5 度以下", "Mornings and evenings can drop below 5 °C") },
      { label: bi("Seaport 風勢", "Seaport breeze"), value: bi("Leader Bank Pavilion 為水邊戶外帳棚，4/30 晚上請務必攜帶外套", "Leader Bank Pavilion is an open tented venue by the water. Bring a jacket on April 30 evening") },
      { label: bi("建議穿著", "Recommended"), value: bi("洋蔥式穿搭、防風外套、舒適步行鞋、輕便雨具", "Layered outfits, windbreaker, comfortable walking shoes, light rain gear") },
    ],
  },
  {
    id: "timezone",
    icon: Clock,
    title: bi("時區與時差", "Time Zone & Jet Lag"),
    items: [
      { label: bi("美東時區", "Eastern Time"), value: bi("EDT，UTC 減 4 小時", "EDT, UTC minus 4") },
      { label: bi("與香港時差", "Hong Kong difference"), value: bi("香港領先 12 小時", "Hong Kong is 12 hours ahead") },
      { label: bi("時差調整建議", "Jet lag tips"), value: bi("抵達當日避免午睡超過 2 小時，傍晚自然光照射有助於調整生理時鐘，第三晚通常即可恢復", "Avoid naps longer than 2 hours on arrival day. Get evening daylight to reset circadian rhythm. Most travelers feel normal by the third night") },
    ],
  },
  {
    id: "power",
    icon: Zap,
    title: bi("電壓與插頭", "Voltage & Plugs"),
    items: [
      { label: bi("美國規格", "United States"), value: bi("110 至 120V，60Hz，Type A／B 插頭", "110 to 120V, 60Hz, Type A/B plugs") },
      { label: bi("香港規格", "Hong Kong"), value: bi("220V，50Hz，Type G 插頭（三方腳）", "220V, 50Hz, Type G three-pin plugs") },
      { label: bi("解決方案", "Adapter"), value: bi("需準備 Type G 轉 Type A／B 萬國轉接器；多數手機與筆電充電器支援 100 至 240V，無須變壓器；吹風機與電捲棒須確認支援雙電壓", "Bring a Type G to A/B adapter. Most phone and laptop chargers support 100 to 240V and need no voltage converter. Hair dryers and curling irons must be dual voltage") },
    ],
  },
  {
    id: "tipping",
    icon: HandCoins,
    title: bi("給小費標準", "Tipping Standards"),
    items: [
      { label: bi("餐廳", "Sit-down restaurant"), value: bi("餐前小計的 18 至 20%（六人以上多會自動加算）", "18 to 20% of pre-tax subtotal; parties of six or more often auto-added") },
      { label: bi("Uber／Lyft", "Uber / Lyft"), value: bi("車資的 15 至 20%", "15 to 20% of fare") },
      { label: bi("飯店打掃", "Hotel housekeeping"), value: bi("每晚 2 至 5 美元，現金放枕頭旁", "$2 to $5 per night in cash, leave by pillow") },
      { label: bi("行李員", "Bellhop"), value: bi("每件 1 至 2 美元", "$1 to $2 per bag") },
      { label: bi("吧檯外帶咖啡", "Counter coffee pickup"), value: bi("可選擇不給或捨入零頭", "Optional or round up") },
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: bi("行動網路", "Mobile Data"),
    items: [
      { label: bi("eSIM 推薦", "eSIM options"), value: bi("Airalo、Holafly、Nomad 皆有美國方案；十日方案約 15 至 25 美元，網速約 4G 等級", "Airalo, Holafly, and Nomad all offer US plans. Ten-day plans run $15 to $25 with 4G-equivalent speeds") },
      { label: bi("實體 SIM 替代", "Physical SIM"), value: bi("T-Mobile Tourist Plan 50 美元含 30 天無限通話與 30GB 數據", "T-Mobile Tourist Plan: $50 for 30 days with unlimited calls and 30GB data") },
      { label: bi("漫遊提醒", "Roaming caution"), value: bi("若使用香港 SIM 直接漫遊，每日上限費約港幣 168 元，整趟下來會超過 eSIM 成本", "Direct roaming on a Hong Kong SIM caps at around HKD 168 per day, exceeding eSIM cost over the full trip") },
    ],
  },
  {
    id: "cards",
    icon: CreditCard,
    title: bi("付款方式", "Payment"),
    items: [
      { label: bi("普及度", "Acceptance"), value: bi("Visa、Mastercard、American Express 普及；街邊小店偶有最低消費 10 美元限制", "Visa, Mastercard, and American Express widely accepted. Small shops sometimes set $10 minimums") },
      { label: bi("Tap-to-pay", "Tap-to-pay"), value: bi("Apple Pay 與 Google Pay 普及，可作為主要付款方式", "Apple Pay and Google Pay are widely supported and reliable as primary payment") },
      { label: bi("現金需求", "Cash"), value: bi("建議備至少 100 美元現金。The Daily Catch、部分小費、計程車輔助", "Carry at least $100 in cash for The Daily Catch, gratuities, and as taxi backup") },
    ],
  },
  {
    id: "transit",
    icon: Bus,
    title: bi("城市內交通", "City Transit"),
    items: [
      { label: bi("波士頓 MBTA", "Boston MBTA"), value: bi("可使用 Apple Pay／Google Pay 直接感應上車（CharlieCard Tap），單程 2.40 美元；亦可於車站購買實體 CharlieCard", "Tap Apple Pay or Google Pay directly at the gate (CharlieCard Tap). Single ride $2.40. Physical CharlieCards available at stations") },
      { label: bi("紐約 MTA", "New York MTA"), value: bi("OMNY 系統支援 tap-to-pay；單程 2.90 美元；連續使用同一張卡片至 12 次後當週免費", "OMNY accepts tap-to-pay. Single ride $2.90. After 12 rides on the same card in one week, additional rides that week are free") },
      { label: bi("Uber／Lyft", "Uber / Lyft"), value: bi("兩者價格相近，建議兩個 App 都安裝比價；尖峰時段 surge pricing 較常見", "Prices are similar. Install both apps to compare. Surge pricing is common at rush hour") },
    ],
  },
  {
    id: "emergency",
    icon: Phone,
    title: bi("緊急聯絡", "Emergency Contacts"),
    items: [
      { label: bi("緊急電話", "Emergency"), value: "911" },
      { label: bi("Northeastern 校警", "Northeastern Public Safety"), value: "(617) 373-3333" },
      { label: bi("香港駐紐約經貿辦事處", "HKETO New York"), value: "(212) 752-3320" },
      { label: bi("Amtrak 客服", "Amtrak"), value: "1-800-USA-RAIL" },
      { label: bi("Avis 取車點 BO4", "Avis BO4 pickup"), value: "(617) 534-1404" },
    ],
  },
];

// =============================================================================
// DAYS DATA
// =============================================================================

const days = [
  {
    id: "0426",
    date: "4/26",
    weekday: { zh: "週日", en: "Sun" },
    cityKey: "boston",
    city: bi("波士頓", "Boston"),
    title: bi("抵達日", "Arrival"),
    subtitle: bi("只做最低限度的活動，把體力留給後面六天", "Bare minimum only; conserve energy for the week ahead"),
    icon: Plane,
    intensity: "low",
    flightInfo: {
      legs: [
        { code: "BR872", route: "HKG → TPE", time: "4/25 19:40 → 21:30" },
        { code: "BR026", route: "TPE → SEA", time: "4/25 23:40 → 19:30" },
        { code: "AS536", route: "SEA → BOS", time: "4/25 22:45 → 4/26 07:12+1" },
      ],
    },
    timeline: [
      { time: "07:12", activity: bi("抵達 Logan Airport，AS536 班機降落", "Arrive at Logan Airport, AS536") },
      { time: "08:30-09:30", activity: bi("領取行李，Uber 至 The Revolution Hotel", "Collect baggage, Uber to The Revolution Hotel") },
      { time: "09:30-11:00", activity: bi("飯店寄放行李，於附近 Tatte 享用早午餐", "Drop bags at hotel; brunch at nearby Tatte") },
      { time: "11:00-14:00", activity: bi("Public Garden 緩步散步，時間不超過一小時；其餘時間於飯店大廳休息", "Light stroll through the Public Garden, no more than an hour; rest in hotel lobby otherwise") },
      { time: "15:00", activity: bi("辦理入住，立即補眠兩至三小時", "Check in and nap two to three hours") },
      { time: "18:30-19:30", activity: bi("Chipotle Park Plaza 輕鬆晚餐", "Casual dinner at Chipotle Park Plaza") },
      { time: "20:00", activity: bi("回飯店早睡", "Back to hotel for an early night") },
    ],
    avoid: [
      bi("Newbury Street 購物", "Shopping on Newbury Street"),
      bi("Trader Joe's 採買", "Trader Joe's grocery run"),
      bi("Freedom Trail 任何一段", "Any portion of the Freedom Trail"),
      bi("Harvard 與博物館", "Harvard or museums"),
    ],
    notes: [
      bi("連續紅眼飛行超過 24 小時，跨 12 小時時差，當天硬走會拖累整週體力。", "After 24 hours of red-eye flights and a 12-hour time-zone shift, pushing through today undermines the entire week."),
      bi("若飯店可提早辦理入住就立即進房；不能就在大廳休息。", "Take the room as soon as it is ready; otherwise rest in the lobby."),
    ],
    locations: [
      { name: bi("Logan International Airport", "Logan International Airport"), addr: "1 Harborside Dr, Boston, MA 02128" },
      { name: bi("The Revolution Hotel", "The Revolution Hotel"), addr: "40 Berkeley St, Boston, MA 02116" },
      { name: bi("Tatte Bakery & Café（南端店）", "Tatte Bakery & Café (South End)"), addr: "70 Charles St, Boston, MA 02114" },
      { name: bi("Public Garden", "Public Garden"), addr: "4 Charles St, Boston, MA 02116" },
      { name: bi("Chipotle Park Plaza", "Chipotle Park Plaza"), addr: "8 Park Plz, Boston, MA 02116" },
    ],
  },
  {
    id: "0427",
    date: "4/27",
    weekday: { zh: "週一", en: "Mon" },
    cityKey: "boston",
    city: bi("波士頓", "Boston"),
    title: bi("自由之路精簡版加 North End", "Freedom Trail edited & North End"),
    subtitle: bi("歷史核心一條線，海鮮收尾", "Historic core in a single line, finishing with seafood"),
    icon: Flag,
    intensity: "mid",
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Tatte 早餐，接著 Boston Common、State House 外觀、Granary Burying Ground、Beacon Hill", "Tatte breakfast, then Boston Common, State House facade, Granary Burying Ground, Beacon Hill") },
      { time: bi("中午", "Midday"), activity: bi("Faneuil Hall 與 Quincy Market 用餐", "Lunch at Faneuil Hall / Quincy Market") },
      { time: bi("下午", "Afternoon"), activity: bi("Old State House、Paul Revere House 外觀，進入 North End", "Old State House, Paul Revere House facade, enter North End") },
      { time: "17:30", activity: bi("提早抵達 The Daily Catch 避開排隊高峰", "Arrive at The Daily Catch early to skip the queue") },
      { time: bi("晚上", "Evening"), activity: bi("Mike's Pastry 帶甜點離開", "Pick up dessert at Mike's Pastry") },
    ],
    warnings: [
      { title: bi("The Daily Catch 只收現金", "The Daily Catch is cash only"), body: bi("地址 323 Hanover Street，店面狹小，不訂位、不接受信用卡。", "323 Hanover Street, small dining room, no reservations, no credit cards.") },
      { title: bi("USS Constitution 週一閉館", "USS Constitution is closed Mondays"), body: bi("本日不可加入軍艦參觀，留到 5/1。", "Skip the ship today; revisit on May 1.") },
    ],
    notes: [
      bi("Charlestown 與 USS Constitution 都不放這天，行程在 North End 結束即可。", "Do not push on to Charlestown or USS Constitution today. End the route at North End."),
    ],
    locations: [
      { name: bi("Boston Common", "Boston Common"), addr: "139 Tremont St, Boston, MA 02111" },
      { name: bi("Massachusetts State House", "Massachusetts State House"), addr: "24 Beacon St, Boston, MA 02133" },
      { name: bi("Granary Burying Ground", "Granary Burying Ground"), addr: "Tremont St, Boston, MA 02108" },
      { name: bi("Faneuil Hall 與 Quincy Market", "Faneuil Hall / Quincy Market"), addr: "4 S Market St, Boston, MA 02109" },
      { name: bi("Old State House", "Old State House"), addr: "206 Washington St, Boston, MA 02109" },
      { name: bi("Paul Revere House", "Paul Revere House"), addr: "19 N Square, Boston, MA 02113" },
      { name: bi("The Daily Catch（North End 店）", "The Daily Catch (North End)"), addr: "323 Hanover St, Boston, MA 02113" },
      { name: bi("Mike's Pastry", "Mike's Pastry"), addr: "300 Hanover St, Boston, MA 02113" },
    ],
  },
  {
    id: "0428",
    date: "4/28",
    weekday: { zh: "週二", en: "Tue" },
    cityKey: "boston",
    city: bi("劍橋", "Cambridge"),
    title: bi("Harvard 校園與一座博物館", "Harvard campus & one museum"),
    subtitle: bi("劍橋整區獨立成日，不與市中心混搭", "All Cambridge in a single day; no mixing with downtown"),
    icon: GraduationCap,
    intensity: "mid",
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("搭 Uber 或 MBTA Red Line 至 Harvard Square", "Uber or MBTA Red Line to Harvard Square") },
      { time: bi("上午至中午", "Morning to noon"), activity: bi("Harvard Yard、John Harvard 雕像、Widener Library 外觀", "Harvard Yard, John Harvard statue, Widener Library facade") },
      { time: bi("中午", "Midday"), activity: bi("Harvard Square 用餐（Tasty Burger 或 Russell House Tavern）", "Lunch at Harvard Square (Tasty Burger or Russell House Tavern)") },
      { time: bi("下午", "Afternoon"), activity: bi("Harvard Art Museums 或 Harvard Museum of Natural History 二選一", "Choose either Harvard Art Museums or Harvard Museum of Natural History") },
      { time: bi("傍晚", "Evening"), activity: bi("Charles River Cambridge 側 Weeks Footbridge 短走", "Short walk along the Cambridge side of the Charles River by Weeks Footbridge") },
      { time: bi("晚上", "Night"), activity: bi("回波士頓飯店附近輕鬆晚餐", "Return to the hotel area for a casual dinner") },
    ],
    decision: {
      title: bi("博物館選擇", "Choose your museum"),
      items: [
        { text: bi("偏好藝術，請選 Harvard Art Museums，週二至週日 10:00 至 17:00 開放", "For art, pick Harvard Art Museums, open Tuesday through Sunday, 10 AM to 5 PM") },
        { text: bi("偏好自然史標本與 Glass Flowers，請選 Harvard Museum of Natural History，每日 09:00 至 17:00 開放", "For natural history specimens and Glass Flowers, pick Harvard Museum of Natural History, daily 9 AM to 5 PM") },
      ],
      caution: bi("兩館不要同日參觀，會超過步數上限。", "Do not attempt both museums in one day; the step count will exceed the limit."),
    },
    locations: [
      { name: bi("Harvard Square", "Harvard Square"), addr: "1400 Massachusetts Ave, Cambridge, MA 02138" },
      { name: bi("Harvard Yard", "Harvard Yard"), addr: "Harvard Yard, Cambridge, MA 02138" },
      { name: bi("Widener Library", "Widener Library"), addr: "Harvard Yard, Cambridge, MA 02138" },
      { name: bi("Harvard Art Museums", "Harvard Art Museums"), addr: "32 Quincy St, Cambridge, MA 02138" },
      { name: bi("Harvard Museum of Natural History", "Harvard Museum of Natural History"), addr: "26 Oxford St, Cambridge, MA 02138" },
      { name: bi("Weeks Footbridge", "Weeks Footbridge"), addr: "Cambridge, MA 02138" },
    ],
  },
  {
    id: "0429",
    date: "4/29",
    weekday: { zh: "週三", en: "Wed" },
    cityKey: "boston",
    city: bi("波士頓", "Boston"),
    title: bi("Graduate Commencement，Fenway Park", "Graduate Commencement at Fenway Park"),
    subtitle: bi("畢業典禮，全天無觀光", "Ceremony day; no sightseeing"),
    icon: GraduationCap,
    intensity: "high",
    isCeremony: true,
    ceremonyType: "fenway",
    ceremony: {
      venue: "Fenway Park",
      address: "4 Jersey St, Boston, MA 02215",
      time: bi("上午 10:00", "10:00 AM"),
      gradReportTime: bi("上午 8:00，Gate B（Van Ness Street）", "8:00 AM, Gate B (Van Ness Street)"),
      guestDoors: bi("上午 8:00，Gates A、D、E", "8:00 AM, Gates A, D, E"),
      processionStart: bi("約上午 8:45", "Approx. 8:45 AM"),
      ceremonyStart: bi("上午 10:00", "10:00 AM"),
      note: bi("僅限持有效票券者入場", "Valid ticket required for entry"),
    },
    timeline: [
      { time: "06:30", activity: bi("起床、早餐，最後一次確認票券、cap、gown、hood、alumni pin", "Wake up, breakfast, final check on tickets, cap, gown, hood, alumni pin") },
      { time: "07:10", activity: bi("Uber 從 The Revolution Hotel 出發，預估 15 分鐘", "Uber from The Revolution Hotel; about 15 minutes") },
      { time: "07:30", activity: bi("畢業生於 Gate B（Van Ness Street）報到", "Graduate reports at Gate B on Van Ness Street") },
      { time: "07:30", activity: bi("家屬於 Gates A、D、E 排隊", "Family lines up at Gates A, D, or E") },
      { time: "08:00", activity: bi("雙方依序入場", "Both parties enter") },
      { time: "08:45", activity: bi("Procession 開始", "Procession begins") },
      { time: "10:00", activity: bi("典禮正式開始", "Ceremony begins") },
      { time: "12:00-13:00", activity: bi("典禮結束，於 Fenway 附近用餐（Tasty Burger Fenway 或 Citizen Public House）", "Ceremony ends; lunch near Fenway (Tasty Burger Fenway or Citizen Public House)") },
      { time: bi("下午", "Afternoon"), activity: bi("回飯店休息", "Rest at the hotel") },
      { time: bi("晚上", "Evening"), activity: bi("Back Bay 或南端正式一點晚餐慶祝", "Celebratory dinner in Back Bay or South End") },
    ],
    dressCode: ["cap", "gown", "hood", "alumni pin"],
    rules: [
      bi("家屬票券由畢業生透過 Tassel 系統轉發", "Family tickets are forwarded by the graduate through Tassel"),
      bi("票券可列印或於手機顯示", "Tickets may be printed or shown on a phone"),
      bi("持票入場，no re-entry", "Ticketed entry only, no re-entry"),
      bi("所有人皆須接受安檢", "All attendees subject to security screening"),
    ],
    locations: [
      { name: bi("Fenway Park", "Fenway Park"), addr: "4 Jersey St, Boston, MA 02215" },
      { name: bi("Gate B（畢業生入口）", "Gate B (Graduate Entry)"), addr: "Van Ness Street, Boston, MA 02215" },
      { name: bi("Tasty Burger Fenway", "Tasty Burger Fenway"), addr: "1301 Boylston St, Boston, MA 02215" },
    ],
  },
  {
    id: "0430",
    date: "4/30",
    weekday: { zh: "週四", en: "Thu" },
    cityKey: "boston",
    city: bi("波士頓", "Boston"),
    title: bi("Northeastern 校園、D'Amore-McKim 慶祝會", "Northeastern campus & D'Amore-McKim Celebration"),
    subtitle: bi("白天緩，傍晚 Leader Bank Pavilion", "Slow morning, ceremony at Leader Bank Pavilion in the evening"),
    icon: Sparkles,
    intensity: "high",
    isCeremony: true,
    ceremonyType: "leaderbank",
    ceremony: {
      venue: "Leader Bank Pavilion",
      address: "290 Northern Ave, Boston, MA 02210",
      venueType: bi("戶外帳棚場地，請依天氣穿著", "Outdoor tented venue; dress for the weather"),
      time: bi("下午 6:00", "6:00 PM"),
      ceremonyLength: bi("約 2 小時", "About 2 hours"),
      gradArrival: bi("下午 4:30，提前 90 分鐘", "4:30 PM, 90 minutes early"),
      gradEntrance: bi("Harborwalk 畢業生入口（位於主入口最左側）", "Harborwalk graduate entrance (far left of Main Entrance)"),
      guestArrival: bi("下午 5:00，提前 60 分鐘", "5:00 PM, 60 minutes early"),
      guestEntrance: bi("主入口", "Main Entrance"),
      bagLimit: "12\" × 12\" × 6\"",
      important: bi("Leader Bank Pavilion 並非附近的 Leader Bank Seaport 分行，GPS 請務必輸入 290 Northern Ave。", "Leader Bank Pavilion is not the nearby Leader Bank Seaport branch. Use 290 Northern Ave in your GPS."),
    },
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Northeastern 校園拍照（ISEC、Snell Library、Centennial Common）", "Photos on Northeastern campus (ISEC, Snell Library, Centennial Common)") },
      { time: bi("中午", "Midday"), activity: bi("校園附近或 Symphony 一帶用餐", "Lunch on campus or in the Symphony area") },
      { time: "14:00-15:30", activity: bi("回飯店休息、整理服裝", "Return to hotel; rest and dress") },
      { time: "16:00", activity: bi("搭 Uber 出發 Seaport（避開 Silver Line 高峰擁擠）", "Uber to Seaport (avoid Silver Line congestion)") },
      { time: "16:30", activity: bi("畢業生於 Harborwalk 入口報到", "Graduate reports at Harborwalk entrance") },
      { time: "17:00", activity: bi("家屬於主入口入場", "Family enters via Main Entrance") },
      { time: "18:00", activity: bi("典禮開始（戶外帳棚場地）", "Ceremony begins under the open tent") },
      { time: bi("20:00 後", "After 8 PM"), activity: bi("依體力於 Seaport 簡單晚餐或直接回飯店", "Light dinner in Seaport or return to hotel based on energy") },
    ],
    transportation: [
      bi("Boston Seaport 區域交通繁忙，務必預留充足時間", "Seaport traffic can be heavy; allow extra travel time"),
      bi("MBTA Silver Line：World Trade Center 站，下車後步行約 0.3 英里", "MBTA Silver Line: World Trade Center station, then a 0.3-mile walk"),
      bi("現場無停車位", "No on-site parking"),
      bi("附近停車：Ora Garage、302 Northern Ave Lot、Seaport Hotel Garage、South Boston Waterfront Transportation Center", "Nearby garages: Ora Garage, 302 Northern Ave Lot, Seaport Hotel Garage, South Boston Waterfront Transportation Center"),
      bi("可考慮以 SpotHero、ParkWhiz、ParkMobile 預約車位", "Consider reserving via SpotHero, ParkWhiz, or ParkMobile"),
    ],
    bagPolicy: {
      limit: "12\" × 12\" × 6\"",
      notes: [
        bi("超過尺寸限制之包包不得入場", "Oversized bags cannot enter"),
        bi("現場 Bag Check 寄放每件 5 美元", "Bag Check available on site at $5 per item"),
        bi("畢業生強烈建議不要攜帶個人物品", "Graduates are strongly encouraged not to carry personal items"),
        bi("可攜帶一瓶未開封 16 盎司飲用水", "One sealed 16 oz water bottle is permitted"),
        bi("其餘外食與飲料不得入內", "All other outside food and beverages are prohibited"),
      ],
    },
    prohibitedItems: [
      bi("大型包包、背包、超尺寸或不透明包包", "Large, oversized, or non-clear bags and backpacks"),
      bi("外食與飲料（除一瓶未開封 16 盎司水）", "Outside food and drinks (except one sealed 16 oz water)"),
      bi("無法收合的雨傘、包裝禮品", "Non-collapsible umbrellas, wrapped gifts"),
      bi("酒精、毒品、違禁品", "Alcohol, drugs, illegal substances"),
      bi("武器、刀具、工具", "Weapons, knives, tools"),
      bi("氣球、布條、標語、非校方核發旗幟", "Balloons, banners, signs, non-Northeastern flags"),
      bi("噪音器具、無人機、雷射筆、自拍棒、專業影音設備", "Noisemakers, drones, laser pointers, selfie sticks, professional A/V equipment"),
      bi("硬式冰桶、玻璃或金屬容器、水袋背包", "Hard-sided coolers, glass or metal containers, hydration packs"),
      bi("煙火或易燃裝置", "Fireworks or incendiary devices"),
      bi("面具、戲服或任何被視為危險、干擾、仇恨或冒犯的物品", "Costumes, masks, or items deemed unsafe, disruptive, hateful, or offensive"),
    ],
    warnings: [
      { title: bi("攜帶外套", "Bring a jacket"), body: bi("Leader Bank Pavilion 為戶外帳棚，4 月底 Seaport 晚上會有海風。", "Leader Bank Pavilion is an open tent venue. Seaport gets breezy on April evenings.") },
      { title: bi("不可再入場（no re-entry）", "No re-entry"), body: bi("家屬進場後不可再外出，請事先處理洗手間與飲水。", "Once inside, family cannot exit and re-enter. Use the restroom and drink water beforehand.") },
    ],
    locations: [
      { name: bi("Leader Bank Pavilion", "Leader Bank Pavilion"), addr: "290 Northern Ave, Boston, MA 02210" },
      { name: bi("Northeastern 主校園", "Northeastern Main Campus"), addr: "360 Huntington Ave, Boston, MA 02115" },
      { name: bi("ISEC 跨領域科學工程中心", "ISEC (Interdisciplinary Science & Engineering Complex)"), addr: "805 Columbus Ave, Boston, MA 02120" },
      { name: bi("Snell Library", "Snell Library"), addr: "360 Huntington Ave, Boston, MA 02115" },
    ],
  },
  {
    id: "0501",
    date: "5/1",
    weekday: { zh: "週五", en: "Fri" },
    cityKey: "boston",
    city: bi("波士頓", "Boston"),
    title: bi("水濱、James Hook、USS Constitution", "Waterfront, James Hook, USS Constitution"),
    subtitle: bi("典禮過後，把海邊路線一次走完", "Post-ceremony day; finish the waterfront in one route"),
    icon: Anchor,
    intensity: "mid",
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Tatte 早餐，再從 Beacon Hill 側下到 Charles River Esplanade 短走", "Tatte breakfast, then descend from Beacon Hill to a short walk on the Charles River Esplanade") },
      { time: bi("中午", "Midday"), activity: bi("James Hook & Co 用餐（440 Atlantic Ave，週五營業至 17:00）", "Lunch at James Hook & Co (440 Atlantic Ave, Friday hours until 5 PM)") },
      { time: bi("下午", "Afternoon"), activity: bi("從 Long Wharf 搭 MBTA Ferry 至 Charlestown Navy Yard", "Take the MBTA Ferry from Long Wharf to Charlestown Navy Yard") },
      { time: bi("下午", "Afternoon"), activity: bi("USS Constitution Museum 與軍艦本身（週三至週日 10:00 至 16:00）", "USS Constitution Museum and ship visit (Wed–Sun, 10 AM to 4 PM)") },
      { time: bi("傍晚", "Evening"), activity: bi("搭 Ferry 回 Long Wharf，步行至 North End", "Ferry back to Long Wharf; walk to North End") },
      { time: bi("晚上", "Night"), activity: bi("若 4/27 未去 Mike's Pastry，今晚補；否則改至 Trader Joe's 採買回程禮物", "If Mike's Pastry was missed on April 27, go tonight; otherwise stop by Trader Joe's for return gifts") },
    ],
    notes: [
      bi("這天是波士頓段最完整的精華日，典禮已過可以慢慢享受。", "This is the most relaxed day in Boston; the ceremonies are done and the pace can ease."),
      bi("USS Constitution 必須在週三至週日才能參觀，5/1 是這趟行程最後一次機會。", "USS Constitution opens only Wednesday through Sunday. May 1 is the last opportunity on this trip."),
      bi("Mike's Pastry 與 Trader Joe's 二選一，不要硬塞兩個。", "Pick one: Mike's Pastry or Trader Joe's. Do not try to fit both."),
    ],
    locations: [
      { name: bi("Charles River Esplanade", "Charles River Esplanade"), addr: "Storrow Dr, Boston, MA 02114" },
      { name: bi("James Hook & Co", "James Hook & Co"), addr: "440 Atlantic Ave, Boston, MA 02210" },
      { name: bi("Long Wharf MBTA Ferry", "Long Wharf MBTA Ferry"), addr: "1 Long Wharf, Boston, MA 02110" },
      { name: bi("USS Constitution Museum", "USS Constitution Museum"), addr: "Bldg 22, Charlestown Navy Yard, Boston, MA 02129" },
      { name: bi("Trader Joe's Back Bay", "Trader Joe's Back Bay"), addr: "899 Boylston St, Boston, MA 02115" },
    ],
  },
  {
    id: "0502",
    date: "5/2",
    weekday: { zh: "週六", en: "Sat" },
    cityKey: "transit",
    city: bi("波士頓 → 費城", "Boston → Philadelphia"),
    title: bi("American Dream 與跨州移動", "American Dream stop & interstate drive"),
    subtitle: bi("整日由您主開，紐澤西免稅服飾採買", "Solo driver day; tax-free clothing stop in New Jersey"),
    icon: Car,
    intensity: "high",
    timeline: [
      { time: "06:30", activity: bi("退房，行李集中於飯店大廳", "Check out; gather luggage in the lobby") },
      { time: "06:45", activity: bi("Uber 從 The Revolution Hotel 至 100 Clarendon St，約 3 分鐘", "Uber from The Revolution Hotel to 100 Clarendon St, about 3 minutes") },
      { time: "07:00", activity: bi("Avis Boston Back Bay Station Garage（BO4）取車", "Pick up at Avis Boston Back Bay Station Garage (BO4)") },
      { time: "07:30", activity: bi("出發，從 Back Bay 直接上 I-90 W（Mass Pike）西行", "Depart, enter I-90 West (Mass Pike) directly from Back Bay") },
      { time: "11:30", activity: bi("抵達 American Dream，車程約 4 小時", "Arrive at American Dream after about 4 hours of driving") },
      { time: "12:00-13:00", activity: bi("商場內用餐（Yard House 或 Shake Shack）", "Lunch in the mall (Yard House or Shake Shack)") },
      { time: "13:00-15:15", activity: bi("購物時段，免稅服飾類最划算", "Shopping; clothing flagships are the best value") },
      { time: "15:30", activity: bi("離開 American Dream，走 NJ Turnpike S 往費城", "Depart American Dream; NJ Turnpike South toward Philadelphia") },
      { time: "17:30-18:00", activity: bi("抵達 4211 Suites（4211 Chestnut St），辦理入住與停車", "Arrive at 4211 Suites (4211 Chestnut St); check in and park") },
      { time: "19:00", activity: bi("University City 附近輕鬆晚餐", "Casual dinner in University City") },
    ],
    route: {
      title: bi("駕駛路線", "Driving route"),
      steps: [
        "I-90 W (Mass Pike) → I-84 W",
        "→ I-684 S → I-287 S",
        bi("→ Tappan Zee／Mario Cuomo Bridge", "→ Tappan Zee / Mario Cuomo Bridge"),
        "→ I-287 S → NJ Turnpike S",
        bi("→ Exit 16W（American Dream）", "→ Exit 16W (American Dream)"),
        bi("→ NJ Turnpike S → Exit 4（Philadelphia）", "→ NJ Turnpike S → Exit 4 (Philadelphia)"),
      ],
    },
    rules: [
      bi("American Dream 停留上限 3.5 小時（含吃飯）", "Cap American Dream stay at 3.5 hours including lunch"),
      bi("不玩水上樂園、室內滑雪、主題樂園", "Skip the water park, indoor ski slope, and theme park"),
      bi("停車費 6 美元（前 15 分鐘免費）", "Parking $6 (first 15 minutes free)"),
      bi("免稅僅限服飾與鞋類；毛皮、配件、運動裝備仍課 6.625% 稅", "Tax exemption applies to clothing and footwear only; fur, accessories, and sports equipment remain taxed at 6.625%"),
      bi("取消 Texas Roadhouse（與 American Dream 衝突）", "Drop Texas Roadhouse plan; it conflicts with American Dream"),
    ],
    warnings: [
      { title: bi("行李安全", "Luggage security"), body: bi("American Dream 停車後請勿在停車場開後車廂整理；護照、錢包、電腦隨身帶；停車後拍照記錄樓層與入口。", "Do not open the trunk in the lot at American Dream. Keep passports, wallets, and laptops on you. Photograph the level and entrance after parking.") },
    ],
    locations: [
      { name: bi("Avis Boston Back Bay Station Garage（BO4）", "Avis Boston Back Bay Station Garage (BO4)"), addr: "100 Clarendon St, Boston, MA 02116" },
      { name: bi("American Dream", "American Dream"), addr: "1 American Dream Way, East Rutherford, NJ 07073" },
      { name: bi("4211 Suites", "4211 Suites"), addr: "4211 Chestnut St, Philadelphia, PA 19104" },
    ],
  },
  {
    id: "0503",
    date: "5/3",
    weekday: { zh: "週日", en: "Sun" },
    cityKey: "philly",
    city: bi("費城", "Philadelphia"),
    title: bi("UPenn 校園與費城精華", "UPenn & Philadelphia highlights"),
    subtitle: bi("晚啟動，自 University City 由西往東", "Late start, west-to-east route from University City"),
    icon: GraduationCap,
    intensity: "mid",
    timeline: [
      { time: "09:00-10:00", activity: bi("飯店悠閒早餐，恢復體力", "Slow breakfast at the hotel to recover") },
      { time: "10:30", activity: bi("出發 UPenn 校園，從 4211 Chestnut 步行可達", "Walk to UPenn from 4211 Chestnut") },
      { time: bi("上午", "Morning"), activity: bi("Locust Walk、College Hall 外觀、Fisher Fine Arts Library 外觀", "Locust Walk, College Hall facade, Fisher Fine Arts Library facade") },
      { time: "12:30", activity: bi("University City 用餐", "Lunch in University City") },
      { time: "14:00-17:00", activity: bi("Philadelphia Museum of Art 外觀、Rocky Steps、Schuylkill River", "Philadelphia Museum of Art facade, Rocky Steps, Schuylkill River") },
      { time: bi("傍晚", "Evening"), activity: bi("Rittenhouse Square 散步，於 Reading Terminal Market 採買晚餐", "Stroll Rittenhouse Square; pick up dinner at Reading Terminal Market") },
      { time: "20:00", activity: bi("回 4211 Suites，準備隔天 DC", "Return to 4211 Suites and prep for DC") },
    ],
    notes: [
      bi("5/2 American Dream 拉長至晚上才入住，5/3 必須晚啟動。", "Because the American Dream stop pushes May 2 check-in late, May 3 must start later."),
      bi("若特別想看自由鐘，可從 Reading Terminal Market 步行 10 分鐘到 Liberty Bell 外觀（不入內）。", "For Liberty Bell fans, the bell is a 10-minute walk from Reading Terminal Market; view the exterior only."),
      bi("Independence Hall、Liberty Bell、Old City 不建議同日加排，體力會被透支。", "Adding Independence Hall, Liberty Bell, and Old City the same day will exhaust the group."),
    ],
    locations: [
      { name: bi("UPenn Locust Walk", "UPenn Locust Walk"), addr: "Locust Walk, Philadelphia, PA 19104" },
      { name: bi("College Hall", "College Hall"), addr: "3451 Walnut St, Philadelphia, PA 19104" },
      { name: bi("Fisher Fine Arts Library", "Fisher Fine Arts Library"), addr: "220 S 34th St, Philadelphia, PA 19104" },
      { name: bi("Philadelphia Museum of Art", "Philadelphia Museum of Art"), addr: "2600 Benjamin Franklin Pkwy, Philadelphia, PA 19130" },
      { name: bi("Rittenhouse Square", "Rittenhouse Square"), addr: "1800 Walnut St, Philadelphia, PA 19103" },
      { name: bi("Reading Terminal Market", "Reading Terminal Market"), addr: "1136 Arch St, Philadelphia, PA 19107" },
      { name: bi("Liberty Bell Center", "Liberty Bell Center"), addr: "526 Market St, Philadelphia, PA 19106" },
    ],
  },
  {
    id: "0504",
    date: "5/4",
    weekday: { zh: "週一", en: "Mon" },
    cityKey: "dc",
    city: bi("DC 一日往返", "DC Day Trip"),
    title: bi("華盛頓特區一日遊", "Washington, DC day trip"),
    subtitle: bi("全程最高體力日，您必須主開", "Highest-intensity day; you must drive"),
    icon: Landmark,
    intensity: "peak",
    timeline: [
      { time: "06:30", activity: bi("起床、早餐", "Wake up, breakfast") },
      { time: "07:00", activity: bi("從費城出發", "Depart Philadelphia") },
      { time: "10:00-10:30", activity: bi("抵達 DC，停 L'Enfant Plaza 或 Reagan Building 停車庫，每日約 25 至 30 美元", "Arrive in DC; park at L'Enfant Plaza or Reagan Building garage, $25–30 per day") },
      { time: "10:30-12:00", activity: bi("U.S. Capitol 外觀、National Mall 東段步行", "U.S. Capitol facade, walk eastern National Mall") },
      { time: "12:00-13:00", activity: bi("Smithsonian 區域用餐（Mitsitam Native Foods Cafe 或 Pavilion Cafe）", "Lunch in Smithsonian area (Mitsitam Native Foods Cafe or Pavilion Cafe)") },
      { time: "13:00-15:30", activity: bi("Washington Monument 外觀、WWII Memorial、Lincoln Memorial（沿 Reflecting Pool 步行）", "Washington Monument facade, WWII Memorial, Lincoln Memorial along the Reflecting Pool") },
      { time: "15:30-16:30", activity: bi("依體力進 Air & Space Museum 或 American History Museum，待 1 小時，或於咖啡店休息", "Energy permitting, visit Air & Space Museum or American History Museum for an hour, or rest at a cafe") },
      { time: "17:00", activity: bi("回停車庫取車", "Return to parking garage") },
      { time: "20:00-21:00", activity: bi("回到費城，4211 Suites 附近輕鬆晚餐", "Back in Philadelphia; casual dinner near 4211 Suites") },
    ],
    rules: [
      bi("只停一次車", "Park only once"),
      bi("不去 Georgetown", "Skip Georgetown"),
      bi("不去 Arlington Cemetery", "Skip Arlington Cemetery"),
      bi("不排白宮（要繞路且只能遠看）", "Skip the White House (detour required, distant view only)"),
      bi("Smithsonian 只挑一館，待 1 小時", "Choose one Smithsonian museum, one hour maximum"),
      bi("步數壓在 8,500 至 9,500，不能用滿 12,000 上限", "Hold step count to 8,500 to 9,500; do not push to the 12,000 ceiling"),
    ],
    costAnalysis: {
      title: bi("自駕對比 Amtrak 真實成本", "Driving vs Amtrak: actual cost"),
      items: [
        { label: bi("自駕：停車費、油錢、過路費合計", "Driving: parking, fuel, tolls"), value: bi("約 90 美元", "About $90") },
        { label: bi("Amtrak：兩人來回 Northeast Regional", "Amtrak: two round-trip Northeast Regional tickets"), value: bi("約 200 美元", "About $200") },
        { label: bi("加上駕駛疲勞與時間", "Add driver fatigue and time"), value: bi("差距並不大", "Difference is modest") },
      ],
    },
    warnings: [
      { title: bi("National Mall 路邊停車多有 3 小時時限", "Mall street parking is capped at 3 hours"), body: bi("不能依賴路邊停整天，請直接停固定停車庫。", "Street parking will not last all day; use a paid garage from the start.") },
      { title: bi("I-95 過路費密集", "I-95 has heavy tolls"), body: bi("Delaware Memorial Bridge、Maryland JFK Highway、其他 I-95 段，建議啟用 Avis E-Toll Unlimited。", "Delaware Memorial Bridge, Maryland JFK Highway, and other I-95 segments. Activate Avis E-Toll Unlimited.") },
    ],
    locations: [
      { name: bi("U.S. Capitol", "U.S. Capitol"), addr: "First St SE, Washington, DC 20004" },
      { name: bi("L'Enfant Plaza Parking", "L'Enfant Plaza Parking"), addr: "470 L'Enfant Plaza SW, Washington, DC 20024" },
      { name: bi("Washington Monument", "Washington Monument"), addr: "2 15th St NW, Washington, DC 20024" },
      { name: bi("WWII Memorial", "WWII Memorial"), addr: "1750 Independence Ave SW, Washington, DC 20024" },
      { name: bi("Lincoln Memorial", "Lincoln Memorial"), addr: "2 Lincoln Memorial Cir NW, Washington, DC 20002" },
      { name: bi("National Air and Space Museum", "National Air and Space Museum"), addr: "600 Independence Ave SW, Washington, DC 20560" },
      { name: bi("National Museum of American History", "National Museum of American History"), addr: "1300 Constitution Ave NW, Washington, DC 20560" },
    ],
  },
  {
    id: "0505",
    date: "5/5",
    weekday: { zh: "週二", en: "Tue" },
    cityKey: "transit",
    city: bi("費城 → 紐約", "Philadelphia → New York"),
    title: bi("還車、鐵路進城、您回波士頓", "Drop-off, train to NYC, your return to Boston"),
    subtitle: bi("交接日，最重要的一天", "Handover day; the most important transition"),
    icon: Train,
    intensity: "mid",
    timeline: [
      { time: "09:00", activity: bi("4211 Suites 退房，全家上車", "Check out of 4211 Suites; everyone in the car") },
      { time: "09:15", activity: bi("抵達 30th Street Station，卸下家屬與行李", "Arrive at 30th Street Station; drop off family and luggage") },
      { time: "09:15-09:30", activity: bi("家屬於大廳候車區（有座位、冷氣、洗手間）", "Family waits in the main hall (seating, air conditioning, restrooms)") },
      { time: "09:30-09:45", activity: bi("您單獨開車至 J5D（1324 Arch St），1.2 英里、7 分鐘", "Drive solo to J5D (1324 Arch St), 1.2 miles, 7 minutes") },
      { time: "09:45-10:15", activity: bi("J5D 還車手續：油表、里程、損傷確認", "J5D drop-off: fuel level, mileage, damage check") },
      { time: "10:15-10:30", activity: bi("Uber 從 J5D 回 30th Street Station，約 12 至 18 美元", "Uber from J5D back to 30th Street Station, $12 to $18") },
      { time: "11:00-12:00", activity: bi("全員搭 Amtrak Northeast Regional 至 New York Penn Station", "Whole party boards Amtrak Northeast Regional to New York Penn Station") },
      { time: bi("下午", "Afternoon"), activity: bi("陪家屬到紐約飯店辦理入住", "Accompany family to the New York hotel for check-in") },
      { time: bi("傍晚", "Evening"), activity: bi("您搭 Amtrak 回波士頓", "You take Amtrak back to Boston") },
      { time: bi("晚上", "Night"), activity: bi("家屬於飯店附近輕鬆晚餐，不排遠景點", "Family has dinner near the hotel; no further sightseeing") },
    ],
    criticalActions: [
      bi("確認家屬手機網路可用（漫遊或 eSIM）", "Confirm family phones have working data (roaming or eSIM)"),
      bi("拍候車區照片給家屬，告知具體位置", "Photograph the waiting area and show family the exact spot"),
      bi("約定固定碰面點，建議 Amtrak 出發看板下方", "Agree on a fixed meeting point, ideally beneath the Amtrak departure board"),
      bi("車站手推車可租用，避免家屬搬重物", "Station luggage carts are available; do not let family carry heavy bags"),
      bi("備份紐約飯店地址、Penn Station 至飯店 Uber 路線、5/11 機場備忘", "Have a backup of the NYC hotel address, Uber route from Penn Station, and a May 11 airport reminder"),
      bi("緊急聯絡卡：您的手機、波士頓飯店、Northeastern 緊急聯絡", "Emergency card: your mobile, Boston hotel, and Northeastern emergency line"),
    ],
    warnings: [
      { title: bi("LIRR 名稱誤解", "LIRR confusion"), body: bi("Long Island Rail Road 不開到費城。費城至紐約是 Amtrak Northeast Regional，到 Penn Station 或 Moynihan Train Hall。", "LIRR does not run to Philadelphia. The Philadelphia to New York leg is Amtrak Northeast Regional, terminating at Penn Station / Moynihan Train Hall.") },
      { title: bi("J5D 不提供 after-hours returns", "J5D has no after-hours return"), body: bi("5/5 星期二營業時間 07:00 至 19:00，請務必在這區間內還車。", "Tuesday May 5 hours are 7 AM to 7 PM. Return within this window.") },
    ],
    locations: [
      { name: bi("4211 Suites", "4211 Suites"), addr: "4211 Chestnut St, Philadelphia, PA 19104" },
      { name: bi("30th Street Station（Amtrak）", "30th Street Station (Amtrak)"), addr: "2955 Market St, Philadelphia, PA 19104" },
      { name: bi("Avis Convention Center Parking（J5D）", "Avis Convention Center Parking (J5D)"), addr: "1324 Arch St, Philadelphia, PA 19107" },
      { name: bi("New York Penn Station／Moynihan Train Hall", "New York Penn Station / Moynihan Train Hall"), addr: "Moynihan Train Hall, 421 8th Ave, New York, NY 10001" },
    ],
  },
  {
    id: "0506",
    date: "5/6",
    weekday: { zh: "週三", en: "Wed" },
    cityKey: "ny",
    city: bi("紐約", "New York"),
    title: bi("中城經典", "Midtown Classics"),
    subtitle: bi("待住宿確認後排序，原則為單區域單日", "Sequence pending hotel address; one borough per day"),
    icon: Building2,
    intensity: "mid",
    pendingInfo: true,
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Times Square、Bryant Park", "Times Square, Bryant Park") },
      { time: bi("中午", "Midday"), activity: bi("中城用餐", "Midtown lunch") },
      { time: bi("下午", "Afternoon"), activity: bi("New York Public Library、Grand Central Terminal", "New York Public Library, Grand Central Terminal") },
      { time: bi("傍晚", "Evening"), activity: bi("Rockefeller Center、St. Patrick's Cathedral、Fifth Avenue", "Rockefeller Center, St. Patrick's Cathedral, Fifth Avenue") },
      { time: bi("晚上", "Night"), activity: bi("Top of the Rock 或 Summit One Vanderbilt 二選一", "Top of the Rock or Summit One Vanderbilt") },
    ],
    notes: [bi("每天只做一個大區域。地鐵轉乘判斷比景點本身更耗精神。", "One major area per day. Subway navigation is more draining than the sights themselves.")],
    locations: [
      { name: bi("Times Square", "Times Square"), addr: "Manhattan, NY 10036" },
      { name: bi("Bryant Park", "Bryant Park"), addr: "Manhattan, NY 10018" },
      { name: bi("New York Public Library", "New York Public Library"), addr: "476 5th Ave, New York, NY 10018" },
      { name: bi("Grand Central Terminal", "Grand Central Terminal"), addr: "89 E 42nd St, New York, NY 10017" },
      { name: bi("Rockefeller Center", "Rockefeller Center"), addr: "45 Rockefeller Plaza, New York, NY 10111" },
    ],
  },
  {
    id: "0507",
    date: "5/7",
    weekday: { zh: "週四", en: "Thu" },
    cityKey: "ny",
    city: bi("紐約", "New York"),
    title: bi("下曼哈頓", "Lower Manhattan"),
    subtitle: bi("步數較高的一天，安排在中段", "Higher step day; place mid-trip"),
    icon: Building2,
    intensity: "high",
    pendingInfo: true,
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Wall Street、9/11 Memorial、Oculus", "Wall Street, 9/11 Memorial, Oculus") },
      { time: bi("中午", "Midday"), activity: bi("金融區用餐", "Financial District lunch") },
      { time: bi("下午", "Afternoon"), activity: bi("Battery Park、搭免費 Staten Island Ferry 遠望自由女神", "Battery Park; take the free Staten Island Ferry for distant Statue of Liberty views") },
      { time: bi("傍晚", "Evening"), activity: bi("依體力進 Chinatown 或 SoHo", "Chinatown or SoHo, energy permitting") },
    ],
    notes: [bi("這是步數較高的一天，建議放在中段，不要 Day 1 也不要最後一天。", "This is a high-step day. Place it mid-trip, not Day 1 or the final day.")],
    locations: [
      { name: bi("9/11 Memorial 與 Museum", "9/11 Memorial & Museum"), addr: "180 Greenwich St, New York, NY 10007" },
      { name: bi("Oculus（WTC 交通樞紐）", "Oculus (WTC Transportation Hub)"), addr: "33-34 Vesey St, New York, NY 10006" },
      { name: bi("Wall Street 與 NYSE", "Wall Street / NYSE"), addr: "11 Wall St, New York, NY 10005" },
      { name: bi("Battery Park", "Battery Park"), addr: "Battery Pl, New York, NY 10004" },
      { name: bi("Staten Island Ferry Whitehall Terminal", "Staten Island Ferry Whitehall Terminal"), addr: "4 Whitehall St, New York, NY 10004" },
    ],
  },
  {
    id: "0508",
    date: "5/8",
    weekday: { zh: "週五", en: "Fri" },
    cityKey: "ny",
    city: bi("紐約", "New York"),
    title: bi("中央公園與博物館", "Central Park & Museums"),
    subtitle: bi("Met 與 AMNH 二選一", "Choose between The Met and AMNH"),
    icon: Trees,
    intensity: "mid",
    pendingInfo: true,
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("Central Park 南段（Bethesda Terrace、Bow Bridge、Strawberry Fields）", "Central Park south (Bethesda Terrace, Bow Bridge, Strawberry Fields)") },
      { time: bi("中午", "Midday"), activity: bi("Upper East Side 用餐", "Upper East Side lunch") },
      { time: bi("下午", "Afternoon"), activity: bi("The Met 或 American Museum of Natural History 二選一", "The Met or American Museum of Natural History") },
      { time: bi("傍晚", "Evening"), activity: bi("Lincoln Center 與 Columbus Circle", "Lincoln Center and Columbus Circle") },
    ],
    notes: [bi("The Met 與 AMNH 都是大館，二選一，不要硬塞兩個。", "Both museums are massive. Pick one; do not attempt both.")],
    locations: [
      { name: bi("Central Park（南入口）", "Central Park (south entrance)"), addr: "Central Park S, New York, NY 10019" },
      { name: bi("The Metropolitan Museum of Art", "The Metropolitan Museum of Art"), addr: "1000 5th Ave, New York, NY 10028" },
      { name: bi("American Museum of Natural History", "American Museum of Natural History"), addr: "200 Central Park West, New York, NY 10024" },
      { name: bi("Lincoln Center", "Lincoln Center"), addr: "10 Lincoln Center Plaza, New York, NY 10023" },
    ],
  },
  {
    id: "0509",
    date: "5/9",
    weekday: { zh: "週六", en: "Sat" },
    cityKey: "ny",
    city: bi("紐約", "New York"),
    title: bi("布魯克林", "Brooklyn"),
    subtitle: bi("DUMBO 與布魯克林大橋", "DUMBO and Brooklyn Bridge"),
    icon: Building,
    intensity: "high",
    pendingInfo: true,
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("搭地鐵至 DUMBO", "Subway to DUMBO") },
      { time: bi("中午", "Midday"), activity: bi("布魯克林用餐", "Brooklyn lunch") },
      { time: bi("下午", "Afternoon"), activity: bi("Brooklyn Bridge Park、走 Brooklyn Bridge 回曼哈頓", "Brooklyn Bridge Park; walk Brooklyn Bridge back to Manhattan") },
      { time: bi("傍晚", "Evening"), activity: bi("回飯店休息", "Return to hotel") },
    ],
    notes: [bi("Brooklyn Bridge 步行較長且陽光直曬，建議備帽子與水。", "The Brooklyn Bridge walk is long and sunny; bring a hat and water.")],
    locations: [
      { name: "DUMBO", addr: "DUMBO, Brooklyn, NY 11201" },
      { name: bi("Brooklyn Bridge Park", "Brooklyn Bridge Park"), addr: "334 Furman St, Brooklyn, NY 11201" },
      { name: bi("Brooklyn Bridge（布魯克林側）", "Brooklyn Bridge (Brooklyn Side)"), addr: "Brooklyn Bridge, New York, NY 10038" },
    ],
  },
  {
    id: "0510",
    date: "5/10",
    weekday: { zh: "週日", en: "Sun" },
    cityKey: "ny",
    city: bi("紐約", "New York"),
    title: bi("SoHo、Chelsea 與緩衝", "SoHo, Chelsea & Buffer"),
    subtitle: bi("最後緩衝日，不排太多", "Final buffer day; keep it light"),
    icon: ShoppingBag,
    intensity: "low",
    pendingInfo: true,
    timeline: [
      { time: bi("上午", "Morning"), activity: bi("SoHo 精品街", "SoHo boutiques") },
      { time: bi("中午", "Midday"), activity: bi("Chelsea Market 用餐", "Lunch at Chelsea Market") },
      { time: bi("下午", "Afternoon"), activity: bi("High Line 散步", "Walk the High Line") },
      { time: bi("傍晚", "Evening"), activity: bi("整理行李，最後晚餐", "Pack and have a final dinner") },
    ],
    notes: [bi("最後緩衝日，不要排太多景點，預留時間整理行李。", "Final buffer day. Do not overschedule; leave time to pack.")],
    locations: [
      { name: "SoHo", addr: "SoHo, New York, NY 10012" },
      { name: bi("Chelsea Market", "Chelsea Market"), addr: "75 9th Ave, New York, NY 10011" },
      { name: bi("The High Line", "The High Line"), addr: "The High Line, New York, NY 10011" },
    ],
  },
  {
    id: "0511",
    date: "5/11",
    weekday: { zh: "週一", en: "Mon" },
    cityKey: "ny",
    city: bi("紐約 → 香港", "New York → Hong Kong"),
    title: bi("離境日", "Departure"),
    subtitle: bi("依航班時間，待確認", "Pending flight details"),
    icon: Plane,
    intensity: "mid",
    pendingInfo: true,
    notes: [
      bi("依機場（JFK／EWR／LGA）與航班時間決定起床時間。", "Wake-up time depends on the airport (JFK / EWR / LGA) and flight."),
      bi("國際線建議起飛前 3 小時抵達機場。", "International flights: arrive 3 hours before departure."),
      bi("曼哈頓至 JFK：Uber 60 至 90 分鐘，AirTrain 加 LIRR 約 60 分鐘。", "Manhattan to JFK: Uber 60 to 90 minutes, or AirTrain plus LIRR about 60 minutes."),
      bi("曼哈頓至 EWR：Uber 45 至 75 分鐘，NJ Transit 約 45 分鐘。", "Manhattan to EWR: Uber 45 to 75 minutes, or NJ Transit about 45 minutes."),
      bi("曼哈頓至 LGA：Uber 30 至 60 分鐘。", "Manhattan to LGA: Uber 30 to 60 minutes."),
    ],
    locations: [],
  },
];

// =============================================================================
// HOTELS, AVIS, DINING
// =============================================================================

const hotels = [
  {
    name: "The Revolution Hotel",
    nameZh: bi("The Revolution Hotel", "The Revolution Hotel"),
    nights: bi("4/26 至 5/2，六晚", "April 26 to May 2, 6 nights"),
    addr: "40 Berkeley St, Boston, MA 02116",
    note: bi("位於 Back Bay 與南端交界，距離 Avis BO4 取車點 0.4 英里。", "On the Back Bay / South End border, 0.4 miles from Avis BO4 pickup."),
  },
  {
    name: "4211 Suites",
    nameZh: bi("4211 套房", "4211 Suites"),
    nights: bi("5/2 至 5/5，三晚", "May 2 to May 5, 3 nights"),
    addr: "4211 Chestnut St, Philadelphia, PA 19104",
    rating: "8.2/10",
    note: bi("位於 University City，距 UPenn 約 1.3 公里；務必確認停車費與是否需事先預約。", "In University City, 1.3 km from UPenn. Confirm parking fees and whether reservation is required."),
  },
  {
    name: "New York Hotel",
    nameZh: bi("紐約飯店", "New York Hotel"),
    nights: bi("5/5 至 5/11，六晚", "May 5 to May 11, 6 nights"),
    addr: bi("待提供", "To be confirmed"),
    pending: true,
    note: bi("確認後再決定每天景點順序與交通工具。", "Sequence of New York days will follow once the hotel is confirmed."),
  },
];

const avisStrategy = {
  pickup: {
    code: "BO4",
    name: bi("Boston Back Bay Station Garage", "Boston Back Bay Station Garage"),
    addr: "100 Clarendon St (Parking Garage), Boston, MA 02116",
    phone: "(617) 534-1404",
    hours: bi("週一至週日 24 小時", "Open 24 hours, all days"),
    distFromHotel: bi("距 The Revolution Hotel 0.4 英里，步行 8 分鐘，Uber 約 3 分鐘 8 至 10 美元", "0.4 miles from The Revolution Hotel; 8-minute walk or 3-minute Uber at $8–10"),
    advantage: bi("與 Logan Airport 同樣 24 小時營業，但省去 Uber 至機場的時間與車資（25 至 35 美元），且 Mass Pike 入口僅 3 分鐘車程。", "Same 24-hour access as Logan Airport, but saves the $25–35 Uber to the airport and reaches the Mass Pike on-ramp in 3 minutes."),
    pickupTime: bi("5/2 上午 7:00", "May 2, 7:00 AM"),
  },
  dropoff: {
    code: "J5D",
    name: bi("PHL Convention Center Parking", "PHL Convention Center Parking"),
    addr: "1324 Arch Street, Philadelphia, PA 19107",
    hours: bi("週一至週五 07:00 至 19:00；週六、日 08:00 至 13:00", "Mon–Fri 7 AM to 7 PM; Sat–Sun 8 AM to 1 PM"),
    note: bi("不提供 after-hours returns，必須於營業時間內歸還。", "No after-hours returns. Must return during business hours."),
    dropoffTime: bi("5/5 上午 10:00", "May 5, 10:00 AM"),
    flow: bi("先送家屬到 30th Street Station 卸下行李，您單獨開車至 J5D 還車（1.2 英里），再 Uber 回車站（12 至 18 美元）。", "Drop family and luggage at 30th Street Station first. Drive solo to J5D (1.2 miles) to return the car, then Uber back to the station ($12–18)."),
  },
  closed: {
    code: "PH4",
    name: bi("30th Street Station Avis", "30th Street Station Avis"),
    status: bi("已於 2025 年 2 月 1 日關閉", "Closed February 1, 2025"),
    note: bi("雖位於同一棟建築，但已停業，預訂系統會直接拒絕。", "Same building but no longer operating. The booking system will reject this location."),
  },
  insurance: {
    keep: [
      { name: "E-Toll Unlimited", price: bi("每日 14.99 美元", "$14.99 per day"), reason: bi("Boston 至 DC 過路費密集，被動 toll-by-plate 每筆手續費 9.95 美元，數學上 Unlimited 較便宜。", "Tolls between Boston and DC are heavy. Passive toll-by-plate adds $9.95 per occurrence; Unlimited wins on the math.") },
      { name: bi("Additional Driver", "Additional Driver"), price: bi("整租期 33.15 美元", "$33.15 per rental"), reason: bi("若家屬可能接手駕駛則加；若全程您主開可省。", "Add this if family may take the wheel. Skip if you drive the entire trip.") },
    ],
    skip: [
      { name: "Cover The Car (LDW)", price: bi("79.02 美元", "$79.02"), reason: bi("若信用卡 Primary CDW 涵蓋，這項與其重複。Chase Sapphire Preferred／Reserve、Capital One Venture X、Amex Premium Car Rental 多為 primary。", "Most likely duplicates a Primary CDW from cards like Chase Sapphire Preferred/Reserve, Capital One Venture X, or Amex Premium Car Rental.") },
      { name: "Cover My Liability (ALI)", price: bi("55.50 美元", "$55.50"), reason: bi("美國強制 liability 已含；若有 umbrella policy 多餘。", "Statutory US liability is already included. Redundant if you carry an umbrella policy.") },
      { name: "Cover Myself (PAI)", price: bi("21.00 美元", "$21.00"), reason: bi("個人意外險，與旅遊險或醫療險重複。", "Personal accident coverage; overlaps with travel or medical insurance.") },
      { name: "Cover My Belongings (PEP)", price: bi("8.85 美元", "$8.85"), reason: bi("家中租屋或房屋保險通常已涵蓋 off-premise 物品。", "Renter's or homeowner's insurance typically covers off-premise belongings.") },
      { name: "Extended Roadside Assistance", price: bi("22.92 美元", "$22.92"), reason: bi("基本租約已含基本拖車。", "Basic roadside is already included in the rental.") },
    ],
    potentialSavings: bi("約 187 美元", "About $187"),
  },
};

const dining = [
  { name: "Tatte Bakery & Café", typeZh: "早餐／早午餐", typeEn: "Breakfast / brunch", addr: "70 Charles St, Boston, MA 02114", suggestedZh: "4/26、4/29、4/30、5/1 早餐", suggestedEn: "Breakfast on Apr 26, 29, 30, May 1", icon: Coffee },
  { name: "Chipotle Park Plaza", typeZh: "美式快餐（家屬未體驗過）", typeEn: "American fast casual (new to the family)", addr: "8 Park Plz, Boston, MA 02116", suggestedZh: "4/26 晚餐輕食", suggestedEn: "Light dinner on Apr 26", icon: Utensils },
  { name: "The Daily Catch (North End)", typeZh: "義式海鮮（現金）", typeEn: "Italian seafood (cash only)", addr: "323 Hanover St, Boston, MA 02113", suggestedZh: "4/27 晚餐", suggestedEn: "Dinner on Apr 27", icon: Anchor, warningZh: "現金 only，不接受訂位", warningEn: "Cash only; no reservations" },
  { name: "Mike's Pastry", typeZh: "甜點", typeEn: "Pastries", addr: "300 Hanover St, Boston, MA 02113", suggestedZh: "4/27 或 5/1 晚上", suggestedEn: "Evening of Apr 27 or May 1", icon: Coffee },
  { name: "James Hook & Co", typeZh: "海鮮、龍蝦堡", typeEn: "Seafood, lobster rolls", addr: "440 Atlantic Ave, Boston, MA 02210", suggestedZh: "5/1 午餐", suggestedEn: "Lunch on May 1", icon: Anchor, warningZh: "週五營業至 17:00", warningEn: "Friday hours until 5 PM" },
  { name: "Trader Joe's Back Bay", typeZh: "雜貨採買", typeEn: "Grocery", addr: "899 Boylston St, Boston, MA 02115", suggestedZh: "5/1 採買回程禮物", suggestedEn: "Souvenir snacks on May 1", icon: ShoppingBag },
  { name: "Texas Roadhouse", typeZh: "已取消（與 American Dream 衝突）", typeEn: "Cancelled (conflicts with American Dream)", addr: "(N/A)", suggestedZh: "已取消", suggestedEn: "Cancelled", icon: XCircle, removed: true },
  { name: "Reading Terminal Market", typeZh: "費城市集", typeEn: "Philadelphia market", addr: "1136 Arch St, Philadelphia, PA 19107", suggestedZh: "5/3 晚餐或 5/4 早餐", suggestedEn: "Dinner May 3 or breakfast May 4", icon: Utensils },
];

// =============================================================================
// PRE-TRIP CHECKLIST (reframed as user-facing)
// =============================================================================

const preTripChecklist = [
  {
    title: bi("行前一個月", "One month out"),
    items: [
      bi("Avis 預訂 BO4 取車、J5D 還車，5/2 上午 7:00 至 5/5 上午 10:00", "Reserve Avis BO4 pickup and J5D drop-off, May 2 at 7 AM through May 5 at 10 AM"),
      bi("Avis 訂單僅保留 E-Toll Unlimited（與必要時 Additional Driver），其餘保險加購建議取消", "On the Avis booking, keep only E-Toll Unlimited (and Additional Driver if needed); decline the rest"),
      bi("查詢主要付款信用卡的租車保險是 primary 或 secondary", "Check whether your main credit card's rental coverage is primary or secondary"),
      bi("致電 4211 Suites 確認連續四晚停車費，以及 5/4 整日車輛離場是否仍計費", "Call 4211 Suites to confirm 4-night parking fees and whether May 4 (car offsite) still bills"),
      bi("確認紐約飯店地址與 5/11 航班時間、機場代碼", "Confirm the NYC hotel address and the May 11 flight time and airport code"),
    ],
  },
  {
    title: bi("行前兩週", "Two weeks out"),
    items: [
      bi("購買並啟用美國 eSIM（Airalo、Holafly 或 Nomad）", "Purchase and activate a US eSIM (Airalo, Holafly, or Nomad)"),
      bi("確認萬國轉接器（Type G 轉 Type A／B）", "Confirm a Type G to Type A/B universal adapter"),
      bi("檢查家中所有電器是否雙電壓", "Check that all personal electronics are dual voltage"),
      bi("Tassel 系統內預先轉發畢業典禮票券給家屬", "Forward graduation tickets to family through Tassel"),
      bi("下載 Uber、Google Maps、Amtrak、OpenTable App", "Install Uber, Google Maps, Amtrak, and OpenTable apps"),
    ],
  },
  {
    title: bi("出發前三日", "Three days out"),
    items: [
      bi("Apple Pay／Google Pay 加入信用卡，便於 MBTA 與 OMNY 直接感應", "Add credit cards to Apple Pay or Google Pay for MBTA and OMNY tap-to-pay"),
      bi("換取至少 100 美元現金供 The Daily Catch 與小費使用", "Withdraw at least $100 in cash for The Daily Catch and tips"),
      bi("準備一張隨身緊急聯絡卡，含飯店、Northeastern 校警、駐紐約經貿辦", "Print a small emergency card listing hotels, Northeastern Public Safety, and HKETO New York"),
      bi("檢查護照、I-94 紀錄、ESTA／簽證有效性", "Verify passport, I-94 record, and ESTA / visa validity"),
    ],
  },
  {
    title: bi("出發當日", "Departure day"),
    items: [
      bi("檢查行李件數，準備 12 小時長途飛行的水、藥品、舒適用品", "Verify bag count; prepare water, medication, and comfort items for the 12-hour flight"),
      bi("飯店與 Uber 預約 4/26 早晨抵達後的接駁", "Reserve Uber for hotel transfer after April 26 arrival"),
      bi("入境美國時 I-94 自動入境，大多無需紙本", "Entry to the US uses electronic I-94; paper form usually not needed"),
    ],
  },
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function MapButton({ addr, label, lang }) {
  return (
    <a
      href={mapLink(addr)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-stone-700 hover:text-amber-700 hover:underline transition-colors group"
    >
      <MapPin className="h-3 w-3 group-hover:text-amber-700" />
      <span>{label || (lang === "zh" ? "地圖" : "Map")}</span>
      <ExternalLink className="h-2.5 w-2.5 opacity-60" />
    </a>
  );
}

function LocationRow({ name, addr, lang }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 py-2.5 border-b border-stone-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-stone-900 text-[13px] sm:text-sm leading-snug">{t(name, lang)}</div>
        <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5 break-words">{addr}</div>
      </div>
      <div className="sm:flex-shrink-0 sm:pt-0.5">
        <MapButton addr={addr} lang={lang} />
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, lang }) {
  return (
    <div className="mb-6 sm:mb-8">
      {eyebrow && (
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 font-medium mb-2">
          {t(eyebrow, lang)}
        </div>
      )}
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-900 leading-tight tracking-tight"
        style={{ fontFamily: '"PingFang TC", Georgia, "Times New Roman", serif' }}
      >
        {t(title, lang)}
      </h2>
      {subtitle && (
        <p className="text-stone-600 mt-2 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t(subtitle, lang)}
        </p>
      )}
    </div>
  );
}

function IntensityDot({ level }) {
  const colors = {
    low: "bg-emerald-500",
    mid: "bg-amber-500",
    high: "bg-orange-500",
    peak: "bg-red-500",
  };
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${colors[level]}`}
      aria-hidden="true"
    />
  );
}

function IntensityBadge({ level, lang }) {
  const labels = {
    low: bi("輕鬆", "Easy"),
    mid: bi("適中", "Moderate"),
    high: bi("吃重", "Heavy"),
    peak: bi("最高", "Peak"),
  };
  const styles = {
    low: "bg-emerald-50 text-emerald-800 border-emerald-200",
    mid: "bg-amber-50 text-amber-800 border-amber-200",
    high: "bg-orange-50 text-orange-800 border-orange-200",
    peak: "bg-red-50 text-red-800 border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] sm:text-xs font-medium ${styles[level]}`}>
      <IntensityDot level={level} />
      {t(labels[level], lang)}
    </span>
  );
}

function TipCard({ tip, lang }) {
  const Icon = tip.icon;
  const severityStyles = {
    key: { card: "bg-stone-900 text-amber-50 border-stone-900", iconWrap: "bg-amber-500/20 text-amber-300", title: "text-amber-100", body: "text-amber-50/85" },
    important: { card: "bg-amber-50 border-amber-300 text-stone-900", iconWrap: "bg-amber-200 text-amber-900", title: "text-stone-900", body: "text-stone-700" },
    note: { card: "bg-stone-50 border-stone-300 text-stone-900", iconWrap: "bg-stone-200 text-stone-700", title: "text-stone-900", body: "text-stone-600" },
  };
  const s = severityStyles[tip.severity] || severityStyles.note;
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${s.card} flex gap-3 sm:gap-4`}>
      <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${s.iconWrap}`}>
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-semibold text-sm sm:text-[15px] leading-snug mb-1.5 ${s.title}`}>{t(tip.title, lang)}</div>
        <div className={`text-xs sm:text-[13px] leading-relaxed ${s.body}`}>{t(tip.body, lang)}</div>
      </div>
    </div>
  );
}

function DayCard({ day, lang }) {
  const Icon = day.icon;
  const isCeremony = day.isCeremony;

  return (
    <Card className={`overflow-hidden border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow ${isCeremony ? "ring-2 ring-amber-300 ring-offset-2 ring-offset-stone-50" : ""}`}>
      <CardHeader className={`pb-4 ${isCeremony ? "bg-gradient-to-br from-stone-900 to-stone-800 text-amber-50" : "bg-gradient-to-br from-stone-50 to-white"}`}>
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`flex-shrink-0 rounded-full p-2.5 sm:p-3 ${isCeremony ? "bg-amber-500/20 text-amber-200" : "bg-stone-900 text-amber-100"}`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-semibold text-xl sm:text-2xl tracking-tight ${isCeremony ? "text-amber-100" : "text-stone-900"}`} style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                {day.date}
              </span>
              <span className={`text-xs sm:text-sm ${isCeremony ? "text-amber-200/80" : "text-stone-500"}`}>
                {t(day.weekday, lang)}
              </span>
              <IntensityBadge level={day.intensity} lang={lang} />
              {day.pendingInfo && (
                <Badge variant="outline" className={`text-[10px] sm:text-xs ${isCeremony ? "bg-stone-800 text-amber-200 border-amber-500/40" : "bg-stone-100 text-stone-600"}`}>
                  {lang === "zh" ? "待確認" : "TBC"}
                </Badge>
              )}
              {isCeremony && (
                <Badge className="bg-amber-500 text-stone-900 hover:bg-amber-500 text-[10px] sm:text-xs font-semibold">
                  {lang === "zh" ? "畢業典禮" : "Commencement"}
                </Badge>
              )}
            </div>
            <CardTitle className={`text-base sm:text-lg lg:text-xl mt-1.5 leading-snug ${isCeremony ? "text-amber-50" : "text-stone-900"}`} style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
              {t(day.title, lang)}
            </CardTitle>
            <CardDescription className={`mt-1 text-xs sm:text-sm leading-relaxed ${isCeremony ? "text-amber-100/80" : "text-stone-600"}`}>
              <span className="font-medium">{t(day.city, lang)}</span>
              <span className="mx-1.5 opacity-50">·</span>
              {t(day.subtitle, lang)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-5 sm:pt-6">
        {day.flightInfo && (
          <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 sm:p-4">
            <div className="flex items-center gap-2 text-sky-900 font-semibold text-xs sm:text-sm mb-2.5">
              <Plane className="h-4 w-4" />
              {lang === "zh" ? "航班資訊" : "Flight Information"}
            </div>
            <div className="space-y-1.5 text-xs">
              {day.flightInfo.legs.map((leg, i) => (
                <div key={i} className="grid grid-cols-[68px_1fr] sm:grid-cols-[80px_120px_1fr] gap-2 sm:gap-3 items-center">
                  <Badge variant="outline" className="bg-white border-sky-300 text-sky-900 font-mono text-[10px] sm:text-xs justify-center">{leg.code}</Badge>
                  <span className="text-stone-700 text-[11px] sm:text-xs">{leg.route}</span>
                  <span className="text-stone-500 text-[10px] sm:text-xs col-span-2 sm:col-span-1">{leg.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {day.isCeremony && day.ceremony && (
          <div className="rounded-xl border-2 border-stone-900 bg-gradient-to-br from-amber-50 to-stone-50 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <GraduationCap className="h-5 w-5 text-stone-900 flex-shrink-0" />
                <h4 className="font-semibold text-base sm:text-lg text-stone-900 truncate" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                  {lang === "zh" ? "典禮資訊" : "Ceremony Details"}
                </h4>
              </div>
              <div className="flex-shrink-0 text-stone-900">
                {day.ceremonyType === "fenway" ? <FenwayBadge className="h-10 w-10 sm:h-12 sm:w-12" /> : <LeaderBankBadge className="h-10 w-10 sm:h-12 sm:w-12" />}
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-medium mb-0.5">{lang === "zh" ? "場館" : "Venue"}</div>
                <div className="font-semibold text-stone-900 text-sm sm:text-base">{day.ceremony.venue}</div>
                <div className="text-xs text-stone-600 mt-0.5">{day.ceremony.address}</div>
                <div className="mt-1"><MapButton addr={day.ceremony.address} lang={lang} /></div>
              </div>
              {day.ceremony.venueType && (
                <div className="text-[11px] sm:text-xs text-amber-900 bg-amber-100/70 border border-amber-300 rounded-md px-2.5 py-1.5">
                  {t(day.ceremony.venueType, lang)}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-[13px] pt-1">
                {day.ceremony.gradReportTime && <CeremonyRow label={lang === "zh" ? "畢業生報到" : "Graduate report"} value={t(day.ceremony.gradReportTime, lang)} />}
                {day.ceremony.gradArrival && <CeremonyRow label={lang === "zh" ? "畢業生抵達" : "Graduate arrival"} value={t(day.ceremony.gradArrival, lang)} />}
                {day.ceremony.gradEntrance && <CeremonyRow label={lang === "zh" ? "畢業生入口" : "Graduate entrance"} value={t(day.ceremony.gradEntrance, lang)} />}
                {day.ceremony.guestDoors && <CeremonyRow label={lang === "zh" ? "來賓開門" : "Guest doors"} value={t(day.ceremony.guestDoors, lang)} />}
                {day.ceremony.guestArrival && <CeremonyRow label={lang === "zh" ? "來賓抵達" : "Guest arrival"} value={t(day.ceremony.guestArrival, lang)} />}
                {day.ceremony.guestEntrance && <CeremonyRow label={lang === "zh" ? "來賓入口" : "Guest entrance"} value={t(day.ceremony.guestEntrance, lang)} />}
                {day.ceremony.processionStart && <CeremonyRow label="Procession" value={t(day.ceremony.processionStart, lang)} />}
                {day.ceremony.ceremonyStart && <CeremonyRow label={lang === "zh" ? "典禮開始" : "Ceremony"} value={t(day.ceremony.ceremonyStart, lang)} />}
                {day.ceremony.time && !day.ceremony.ceremonyStart && <CeremonyRow label={lang === "zh" ? "典禮時間" : "Time"} value={t(day.ceremony.time, lang)} />}
                {day.ceremony.ceremonyLength && <CeremonyRow label={lang === "zh" ? "典禮時長" : "Length"} value={t(day.ceremony.ceremonyLength, lang)} />}
                {day.ceremony.bagLimit && <CeremonyRow label={lang === "zh" ? "包包尺寸" : "Bag limit"} value={day.ceremony.bagLimit} mono />}
              </div>
              {day.ceremony.important && (
                <Alert className="bg-stone-900 border-stone-900 text-amber-50 mt-2">
                  <AlertTriangle className="h-4 w-4 text-amber-300" />
                  <AlertDescription className="text-[11px] sm:text-xs text-amber-50/95 ml-1">
                    {t(day.ceremony.important, lang)}
                  </AlertDescription>
                </Alert>
              )}
              {day.ceremony.note && (
                <div className="text-[11px] sm:text-xs text-stone-500 italic border-t border-stone-200 pt-2">
                  {t(day.ceremony.note, lang)}
                </div>
              )}
            </div>
          </div>
        )}

        <Accordion type="multiple" defaultValue={["timeline"]} className="space-y-1">
          <DayAccordionItem id="timeline" icon={Clock} label={lang === "zh" ? "行程時刻表" : "Timeline"}>
            <div className="space-y-0">
              {day.timeline?.map((item, i) => (
                <div key={i} className="grid grid-cols-[78px_1fr] sm:grid-cols-[100px_1fr] gap-2 sm:gap-3 py-2 border-b border-stone-100 last:border-0">
                  <div className="font-mono text-[10px] sm:text-xs text-stone-500 pt-0.5 break-words">{t(item.time, lang)}</div>
                  <div className="text-[13px] sm:text-sm text-stone-800 leading-relaxed">
                    {t(item.activity, lang)}
                    {item.note && <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">{t(item.note, lang)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </DayAccordionItem>

          {day.decision && (
            <DayAccordionItem id="decision" icon={Compass} label={t(day.decision.title, lang)}>
              <ul className="space-y-2 text-[13px] sm:text-sm text-stone-800">
                {day.decision.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-700" />
                    <span className="leading-relaxed">{t(item.text, lang)}</span>
                  </li>
                ))}
              </ul>
              {day.decision.caution && (
                <div className="mt-3 text-[11px] sm:text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1.5">
                  {t(day.decision.caution, lang)}
                </div>
              )}
            </DayAccordionItem>
          )}

          {day.route && (
            <DayAccordionItem id="route" icon={Compass} label={t(day.route.title, lang)}>
              <ol className="space-y-1.5 text-[13px] sm:text-sm text-stone-800">
                {day.route.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="font-mono text-[11px] sm:text-xs text-amber-700 mt-0.5 font-semibold w-5 flex-shrink-0">{(i + 1).toString().padStart(2, "0")}</span>
                    <span className="leading-relaxed">{t(step, lang)}</span>
                  </li>
                ))}
              </ol>
            </DayAccordionItem>
          )}

          {day.costAnalysis && (
            <DayAccordionItem id="cost" icon={DollarSign} label={t(day.costAnalysis.title, lang)}>
              <div className="space-y-2 text-[13px] sm:text-sm">
                {day.costAnalysis.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-3 py-1.5 border-b border-stone-100 last:border-0">
                    <span className="text-stone-700 leading-snug flex-1">{t(item.label, lang)}</span>
                    <span className="font-medium text-stone-900 font-mono text-xs sm:text-sm flex-shrink-0">{t(item.value, lang)}</span>
                  </div>
                ))}
              </div>
            </DayAccordionItem>
          )}

          {day.transportation && (
            <DayAccordionItem id="transportation" icon={Car} label={lang === "zh" ? "交通與停車" : "Transit & Parking"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-800">
                {day.transportation.map((tx, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-stone-400" />
                    <span className="leading-relaxed">{t(tx, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.bagPolicy && (
            <DayAccordionItem id="bag" icon={Briefcase} label={lang === "zh" ? "攜帶物品限制" : "Bag Policy"}>
              <div className="bg-stone-100 rounded-lg p-3 mb-3 text-center">
                <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "尺寸上限" : "Size limit"}</div>
                <div className="font-mono text-base sm:text-lg font-semibold text-stone-900 mt-0.5">{day.bagPolicy.limit}</div>
              </div>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-800">
                {day.bagPolicy.notes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-700" />
                    <span className="leading-relaxed">{t(n, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.prohibitedItems && (
            <DayAccordionItem id="prohibited" icon={XCircle} label={lang === "zh" ? "禁止攜帶物品" : "Prohibited Items"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-700">
                {day.prohibitedItems.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span className="leading-relaxed">{t(p, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.dressCode && (
            <DayAccordionItem id="dress" icon={GraduationCap} label={lang === "zh" ? "畢業生穿著" : "Regalia"}>
              <div className="flex flex-wrap gap-2 mb-2">
                {day.dressCode.map((d, i) => (
                  <Badge key={i} className="bg-stone-900 text-amber-100 hover:bg-stone-900 border-stone-900 text-xs px-2.5 py-1">{d}</Badge>
                ))}
              </div>
              {day.rules && (
                <ul className="mt-3 space-y-1.5 text-[13px] sm:text-sm text-stone-700">
                  {day.rules.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                      <span className="leading-relaxed">{t(r, lang)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </DayAccordionItem>
          )}

          {day.rules && !day.dressCode && (
            <DayAccordionItem id="rules" icon={Shield} label={lang === "zh" ? "本日原則" : "Day Rules"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-800">
                {day.rules.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span className="leading-relaxed">{t(r, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.criticalActions && (
            <DayAccordionItem id="critical" icon={CheckCheck} label={lang === "zh" ? "關鍵動作" : "Key Actions"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-800">
                {day.criticalActions.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCheck className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-700" />
                    <span className="leading-relaxed">{t(c, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.avoid && (
            <DayAccordionItem id="avoid" icon={XCircle} label={lang === "zh" ? "本日不排" : "Skip Today"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-700">
                {day.avoid.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                    <span className="leading-relaxed">{t(a, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}

          {day.locations?.length > 0 && (
            <DayAccordionItem id="locations" icon={MapPin} label={`${lang === "zh" ? "地點與地圖" : "Places & Maps"} (${day.locations.length})`}>
              <div className="divide-y divide-stone-100">
                {day.locations.map((loc, i) => (
                  <LocationRow key={i} name={loc.name} addr={loc.addr} lang={lang} />
                ))}
              </div>
            </DayAccordionItem>
          )}

          {day.notes && (
            <DayAccordionItem id="notes" icon={Lightbulb} label={lang === "zh" ? "備註" : "Notes"}>
              <ul className="space-y-1.5 text-[13px] sm:text-sm text-stone-700">
                {day.notes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-stone-400" />
                    <span className="leading-relaxed">{t(n, lang)}</span>
                  </li>
                ))}
              </ul>
            </DayAccordionItem>
          )}
        </Accordion>

        {day.warnings?.length > 0 && (
          <div className="space-y-2">
            {day.warnings.map((w, i) => (
              <Alert key={i} className="bg-amber-50 border-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-700" />
                <AlertTitle className="text-[13px] sm:text-sm text-stone-900 leading-snug">{t(w.title, lang)}</AlertTitle>
                <AlertDescription className="text-[11px] sm:text-xs text-stone-700 leading-relaxed">{t(w.body, lang)}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CeremonyRow({ label, value, mono }) {
  return (
    <div className="flex justify-between gap-2 items-baseline">
      <span className="text-stone-500 text-[11px] sm:text-xs flex-shrink-0">{label}</span>
      <span className={`font-medium text-stone-900 text-right text-[11px] sm:text-xs ${mono ? "font-mono" : ""} leading-snug`}>{value}</span>
    </div>
  );
}

function DayAccordionItem({ id, icon: Icon, label, children }) {
  return (
    <AccordionItem value={id} className="border-stone-200 border-b last:border-b-0">
      <AccordionTrigger className="hover:no-underline py-2.5 sm:py-3 text-left">
        <div className="flex items-center gap-2 text-[13px] sm:text-sm font-medium text-stone-800">
          <Icon className="h-4 w-4 text-stone-500 flex-shrink-0" />
          <span className="leading-snug">{label}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-3">{children}</AccordionContent>
    </AccordionItem>
  );
}

// =============================================================================
// LANGUAGE TOGGLE (floating bottom-right)
// =============================================================================

function LanguageToggle({ lang, setLang }) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {expanded ? (
        <div className="bg-stone-900 text-amber-50 rounded-full shadow-2xl flex items-center gap-1 p-1 border border-stone-700/40 transition-all">
          <button
            onClick={() => { setLang("zh"); setExpanded(false); }}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${lang === "zh" ? "bg-amber-500 text-stone-900" : "text-amber-100/80 hover:text-amber-50"}`}
            aria-label="Switch to Chinese"
          >
            繁中
          </button>
          <button
            onClick={() => { setLang("en"); setExpanded(false); }}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${lang === "en" ? "bg-amber-500 text-stone-900" : "text-amber-100/80 hover:text-amber-50"}`}
            aria-label="Switch to English"
          >
            EN
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="bg-stone-900/85 backdrop-blur-sm text-amber-100 rounded-full shadow-2xl hover:bg-stone-900 hover:scale-105 transition-all w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center group border border-stone-700/40"
          aria-label="Toggle language"
        >
          <Languages className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
}

// =============================================================================
// SEGMENT NAVIGATION CARD
// =============================================================================

function SegmentCard({ segment, idx, lang }) {
  const Icon = segment.icon;
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
        <div className="text-stone-900 group-hover:text-amber-700 transition-colors">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 font-mono mt-1">
          0{idx + 1}
        </span>
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-700 font-medium mb-1">
        {lang === "zh" ? "段落" : "Segment"} {idx + 1}
      </div>
      <h3 className="font-semibold text-xl sm:text-2xl text-stone-900 leading-tight" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
        {lang === "zh" ? segment.cityZh : segment.city}
      </h3>
      <div className="mt-3 sm:mt-4 space-y-1.5 text-[13px] sm:text-sm text-stone-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-stone-400" />
          <span>{t(segment.dateRange, lang)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hotel className="h-3.5 w-3.5 text-stone-400" />
          <span>{t(segment.nights, lang)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-stone-400" />
          <span>{t(segment.theme, lang)}</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  const [lang, setLang] = useState("zh");
  const [activeTab, setActiveTab] = useState("overview");

  const bostonDays = days.filter((d) => d.cityKey === "boston");
  const phillyDcDays = days.filter((d) => d.cityKey === "philly" || d.cityKey === "dc" || (d.cityKey === "transit" && (d.id === "0502" || d.id === "0505")));
  const nyDays = days.filter((d) => d.cityKey === "ny");

  const navItems = [
    { value: "overview", icon: Compass, label: bi("總覽", "Overview") },
    { value: "boston", icon: BostonMark, label: bi("波士頓", "Boston") },
    { value: "philly", icon: PhillyMark, label: bi("費城與 DC", "Philly + DC") },
    { value: "ny", icon: NyMark, label: bi("紐約", "New York") },
    { value: "logistics", icon: Car, label: bi("交通與住宿", "Logistics") },
    { value: "dining", icon: Utensils, label: bi("餐飲", "Dining") },
    { value: "practical", icon: Info, label: bi("實用資訊", "Practical") },
    { value: "checklist", icon: CheckCheck, label: bi("行前準備", "Pre-Trip") },
  ];

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      style={{ fontFamily: '"PingFang TC", "Noto Sans CJK TC", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif' }}
      lang={lang === "zh" ? "zh-Hant" : "en"}
    >
      {/* HEADER / HERO */}
      <header className="relative bg-stone-900 text-amber-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <TripRouteMap className="w-full h-full" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="grid lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start">
            <div className="flex-shrink-0 text-amber-200">
              <HuskyMark className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-amber-300 text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3">
                <span className="w-6 h-px bg-amber-500/60" />
                <span>Northeastern · Class of 2026</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight" style={{ fontFamily: '"PingFang TC", Georgia, "Times New Roman", serif' }}>
                {t(meta.title, lang)}
              </h1>
              <p className="text-amber-100/80 text-base sm:text-lg lg:text-xl font-light mt-3 leading-relaxed">
                {t(meta.subtitle, lang)}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs sm:text-sm text-amber-200/85">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 opacity-70" />
                  <span>{meta.dates}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-amber-600/40" />
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 opacity-70" />
                  <span>Boston · Philadelphia · DC · New York</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-amber-600/40" />
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 opacity-70" />
                  <span>{t(meta.travelers, lang)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SUMMARY ROUTE MAP */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="text-stone-700">
            <TripRouteMap className="w-full h-auto max-h-44 sm:max-h-56" />
          </div>
        </div>
      </section>

      {/* STICKY TAB NAVIGATION */}
      <div className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto bg-transparent gap-0.5 sm:gap-1 py-2 flex flex-wrap justify-start sm:justify-center overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="flex-shrink-0 text-[11px] sm:text-xs lg:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 data-[state=active]:bg-stone-900 data-[state=active]:text-amber-100 data-[state=active]:shadow-sm rounded-md flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{t(item.label, lang)}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="mt-0">
              <div className="py-8 sm:py-12 space-y-10 sm:space-y-14">
                <div>
                  <SectionHeading
                    eyebrow={bi("行程結構", "Trip Structure")}
                    title={bi("三段，三座城市", "Three Segments, Three Cities")}
                    subtitle={bi("由波士頓畢業典禮主軸出發，向南至費城與華盛頓特區，再以紐約自由行收尾。", "Anchored by the Boston commencement, then south to Philadelphia and Washington, DC, and finishing with a self-guided segment in New York.")}
                    lang={lang}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {meta.segments.map((seg, idx) => (
                      <SegmentCard key={idx} segment={seg} idx={idx} lang={lang} />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionHeading
                    eyebrow={bi("出發前必讀", "Read Before Departure")}
                    title={bi("關鍵旅行提醒", "Key Travel Notes")}
                    subtitle={bi("七個會直接影響行程的具體細節。", "Seven specifics that materially affect the trip.")}
                    lang={lang}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                    {travelTips.map((tip) => (
                      <TipCard key={tip.id} tip={tip} lang={lang} />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                  <Card className="border-stone-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                        <Hotel className="h-5 w-5 text-amber-700" />
                        {lang === "zh" ? "住宿" : "Accommodations"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hotels.map((h, i) => (
                        <div key={i} className="border-l-2 border-amber-500 pl-3 sm:pl-4 py-1">
                          <div className="font-semibold text-stone-900 text-[15px] sm:text-base flex items-center gap-2 flex-wrap">
                            {h.name}
                            {h.pending && (
                              <Badge variant="outline" className="bg-stone-100 text-stone-600 text-[10px]">
                                {lang === "zh" ? "待提供" : "TBC"}
                              </Badge>
                            )}
                          </div>
                          <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">{t(h.nights, lang)}</div>
                          <div className="text-[12px] sm:text-sm text-stone-700 mt-1.5 break-words">{t(h.addr, lang)}</div>
                          {!h.pending && <div className="mt-1"><MapButton addr={h.addr} lang={lang} /></div>}
                          <div className="text-[11px] sm:text-xs text-stone-500 italic mt-1.5 leading-relaxed">{t(h.note, lang)}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-stone-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                        <Compass className="h-5 w-5 text-amber-700" />
                        {lang === "zh" ? "交通策略" : "Transit Strategy"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-[13px] sm:text-sm divide-y divide-stone-100">
                        {[
                          [bi("波士頓市內", "Within Boston"), bi("Uber 與 MBTA", "Uber + MBTA")],
                          [bi("波士頓 → 費城", "Boston → Philly"), bi("Avis 自駕", "Avis self-drive")],
                          [bi("費城市內", "Within Philly"), bi("步行加 Uber", "Walking + Uber")],
                          [bi("費城 ↔ DC", "Philly ↔ DC"), bi("自駕往返", "Self-drive round trip")],
                          [bi("費城 → 紐約", "Philly → NYC"), bi("Amtrak NER", "Amtrak NER")],
                          [bi("紐約市內", "Within NYC"), bi("Subway 加 Uber", "Subway + Uber")],
                        ].map(([k, v], i) => (
                          <div key={i} className="flex justify-between gap-3 py-2.5">
                            <span className="text-stone-700">{t(k, lang)}</span>
                            <span className="font-medium text-stone-900">{t(v, lang)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* BOSTON TAB */}
            <TabsContent value="boston" className="mt-0">
              <div className="py-8 sm:py-12 space-y-6">
                <SectionHeading
                  eyebrow={bi("第一段", "Segment One")}
                  title={bi("波士頓 · 4/26 至 5/2", "Boston · April 26 to May 2")}
                  subtitle={bi("含 4/29 Fenway Park Graduate Commencement 與 4/30 D'Amore-McKim Celebration at Leader Bank Pavilion。", "Includes the Graduate Commencement at Fenway Park on April 29 and the D'Amore-McKim Celebration at Leader Bank Pavilion on April 30.")}
                  lang={lang}
                />
                <div className="space-y-5 sm:space-y-6">
                  {bostonDays.map((d) => <DayCard key={d.id} day={d} lang={lang} />)}
                  {days.filter((d) => d.id === "0502").map((d) => <DayCard key={d.id} day={d} lang={lang} />)}
                </div>
              </div>
            </TabsContent>

            {/* PHILLY + DC TAB */}
            <TabsContent value="philly" className="mt-0">
              <div className="py-8 sm:py-12 space-y-6">
                <SectionHeading
                  eyebrow={bi("第二段", "Segment Two")}
                  title={bi("費城與華盛頓特區 · 5/2 至 5/5", "Philadelphia & Washington, DC · May 2 to May 5")}
                  subtitle={bi("含 5/4 自駕往返 DC 一日遊與 5/5 還車後鐵路進紐約。", "Includes the May 4 self-drive day trip to DC and the May 5 train transfer to New York after car return.")}
                  lang={lang}
                />
                <div className="space-y-5 sm:space-y-6">
                  {phillyDcDays.filter((d) => d.id !== "0502").map((d) => <DayCard key={d.id} day={d} lang={lang} />)}
                </div>
              </div>
            </TabsContent>

            {/* NEW YORK TAB */}
            <TabsContent value="ny" className="mt-0">
              <div className="py-8 sm:py-12 space-y-6">
                <SectionHeading
                  eyebrow={bi("第三段", "Segment Three")}
                  title={bi("紐約 · 5/5 至 5/11", "New York · May 5 to May 11")}
                  subtitle={bi("家屬自由行段。每日只做一個區域，待住宿地點確認後排序。", "Self-guided family segment. One area per day. Sequence finalizes after the hotel is confirmed.")}
                  lang={lang}
                />
                <Alert className="bg-stone-50 border-stone-300">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-[13px] sm:text-sm leading-relaxed">
                    {lang === "zh"
                      ? "以下為五個分區模組（中城、下曼哈頓、中央公園、布魯克林、SoHo），確認紐約飯店地址後即可決定每天順序與最佳交通方式。"
                      : "The five area modules below (Midtown, Lower Manhattan, Central Park, Brooklyn, SoHo) will be sequenced once the New York hotel address is confirmed."}
                  </AlertDescription>
                </Alert>
                <div className="space-y-5 sm:space-y-6">
                  {nyDays.map((d) => <DayCard key={d.id} day={d} lang={lang} />)}
                </div>
              </div>
            </TabsContent>

            {/* LOGISTICS TAB */}
            <TabsContent value="logistics" className="mt-0">
              <div className="py-8 sm:py-12 space-y-10 sm:space-y-14">
                <div>
                  <SectionHeading
                    eyebrow={bi("租車", "Car Rental")}
                    title={bi("Avis 取車與還車", "Avis Pickup & Drop-off")}
                    subtitle={bi("Boston Back Bay 取車，Philadelphia Convention Center 還車。", "Pickup at Boston Back Bay, drop-off at Philadelphia Convention Center.")}
                    lang={lang}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    <Card className="border-emerald-300 overflow-hidden">
                      <CardHeader className="bg-emerald-50 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                            {lang === "zh" ? "取車地點" : "Pickup"}
                          </CardTitle>
                          <Badge className="bg-emerald-700 hover:bg-emerald-700 text-white font-mono">{avisStrategy.pickup.code}</Badge>
                        </div>
                        <CardDescription className="text-stone-700 mt-1">{t(avisStrategy.pickup.name, lang)}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3 text-[13px] sm:text-sm">
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "地址" : "Address"}</div>
                          <div className="text-stone-900 break-words">{avisStrategy.pickup.addr}</div>
                          <div className="mt-1"><MapButton addr={avisStrategy.pickup.addr} lang={lang} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] sm:text-xs text-stone-500 uppercase">{lang === "zh" ? "電話" : "Phone"}</div>
                            <div className="text-stone-900 font-mono text-xs">{avisStrategy.pickup.phone}</div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-stone-500 uppercase">{lang === "zh" ? "營業時間" : "Hours"}</div>
                            <div className="text-stone-900 text-xs">{t(avisStrategy.pickup.hours, lang)}</div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "距離飯店" : "From hotel"}</div>
                          <div className="text-stone-700 text-xs leading-relaxed">{t(avisStrategy.pickup.distFromHotel, lang)}</div>
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "建議取車時間" : "Pickup time"}</div>
                          <div className="font-mono text-base font-semibold text-emerald-700 mt-0.5">{t(avisStrategy.pickup.pickupTime, lang)}</div>
                        </div>
                        <div className="text-[11px] sm:text-xs text-stone-700 italic bg-stone-50 rounded-md p-2.5 mt-2 leading-relaxed border border-stone-200">
                          {t(avisStrategy.pickup.advantage, lang)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-emerald-300 overflow-hidden">
                      <CardHeader className="bg-emerald-50 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                            <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                            {lang === "zh" ? "還車地點" : "Drop-off"}
                          </CardTitle>
                          <Badge className="bg-emerald-700 hover:bg-emerald-700 text-white font-mono">{avisStrategy.dropoff.code}</Badge>
                        </div>
                        <CardDescription className="text-stone-700 mt-1">{t(avisStrategy.dropoff.name, lang)}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3 text-[13px] sm:text-sm">
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "地址" : "Address"}</div>
                          <div className="text-stone-900 break-words">{avisStrategy.dropoff.addr}</div>
                          <div className="mt-1"><MapButton addr={avisStrategy.dropoff.addr} lang={lang} /></div>
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "營業時間" : "Hours"}</div>
                          <div className="text-stone-900 text-xs">{t(avisStrategy.dropoff.hours, lang)}</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "建議還車時間" : "Drop-off time"}</div>
                          <div className="font-mono text-base font-semibold text-emerald-700 mt-0.5">{t(avisStrategy.dropoff.dropoffTime, lang)}</div>
                        </div>
                        <div>
                          <div className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider">{lang === "zh" ? "操作流程" : "Workflow"}</div>
                          <div className="text-stone-700 text-xs leading-relaxed mt-1">{t(avisStrategy.dropoff.flow, lang)}</div>
                        </div>
                        <Alert className="bg-amber-50 border-amber-300 mt-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
                            {t(avisStrategy.dropoff.note, lang)}
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-red-300 overflow-hidden mt-4 sm:mt-5">
                    <CardHeader className="bg-red-50 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                          <XCircle className="h-5 w-5 text-red-700" />
                          {lang === "zh" ? "已關閉，不可使用" : "Closed, Do Not Use"}
                        </CardTitle>
                        <Badge variant="outline" className="bg-white border-red-400 text-red-700 font-mono line-through">{avisStrategy.closed.code}</Badge>
                      </div>
                      <CardDescription className="text-red-800 mt-1">
                        {t(avisStrategy.closed.name, lang)}
                        <span className="mx-2 opacity-50">·</span>
                        {t(avisStrategy.closed.status, lang)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-[13px] sm:text-sm text-stone-700 leading-relaxed">{t(avisStrategy.closed.note, lang)}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <SectionHeading
                    eyebrow={bi("保險加購", "Optional Add-ons")}
                    title={bi("租車保險建議", "Insurance Recommendations")}
                    subtitle={bi("以信用卡 Primary CDW 為基礎判斷，預估可省約 187 美元。", `Estimated savings of about $187, assuming a credit card with Primary CDW.`)}
                    lang={lang}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    <Card className="border-emerald-300">
                      <CardHeader className="bg-emerald-50 pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                          <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                          {lang === "zh" ? "建議保留" : "Keep"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3.5">
                        {avisStrategy.insurance.keep.map((item, i) => (
                          <div key={i} className="border-l-2 border-emerald-500 pl-3">
                            <div className="flex justify-between items-baseline gap-2 flex-wrap">
                              <span className="font-semibold text-[13px] sm:text-sm text-stone-900">{t(item.name, lang)}</span>
                              <span className="text-[11px] sm:text-xs font-mono text-stone-700">{t(item.price, lang)}</span>
                            </div>
                            <div className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed">{t(item.reason, lang)}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-red-300">
                      <CardHeader className="bg-red-50 pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                          <XCircle className="h-4 w-4 text-red-700" />
                          {lang === "zh" ? "建議取消" : "Skip"}
                        </CardTitle>
                        <CardDescription className="text-[11px] sm:text-xs text-red-800">
                          {lang === "zh" ? "預估可省" : "Potential savings"} {t(avisStrategy.insurance.potentialSavings, lang)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3.5">
                        {avisStrategy.insurance.skip.map((item, i) => (
                          <div key={i} className="border-l-2 border-red-400 pl-3">
                            <div className="flex justify-between items-baseline gap-2 flex-wrap">
                              <span className="font-semibold text-[13px] sm:text-sm text-stone-900">{t(item.name, lang)}</span>
                              <span className="text-[11px] sm:text-xs font-mono text-stone-500 line-through">{t(item.price, lang)}</span>
                            </div>
                            <div className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed">{t(item.reason, lang)}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* DINING TAB */}
            <TabsContent value="dining" className="mt-0">
              <div className="py-8 sm:py-12">
                <SectionHeading
                  eyebrow={bi("餐飲", "Dining")}
                  title={bi("八間餐廳速覽", "Eight Restaurants at a Glance")}
                  subtitle={bi("依日期建議、現金與時段限制一目了然。", "Sorted by suggested day, with cash-only and timing constraints flagged.")}
                  lang={lang}
                />
                <Card className="border-stone-200">
                  <CardContent className="p-0">
                    <div className="divide-y divide-stone-200">
                      {dining.map((r, i) => {
                        const RIcon = r.icon;
                        return (
                          <div key={i} className={`p-4 sm:p-5 ${r.removed ? "bg-stone-100 opacity-60" : "hover:bg-stone-50/50"} transition-colors`}>
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center ${r.removed ? "bg-stone-200 text-stone-500" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                                <RIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`font-semibold text-stone-900 text-[14px] sm:text-base ${r.removed ? "line-through" : ""}`} style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                                    {r.name}
                                  </span>
                                  <Badge variant="outline" className="text-[10px] sm:text-xs bg-stone-50 font-normal">
                                    {lang === "zh" ? r.typeZh : r.typeEn}
                                  </Badge>
                                </div>
                                <div className="text-[12px] sm:text-sm text-stone-600 mt-1 break-words">{r.addr}</div>
                                {(r.warningZh || r.warningEn) && (
                                  <div className="text-[10px] sm:text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 mt-2 inline-block">
                                    {lang === "zh" ? r.warningZh : r.warningEn}
                                  </div>
                                )}
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs">
                                  <span className="text-stone-700 font-medium">
                                    <Calendar className="inline h-3 w-3 mr-1 -mt-0.5" />
                                    {lang === "zh" ? r.suggestedZh : r.suggestedEn}
                                  </span>
                                  {!r.removed && r.addr && r.addr !== "(N/A)" && (
                                    <MapButton addr={r.addr} lang={lang} />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* PRACTICAL TAB */}
            <TabsContent value="practical" className="mt-0">
              <div className="py-8 sm:py-12 space-y-8">
                <SectionHeading
                  eyebrow={bi("實用資訊", "Practical")}
                  title={bi("旅行細節速查", "Quick Reference")}
                  subtitle={bi("天氣、時差、付款、通訊、交通、緊急聯絡，一頁解決。", "Weather, jet lag, payment, connectivity, transit, and emergency contacts on a single page.")}
                  lang={lang}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {practicalInfo.map((section) => {
                    const SIcon = section.icon;
                    return (
                      <Card key={section.id} className="border-stone-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              <SIcon className="h-4 w-4" />
                            </span>
                            {t(section.title, lang)}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-[13px] sm:text-sm divide-y divide-stone-100">
                            {section.items.map((item, i) => (
                              <div key={i} className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] gap-2 sm:gap-3 py-2.5">
                                <div className="text-stone-500 text-[11px] sm:text-xs uppercase tracking-wider font-medium leading-snug">{t(item.label, lang)}</div>
                                <div className="text-stone-800 leading-relaxed">{t(item.value, lang)}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* CHECKLIST TAB */}
            <TabsContent value="checklist" className="mt-0">
              <div className="py-8 sm:py-12 space-y-6">
                <SectionHeading
                  eyebrow={bi("行前準備", "Pre-Trip")}
                  title={bi("四階段確認清單", "Four-Stage Checklist")}
                  subtitle={bi("從一個月前到出發當日，照表勾選即可。", "From one month out through departure day, check items off as you go.")}
                  lang={lang}
                />
                <div className="space-y-4 sm:space-y-5">
                  {preTripChecklist.map((phase, idx) => {
                    const colors = [
                      "border-l-red-500 bg-red-50/50",
                      "border-l-orange-500 bg-orange-50/50",
                      "border-l-amber-500 bg-amber-50/50",
                      "border-l-emerald-500 bg-emerald-50/50",
                    ];
                    return (
                      <Card key={idx} className={`border-l-4 ${colors[idx]} border-stone-200`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-900 text-amber-100 flex items-center justify-center font-mono text-xs font-semibold">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <CardTitle className="text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                              {t(phase.title, lang)}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pl-4">
                          <ul className="space-y-2.5">
                            {phase.items.map((item, i) => (
                              <li key={i} className="flex gap-3 text-[13px] sm:text-sm text-stone-800">
                                <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-stone-300 mt-0.5" />
                                <span className="leading-relaxed">{t(item, lang)}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-amber-100 mt-16 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-[13px] sm:text-sm">
            <div>
              <div className="text-amber-200 mb-3 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                {lang === "zh" ? "住宿" : "Lodging"}
              </div>
              <div className="space-y-1.5 text-[12px] sm:text-xs text-amber-100/75 leading-relaxed">
                <div>The Revolution Hotel · 40 Berkeley St</div>
                <div>4211 Suites · 4211 Chestnut St</div>
                <div>{lang === "zh" ? "紐約：待提供" : "New York: TBC"}</div>
              </div>
            </div>
            <div>
              <div className="text-amber-200 mb-3 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                {lang === "zh" ? "畢業典禮" : "Commencement"}
              </div>
              <div className="space-y-1.5 text-[12px] sm:text-xs text-amber-100/75 leading-relaxed">
                <div>4/29 Fenway Park · 10:00 AM</div>
                <div>4/30 Leader Bank Pavilion · 6:00 PM</div>
                <div className="break-all">news.northeastern.edu/commencement-2026</div>
              </div>
            </div>
            <div>
              <div className="text-amber-200 mb-3 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                {lang === "zh" ? "緊急聯絡" : "Emergency"}
              </div>
              <div className="space-y-1.5 text-[12px] sm:text-xs text-amber-100/75 leading-relaxed">
                <div>{lang === "zh" ? "緊急電話" : "Emergency"}: 911</div>
                <div>Northeastern: (617) 373-3333</div>
                <div>HKETO NY: (212) 752-3320</div>
              </div>
            </div>
            <div>
              <div className="text-amber-200 mb-3 text-base sm:text-lg" style={{ fontFamily: '"PingFang TC", Georgia, serif' }}>
                {lang === "zh" ? "交通速查" : "Transit"}
              </div>
              <div className="space-y-1.5 text-[12px] sm:text-xs text-amber-100/75 leading-relaxed">
                <div>Amtrak: 1-800-USA-RAIL</div>
                <div>MBTA: mbta.com</div>
                <div>Avis BO4: (617) 534-1404</div>
              </div>
            </div>
          </div>
          <Separator className="my-7 sm:my-8 bg-amber-900/30" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] sm:text-xs text-amber-200/55">
            <div>{t(meta.title, lang)} · {meta.dates}</div>
            <div className="font-mono">v6 · Bilingual Edition</div>
          </div>
        </div>
      </footer>

      {/* FLOATING LANGUAGE TOGGLE */}
      <LanguageToggle lang={lang} setLang={setLang} />
    </div>
  );
}
