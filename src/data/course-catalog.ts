import cafeImage from "@/assets/hero-warung.jpg";
import marketImage from "@/assets/course-market.jpg";
import directionsImage from "@/assets/course-directions.jpg";
import hotelImage from "@/assets/course-hotel.jpg";
import taxiImage from "@/assets/course-taxi.jpg";
import moneyImage from "@/assets/course-money.jpg";
import clinicImage from "@/assets/course-clinic.jpg";
import templeImage from "@/assets/course-temple.jpg";
import neighborImage from "@/assets/course-neighbor.jpg";
import whatsappImage from "@/assets/course-whatsapp.jpg";

export const courseGroups = ["全部课程", "日常交流", "旅行生活", "生活办事", "社交进阶"] as const;
export type CourseGroup = (typeof courseGroups)[number];

export const courseDetails: Record<string, { category: CourseGroup; image: string; label: string }> = {
  greeting: { category: "日常交流", image: cafeImage, label: "认识彼此" },
  polite: { category: "日常交流", image: neighborImage, label: "学会称呼与礼貌" },
  market: { category: "旅行生活", image: marketImage, label: "逛一逛市场" },
  restaurant: { category: "旅行生活", image: cafeImage, label: "尝尝当地味道" },
  directions: { category: "旅行生活", image: directionsImage, label: "走进城市" },
  hotel: { category: "旅行生活", image: hotelImage, label: "旅途安顿下来" },
  taxi: { category: "旅行生活", image: taxiImage, label: "出门上路" },
  tour: { category: "旅行生活", image: templeImage, label: "去看一看" },
  money: { category: "生活办事", image: moneyImage, label: "把钱换对" },
  doctor: { category: "生活办事", image: clinicImage, label: "不舒服也要说清楚" },
  friends: { category: "社交进阶", image: cafeImage, label: "从认识到朋友" },
  whatsapp: { category: "社交进阶", image: whatsappImage, label: "线上也聊得起来" },
};
