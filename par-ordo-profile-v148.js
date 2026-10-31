/* PAR ORDO V148 — GUEST PROFILE
   Local guest profile and same-device booking history.
   The existing booking API remains the source of truth for submitted requests. */
(() => {
  "use strict";

  const root = document.getElementById("app");
  if (!root) return;

  const PROFILE_KEY = "parOrdoGuestProfileV1";
  const BOOKINGS_KEY = "parOrdoLocalBookingsV1";
  const t = {
    ru: {
      welcome: "Добро пожаловать",
      guestTag: "ГОСТЬ PAR ORDO",
      profileHint: "Сохраните данные, чтобы быстрее оформлять следующие заявки.",
      name: "Ваше имя",
      phone: "Номер телефона",
      namePlaceholder: "Введите имя и фамилию",
      phonePlaceholder: "+996 ___ ___ ___",
      save: "СОХРАНИТЬ ПРОФИЛЬ",
      saved: "ПРОФИЛЬ СОХРАНЁН",
      localNote: "Данные профиля хранятся только в этом браузере на этом устройстве.",
      historyTitle: "МОИ БРОНИРОВАНИЯ",
      historyCount: "ЗАЯВКИ С ЭТОГО УСТРОЙСТВА",
      emptyTitle: "Пока нет заявок",
      emptyText: "Успешно отправленные заявки появятся здесь.",
      sent: "ЗАЯВКА ОТПРАВЛЕНА",
      booking: "БРОНЬ",
      guests: "гостей",
      goBooking: "ЗАБРОНИРОВАТЬ",
      validName: "Введите имя не короче 2 символов.",
      validPhone: "Проверьте номер телефона.",
      savedToast: "Профиль сохранён на этом устройстве.",
      accountNote: "Это локальный профиль. Вход по SMS и синхронизация между устройствами пока не подключены."
    },
    kg: {
      welcome: "Кош келиңиз",
      guestTag: "PAR ORDO КОНОГУ",
      profileHint: "Кийинки өтүнмөлөрдү тезирээк жөнөтүү үчүн маалыматыңызды сактаңыз.",
      name: "Атыңыз жана фамилияңыз",
      phone: "Телефон номериңиз",
      namePlaceholder: "Атыңызды жазыңыз",
      phonePlaceholder: "+996 ___ ___ ___",
      save: "ПРОФИЛДИ САКТОО",
      saved: "ПРОФИЛЬ САКТАЛДЫ",
      localNote: "Профиль маалыматы ушул түзмөктөгү браузерде гана сакталат.",
      historyTitle: "МЕНИН БРОНДООЛОРУМ",
      historyCount: "УШУЛ ТҮЗМӨКТӨН ЖӨНӨТҮЛГӨН ӨТҮНМӨЛӨР",
      emptyTitle: "Азырынча өтүнмө жок",
      emptyText: "Ийгиликтүү жөнөтүлгөн өтүнмөлөр бул жерде көрүнөт.",
      sent: "ӨТҮНМӨ ЖӨНӨТҮЛДҮ",
      booking: "БРОНЬ",
      guests: "конок",
      goBooking: "БРОНДОО",
      validName: "Атыңыз кеминде 2 белгиден турушу керек.",
      validPhone: "Телефон номериңизди текшериңиз.",
      savedToast: "Профиль ушул түзмөктө сакталды.",
      accountNote: "Бул жергиликтүү профиль. SMS аркылуу кирүү жана башка түзмөктөр менен синхрондоштуруу азырынча кошула элек."
    }
  };

  function lang() {
    return document.documentElement.lang === "kg" ? "kg" : "ru";
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function getProfile() {
    const value = readJSON(PROFILE_KEY, {});
    return {
      name: typeof value.name === "string" ? value.name : "",
      phone: typeof value.phone === "string" ? value.phone : ""
    };
  }

  function getBookings() {
    const value = readJSON(BOOKINGS_KEY, []);
    return Array.isArray(value) ? value.filter(item => item && typeof item === "object").slice(0, 30) : [];
  }

  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = String(text);
    return el;
  }

  function makeSvg(pathD, circle) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.classList.add("profile-svg-icon");
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", pathD);
    svg.appendChild(path);
    if (circle) {
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("cx", circle[0]);
      dot.setAttribute("cy", circle[1]);
      dot.setAttribute("r", circle[2]);
      svg.appendChild(dot);
    }
    return svg;
  }

  function formatDate(value) {
    const parts = String(value || "").split("-");
    return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : String(value || "—");
  }

  function setToast(message) {
    const toast = root.querySelector("#toastMessage");
    if (toast) {
      toast.textContent = message;
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2600);
    }
  }

  function renderBookings(host, copy) {
    const bookings = getBookings();
    host.replaceChildren();

    if (!bookings.length) {
      const empty = node("div", "profile-empty-state");
      const icon = makeSvg("M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z");
      const title = node("strong", "", copy.emptyTitle);
      const description = node("p", "", copy.emptyText);
      empty.append(icon, title, description);
      host.appendChild(empty);
      return;
    }

    bookings.slice(0, 8).forEach(item => {
      const card = node("article", "profile-booking-card");
      const top = node("div", "profile-booking-top");
      const number = node("strong", "profile-booking-number", `${copy.booking} #${item.id || "—"}`);
      const status = node("span", "profile-booking-status", copy.sent);
      top.append(number, status);

      const details = node("div", "profile-booking-details");
      const date = node("span", "", formatDate(item.date));
      const time = node("span", "", String(item.time || "—"));
      const guests = node("span", "", `${Number(item.guests) || 1} ${copy.guests}`);
      details.append(date, time, guests);
      card.append(top, details);
      host.appendChild(card);
    });
  }

  function renderProfile(force) {
    const panel = root.querySelector("#profileScreen .profile-panel");
    if (!panel) return;
    if (!force && panel.dataset.profileUi === "v148") return;

    const copy = t[lang()];
    const profile = getProfile();
    const bookings = getBookings();

    panel.classList.add("guest-profile-v148");
    panel.dataset.profileUi = "v148";
    panel.replaceChildren();

    const hero = node("div", "profile-v148-hero");
    const avatar = node("div", "profile-v148-avatar");
    const image = document.createElement("img");
    image.src = "./par-ordo-logo.png";
    image.alt = "PAR ORDO";
    avatar.appendChild(image);

    const tag = node("span", "profile-v148-tag", copy.guestTag);
    const heading = node("h2", "profile-v148-name", profile.name || copy.welcome);
    const subline = node("p", "profile-v148-subline", profile.phone || copy.profileHint);
    hero.append(avatar, tag, heading, subline);

    const summary = node("div", "profile-v148-summary");
    const summaryValue = node("strong", "", String(bookings.length));
    const summaryLabel = node("span", "", copy.historyTitle);
    summary.append(summaryValue, summaryLabel);

    const form = node("form", "profile-v148-form");
    form.id = "profileGuestForm";
    form.noValidate = true;

    const nameLabel = node("label", "profile-v148-field");
    const nameCaption = node("span", "", copy.name);
    const nameInput = document.createElement("input");
    nameInput.name = "profileName";
    nameInput.type = "text";
    nameInput.autocomplete = "name";
    nameInput.placeholder = copy.namePlaceholder;
    nameInput.value = profile.name;
    nameInput.required = true;
    nameInput.maxLength = 80;
    nameLabel.append(nameCaption, nameInput);

    const phoneLabel = node("label", "profile-v148-field");
    const phoneCaption = node("span", "", copy.phone);
    const phoneInput = document.createElement("input");
    phoneInput.name = "profilePhone";
    phoneInput.type = "tel";
    phoneInput.autocomplete = "tel";
    phoneInput.placeholder = copy.phonePlaceholder;
    phoneInput.value = profile.phone;
    phoneInput.required = true;
    phoneInput.maxLength = 24;
    phoneLabel.append(phoneCaption, phoneInput);

    const saveButton = node("button", "neon-book-button profile-v148-save", copy.save);
    saveButton.type = "submit";
    const formMessage = node("p", "profile-v148-message", "");
    formMessage.setAttribute("aria-live", "polite");
    form.append(nameLabel, phoneLabel, saveButton, formMessage);

    form.addEventListener("submit", event => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      if (name.length < 2) {
        formMessage.textContent = copy.validName;
        nameInput.focus();
        return;
      }
      if (phone.replace(/\D/g, "").length < 9) {
        formMessage.textContent = copy.validPhone;
        phoneInput.focus();
        return;
      }
      const ok = writeJSON(PROFILE_KEY, { name, phone, updatedAt: new Date().toISOString() });
      if (!ok) {
        formMessage.textContent = copy.accountNote;
        return;
      }
      formMessage.textContent = copy.saved;
      setToast(copy.savedToast);
      renderProfile(true);
    });

    const privacy = node("div", "profile-v148-privacy");
    privacy.appendChild(makeSvg("M12 3 4.5 6v5.2c0 4.7 3.2 7.9 7.5 9.8 4.3-1.9 7.5-5.1 7.5-9.8V6L12 3Z M8.5 12.2l2.2 2.2 4.8-5"));
    privacy.appendChild(node("p", "", copy.localNote));

    const historyHeader = node("div", "profile-v148-history-header");
    const historyTitle = node("h3", "", copy.historyTitle);
    const historyCount = node("small", "", copy.historyCount);
    historyHeader.append(historyTitle, historyCount);
    const history = node("div", "profile-v148-bookings");
    renderBookings(history, copy);

    const bookingButton = node("button", "neon-book-button profile-v148-booking-cta", copy.goBooking);
    bookingButton.type = "button";
    bookingButton.addEventListener("click", () => {
      const tab = root.querySelector('[data-tab="booking"]');
      if (tab) tab.click();
    });

    const accountNote = node("p", "profile-v148-account-note", copy.accountNote);
    panel.append(hero, summary, form, privacy, historyHeader, history, bookingButton, accountNote);
  }

  let pendingBooking = null;
  let watchedMessage = null;
  let messageObserver = null;

  function attachBookingCapture(form) {
    if (!form || form.dataset.profileCapture === "v148") return;
    form.dataset.profileCapture = "v148";

    form.addEventListener("submit", () => {
      const data = new FormData(form);
      pendingBooking = {
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        date: String(data.get("date") || ""),
        time: String(data.get("time") || ""),
        guests: Number(root.querySelector("#guestCount")?.textContent || 1)
      };
    }, true);

    const message = form.querySelector("#bookingMessage");
    if (!message) return;
    if (messageObserver) messageObserver.disconnect();
    watchedMessage = message;
    messageObserver = new MutationObserver(() => {
      const text = message.textContent || "";
      if (!pendingBooking || !text.startsWith("Заявка отправлена! Номер:")) return;

      const id = text.split("Номер:").pop().trim();
      const profile = { name: pendingBooking.name, phone: pendingBooking.phone, updatedAt: new Date().toISOString() };
      writeJSON(PROFILE_KEY, profile);

      const bookings = getBookings();
      bookings.unshift({
        id,
        date: pendingBooking.date,
        time: pendingBooking.time,
        guests: pendingBooking.guests,
        savedAt: new Date().toISOString()
      });
      writeJSON(BOOKINGS_KEY, bookings.slice(0, 30));
      pendingBooking = null;
      renderProfile(true);
    });
    messageObserver.observe(message, { childList: true, characterData: true, subtree: true });
  }

  function fillBookingFromProfile(form) {
    const profile = getProfile();
    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    if (name && !name.value && profile.name) name.value = profile.name;
    if (phone && !phone.value && profile.phone) phone.value = profile.phone;
  }

  function upgradeCityMarker() {
    const target = root.querySelector(".brand-name em");
    if (!target || target.dataset.cityPinReady === "v148") return;
    const cityName = target.textContent.replace(/^[\s⌖⌗⚲•]+/, "").trim() || "Бишкек";
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "brand-city-pin");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const pin = document.createElementNS(ns, "path");
    pin.setAttribute("d", "M20 10c0 5.2-8 12-8 12S4 15.2 4 10a8 8 0 1 1 16 0Z");
    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("cx", "12");
    dot.setAttribute("cy", "10");
    dot.setAttribute("r", "2.6");
    svg.append(pin, dot);
    const label = node("span", "", cityName);
    target.classList.add("brand-location");
    target.dataset.cityPinReady = "v148";
    target.replaceChildren(svg, label);
  }

  function enhance() {
    renderProfile(false);
    upgradeCityMarker();
    const bookingForm = root.querySelector("#bookingForm");
    if (bookingForm) {
      attachBookingCapture(bookingForm);
      fillBookingFromProfile(bookingForm);
    }
  }

  enhance();
  const observer = new MutationObserver(() => enhance());
  observer.observe(root, { childList: true, subtree: true });
})();
