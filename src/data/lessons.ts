export interface DialogueLine {
  speaker: string;
  indonesian: string;
  chinese: string;
  tip?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  level: "入门" | "初级" | "进阶";
  scene: string;
  cultureNote: string;
  lines: DialogueLine[];
  vocab: { word: string; meaning: string }[];
}

export const lessons: Lesson[] = [
  {
    id: "greeting",
    title: "见面打招呼",
    subtitle: "第一次和印尼朋友见面",
    level: "入门",
    scene: "在雅加达的朋友聚会上",
    cultureNote:
      "印尼人非常重视问候。见面时说「Apa kabar?」（你好吗）是基本礼貌，回答「Baik」（很好）后记得回问对方。握手要轻，许多人会用右手轻触胸口表示真诚。",
    lines: [
      {
        speaker: "Andi",
        indonesian: "Halo! Selamat pagi. Nama saya Andi.",
        chinese: "你好！早上好。我叫安迪。",
        tip: "Selamat pagi = 早上好（10点前用）",
      },
      {
        speaker: "你",
        indonesian: "Selamat pagi, Andi. Nama saya Mei. Senang bertemu denganmu.",
        chinese: "早上好，安迪。我叫小美。很高兴认识你。",
        tip: "Senang bertemu denganmu = 很高兴认识你",
      },
      {
        speaker: "Andi",
        indonesian: "Senang bertemu denganmu juga. Apa kabar?",
        chinese: "我也很高兴认识你。你好吗？",
      },
      {
        speaker: "你",
        indonesian: "Baik, terima kasih. Kamu bagaimana?",
        chinese: "很好，谢谢。你呢？",
        tip: "Baik = 好；terima kasih = 谢谢",
      },
      {
        speaker: "Andi",
        indonesian: "Saya baik juga. Dari mana asalmu?",
        chinese: "我也很好。你来自哪里？",
      },
      {
        speaker: "你",
        indonesian: "Saya dari Tiongkok. Ini pertama kali saya di Indonesia.",
        chinese: "我来自中国。这是我第一次来印尼。",
      },
    ],
    vocab: [
      { word: "Halo", meaning: "你好" },
      { word: "Selamat pagi", meaning: "早上好" },
      { word: "Apa kabar?", meaning: "你好吗？" },
      { word: "Baik", meaning: "好 / 很好" },
      { word: "Terima kasih", meaning: "谢谢" },
      { word: "Nama saya...", meaning: "我叫……" },
    ],
  },
  {
    id: "market",
    title: "市场砍价",
    subtitle: "在传统市场买到好价钱",
    level: "初级",
    scene: "巴厘岛乌布传统市场",
    cultureNote:
      "在印尼传统市场砍价是常态，也是一种社交乐趣。保持微笑、语气轻松，砍到六七折很常见。说「Mahal sekali!」（太贵了！）配合夸张的表情，摊主通常会笑着降价。",
    lines: [
      {
        speaker: "摊主",
        indonesian: "Silakan dilihat-lihat, Mbak! Batiknya bagus-bagus.",
        chinese: "随便看看，小姐！这些蜡染布都很漂亮。",
        tip: "Mbak = 对年轻女性的称呼；Mas = 对年轻男性",
      },
      {
        speaker: "你",
        indonesian: "Ini berapa harganya, Bu?",
        chinese: "这个多少钱，阿姨？",
        tip: "Berapa harganya = 多少钱",
      },
      {
        speaker: "摊主",
        indonesian: "Itu seratus lima puluh ribu rupiah.",
        chinese: "那个十五万印尼盾。",
      },
      {
        speaker: "你",
        indonesian: "Wah, mahal sekali! Bisa kurang?",
        chinese: "哇，太贵了！可以便宜点吗？",
        tip: "Bisa kurang? = 能便宜吗？砍价金句",
      },
      {
        speaker: "摊主",
        indonesian: "Berapa Mbak mau bayar?",
        chinese: "小姐你想出多少钱？",
      },
      {
        speaker: "你",
        indonesian: "Delapan puluh ribu, bagaimana?",
        chinese: "八万，怎么样？",
      },
      {
        speaker: "摊主",
        indonesian: "Aduh, terlalu murah. Seratus ribu saja, ya?",
        chinese: "哎呀，太便宜了。十万吧，好吗？",
      },
      {
        speaker: "你",
        indonesian: "Baik, seratus ribu. Terima kasih, Bu!",
        chinese: "好，十万成交。谢谢阿姨！",
      },
    ],
    vocab: [
      { word: "Berapa harganya?", meaning: "多少钱？" },
      { word: "Mahal sekali!", meaning: "太贵了！" },
      { word: "Bisa kurang?", meaning: "能便宜点吗？" },
      { word: "Murah", meaning: "便宜" },
      { word: "Ribu", meaning: "千（价格单位）" },
      { word: "Rupiah", meaning: "印尼盾" },
    ],
  },
  {
    id: "restaurant",
    title: "餐厅点餐",
    subtitle: "在 Warung 点地道美食",
    level: "初级",
    scene: "日惹街边的 Warung（小餐馆）",
    cultureNote:
      "Warung 是印尼最常见的小餐馆。点餐时说「Pedas?」（辣吗）很重要——印尼菜普遍偏辣。不吃辣就说「Tidak pedas, ya」。饭后说「Enak sekali!」（太好吃了）会让老板非常开心。",
    lines: [
      {
        speaker: "服务员",
        indonesian: "Selamat malam! Mau pesan apa?",
        chinese: "晚上好！想点些什么？",
        tip: "Selamat malam = 晚上好（天黑后用）",
      },
      {
        speaker: "你",
        indonesian: "Saya mau nasi goreng satu. Pedas atau tidak?",
        chinese: "我要一份印尼炒饭。辣不辣？",
        tip: "Nasi goreng = 印尼炒饭，国民美食",
      },
      {
        speaker: "服务员",
        indonesian: "Sedikit pedas. Mau yang tidak pedas?",
        chinese: "有点辣。要不辣的吗？",
      },
      {
        speaker: "你",
        indonesian: "Tidak pedas, ya. Terus es teh manis satu.",
        chinese: "不辣的，谢谢。再来一杯甜冰茶。",
        tip: "Es teh manis = 甜冰茶，印尼国民饮料",
      },
      {
        speaker: "服务员",
        indonesian: "Baik. Ada lagi?",
        chinese: "好的。还要别的吗？",
      },
      {
        speaker: "你",
        indonesian: "Sudah, itu saja. Berapa semuanya?",
        chinese: "够了，就这些。一共多少钱？",
      },
      {
        speaker: "服务员",
        indonesian: "Tiga puluh lima ribu rupiah.",
        chinese: "三万五千印尼盾。",
      },
      {
        speaker: "你",
        indonesian: "Ini uangnya. Enak sekali, terima kasih!",
        chinese: "给你钱。太好吃了，谢谢！",
      },
    ],
    vocab: [
      { word: "Mau pesan apa?", meaning: "想点什么？" },
      { word: "Nasi goreng", meaning: "印尼炒饭" },
      { word: "Pedas", meaning: "辣" },
      { word: "Es teh manis", meaning: "甜冰茶" },
      { word: "Berapa semuanya?", meaning: "一共多少钱？" },
      { word: "Enak sekali!", meaning: "太好吃了！" },
    ],
  },
  {
    id: "directions", title: "问路与出行", subtitle: "找到车站，轻松走到目的地", level: "初级", scene: "日惹街头，前往火车站",
    cultureNote: "向陌生人问路可以先说 Permisi（打扰一下）。在问句末尾加 ya，语气通常会更柔和。听完路线后，记得说 Terima kasih。",
    lines: [
      { speaker: "你", indonesian: "Permisi, stasiun di mana, ya?", chinese: "打扰一下，请问火车站在哪里？", tip: "Di mana = 在哪里" },
      { speaker: "路人", indonesian: "Lurus saja dari sini, lalu belok kiri.", chinese: "从这里直走，然后左转。", tip: "Belok kiri = 左转；belok kanan = 右转" },
      { speaker: "你", indonesian: "Masih jauh dari sini?", chinese: "离这里还远吗？" },
      { speaker: "路人", indonesian: "Tidak, dekat. Sekitar lima menit jalan kaki.", chinese: "不远，很近。走路大概五分钟。" },
      { speaker: "你", indonesian: "Baik, terima kasih banyak!", chinese: "好的，非常感谢！" },
      { speaker: "路人", indonesian: "Sama-sama. Hati-hati di jalan.", chinese: "不客气。路上小心。" },
    ],
    vocab: [{ word: "Permisi", meaning: "打扰一下" }, { word: "Di mana?", meaning: "在哪里？" }, { word: "Belok kiri", meaning: "左转" }, { word: "Jalan kaki", meaning: "步行" }, { word: "Dekat", meaning: "近" }, { word: "Lurus", meaning: "直走" }],
  },
  {
    id: "hotel", title: "酒店入住", subtitle: "办理入住，询问早餐与房间", level: "初级", scene: "巴厘岛酒店前台",
    cultureNote: "递交护照或付款时，使用右手或双手比较礼貌。询问是否包含早餐可以说 Sudah termasuk sarapan?，避免把早餐是否收费当作默认。",
    lines: [
      { speaker: "你", indonesian: "Selamat siang, saya mau check-in.", chinese: "中午好，我想办理入住。" },
      { speaker: "前台", indonesian: "Baik, atas nama siapa pesanannya?", chinese: "好的，请问用谁的名字预订的？", tip: "Atas nama = 以……的名字" },
      { speaker: "你", indonesian: "Atas nama Mei. Ini paspor saya.", chinese: "用小美的名字。这是我的护照。" },
      { speaker: "前台", indonesian: "Kamar Anda di lantai dua. Ini kuncinya.", chinese: "您的房间在二楼。这是钥匙。" },
      { speaker: "你", indonesian: "Sudah termasuk sarapan?", chinese: "包含早餐吗？", tip: "Termasuk = 包含" },
      { speaker: "前台", indonesian: "Sudah. Sarapan mulai jam tujuh di restoran.", chinese: "包含了。早餐七点开始，在餐厅用餐。" },
    ],
    vocab: [{ word: "Paspor", meaning: "护照" }, { word: "Kamar", meaning: "房间" }, { word: "Lantai dua", meaning: "二楼" }, { word: "Sarapan", meaning: "早餐" }, { word: "Kunci", meaning: "钥匙" }, { word: "Termasuk", meaning: "包含" }],
  },
  {
    id: "friends", title: "交朋友与邀约", subtitle: "聊聊生活，约一杯咖啡", level: "进阶", scene: "雅加达咖啡馆，与新朋友聊天",
    cultureNote: "Ngopi 是日常口语里的「喝咖啡」，也常用来邀请朋友小聚。Kapan-kapan 表示「改天、有空的时候」，不一定是已经确定的约会时间。",
    lines: [
      { speaker: "Andi", indonesian: "Kamu tinggal di mana sekarang?", chinese: "你现在住在哪里？" },
      { speaker: "你", indonesian: "Saya tinggal di Jakarta. Saya baru pindah ke sini.", chinese: "我住在雅加达。我刚搬到这里。", tip: "Baru pindah = 刚搬来" },
      { speaker: "Andi", indonesian: "Wah, selamat datang! Kamu suka kopi?", chinese: "哇，欢迎！你喜欢咖啡吗？" },
      { speaker: "你", indonesian: "Suka! Ada kafe yang enak di dekat sini?", chinese: "喜欢！附近有什么不错的咖啡馆吗？" },
      { speaker: "Andi", indonesian: "Ada. Besok sore kita ngopi, yuk!", chinese: "有。明天下午我们一起喝咖啡吧！", tip: "Yuk = 一起……吧，用于邀约" },
      { speaker: "你", indonesian: "Boleh! Sampai ketemu besok.", chinese: "好啊！明天见。" },
    ],
    vocab: [{ word: "Tinggal", meaning: "居住" }, { word: "Baru pindah", meaning: "刚搬来" }, { word: "Ngopi", meaning: "喝咖啡" }, { word: "Besok", meaning: "明天" }, { word: "Suka", meaning: "喜欢" }, { word: "Sampai ketemu", meaning: "回头见" }],
  },
  {
    id: "polite", title: "称呼与礼貌用语", subtitle: "叫对人，说对话", level: "入门", scene: "印尼邻居来串门",
    cultureNote: "印尼人习惯用称呼代替名字：Bapak（先生，口语简称 Pak）、Ibu（女士，简称 Bu）表示尊重；对年轻男性说 Mas，年轻女性说 Mbak，年龄相仿的人可以叫 Kakak（Kak）。指路、递东西用右手或拇指，用食指指人不太礼貌。",
    lines: [
      { speaker: "Pak Budi", indonesian: "Selamat siang, Kak. Anda tamu baru di sini, ya?", chinese: "中午好，你是这里新来的客人吧？", tip: "Kak = Kakak，对年龄相仿者的亲切称呼" },
      { speaker: "你", indonesian: "Selamat siang, Pak. Betul, saya tinggal di rumah sebelah.", chinese: "中午好，先生。是的，我住隔壁那栋。", tip: "Sebelah = 隔壁" },
      { speaker: "Pak Budi", indonesian: "Kalau butuh sesuatu, silakan tanya saya saja.", chinese: "有需要的话，尽管问我。", tip: "Silakan = 请、尽管" },
      { speaker: "你", indonesian: "Terima kasih banyak, Pak. Permisi, saya mau lewat.", chinese: "非常感谢，先生。打扰一下，我想借过。", tip: "Permisi = 打扰一下（要从人前经过时说）" },
      { speaker: "Pak Budi", indonesian: "Iya, tidak apa-apa. Sama-sama, ya.", chinese: "好的，没关系。不客气。", tip: "Sama-sama = 不客气" },
      { speaker: "你", indonesian: "Maaf, Pak. Saya harus pergi dulu. Sampai jumpa!", chinese: "抱歉先生，我先走了。再见！", tip: "Sampai jumpa = 再见" },
    ],
    vocab: [{ word: "Bapak", meaning: "先生、叔叔（尊称）" }, { word: "Ibu", meaning: "女士、阿姨（尊称）" }, { word: "Mas", meaning: "对年轻男性的称呼" }, { word: "Mbak", meaning: "对年轻女性的称呼" }, { word: "Permisi", meaning: "打扰一下" }, { word: "Maaf", meaning: "抱歉" }, { word: "Sama-sama", meaning: "不客气" }, { word: "Tidak apa-apa", meaning: "没关系" }],
  },
  {
    id: "taxi", title: "打车与说目的地", subtitle: "上车、报地址、顺利到地方", level: "初级", scene: "雅加达街头，上网约车",
    cultureNote: "在雅加达、巴厘岛出行最常用 Gojek、Grab 这类手机应用。上车前先核对司机姓名和车牌（司机通常会说「Nama saya Budi」），并确认「Bisa antar sampai depan?」（能送到门口吗）。印尼城市堵车叫 macet，赶飞机一定要留足时间。",
    lines: [
      { speaker: "司机", indonesian: "Selamat pagi, benar dengan Mbak Mei?", chinese: "早上好，请问是小美女士吗？", tip: "Benar dengan… = 是……吗（司机核对乘客）" },
      { speaker: "你", indonesian: "Benar, Pak. Mobilnya yang putih, ya?", chinese: "是的，先生。是那辆白色的车吧？", tip: "Yang putih = 那辆白色的" },
      { speaker: "司机", indonesian: "Iya. Mau diantar ke mana, Mbak?", chinese: "是的。要送您去哪儿？", tip: "Ke mana = 去哪里" },
      { speaker: "你", indonesian: "Ke hotel di Jalan Sudirman, ya. Bisa antar sampai depan?", chinese: "去 Sudirman 路上的酒店。能送到正门吗？", tip: "Ke + 地点 = 去……；depan = 前面、正门" },
      { speaker: "司机", indonesian: "Siap. Sekarang agak macet, ya. Sedikit lama.", chinese: "好的。现在有点堵，可能要久一点。", tip: "Macet = 堵车，印尼出行高频词" },
      { speaker: "你", indonesian: "Tidak apa-apa. Boleh berhenti di gerbang saja?", chinese: "没关系。在大门那里停就行吗？", tip: "Boleh = 可以（请求允许）" },
      { speaker: "司机", indonesian: "Boleh. Sampai sudah, Mbak.", chinese: "可以。到了。", tip: "Sampai sudah = 到了" },
      { speaker: "你", indonesian: "Terima kasih, Pak. Kembaliannya ambil saja.", chinese: "谢谢您，先生。零钱您留着吧。", tip: "Kembaliannya ambil saja = 零钱不用找了" },
    ],
    vocab: [{ word: "Ke mana?", meaning: "去哪里？" }, { word: "Diantar", meaning: "送到、被送去" }, { word: "Macet", meaning: "堵车" }, { word: "Boleh?", meaning: "可以吗？" }, { word: "Berhenti", meaning: "停车、停下" }, { word: "Kembalian", meaning: "找零" }],
  },
  {
    id: "money", title: "换钱与付款", subtitle: "换印尼盾，问清能不能扫码", level: "初级", scene: "巴厘岛的官方兑换点",
    cultureNote: "换钱请找银行或有执照的官方兑换点，不要在街上跟人私下换。印尼小店现在普遍支持 QRIS 扫码付款，也可以问「Bisa transfer?」（能转账吗）。现金要递到对方手里、不要扔在柜台上，找零当面数清楚更稳妥。",
    lines: [
      { speaker: "你", indonesian: "Permisi, di sini bisa tukar uang?", chinese: "打扰一下，这里可以换钱吗？", tip: "Tukar uang = 换钱" },
      { speaker: "柜员", indonesian: "Bisa. Mau tukar berapa, Mbak?", chinese: "可以。您要换多少？" },
      { speaker: "你", indonesian: "Tiga juta rupiah, ya. Kurs hari ini berapa?", chinese: "换三百万印尼盾。今天的汇率是多少？", tip: "Juta = 百万；kurs = 汇率" },
      { speaker: "柜员", indonesian: "Kurs hari ini satu dolar sepuluh ribu tiga ratus.", chinese: "今天一美元兑一万零三百印尼盾。", tip: "Sepuluh ribu tiga ratus = 10,300" },
      { speaker: "你", indonesian: "Baik, saya tukar tiga juta.", chinese: "好的，我换三百万。" },
      { speaker: "柜员", indonesian: "Ini uangnya. Sudah dihitung?", chinese: "这是您的钱。数过了吗？", tip: "Sudah dihitung? = 数过了吗？" },
      { speaker: "你", indonesian: "Sudah, terima kasih. Bisa bayar pakai QRIS?", chinese: "数过了，谢谢。能用 QRIS 付款吗？", tip: "Pakai = 用（某种方式或工具）" },
      { speaker: "柜员", indonesian: "Bisa. Scan kode ini, ya.", chinese: "可以。扫这个码。", tip: "Scan = 扫码" },
    ],
    vocab: [{ word: "Tukar uang", meaning: "换钱" }, { word: "Kurs", meaning: "汇率" }, { word: "Uang tunai", meaning: "现金" }, { word: "Transfer", meaning: "转账" }, { word: "Bayar", meaning: "付款" }, { word: "Scan", meaning: "扫码" }],
  },
  {
    id: "doctor", title: "看病与买药", subtitle: "说清哪里不舒服", level: "进阶", scene: "当地的诊所（klinik）",
    cultureNote: "小毛病在印尼常直接去药房（apotek）跟药剂师说，他们会给出常见药。发烧、腹泻去 klinik（诊所）更合适，不少诊所的医生能说英语。描述症状时用「Saya … sejak kemarin」（我从昨天开始……），对方很容易听懂。",
    lines: [
      { speaker: "护士", indonesian: "Selamat pagi, mau periksa apa?", chinese: "早上好，哪里不舒服？", tip: "Periksa = 检查、看病" },
      { speaker: "你", indonesian: "Saya demam dan sakit kepala sejak kemarin.", chinese: "我从昨天开始发烧、头痛。", tip: "Sejak kemarin = 从昨天起" },
      { speaker: "护士", indonesian: "Sudah makan? Ada obat yang tidak cocok?", chinese: "吃过东西了吗？有没有不能吃的药？", tip: "Obat = 药" },
      { speaker: "你", indonesian: "Belum. Saya tidak punya alergi obat.", chinese: "还没。我没有药物过敏。", tip: "Belum = 还没" },
      { speaker: "护士", indonesian: "Baik. Ini obatnya, diminum setelah makan.", chinese: "好的。这是药，饭后吃。", tip: "Setelah makan = 饭后" },
      { speaker: "你", indonesian: "Sehari berapa kali, ya?", chinese: "一天吃几次？", tip: "Sehari = 一天（之内）" },
      { speaker: "护士", indonesian: "Tiga kali sehari. Banyak minum air putih, ya.", chinese: "一天三次。要多喝白开水。", tip: "Air putih = 白开水" },
      { speaker: "你", indonesian: "Baik, terima kasih. Kalau belum sembuh, saya kembali lagi.", chinese: "好的，谢谢。如果还没好，我再过来。", tip: "Sembuh = 病好了" },
    ],
    vocab: [{ word: "Demam", meaning: "发烧" }, { word: "Sakit kepala", meaning: "头痛" }, { word: "Obat", meaning: "药" }, { word: "Alergi", meaning: "过敏" }, { word: "Sehari", meaning: "一天（之内）" }, { word: "Sembuh", meaning: "痊愈" }],
  },
  {
    id: "whatsapp", title: "用 WhatsApp 约人", subtitle: "发语音、约时间、说我在路上", level: "进阶", scene: "和新朋友在 WhatsApp 上聊天",
    cultureNote: "印尼人日常沟通几乎都在 WhatsApp 上，语音消息（voice note）特别常用。打字时爱缩写：yg = yang，sdh = sudah，tp = tapi，ga/gak = tidak，makasih = terima kasih，otw = on the way。看到这些不用慌，意思和全写一样。",
    lines: [
      { speaker: "Andi", indonesian: "Halo Mei, apa kabar? Lagi di mana?", chinese: "嗨小美，你好吗？在哪儿呢？", tip: "Lagi = 正在（口语里的 sedang）" },
      { speaker: "你", indonesian: "Halo! Aku lagi di rumah. Nanti sore sibuk tidak?", chinese: "嗨！我在家。今天下午忙吗？", tip: "Nanti = 待会儿、回头" },
      { speaker: "Andi", indonesian: "Tidak sibuk. Kita ngopi jam empat, ya?", chinese: "不忙。我们四点喝咖啡吧？", tip: "Jam empat = 四点" },
      { speaker: "你", indonesian: "Boleh! Aku kabarin dulu kalau aku telat, ya.", chinese: "好啊！要是我迟到了，我先跟你说一声。", tip: "Kabarin = 通知一声（口语）" },
      { speaker: "Andi", indonesian: "Oke, aku tunggu di kafe biasa.", chinese: "好，我在老地方那家咖啡馆等你。", tip: "Biasa = 平常的、老（地方）" },
      { speaker: "你", indonesian: "Siap. Aku otw, ya. Sepuluh menit sampai.", chinese: "收到。我在路上了，十分钟到。", tip: "Otw = on the way，路上常用缩写" },
      { speaker: "Andi", indonesian: "Sip. Nanti aku pesankan tempat.", chinese: "好。我帮你占个位。", tip: "Pesankan = 帮忙占位、帮忙预订" },
    ],
    vocab: [{ word: "Lagi", meaning: "正在（口语）" }, { word: "Nanti", meaning: "待会儿、回头" }, { word: "Kabarin", meaning: "通知一声" }, { word: "Otw", meaning: "在路上" }, { word: "Telat", meaning: "迟到" }, { word: "Sip", meaning: "没问题" }],
  },
  {
    id: "tour", title: "景点门票与拍照", subtitle: "买票、请人帮忙拍照", level: "初级", scene: "巴厘岛乌布梯田景区",
    cultureNote: "进寺庙和一些圣地需要围上纱笼（sarong）并系上腰带，肩膀和膝盖要遮住，景区门口通常可以借。请人帮忙拍照说「Boleh tolong fotoin, ya?」，拍完可以问「Bisa dikirim?」（能发给我吗）。",
    lines: [
      { speaker: "你", indonesian: "Permisi, berapa harga tiket masuk?", chinese: "打扰一下，门票多少钱？", tip: "Tiket masuk = 门票" },
      { speaker: "售票员", indonesian: "Dua puluh ribu untuk satu orang.", chinese: "一个人两万印尼盾。", tip: "Untuk satu orang = 每人" },
      { speaker: "你", indonesian: "Sudah termasuk pemandu?", chinese: "包含向导吗？", tip: "Pemandu = 向导" },
      { speaker: "售票员", indonesian: "Sudah. Pemandu menunggu di sebelah sana.", chinese: "包含。向导在那边等。", tip: "Sebelah sana = 那边" },
      { speaker: "你", indonesian: "Baik. Boleh tolong fotoin saya di sini, ya?", chinese: "好的。能在这里帮我拍张照吗？", tip: "Tolong fotoin = 帮忙拍照" },
      { speaker: "工作人员", indonesian: "Bisa. Satu, dua, tiga! Sudah, ya.", chinese: "可以。一、二、三！好了。" },
      { speaker: "你", indonesian: "Bisa dikirim lewat WhatsApp?", chinese: "能通过 WhatsApp 发给我吗？", tip: "Lewat = 通过" },
      { speaker: "工作人员", indonesian: "Bisa. Nanti saya kirim.", chinese: "可以，我回头发给您。", tip: "Nanti = 待会儿、回头" },
    ],
    vocab: [{ word: "Tiket masuk", meaning: "门票" }, { word: "Pemandu", meaning: "向导" }, { word: "Tolong fotoin", meaning: "帮忙拍照" }, { word: "Sebelah sana", meaning: "那边" }, { word: "Lewat", meaning: "通过" }, { word: "Kirim", meaning: "发送" }],
  },
];

