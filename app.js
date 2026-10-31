const ASSETS = {
  logo: "./par-ordo-logo.png",
  hero: "https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-hero-future.webp",
  steam: "https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-steam-room.webp",
  shower: "https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-shower-room.webp",
  lounge: "https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-relax-room.webp",
  spa: "https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-spa-background.webp"
};

const translations = {
  ru: {
    subtitle: "БАНЯ • ОТДЫХ", city: "Бишкек", eyebrow: "ПРЕМИУМ БАНЯ В БИШКЕКЕ",
    bigBath: "БОЛЬШАЯ БАНЯ", guests: "До 30 гостей", steam: "Русская парная",
    shower: "Душевые", lounges: "Комнаты отдыха", clean: "Чистота и безопасность",
    book: "ЗАБРОНИРОВАТЬ", capacity: "Вместимость", duration: "Время посещения",
    cost: "Стоимость", hours: "Режим работы", rooms: "НАШИ ПОМЕЩЕНИЯ", seeAll: "СМОТРЕТЬ ВСЁ",
    steamShort: "Парная", showerShort: "Душ", loungeShort: "Комнаты", spaShort: "Зона отдыха",
    bookingTitle: "БРОНИРОВАНИЕ", bookingText: "Выберите удобную дату и время посещения",
    fullName: "Ваше имя", phone: "Номер телефона", date: "Дата посещения", time: "Время посещения",
    people: "Количество гостей", send: "ОТПРАВИТЬ ЗАЯВКУ", gallery: "ГАЛЕРЕЯ",
    home: "Главная", bookingTab: "Бронь", galleryTab: "Галерея", profile: "Профиль",
    profileTitle: "ЛИЧНЫЙ КАБИНЕТ", profileText: "Профиль гостя PAR ORDO",
    profileNote: "Личный кабинет появится после подключения системы клиентов.",
    menu: "МЕНЮ", install: "Установить PAR ORDO", contacts: "КОНТАКТЫ",
    address: "Бишкек, ул. Торокул Айтматова, 677", schedule: "Ежедневно · 10:00–23:00",
    notice: "Новых уведомлений пока нет", demo: "Демонстрация дизайна. Онлайн-бронирование подключим следующим этапом.",
    guestsLabel: "ГОСТЕЙ", close: "Закрыть", previous: "Предыдущее фото", next: "Следующее фото",
    selectTime: "Выберите время", selectDate: "Выберите дату", person: "чел.", allRooms: "Все помещения"
  },
  kg: {
    subtitle: "МОНЧО • ЭС АЛУУ", city: "Бишкек", eyebrow: "БИШКЕКТЕГИ ПРЕМИУМ МОНЧО",
    bigBath: "ЧОҢ МОНЧО", guests: "30 конокко чейин", steam: "Орус буу бөлмөсү",
    shower: "Душ бөлмөлөрү", lounges: "Эс алуу бөлмөлөрү", clean: "Тазалык жана коопсуздук",
    book: "БРОНДОО", capacity: "Сыйымдуулугу", duration: "Эс алуу убактысы",
    cost: "Баасы", hours: "Иштөө убактысы", rooms: "БӨЛМӨЛӨРҮБҮЗ", seeAll: "БААРЫН КӨРҮҮ",
    steamShort: "Парная", showerShort: "Душ", loungeShort: "Бөлмөлөр", spaShort: "Эс алуу аймагы",
    bookingTitle: "БРОНДОО", bookingText: "Келүү үчүн ыңгайлуу күндү жана убакытты тандаңыз",
    fullName: "Атыңыз", phone: "Телефон номериңиз", date: "Келүү күнү", time: "Келүү убактысы",
    people: "Коноктордун саны", send: "ӨТҮНМӨ ЖӨНӨТҮҮ", gallery: "ГАЛЕРЕЯ",
    home: "Башкы бет", bookingTab: "Брондоо", galleryTab: "Галерея", profile: "Профиль",
    profileTitle: "ЖЕКЕ КАБИНЕТ", profileText: "PAR ORDO коногунун профили",
    profileNote: "Жеке кабинет кардарлар системасы кошулганда ачылат.",
    menu: "МЕНЮ", install: "PAR ORDO орнотуу", contacts: "БАЙЛАНЫШ",
    address: "Бишкек, Торокул Айтматов көчөсү, 677", schedule: "Күн сайын · 10:00–23:00",
    notice: "Азырынча жаңы билдирүү жок", demo: "Дизайндын демо-нускасы. Онлайн брондоо кийинки этапта кошулат.",
    guestsLabel: "КОНOК", close: "Жабуу", previous: "Мурунку сүрөт", next: "Кийинки сүрөт",
    selectTime: "Убакытты тандаңыз", selectDate: "Күндү тандаңыз", person: "адам", allRooms: "Бардык бөлмөлөр"
  }
};

