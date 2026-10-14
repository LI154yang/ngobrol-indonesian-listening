import type { PracticeQuestion } from "@/lib/practice";

export interface Story {
  id: string;
  title: string;
  titleId: string;
  level: "初级" | "进阶";
  summary: string;
  paragraphs: { indonesian: string; chinese: string }[];
  vocab: { word: string; meaning: string }[];
  questions: PracticeQuestion[];
}

export const stories: Story[] = [
  {
    id: "hari-pertama",
    title: "在雅加达的第一天",
    titleId: "Hari Pertama di Jakarta",
    level: "初级",
    summary: "小美刚到雅加达，从机场打车、入住到第一次在路边摊吃饭。",
    paragraphs: [
      { indonesian: "Nama saya Mei. Saya berasal dari Tiongkok. Minggu lalu saya pindah ke Jakarta untuk bekerja.", chinese: "我叫小美，来自中国。上周我搬到雅加达工作。" },
      { indonesian: "Pesawat saya mendarat di Bandara Soekarno-Hatta pada pukul tiga sore. Udaranya sangat panas dan lembap.", chinese: "我的飞机下午三点降落在苏加诺-哈达机场。天气非常炎热潮湿。" },
      { indonesian: "Saya memesan taksi online lewat aplikasi. Sopirnya bernama Pak Budi. Dia sangat ramah dan bertanya, \"Mbak dari mana?\"", chinese: "我用应用叫了网约车。司机叫布迪先生，他很友好，问我：“小姐从哪里来？”" },
      { indonesian: "Jalanan Jakarta sangat macet. Perjalanan dari bandara ke apartemen saya memakan waktu hampir dua jam.", chinese: "雅加达的路非常堵。从机场到我的公寓花了将近两个小时。" },
      { indonesian: "Di apartemen, satpam membantu saya membawa koper. Saya berkata, \"Terima kasih banyak, Pak.\" Dia menjawab, \"Sama-sama, Mbak.\"", chinese: "在公寓，保安帮我搬行李箱。我说：“非常感谢您。”他回答：“不客气，小姐。”" },
      { indonesian: "Malamnya saya lapar sekali. Di depan apartemen ada warung kecil yang menjual nasi goreng dan sate ayam.", chinese: "晚上我非常饿。公寓门口有一家小摊，卖炒饭和鸡肉沙爹。" },
      { indonesian: "Saya memesan sepiring nasi goreng dan segelas es teh manis. Harganya hanya dua puluh lima ribu rupiah.", chinese: "我点了一盘炒饭和一杯冰甜茶，只要两万五千印尼盾。" },
      { indonesian: "Ibu penjual tersenyum dan bilang, \"Selamat datang di Jakarta!\" Saya merasa hari pertama saya sangat menyenangkan.", chinese: "卖饭的阿姨笑着说：“欢迎来到雅加达！”我觉得第一天过得非常愉快。" },
    ],
    vocab: [
      { word: "pindah", meaning: "搬家、迁移" }, { word: "mendarat", meaning: "降落" }, { word: "lembap", meaning: "潮湿" },
      { word: "macet", meaning: "堵车" }, { word: "koper", meaning: "行李箱" }, { word: "warung", meaning: "小摊、小饭馆" }, { word: "menyenangkan", meaning: "令人愉快的" },
    ],
    questions: [
      { prompt: "小美为什么来雅加达？", options: ["来工作", "来旅游", "来读书", "来看朋友"], answer: 0, explanation: "untuk bekerja = 为了工作。" },
      { prompt: "从机场到公寓花了多久？", options: ["将近两个小时", "半个小时", "一个小时", "三个小时"], answer: 0, explanation: "hampir dua jam = 将近两个小时，因为 macet（堵车）。" },
      { prompt: "司机布迪先生问了小美什么？", options: ["从哪里来", "要去哪里", "叫什么名字", "要不要吃饭"], answer: 0, explanation: "Mbak dari mana? = 小姐从哪里来？" },
      { prompt: "小美晚饭吃了什么？", options: ["炒饭和冰甜茶", "鸡肉沙爹和咖啡", "炒面和果汁", "米饭和汤"], answer: 0, explanation: "nasi goreng + es teh manis。" },
      { prompt: "晚饭一共多少钱？", options: ["两万五千印尼盾", "五万印尼盾", "一万五千印尼盾", "十万印尼盾"], answer: 0, explanation: "dua puluh lima ribu = 25,000。" },
    ],
  },
  {
    id: "pasar-pagi",
    title: "清晨的菜市场",
    titleId: "Pasar Pagi Bersama Bu Sari",
    level: "初级",
    summary: "邻居萨丽阿姨带小美去传统市场，学会挑水果和讨价还价。",
    paragraphs: [
      { indonesian: "Hari Minggu pagi, tetangga saya, Bu Sari, mengajak saya ke pasar tradisional. Kami berangkat pukul enam.", chinese: "星期天早上，我的邻居萨丽阿姨邀我去传统市场。我们六点出发。" },
      { indonesian: "Pasar sudah ramai sekali. Ada yang menjual sayur, ikan, daging, bumbu, dan buah-buahan.", chinese: "市场已经非常热闹，有卖蔬菜、鱼、肉、香料和各种水果的。" },
      { indonesian: "Bu Sari berkata, \"Kalau mau buah yang segar, harus datang pagi-pagi.\" Saya mengangguk.", chinese: "萨丽阿姨说：“想买新鲜水果就得一大早来。”我点点头。" },
      { indonesian: "Kami berhenti di depan penjual mangga. \"Berapa sekilo, Bu?\" tanya Bu Sari. \"Tiga puluh ribu,\" jawab penjual itu.", chinese: "我们在卖芒果的摊前停下。“一公斤多少钱？”萨丽阿姨问。“三万。”摊主回答。" },
      { indonesian: "\"Wah, mahal sekali. Dua puluh ribu boleh?\" kata Bu Sari sambil tersenyum. Penjual itu tertawa.", chinese: "“哇，太贵了。两万可以吗？”萨丽阿姨笑着说。摊主笑了。" },
      { indonesian: "Akhirnya mereka sepakat dengan harga dua puluh lima ribu. Bu Sari membeli dua kilo mangga.", chinese: "最后他们以两万五成交。萨丽阿姨买了两公斤芒果。" },
      { indonesian: "Bu Sari menjelaskan bahwa menawar di pasar itu biasa, tetapi harus sopan dan tetap tersenyum.", chinese: "萨丽阿姨解释说，在市场砍价很正常，但要有礼貌、保持微笑。" },
      { indonesian: "Sebelum pulang, kami minum kopi tubruk di warung dekat pasar. Saya belajar banyak hal hari itu.", chinese: "回家前，我们在市场旁的小店喝了土耳其式咖啡。那天我学到了很多。" },
    ],
    vocab: [
      { word: "tetangga", meaning: "邻居" }, { word: "mengajak", meaning: "邀请、带上" }, { word: "ramai", meaning: "热闹" },
      { word: "segar", meaning: "新鲜" }, { word: "menawar", meaning: "讨价还价" }, { word: "sepakat", meaning: "达成一致" }, { word: "sopan", meaning: "有礼貌" },
    ],
    questions: [
      { prompt: "她们几点出发去市场？", options: ["六点", "八点", "五点", "十点"], answer: 0, explanation: "pukul enam = 六点。" },
      { prompt: "为什么要一大早去市场？", options: ["水果更新鲜", "人更少", "价格更便宜", "天气更凉快"], answer: 0, explanation: "buah yang segar = 新鲜的水果。" },
      { prompt: "芒果最后的成交价是每公斤多少？", options: ["两万五", "三万", "两万", "一万五"], answer: 0, explanation: "sepakat dengan harga dua puluh lima ribu。" },
      { prompt: "萨丽阿姨买了多少芒果？", options: ["两公斤", "一公斤", "三公斤", "半公斤"], answer: 0, explanation: "dua kilo = 两公斤。" },
      { prompt: "关于砍价，萨丽阿姨的建议是什么？", options: ["要礼貌、保持微笑", "要坚持不让步", "不要砍价", "只能砍一次"], answer: 0, explanation: "harus sopan dan tetap tersenyum。" },
    ],
  },
  {
    id: "liburan-bali",
    title: "巴厘岛的雨天假期",
    titleId: "Liburan Hujan di Bali",
    level: "进阶",
    summary: "原本计划海边度假却遇上大雨，小美意外体验了乌布的手工课与当地仪式。",
    paragraphs: [
      { indonesian: "Bulan lalu saya berlibur ke Bali bersama dua teman kantor. Kami sudah merencanakan perjalanan ini selama tiga bulan.", chinese: "上个月我和两位同事去巴厘岛度假。这次旅行我们计划了三个月。" },
      { indonesian: "Rencananya, kami ingin berenang di Pantai Kuta dan melihat matahari terbenam setiap sore.", chinese: "原本我们打算在库塔海滩游泳，每天傍晚看日落。" },
      { indonesian: "Sayangnya, sejak hari kedua hujan turun terus-menerus. Laut berombak tinggi dan pantai ditutup untuk sementara.", chinese: "可惜从第二天起就一直下雨。海浪很高，海滩暂时关闭了。" },
      { indonesian: "Kami agak kecewa, tetapi pemilik penginapan menyarankan kami pergi ke Ubud, daerah di pegunungan yang terkenal dengan seni.", chinese: "我们有点失望，但民宿老板建议我们去乌布——山区里以艺术闻名的地方。" },
      { indonesian: "Di Ubud, kami mengikuti kelas membatik selama setengah hari. Gurunya sabar sekali dan menjelaskan arti setiap motif.", chinese: "在乌布，我们上了半天的蜡染课。老师非常有耐心，讲解了每个图案的含义。" },
      { indonesian: "Kain batik buatan saya tidak terlalu rapi, tetapi guru itu bilang, \"Yang penting buatan sendiri.\"", chinese: "我做的蜡染布不太整齐，但老师说：“重要的是亲手做的。”" },
      { indonesian: "Sore harinya, kami melihat warga desa berjalan ke pura dengan pakaian adat sambil membawa sesajen. Ternyata hari itu ada upacara.", chinese: "傍晚，我们看到村民穿着传统服装、带着供品走向寺庙。原来那天有仪式。" },
      { indonesian: "Seorang ibu meminjamkan kami selendang agar kami boleh masuk ke halaman pura dengan sopan.", chinese: "一位阿姨借给我们腰带，让我们可以得体地进入寺庙庭院。" },
      { indonesian: "Walaupun kami tidak sempat berenang, liburan ini justru menjadi pengalaman yang paling berkesan bagi kami.", chinese: "虽然我们没能游泳，这次假期反而成了我们最难忘的经历。" },
    ],
    vocab: [
      { word: "merencanakan", meaning: "计划" }, { word: "matahari terbenam", meaning: "日落" }, { word: "terus-menerus", meaning: "持续不断" },
      { word: "kecewa", meaning: "失望" }, { word: "menyarankan", meaning: "建议" }, { word: "sabar", meaning: "耐心" },
      { word: "upacara", meaning: "仪式" }, { word: "sesajen", meaning: "供品" }, { word: "berkesan", meaning: "难忘的" },
    ],
    questions: [
      { prompt: "这次旅行计划了多久？", options: ["三个月", "一个月", "一周", "半年"], answer: 0, explanation: "selama tiga bulan = 三个月。" },
      { prompt: "为什么没能去海滩游泳？", options: ["一直下雨、海滩关闭", "钱不够", "同事生病了", "航班取消"], answer: 0, explanation: "hujan terus-menerus, pantai ditutup。" },
      { prompt: "谁建议她们去乌布？", options: ["民宿老板", "出租车司机", "蜡染老师", "同事"], answer: 0, explanation: "pemilik penginapan = 民宿老板。" },
      { prompt: "蜡染老师说了什么？", options: ["重要的是亲手做的", "做得非常完美", "要再练一次", "颜色太深了"], answer: 0, explanation: "Yang penting buatan sendiri。" },
      { prompt: "阿姨为什么借给她们腰带（selendang）？", options: ["为了得体地进入寺庙", "因为天冷", "作为礼物", "为了拍照"], answer: 0, explanation: "agar boleh masuk ke halaman pura dengan sopan。" },
    ],
  },
];
