
const translations = {
  ru: {
    subtitle: "БАНЯ • ОТДЫХ",
    title: "БОЛЬШАЯ БАНЯ",
    description: "Настоящий отдых в хорошей компании",
    guests: "До 30 гостей",
    time: "3 часа",
    price: "300 сом / гость",
    rooms: "НАШИ ПОМЕЩЕНИЯ",
    steam: "Русская парная",
    shower: "Душевые",
    lounge: "Комнаты отдыха",
    booking: "ЗАБРОНИРОВАТЬ",
    name: "Ваше имя",
    phone: "Номер телефона",
    date: "Дата посещения",
    submit: "ОТПРАВИТЬ ЗАЯВКУ",
    success: "Заявка заполнена! Скоро подключим онлайн-бронирование."
  },
  kg: {
    subtitle: "БАНЯ • ЭС АЛУУ",
    title: "ЧОҢ МОНЧО",
    description: "Жакшы компания менен чыныгы эс алуу",
    guests: "30 конокко чейин",
    time: "3 саат",
    price: "300 сом / конок",
    rooms: "БӨЛМӨЛӨРҮБҮЗ",
    steam: "Орус буу бөлмөсү",
    shower: "Душ бөлмөлөрү",
    lounge: "Эс алуу бөлмөлөрү",
    booking: "БРОНДОО",
    name: "Атыңыз",
    phone: "Телефон номериңиз",
    date: "Келүү күнү",
    submit: "ӨТҮНМӨ ЖӨНӨТҮҮ",
    success: "Өтүнмө толтурулду! Онлайн брондоону жакында туташтырабыз."
  }
};

let currentLanguage = "ru";

const app = document.getElementById("app");

function render() {
  const t = translations[currentLanguage];

  app.innerHTML = `
    <div class="app">
      <header class="header">
        <div class="brand">
          <img class="logo-image"
src="https://raw.githubusercontent.com/moymarket235/parordo/main/assets/par-ordo-logo.jpg"
alt="PAR ORDO">
          <div>
            <h2>PAR ORDO</h2>
            <p>${t.subtitle}</p>
          </div>
        </div>
        <div class="header-actions">
  <button id="languageBtn" class="lang-btn">
    ${currentLanguage === "ru" ? "KG" : "RU"}
  </button>
  <button id="noticeBtn" class="header-icon">🔔</button>
  <a href="#rooms" class="header-icon">☰</a>
</div>
          
        
      </header>

      <main>
        <section class="hero">
          <small>✦ PREMIUM SAUNA IN BISHKEK</small>
          <h1>PAR ORDO</h1>
          <h3>${t.title}</h3>
          <p>${t.description}</p>
          <button class="book-btn" id="heroBooking">
            📅 ${t.booking} →
          </button>
        </section>

        <section class="section">
          <div class="features">
            <div class="feature">
              <strong>👥</strong>
              <p>${t.guests}</p>
            </div>
            <div class="feature">
              <strong>🕒</strong>
              <p>${t.time}</p>
            </div>
            <div class="feature">
              <strong>💰</strong>
              <p>${t.price}</p>
            </div>
            <div class="feature">
              <strong>🕙</strong>
              <p>10:00 – 23:00</p>
            </div>
          </div>
        </section>

        <section class="section" id="rooms">
          <div class="section-title">
            <h2>${t.rooms}</h2>
            <span>PAR ORDO ✦</span>
          </div>

          <div class="rooms">
            <article class="room">
              <h3>🔥 ${t.steam}</h3>
              <p>Premium relaxation</p>
            </article>
            <article class="room">
              <h3>🚿 ${t.shower}</h3>
              <p>Clean & comfortable</p>
            </article>
            <article class="room">
              <h3>🛋️ ${t.lounge}</h3>
              <p>Comfortable atmosphere</p>
            </article>
            <article class="room">
              <h3>✨ PAR ORDO</h3>
              <p>Luxury experience</p>
            </article>
          </div>
        </section>

        <section class="section" id="booking">
          <div class="section-title">
            <h2>${t.booking}</h2>
          </div>

          <form id="bookingForm" class="booking-form">
            <input name="name" placeholder="${t.name}" required>
            <input name="phone" type="tel"
              placeholder="${t.phone}" required>
            <input name="date" type="date" required>
            <button class="book-btn" type="submit">
              ${t.submit} →
            </button>
            <p id="bookingMessage" aria-live="polite"></p>
          </form>
        </section>
      </main>
    </div>

    <nav class="bottom-nav">
      <a href="#" class="active">⌂<br>Главная</a>
      <a href="#booking">▣<br>Бронь</a>
      <a href="#rooms">▧<br>Помещения</a>
      <a href="#booking">♙<br>Профиль</a>
    </nav>
  `;

  document.getElementById("languageBtn").onclick = () => {
    currentLanguage = currentLanguage === "ru" ? "kg" : "ru";
    render();
  };

  document.getElementById("heroBooking").onclick = () => {
    document.getElementById("booking").scrollIntoView({
      behavior: "smooth"
    });
  };

  document.getElementById("bookingForm").onsubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const booking = {
      name: form.get("name"),
      phone: form.get("phone"),
      date: form.get("date")
    };

    console.log("Booking request:", booking);

    document.getElementById("bookingMessage").textContent =
      t.success;

    event.target.reset();
  };
}

render();
document.getElementById("noticeBtn").onclick = () => {
  alert(currentLanguage === "ru"
    ? "Уведомления скоро появятся"
    : "Билдирүүлөр жакында кошулат");
};
