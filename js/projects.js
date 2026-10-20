// Project list scraped from ari.ge/projects (EN + KA).
// gallery: photo groups from the project's ari.ge page; kind is "completed",
// "construction", "renders" or null (no heading).
// pin: the photo shown in the map pin (a gallery render/photo; falls back to img).
// Optional fields: status ("ongoing" | "completed"), highlight (photo pin on the
// hero map instead of a plain dot), coords ([lat, lng] for the hero map —
// approximate, placed by street/district; replace with exact points).
window.PROJECTS = [
  {
    id: "toidze-street",
    coords: [41.7083, 44.7838],
    img: "assets/img/projects/toidze-street.jpg",
    pin: "assets/img/projects/toidze-street/03.jpg",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/toidze-street/01.jpg",
        "assets/img/projects/toidze-street/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/toidze-street/03.jpg",
        "assets/img/projects/toidze-street/04.jpg"
      ] }
    ],
    status: "ongoing",
    highlight: true,
    // focus point of the fisheye pin photo (0..1); default is the centre
    fisheye: { x: 0.62, y: 0.45 },
    name: { en: "Toidze Street", ka: "ტოიძის ქუჩა" },
    location: { en: "Old Tbilisi, Tbilisi", ka: "ძველი თბილისი, თბილისი" },
    desc: {
      en: "A modern residential building under construction in a historic district. The facade is designed to blend harmoniously with the surrounding architecture, preserving the authentic character of the area.",
      ka: "ისტორიულ უბანში მშენებარე თანამედროვე საცხოვრებელი კორპუსი, რომლის ფასადიც ჰარმონიულად ერწყმის მიმდებარე განაშენიანებას და ინარჩუნებს ადგილის ავთენტურობას."
    }
  },
  {
    id: "nutsubidze",
    coords: [41.7262, 44.7432],
    img: "assets/img/projects/nutsubidze.webp",
    pin: "assets/img/projects/nutsubidze/03.png",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/nutsubidze/01.jpg",
        "assets/img/projects/nutsubidze/02.jpg",
        "assets/img/projects/nutsubidze/03.png",
        "assets/img/projects/nutsubidze/04.png"
      ] }
    ],
    name: { en: "Nutsubidze Street", ka: "ნუცუბიძის ქუჩა" },
    location: { en: "Saburtalo, Tbilisi", ka: "საბურთალო, თბილისი" },
    desc: {
      en: "Ideal location in the center of Saburtalo, with a metro station, school, clinic, and all necessary facilities nearby that are essential for comfortable living.",
      ka: "იდეალური მდებარეობა საბურთალოს ცენტრში. პროექტის მიმდებარედ არის მეტრო, სკოლა, კლინიკა და ყველა საჭირო ობიექტი, რაც აუცილებელია კომფორტულად ცხოვრებისთვის."
    }
  },
  {
    id: "saingilo",
    coords: [41.6968, 44.8092],
    img: "assets/img/projects/saingilo.webp",
    pin: "assets/img/projects/saingilo/04.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/saingilo/01.jpg",
        "assets/img/projects/saingilo/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/saingilo/03.webp",
        "assets/img/projects/saingilo/04.webp"
      ] }
    ],
    name: { en: "Saingilo", ka: "საინგილო" },
    location: { en: "Old Tbilisi, Tbilisi", ka: "ძველი თბილისი, თბილისი" },
    desc: {
      en: "A four-story project located in Old Tbilisi, featuring an elegant exterior that stands out due to its location and offers stunning views of the entire city.",
      ka: "ძველ თბილისში განხორციელებული 4-სართულიანი პროექტი დახვეწილი ექსტერიერით, რომელიც გამოირჩევა მდებარეობით და არაჩვეულებრივი ხედებით მთელ ქალაქზე."
    }
  },
  {
    id: "lisi-lake",
    coords: [41.7428, 44.7368],
    img: "assets/img/projects/lisi-lake.webp",
    pin: "assets/img/projects/lisi-lake/03.webp",
    gallery: [
      { kind: "construction", photos: [
        "assets/img/projects/lisi-lake/01.jpg",
        "assets/img/projects/lisi-lake/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/lisi-lake/03.webp",
        "assets/img/projects/lisi-lake/04.webp"
      ] }
    ],
    name: { en: "Lisi Lake", ka: "ლისის ტბა" },
    location: { en: "Lisi, Tbilisi", ka: "ლისი, თბილისი" },
    desc: {
      en: "A modern architectural project developed away from the city's noise, in an environmentally friendly setting. Enjoy views of the entire city and fresh air. Lisi Lake — live by the lake.",
      ka: "ქალაქის ხმაურიდან მოშორებით, ეკოლოგიურად სუფთა გარემოში განხორციელებული თანამედროვე არქიტექტურის პროექტი. ხედები მთელ ქალაქზე და სუფთა ჰაერი. Lisi Lake — იცხოვრე ტბასთან."
    }
  },
  {
    id: "modern-ezo",
    coords: [41.7008, 44.7938],
    img: "assets/img/projects/modern-ezo.webp",
    pin: "assets/img/projects/modern-ezo/04.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/modern-ezo/01.jpg",
        "assets/img/projects/modern-ezo/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/modern-ezo/03.webp",
        "assets/img/projects/modern-ezo/04.webp"
      ] }
    ],
    fisheye: { x: 0.57, y: 0.45 },
    name: { en: "Modern Ezo", ka: "მოდერნ ეზო" },
    location: { en: "Historic Tbilisi", ka: "ისტორიული თბილისი" },
    desc: {
      en: "A project in the historic district of Tbilisi with distinctive architecture. We restored the original appearance of a cultural heritage monument and created a project where historical and modern buildings blend harmoniously with Tbilisi's architecture.",
      ka: "თბილისის ისტორიულ უბანში განხორციელებული გამორჩეული არქიტექტურის პროექტი. აღვადგინეთ კულტურული მემკვიდრეობის ძეგლის თავდაპირველი იერსახე და შევქმენით პროექტი, სადაც ისტორიული და თანამედროვე შენობები ჰარმონიულად ერწყმის თბილისის არქიტექტურას."
    }
  },
  {
    id: "vera-hillside",
    coords: [41.7072, 44.7792],
    img: "assets/img/projects/vera-hillside.webp",
    pin: "assets/img/projects/vera-hillside/03.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/vera-hillside/01.jpg",
        "assets/img/projects/vera-hillside/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/vera-hillside/03.webp",
        "assets/img/projects/vera-hillside/04.webp"
      ] }
    ],
    name: { en: "Vera Hillside", ka: "ვერა ჰილსაიდი" },
    location: { en: "Vera, Tbilisi", ka: "ვერა, თბილისი" },
    desc: {
      en: "Another distinctive project of our company in the city center, featuring beautiful views, terraces, and an environmentally friendly setting.",
      ka: "ჩვენი კომპანიის კიდევ ერთი გამორჩეული პროექტი ქალაქის ცენტრში, ლამაზი ხედებით, ტერასებით, ეკოლოგიურად სუფთა გარემოში."
    }
  },
  {
    id: "green-park",
    coords: [41.7318, 44.7542],
    img: "assets/img/projects/green-park.webp",
    pin: "assets/img/projects/green-park/03.png",
    gallery: [
      { kind: "construction", photos: [
        "assets/img/projects/green-park/01.jpg",
        "assets/img/projects/green-park/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/green-park/03.png",
        "assets/img/projects/green-park/04.png"
      ] }
    ],
    name: { en: "Green Park", ka: "მწვანე პარკი" },
    location: { en: "Tbilisi", ka: "თბილისი" },
    desc: {
      en: "2,500 sq. m of recreational space, featuring modern and refined architecture in an ideal location. Green Park offers a distinctive living environment for your peaceful life.",
      ka: "2500 კვ.მ რეკრეაციული სივრცე, თანამედროვე და დახვეწილი არქიტექტურა, იდეალური მდებარეობა. Green Park — გამორჩეული საცხოვრებელი გარემო თქვენი მშვიდი ცხოვრებისთვის."
    }
  },
  {
    id: "park-side",
    coords: [41.7108, 44.7452],
    img: "assets/img/projects/park-side.webp",
    pin: "assets/img/projects/park-side/03.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/park-side/01.jpg",
        "assets/img/projects/park-side/02.jpg",
        "assets/img/projects/park-side/03.jpg",
        "assets/img/projects/park-side/04.jpg"
      ] }
    ],
    name: { en: "Park Side", ka: "პარკსაიდი" },
    location: { en: "Vake, Tbilisi", ka: "ვაკე, თბილისი" },
    desc: {
      en: "A premium-class residential building near Vake Park. This project, located in Tbilisi's most prestigious neighborhood, features modern architecture and an ideal location.",
      ka: "პრემიუმ კლასის საცხოვრებელი კორპუსი ვაკის პარკთან. თბილისის ყველაზე პრესტიჟულ უბანში განხორციელებული პროექტი თანამედროვე არქიტექტურით და იდეალური მდებარეობით."
    }
  },
  {
    id: "didi-digomi",
    coords: [41.7868, 44.7572],
    img: "assets/img/projects/didi-digomi.webp",
    pin: "assets/img/projects/didi-digomi/01.webp",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/didi-digomi/01.webp",
        "assets/img/projects/didi-digomi/02.webp",
        "assets/img/projects/didi-digomi/03.webp",
        "assets/img/projects/didi-digomi/04.webp",
        "assets/img/projects/didi-digomi/05.webp",
        "assets/img/projects/didi-digomi/06.webp",
        "assets/img/projects/didi-digomi/07.webp",
        "assets/img/projects/didi-digomi/08.webp",
        "assets/img/projects/didi-digomi/09.webp",
        "assets/img/projects/didi-digomi/10.webp",
        "assets/img/projects/didi-digomi/11.webp",
        "assets/img/projects/didi-digomi/12.webp",
        "assets/img/projects/didi-digomi/13.webp"
      ] }
    ],
    name: { en: "Didi Digomi", ka: "დიდი დიღომი" },
    location: { en: "Didi Digomi, Tbilisi", ka: "დიდი დიღომი, თბილისი" },
    desc: {
      en: "Another project implemented by our company in Didi Digomi, with an ideal location, well-developed infrastructure, and all the comfort for your life.",
      ka: "ჩვენი კომპანიის მიერ განხორციელებული კიდევ ერთი პროექტი დიდ დიღომში, იდეალური მდებარეობით, კეთილმოწყობილი ინფრასტრუქტურით და ყველანაირი კომფორტით თქვენი ცხოვრებისთვის."
    }
  },
  {
    id: "mukhiani-ergo",
    coords: [41.8078, 44.7898],
    img: "assets/img/projects/mukhiani-ergo.webp",
    pin: "assets/img/projects/mukhiani-ergo/03.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/mukhiani-ergo/01.jpg",
        "assets/img/projects/mukhiani-ergo/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/mukhiani-ergo/03.webp",
        "assets/img/projects/mukhiani-ergo/04.webp"
      ] }
    ],
    name: { en: "Mukhiani Ergo", ka: "მუხიანი ერგო" },
    location: { en: "Mukhiani, Tbilisi", ka: "მუხიანი, თბილისი" },
    desc: {
      en: "Mukhiani Ergo, a modern architecture project in the suburbs of Tbilisi, with an ideal location, close to the metro station.",
      ka: "მუხიანი ერგო — თანამედროვე არქიტექტურის პროექტი თბილისის გარეუბანში, იდეალური ლოკაციით, მეტროსთან ახლოს."
    }
  },
  {
    id: "radio-factory",
    coords: [41.8022, 44.7828],
    img: "assets/img/projects/radio-factory.webp",
    pin: "assets/img/projects/radio-factory/04.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/radio-factory/01.jpg",
        "assets/img/projects/radio-factory/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/radio-factory/03.webp",
        "assets/img/projects/radio-factory/04.webp"
      ] }
    ],
    name: { en: "Radio Factory", ka: "რადიოქარხანა" },
    location: { en: "Mukhiani, Tbilisi", ka: "მუხიანი, თბილისი" },
    desc: {
      en: "A residential building with modern architecture in Mukhiani, near the radio factory, with a square, a kindergarten, a school, and all other necessary facilities that ensure your comfortable living.",
      ka: "თანამედროვე არქიტექტურის საცხოვრებელი კორპუსი მუხიანში, რადიოქარხნის მიმდებარედ. სკვერი, საბავშვო ბაღი, სკოლა და ყველა საჭირო დაწესებულება შენი კომფორტული ცხოვრებისთვის."
    }
  },
  {
    id: "the-quietude",
    coords: [41.7232, 44.7612],
    img: "assets/img/projects/the-quietude.webp",
    pin: "assets/img/projects/the-quietude/03.png",
    gallery: [
      { kind: "construction", photos: [
        "assets/img/projects/the-quietude/01.jpg",
        "assets/img/projects/the-quietude/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/the-quietude/03.png",
        "assets/img/projects/the-quietude/04.png"
      ] }
    ],
    name: { en: "The Quietude", ka: "მშვიდი უბანი" },
    location: { en: "Saburtalo, Tbilisi", ka: "საბურთალო, თბილისი" },
    desc: {
      en: "A small contemporary project in Saburtalo, on one of the quietest streets in central Tbilisi. The Quietude, Vazisubani Street — a place where the city's noise won't disturb you.",
      ka: "ჩვენ მიერ შექმნილი პატარა, თანამედროვე არქიტექტურის პროექტი საბურთალოზე, ერთ-ერთ ყველაზე წყნარ ქუჩაზე. The Quietude, ვაზისუბნის ქუჩა — ადგილი, სადაც ქალაქის ხმაური ვერ შეგაწუხებს."
    }
  },
  {
    id: "barnovi",
    coords: [41.7098, 44.7738],
    img: "assets/img/projects/barnovi.webp",
    pin: "assets/img/projects/barnovi/01.png",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/barnovi/01.png",
        "assets/img/projects/barnovi/02.png",
        "assets/img/projects/barnovi/03.png"
      ] }
    ],
    name: { en: "Barnovi Apartments", ka: "ბარნოვი აპარტმენტსი" },
    location: { en: "Vake, Tbilisi", ka: "ვაკე, თბილისი" },
    desc: {
      en: "A construction project in Tbilisi's most prestigious neighborhood, where a historical monument and modern architecture perfectly reflect the character of Tbilisi.",
      ka: "თბილისის ყველაზე პრესტიჟულ უბანში განხორციელებული პროექტი, სადაც ისტორიული ძეგლი და თანამედროვე არქიტექტურა იდეალურად გამოხატავს თბილისის ხასიათს."
    }
  },
  {
    id: "gogebashvili",
    coords: [41.6938, 44.7972],
    highlight: true,
    img: "assets/img/projects/gogebashvili.jpg",
    pin: "assets/img/projects/gogebashvili/03.webp",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/gogebashvili/01.jpg",
        "assets/img/projects/gogebashvili/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/gogebashvili/03.webp",
        "assets/img/projects/gogebashvili/04.webp"
      ] }
    ],
    name: { en: "Gogebashvili Apartments", ka: "გოგებაშვილი აპარტმენტსი" },
    location: { en: "City center, Tbilisi", ka: "ცენტრი, თბილისი" },
    desc: {
      en: "Our small project with a unique architecture, offering beautiful views, located in the city center but away from the noise.",
      ka: "ჩვენ მიერ შექმნილი განსხვავებული არქიტექტურის პატარა პროექტი ულამაზესი ხედებით, ქალაქის ცენტრში და ხმაურისგან მოშორებით."
    }
  },
  {
    id: "u-tower",
    coords: [41.7018, 44.8038],
    highlight: true,
    img: "assets/img/projects/u-tower.jpg",
    pin: "assets/img/projects/u-tower/02.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/u-tower/01.jpg",
        "assets/img/projects/u-tower/02.jpg",
        "assets/img/projects/u-tower/03.jpg",
        "assets/img/projects/u-tower/04.jpg",
        "assets/img/projects/u-tower/05.jpg",
        "assets/img/projects/u-tower/06.jpg",
        "assets/img/projects/u-tower/07.jpg",
        "assets/img/projects/u-tower/08.jpg",
        "assets/img/projects/u-tower/09.jpg"
      ] }
    ],
    name: { en: "U Tower", ka: "U თაუერი" },
    location: { en: "Old Tbilisi, Tbilisi", ka: "ძველი თბილისი, თბილისი" },
    desc: {
      en: "A high-class project in one of Tbilisi's oldest neighborhoods. Modern architecture, views over the entire city, recreational spaces, and a comfortable environment come together in U Tower.",
      ka: "მაღალი კლასის პროექტი თბილისის ერთ-ერთ უძველეს უბანში. თანამედროვე არქიტექტურა, ხედები მთელ ქალაქზე, სარეკრეაციო სივრცე და კომფორტული გარემო ერთად — U Tower."
    }
  },
  {
    id: "u2-tower",
    coords: [41.6905, 44.8008],
    highlight: true,
    img: "assets/img/projects/u2-tower.jpg",
    pin: "assets/img/projects/u2-tower/01.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/u2-tower/01.jpg",
        "assets/img/projects/u2-tower/02.jpg",
        "assets/img/projects/u2-tower/03.jpg",
        "assets/img/projects/u2-tower/04.jpg",
        "assets/img/projects/u2-tower/05.jpg",
        "assets/img/projects/u2-tower/06.jpg"
      ] }
    ],
    name: { en: "U2 Tower", ka: "U2 თაუერი" },
    location: { en: "Old Tbilisi, Tbilisi", ka: "ძველი თბილისი, თბილისი" },
    desc: {
      en: "Another ARI Development project in Old Tbilisi. Refined and modern architecture, recreational spaces, views of the city. A peaceful environment for your comfortable living.",
      ka: "ARI დეველოპმენტის კიდევ ერთი პროექტი ძველ თბილისში. დახვეწილი და თანამედროვე არქიტექტურა, სარეკრეაციო სივრცე, ხედები ქალაქზე. მშვიდი გარემო თქვენი კომფორტული ცხოვრებისთვის."
    }
  },
  {
    id: "avlabari-house",
    coords: [41.6935, 44.8138],
    img: "assets/img/projects/avlabari-house.jpg",
    pin: "assets/img/projects/avlabari-house/05.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/avlabari-house/01.jpg",
        "assets/img/projects/avlabari-house/02.jpg",
        "assets/img/projects/avlabari-house/03.jpg",
        "assets/img/projects/avlabari-house/04.jpg",
        "assets/img/projects/avlabari-house/05.jpg",
        "assets/img/projects/avlabari-house/06.jpg",
        "assets/img/projects/avlabari-house/07.jpg",
        "assets/img/projects/avlabari-house/08.jpg",
        "assets/img/projects/avlabari-house/09.jpg",
        "assets/img/projects/avlabari-house/10.jpg",
        "assets/img/projects/avlabari-house/11.jpg",
        "assets/img/projects/avlabari-house/12.jpg"
      ] }
    ],
    name: { en: "The Avlabari House", ka: "ავლაბრის სახლი" },
    location: { en: "Avlabari, Tbilisi", ka: "ავლაბარი, თბილისი" },
    desc: {
      en: "A boutique residential building designed to perfectly fit the scale and historic context of the neighborhood.",
      ka: "მცირე ზომის საცხოვრებელი კორპუსი, რომლის პროექტიც სრულად ერგება უბნის მასშტაბს და ისტორიულ გარემოს."
    }
  },
  {
    id: "terrace-apartments",
    coords: [41.7108, 44.8022],
    img: "assets/img/projects/terrace-apartments.jpg",
    pin: "assets/img/projects/terrace-apartments/02.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/terrace-apartments/01.jpg",
        "assets/img/projects/terrace-apartments/02.jpg",
        "assets/img/projects/terrace-apartments/03.jpg",
        "assets/img/projects/terrace-apartments/04.jpg"
      ] }
    ],
    name: { en: "The Terrace Apartments", ka: "ტერასა აპარტმენტსი" },
    location: { en: "Chughureti, Tbilisi", ka: "ჩუღურეთი, თბილისი" },
    desc: {
      en: "A project with distinctive architecture in the Chughureti district. Featuring beautiful views and large terraces, it offers an ideal setting for modern living.",
      ka: "გამორჩეული არქიტექტურის პროექტი ჩუღურეთში, ლამაზი ხედებით და დიდი ტერასებით, საცხოვრებლად იდეალურ გარემოში."
    }
  },
  {
    id: "lumina-salosi",
    coords: [41.6958, 44.8388],
    img: "assets/img/projects/lumina-salosi.jpg",
    pin: "assets/img/projects/lumina-salosi/03.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/lumina-salosi/01.jpg",
        "assets/img/projects/lumina-salosi/02.jpg",
        "assets/img/projects/lumina-salosi/03.jpg",
        "assets/img/projects/lumina-salosi/04.jpg",
        "assets/img/projects/lumina-salosi/05.jpg"
      ] }
    ],
    name: { en: "Lumina Salosi", ka: "ლუმინა სალოსი" },
    location: { en: "Isani, Tbilisi", ka: "ისანი, თბილისი" },
    desc: {
      en: "Situated on Gabriel Salosi Avenue in Isani, this project features comfortable apartments and a well-organized environment, with easy access to the city's key facilities and infrastructure.",
      ka: "პროექტი ისანში, გაბრიელ სალოსის გამზირზე: კომფორტული ბინები და მოწესრიგებული გარემო, მარტივი წვდომით ქალაქის მთავარ ობიექტებსა და ინფრასტრუქტურასთან."
    }
  },
  {
    id: "skyline-varketili",
    coords: [41.6998, 44.8782],
    img: "assets/img/projects/skyline-varketili.jpg",
    pin: "assets/img/projects/skyline-varketili/01.jpg",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/skyline-varketili/01.jpg",
        "assets/img/projects/skyline-varketili/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/skyline-varketili/03.jpg",
        "assets/img/projects/skyline-varketili/04.jpg"
      ] }
    ],
    status: "completed",
    name: { en: "Skyline Varketili", ka: "სქაილაინ ვარკეთილი" },
    location: { en: "Varketili, Tbilisi", ka: "ვარკეთილი, თბილისი" },
    desc: {
      en: "Another of our completed projects in Varketili, very close to the metro station. It stands out for its practical layouts and its position within a diverse urban environment.",
      ka: "ჩვენი კიდევ ერთი განხორციელებული პროექტი ვარკეთილში, მეტროსთან ძალიან ახლოს. გამოირჩევა პრაქტიკული დაგეგმარებით და მრავალფეროვანი ურბანული გარემოთი."
    }
  },
  {
    id: "bridge-manglisi",
    img: "assets/img/projects/bridge-manglisi.jpg",
    pin: "assets/img/projects/bridge-manglisi/05.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/bridge-manglisi/01.jpg",
        "assets/img/projects/bridge-manglisi/02.jpg",
        "assets/img/projects/bridge-manglisi/03.jpg",
        "assets/img/projects/bridge-manglisi/04.jpg",
        "assets/img/projects/bridge-manglisi/05.jpg",
        "assets/img/projects/bridge-manglisi/06.jpg"
      ] }
    ],
    name: { en: "Bridge at Manglisi", ka: "ხიდი მანგლისში" },
    location: { en: "Manglisi", ka: "მანგლისი" },
    desc: {
      en: "A modern-style private residential settlement in Manglisi. It combines a peaceful environment and fresh air with comfortable living spaces, all close to Tbilisi.",
      ka: "მანგლისის პროექტი თანამედროვე ტიპის კერძო დასახლებისთვის: მშვიდი გარემო, სუფთა ჰაერი და კომფორტული საცხოვრებელი სივრცე თბილისთან ახლოს."
    }
  },
  {
    id: "arch-kavtaradze",
    coords: [41.7248, 44.7502],
    img: "assets/img/projects/arch-kavtaradze.jpg",
    pin: "assets/img/projects/arch-kavtaradze/04.jpg",
    gallery: [
      { kind: "completed", photos: [
        "assets/img/projects/arch-kavtaradze/01.jpg",
        "assets/img/projects/arch-kavtaradze/02.jpg"
      ] },
      { kind: "renders", photos: [
        "assets/img/projects/arch-kavtaradze/03.jpg",
        "assets/img/projects/arch-kavtaradze/04.jpg"
      ] }
    ],
    name: { en: "The Arch Kavtaradze", ka: "არქი ქავთარაძე" },
    location: { en: "Vake, Tbilisi", ka: "ვაკე, თბილისი" },
    desc: {
      en: "A premium-class residential building on Kavtaradze Street in Vake with modern architectural design, combining elegance and high-quality materials in one of the city's most sought-after neighborhoods.",
      ka: "პრემიუმ კლასის საცხოვრებელი კორპუსი ვაკეში, ქავთარაძის ქუჩაზე. თანამედროვე არქიტექტურა, ელეგანტურობა და მაღალი ხარისხის მასალები ქალაქის ერთ-ერთ ყველაზე მოთხოვნად უბანში."
    }
  },
  {
    id: "diuma",
    coords: [41.6948, 44.8048],
    highlight: true,
    img: "assets/img/projects/diuma.jpg",
    pin: "assets/img/projects/diuma/04.jpg",
    gallery: [
      { kind: null, photos: [
        "assets/img/projects/diuma/01.jpg",
        "assets/img/projects/diuma/02.jpg",
        "assets/img/projects/diuma/03.jpg",
        "assets/img/projects/diuma/04.jpg",
        "assets/img/projects/diuma/05.jpg"
      ] }
    ],
    name: { en: "Diuma Apartments", ka: "დიუმა აპარტმენტსი" },
    location: { en: "Old Tbilisi, Tbilisi", ka: "ძველი თბილისი, თბილისი" },
    desc: {
      en: "Located on Tsintsadze Street in Old Tbilisi, this project blends historic charm with modern comfort. Its cozy atmosphere and proximity to the city center create an ideal living environment.",
      ka: "ძველ თბილისში, ცინცაძის ქუჩაზე განხორციელებული პროექტი აერთიანებს ისტორიულ ხიბლს და თანამედროვე კომფორტს. მყუდრო გარემო და ცენტრთან სიახლოვე ქმნის იდეალურ საცხოვრებელ სივრცეს."
    }
  }
];