const rooms = [
  { id: "steam", image: ASSETS.steam, ru: "Парная", kg: "Парная", sub: "RUSSIAN STEAM" },
  { id: "shower", image: ASSETS.shower, ru: "Душ", kg: "Душ", sub: "SHOWER ZONE" },
  { id: "lounge", image: ASSETS.lounge, ru: "Комнаты", kg: "Эс алуу бөлмөлөрү", sub: "RELAX LOUNGE" },
  { id: "spa", image: ASSETS.spa, ru: "Зона отдыха", kg: "Эс алуу аймагы", sub: "SPA ATMOSPHERE" }
];

let language = "ru";
let activeTab = "home";
let guestCount = 2;
let activePhoto = 0;
const app = document.getElementById("app");

function render() {
  const t = translations[language];
  document.documentElement.lang = language;
  app.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <a class="brand" href="#home" aria-label="PAR ORDO">
          <img class="brand-logo" src="${ASSETS.logo}" alt="PAR ORDO" onerror="this.src='./icon-192.png'">
          <span class="brand-name"><strong>PAR ORDO</strong><small>${t.subtitle}</small><em>⌖ ${t.city}</em></span>
        </a>
        
<div class="header-actions">
  <button class="header-icon" id="noticeBtn" aria-label="Notifications">
    <svg viewBox="0 0 24 24" width="21" height="21"
         fill="none" stroke="currentColor" stroke-width="1.8"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
      <path d="M10 21h4"/>
    </svg>
    <i class="notification-dot"></i>
  </button>

  <button class="header-icon" id="menuBtn" aria-label="Menu">
    <svg viewBox="0 0 24 24" width="22" height="22"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  </button>
</div>

      </header>

      <main class="main-content">
        <section class="screen ${activeTab === "home" ? "active" : ""}" id="homeScreen">
          <section class="hero-panel">
            <div class="hero-image" aria-hidden="true"></div>
            <div class="hero-dark"></div>
            <div class="hero-content">
              <div class="hero-eyebrow"><span></span>${t.eyebrow}</div>
              <h1>PAR ORDO</h1>
              <h2>${t.bigBath}</h2>
              <div class="hero-guest"><span>♟</span>${t.guests}</div>
              <ul class="hero-benefits">
                <li><b>♨</b>${t.steam}</li>
                <li><b>❄</b>${t.shower}</li>
                <li><b>⌂</b>${t.lounges}</li>
                <li><b>✦</b>${t.clean}</li>
              </ul>
            </div>
            <div class="hero-corner"></div>
          </section>

          <button class="neon-book-button" id="heroBooking">
            <span class="calendar-symbol">▦</span><strong>${t.book}</strong><span class="button-arrow">→</span>
          </button>

          <section class="stats-grid">
            <article class="stat-card"><span class="stat-icon">♟</span><small>${t.capacity}</small><strong>${language === "ru" ? "До 30 человек" : "30 адамга чейин"}</strong></article>
            <article class="stat-card"><span class="stat-icon">◷</span><small>${t.duration}</small><strong>3 ${language === "ru" ? "часа" : "саат"}</strong></article>
            <article class="stat-card"><span class="stat-icon">▤</span><small>${t.cost}</small><strong>300 сом / ${language === "ru" ? "гость" : "конок"}</strong></article>
            <article class="stat-card"><span class="stat-icon">◷</span><small>${t.hours}</small><strong>10:00 – 23:00</strong></article>
          </section>

          <section class="rooms-section">
            <div class="section-heading"><h2>${t.rooms}</h2><button id="showGallery" class="section-link">${t.seeAll} <span>→</span></button></div>
            <div class="room-grid room-grid-preview">
              ${rooms.slice(0, 3).map((room, index) => roomCard(room, index, language)).join("")}
            </div>
          </section>

          <section class="contact-panel">
            <span class="contact-icon">⌖</span><div><small>PAR ORDO • BISHKEK</small><strong>${t.address}</strong><p>${t.schedule}</p></div><span class="contact-arrow">↗</span>
          </section>
        </section>

        <section class="screen ${activeTab === "booking" ? "active" : ""}" id="bookingScreen">
          <div class="page-heading"><span class="section-label">PAR ORDO / RESERVATION</span><h1>${t.bookingTitle}</h1><p>${t.bookingText}</p></div>
          <div class="booking-panel">
            <div class="booking-panel-top"><span class="booking-stamp">03<small>H</small></span><div><b>PAR ORDO</b><small>${t.bigBath}</small></div></div>
            <form id="bookingForm" class="booking-form">
              <label class="form-field"><span>${t.fullName}</span><input name="name" autocomplete="name" placeholder="${t.fullName}" required></label>
              <label class="form-field"><span>${t.phone}</span><input name="phone" type="tel" autocomplete="tel" placeholder="+996 ___ ___ ___" required></label>
              <label class="form-field"><span>${t.date}</span><input name="date" type="date" required></label>
              <label class="form-field"><span>${t.time}</span><select name="time" required><option value="">${t.selectTime}</option><option>10:00</option><option>13:00</option><option>16:00</option><option>19:00</option></select></label>
              <div class="guest-control"><span>${t.people}</span><div><button type="button" id="minusGuests" aria-label="Decrease">−</button><strong id="guestCount">${guestCount}</strong><button type="button" id="plusGuests" aria-label="Increase">＋</button></div></div>
              <button class="neon-book-button form-submit" type="submit"><span class="calendar-symbol">▦</span><strong>${t.send}</strong><span class="button-arrow">→</span></button>
              <p id="bookingMessage" class="form-message" aria-live="polite"></p>
            </form>
          </div>
        </section>

        <section class="screen ${activeTab === "gallery" ? "active" : ""}" id="galleryScreen">
          <div class="page-heading"><span class="section-label">PAR ORDO / SPACE</span><h1>${t.gallery}</h1><p>${t.allRooms}</p></div>
          <div class="gallery-grid">
            ${rooms.map((room, index) => roomCard(room, index, language, true)).join("")}
          </div>
        </section>

        <section class="screen ${activeTab === "profile" ? "active" : ""}" id="profileScreen">
          <div class="page-heading"><span class="section-label">PAR ORDO / GUEST</span><h1>${t.profileTitle}</h1><p>${t.profileText}</p></div>
          <div class="profile-panel"><img src="${ASSETS.logo}" alt="PAR ORDO"><h2>PAR ORDO</h2><p>${t.profileNote}</p><div class="profile-line"><span>⌖</span>${t.address}</div><div class="profile-line"><span>◷</span>${t.schedule}</div></div>
        </section>
      </main>

      <nav class="bottom-navigation" aria-label="Main navigation">
        <button class="nav-button ${activeTab === "home" ? "active" : ""}" data-tab="home"><span>⌂</span><small>${t.home}</small></button>
        <button class="nav-button ${activeTab === "booking" ? "active" : ""}" data-tab="booking"><span>▦</span><small>${t.bookingTab}</small></button>
        <button class="nav-button ${activeTab === "gallery" ? "active" : ""}" data-tab="gallery"><span>▧</span><small>${t.galleryTab}</small></button>
        <button class="nav-button ${activeTab === "profile" ? "active" : ""}" data-tab="profile"><span>♙</span><small>${t.profile}</small></button>
      </nav>

      
      <div class="drawer-backdrop" id="drawerBackdrop">
        <aside class="side-drawer">
          <div class="drawer-heading">
            <div class="drawer-brand">
              <img src="${ASSETS.logo}" alt="PAR ORDO">
              <span>
                <b>PAR ORDO</b>
                <small>FUTURE ARENA</small>
              </span>
            </div>
            <button id="closeDrawer" aria-label="${t.close}">×</button>
          </div>

          <div class="drawer-language">
            <span>LANGUAGE / ТИЛ</span>
            <button id="languageBtn">
              ${language === "ru" ? "RU / KG" : "KG / RU"}
            </button>
          </div>

          <button class="drawer-link" data-drawer-tab="home">
            ${t.home}<b>↗</b>
          </button>
          <button class="drawer-link" data-drawer-tab="booking">
            ${t.bookingTab}<b>↗</b>
          </button>
          <button class="drawer-link" data-drawer-tab="gallery">
            ${t.galleryTab}<b>↗</b>
          </button>
          <button class="drawer-link" data-drawer-tab="profile">
            ${t.profile}<b>↗</b>
          </button>

          <button class="drawer-link install-link" id="installAction"
            data-install-app hidden>
            📲 ${t.install}
          </button>

          <div class="drawer-footer">AZA DIGITAL ECOSYSTEM</div>
        </aside>
      </div>

      <div class="lightbox" id="lightbox" aria-modal="true" role="dialog">
        <button class="lightbox-close" id="closeLightbox" aria-label="${t.close}">×</button>
        <button class="lightbox-arrow prev" id="previousPhoto" aria-label="${t.previous}">‹</button>
        <figure><img id="lightboxImage" src="" alt="PAR ORDO"><figcaption id="lightboxCaption"></figcaption></figure>
        <button class="lightbox-arrow next" id="nextPhoto" aria-label="${t.next}">›</button>
      </div>
      <div class="toast-message" id="toastMessage" role="status"></div>
    </div>
  `;
  bindEvents();
  syncInstallButton();
}

function roomCard(room, index, lang, large = false) {
  const title = lang === "ru" ? room.ru : room.kg;
  return `<button class="room-card ${large ? "room-card-large" : ""}" data-room="${index}" aria-label="${title}">
    <img src="${room.image}" alt="${title}" loading="lazy">
    <span class="room-card-shade"></span>
    <span class="room-card-caption"><small>0${index + 1} / ${room.sub}</small><strong>${roomIcon(room.id)} ${title}</strong></span>
  </button>`;
}

function roomIcon(id) {
  return ({ steam: "♨", shower: "❄", lounge: "⌂", spa: "✦" })[id] || "✦";
}

function bindEvents() {
  document.getElementById("languageBtn").addEventListener("click", () => {
    language = language === "ru" ? "kg" : "ru";
    render();
  });
  document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("drawerBackdrop").classList.add("open"));
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("drawerBackdrop").addEventListener("click", event => {
    if (event.target.id === "drawerBackdrop") closeDrawer();
  });
  document.getElementById("noticeBtn").addEventListener("click", () => showToast(translations[language].notice));
  document.getElementById("heroBooking").addEventListener("click", () => setTab("booking"));
  document.getElementById("showGallery").addEventListener("click", () => setTab("gallery"));

  document.querySelectorAll("[data-tab], [data-drawer-tab]").forEach(button => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab || button.dataset.drawerTab;
      closeDrawer();
      setTab(tab);
    });
  });

  document.querySelectorAll("[data-room]").forEach(card => {
    card.addEventListener("click", () => openLightbox(Number(card.dataset.room)));
  });
  document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
  document.getElementById("previousPhoto").addEventListener("click", () => changePhoto(-1));
  document.getElementById("nextPhoto").addEventListener("click", () => changePhoto(1));
  document.getElementById("lightbox").addEventListener("click", event => {
    if (event.target.id === "lightbox") closeLightbox();
  });

  
const form = document.getElementById("bookingForm");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const date = String(data.get("date") || "");
    const time = String(data.get("time") || "");

    if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
      showToast("Атыңызды жана телефон номериңизди текшериңиз");
      return;
    }

    if (!date || !time) {
      showToast("Күндү жана убакытты тандаңыз");
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    const message = document.getElementById("bookingMessage");
    const originalHTML = submit.innerHTML;

    submit.disabled = true;
    submit.textContent = "ОТПРАВЛЯЕМ...";

    try {
      const response = await fetch(
        "https://par-ordo-api.moimarketjibekjolu.workers.dev/api/public/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          cache: "no-store",
          body: JSON.stringify({
            name,
            phone,
            appointmentAt: `${date}T${time}`,
            guests: guestCount,
            shorts: false,
            website: ""
          })
        }
      );

      let result = {};
      try {
        result = await response.json();
      } catch (_) {}

      if (!response.ok || !result?.booking?.id) {
        throw new Error(result.error || `API ${response.status}`);
      }

      message.textContent =
        `Заявка отправлена! Номер: ${result.booking.id}`;

      showToast("Заявка успешно отправлена!");

      form.reset();
      guestCount = 2;
      document.getElementById("guestCount").textContent = "2";

    } catch (error) {
      console.error("PAR ORDO booking:", error);

      message.textContent =
        "Не удалось отправить заявку. Попробуйте позже.";

      showToast("Ошибка соединения с сервером");
    } finally {
      submit.disabled = false;
      submit.innerHTML = originalHTML;
    }
  });
}
  
  const count = document.getElementById("guestCount");
  document.getElementById("minusGuests").addEventListener("click", () => {
    guestCount = Math.max(1, guestCount - 1);
    count.textContent = guestCount;
  });
  document.getElementById("plusGuests").addEventListener("click", () => {
    guestCount = Math.min(30, guestCount + 1);
    count.textContent = guestCount;
  });
}

function setTab(tab) {
  activeTab = tab;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeDrawer() {
  const drawer = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("open");
}

function openLightbox(index) {
  activePhoto = index;
  updateLightbox();
  document.getElementById("lightbox").classList.add("open");
}

function changePhoto(delta) {
  activePhoto = (activePhoto + delta + rooms.length) % rooms.length;
  updateLightbox();
}

function updateLightbox() {
  const room = rooms[activePhoto];
  document.getElementById("lightboxImage").src = room.image;
  document.getElementById("lightboxCaption").textContent = language === "ru" ? room.ru : room.kg;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

function showToast(message) {
  const toast = document.getElementById("toastMessage");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function syncInstallButton() {
  const installButton = document.getElementById("installAction");
  if (installButton && window.__parOrdoInstallAvailable) installButton.hidden = false;
}

document.addEventListener("parordo:installavailable", () => syncInstallButton());
render();