export interface QuizQuestion {
  question: string;
  audio: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "听录音，这句话是什么意思？",
    audio: "Apa kabar?",
    options: ["你叫什么名字？", "你好吗？", "多少钱？", "再见"],
    answer: 1,
    explanation: "「Apa kabar?」是最常用的问候语，意思是「你好吗？」",
  },
  {
    question: "听录音，这句话是什么意思？",
    audio: "Bisa kurang?",
    options: ["可以加辣吗？", "可以便宜点吗？", "可以打包吗？", "可以刷卡吗？"],
    answer: 1,
    explanation: "「Bisa kurang?」是砍价金句：能便宜点吗？",
  },
  {
    question: "在餐厅不想吃辣，你应该说：",
    audio: "Tidak pedas, ya.",
    options: ["Pedas sekali", "Tidak pedas, ya", "Enak sekali", "Sedikit pedas"],
    answer: 1,
    explanation: "「Tidak pedas」= 不辣。加上「ya」语气更柔和礼貌。",
  },
  {
    question: "听录音，对方在说什么？",
    audio: "Terima kasih banyak!",
    options: ["非常抱歉！", "非常感谢！", "不客气！", "请再说一遍！"],
    answer: 1,
    explanation: "「Terima kasih banyak」= 非常感谢，banyak 表示「很多/非常」。",
  },
  {
    question: "摊主说「Seratus ribu」，价格是：",
    audio: "Seratus ribu rupiah.",
    options: ["一万印尼盾", "十万印尼盾", "一百万印尼盾", "一千印尼盾"],
    answer: 1,
    explanation: "Seratus = 一百，ribu = 千，所以是十万印尼盾。",
  },
];
