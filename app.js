(function () {
  const cfg = window.CONJUNTO_CONFIG || {};

  const TIPOS = [
    {
      id: "ruido",
      icon: "🔊",
      titulo: "Ruido y perturbación",
      desc: "Música, fiestas, obras, gritos o ladridos en horarios restringidos.",
      campos: [
        { name: "tipo_ruido", label: "Tipo de ruido", type: "select", required: true, options: ["Música / parlantes", "Fiesta o reunión", "Obras o taladros", "Gritos o riñas", "Mascotas (ladridos)", "Vehículos / motos", "Otro"] },
        { name: "horario_norma", label: "¿Ocurrió en horario de silencio del reglamento?", type: "select", options: ["Sí", "No", "No estoy seguro / no está definido"] },
        { name: "duracion", label: "Duración aproximada", type: "text", placeholder: "Ej. 2 horas, de 11 p.m. a 1 a.m." },
        { name: "decibeles", label: "Medición o evidencia de intensidad", type: "text", placeholder: "App de decibeles, video, testigos…" }
      ]
    },
    {
      id: "mascotas",
      icon: "🐾",
      titulo: "Mascotas",
      desc: "Heces, sin correa, agresión, ladridos persistentes o cupo excedido.",
      campos: [
        { name: "infraccion_mascota", label: "Infracción", type: "select", required: true, options: ["No recoger residuos fisiológicos", "Sin correa o bozal cuando aplica", "Agresión o riesgo a personas", "Ladridos persistentes", "Número de animales no autorizado", "Uso de zonas comunes no permitidas", "Otro"] },
        { name: "descripcion_animal", label: "Descripción del animal", type: "text", placeholder: "Especie, raza, color, tamaño" },
        { name: "lugar_mascota", label: "Lugar exacto", type: "text", placeholder: "Jardín torre 1, ascensor, andén interno…" }
      ]
    },
    {
      id: "parqueadero",
      icon: "🚗",
      titulo: "Parqueadero y movilidad",
      desc: "Ocupación indebida, bloqueo, visitantes en cupo de residente.",
      campos: [
        { name: "tipo_parqueo", label: "Tipo de infracción", type: "select", required: true, options: ["Ocupa cupo ajeno", "Visitante en parqueadero de residente", "Doble ocupación / cajón adicional", "Bloquea vía o rampa", "Zona prohibida / verde / discapacitados", "Lavado no autorizado", "Exceso de velocidad interno", "Otro"] },
        { name: "placa", label: "Placa del vehículo", type: "text", placeholder: "ABC123", required: true },
        { name: "tipo_vehiculo", label: "Tipo de vehículo", type: "select", options: ["Automóvil", "Moto", "Camioneta", "Bicicleta / patineta", "No identificado"] },
        { name: "lugar_parqueo", label: "Ubicación", type: "text", placeholder: "Sótano 2, cajón 45 / zona de descarga" }
      ]
    },
    {
      id: "zonas",
      icon: "🏊",
      titulo: "Zonas comunes",
      desc: "Mal uso de piscina, salón, BBQ, gimnasio, juegos o pasillos.",
      campos: [
        { name: "zona", label: "Zona común", type: "select", required: true, options: ["Piscina", "Salón social", "BBQ / zona de parrillas", "Gimnasio", "Juegos infantiles", "Cancha / zona deportiva", "Pasillos / hall / ascensor", "Terraza / rooftop", "Otra"] },
        { name: "uso_indebido", label: "Uso indebido", type: "select", options: ["Sin reserva", "Fuera de horario", "Exceso de aforo o invitados", "Consumo no permitido", "Dejó sucio / daños", "Uso comercial no autorizado", "Otro"] },
        { name: "reserva", label: "¿Había reserva o autorización?", type: "select", options: ["No", "Sí", "No aplica / no sé"] }
      ]
    },
    {
      id: "aseo",
      icon: "🗑️",
      titulo: "Aseo, basuras y escombros",
      desc: "Bolsas fuera de horario, escombros, olores o residuos en zonas comunes.",
      campos: [
        { name: "tipo_residuo", label: "Tipo de residuo", type: "select", required: true, options: ["Bolsas de basura fuera de horario", "Escombros de obra", "Muebles o colchones", "Residuos de mascota", "Aceites / químicos", "Otro"] },
        { name: "lugar_residuo", label: "Lugar", type: "text", placeholder: "Cuarto de basuras torre 2, andén, parqueadero" },
        { name: "riesgo_salud", label: "¿Genera riesgo sanitario o de plagas?", type: "select", options: ["Sí", "No", "Posible"] }
      ]
    },
    {
      id: "obras",
      icon: "🔨",
      titulo: "Obras y modificaciones",
      desc: "Remodelaciones sin permiso, fachada, techos, antenas o toldos.",
      campos: [
        { name: "tipo_obra", label: "Tipo de intervención", type: "select", required: true, options: ["Remodelación interior con ruido o escombros", "Cambio de fachada / ventanas / color", "Toldos, rejas, antenas, aires", "Cerramiento de balcón o terraza", "Obra en zona común", "Horario de obra no autorizado", "Otro"] },
        { name: "permiso_obra", label: "¿Consta permiso de administración o asamblea?", type: "select", options: ["No", "Sí", "Desconozco"] },
        { name: "afecta_estructura", label: "¿Afecta estructura, impermeabilización o redes?", type: "select", options: ["No sé", "Sí", "No"] }
      ]
    },
    {
      id: "danos",
      icon: "🧱",
      titulo: "Daños a bienes comunes o privados",
      desc: "Roturas, humedades, golpes a portería, jardines o vehículos.",
      campos: [
        { name: "bien_danado", label: "Bien afectado", type: "text", required: true, placeholder: "Pared del hall, jardín, portón, vehículo…" },
        { name: "origen_dano", label: "Origen aparente", type: "select", options: ["Acción u omisión de un residente", "Filtración / humedad", "Vehículo", "Obra", "Desconocido"] },
        { name: "urgencia", label: "Urgencia", type: "select", options: ["Baja", "Media", "Alta (seguridad o filtración activa)"] }
      ]
    },
    {
      id: "convivencia",
      icon: "⚖️",
      titulo: "Convivencia e irrespeto",
      desc: "Amenazas, agresión verbal, hostigamiento o incumplimiento reiterado.",
      campos: [
        { name: "tipo_convivencia", label: "Conducta", type: "select", required: true, options: ["Agresión verbal / insultos", "Amenazas", "Hostigamiento reiterado", "Irrespeto a personal de portería o aseo", "Riña en zona común", "Otro"] },
        { name: "hubo_violencia", label: "¿Hubo violencia física o se llamó a la Policía?", type: "select", options: ["No", "Sí, Policía", "Sí, violencia física", "Solo verbal"] },
        { name: "novedad_minuta", label: "¿Quedó novedad en minuta de portería?", type: "select", options: ["No sé", "Sí", "No"] }
      ]
    },
    {
      id: "seguridad",
      icon: "🛡️",
      titulo: "Seguridad y acceso",
      desc: "Puertas abiertas, prestó tarjeta, ingreso irregular de extraños.",
      campos: [
        { name: "tipo_seguridad", label: "Hecho", type: "select", required: true, options: ["Dejó puerta o garaje abierto", "Prestó o clonó control / tag", "Ingreso de persona no autorizada", "Hurto o sospecha de hurto", "Cámara o citófono dañado (reportar)", "Otro"] },
        { name: "lugar_seguridad", label: "Punto de acceso o zona", type: "text", placeholder: "Peatonal torre 4, garaje sótano 1" }
      ]
    },
    {
      id: "otra",
      icon: "📋",
      titulo: "Otra infracción al reglamento",
      desc: "Cualquier conducta prevista en el reglamento o en la Ley 675.",
      campos: [
        { name: "norma_citada", label: "Norma o artículo que considera vulnerado (si lo conoce)", type: "text", placeholder: "Ej. Art. X del reglamento / manual de convivencia" },
        { name: "categoria_libre", label: "Categoría breve", type: "text", placeholder: "Ej. Publicidad en fachada, Airbnb no autorizado…" }
      ]
    }
  ];

  const els = {
    brandName: document.getElementById("brandName"),
    infoNombre: document.getElementById("infoNombre"),
    infoAdmin: document.getElementById("infoAdmin"),
    infoCiudad: document.getElementById("infoCiudad"),
    footerName: document.getElementById("footerName"),
    typeGrid: document.getElementById("typeGrid"),
    form: document.getElementById("quejaForm"),
    tipoQueja: document.getElementById("tipoQueja"),
    tipoLabel: document.getElementById("tipoLabel"),
    campos: document.getElementById("camposEspecificos"),
    formHint: document.getElementById("formHint"),
    envioNota: document.getElementById("envioNota"),
    avisoEnvio: document.getElementById("avisoEnvio"),
    modal: document.getElementById("modal"),
    documento: document.getElementById("documento"),
    mailtoBtn: document.getElementById("mailtoBtn"),
    previewBtn: document.getElementById("previewBtn"),
    printBtn: document.getElementById("printBtn"),
    copyBtn: document.getElementById("copyBtn"),
    submitBtn: document.getElementById("submitBtn")
  };

  function applyConfig() {
    const n = cfg.nombre || "Conjunto Residencial";
    els.brandName.textContent = n;
    els.infoNombre.textContent = n;
    els.infoAdmin.textContent = cfg.emailAdmin || "—";
    els.infoCiudad.textContent = cfg.ciudad || "Colombia";
    els.footerName.textContent = n;
    if (cfg.web3formsAccessKey && cfg.envioAutomatico !== false) {
      els.envioNota.textContent = "Al radicar, el formato se enviará al correo de la administración. Si el cupo mensual automático se acaba, use Enviar por correo: el formulario es el mismo.";
    } else {
      els.envioNota.textContent = "El envío automático está pausado o sin clave. Radique igual y pulse Enviar por correo. El formulario no cambia.";
    }
  }

  function fieldHTML(c) {
    const req = c.required ? "required" : "";
    if (c.type === "select") {
      const opts = ["<option value=\"\">Seleccione</option>"]
        .concat((c.options || []).map((o) => `<option>${o}</option>`))
        .join("");
      return `<label>${c.label}${c.required ? " *" : ""}<select name="${c.name}" ${req}>${opts}</select></label>`;
    }
    return `<label>${c.label}${c.required ? " *" : ""}<input name="${c.name}" ${req} placeholder="${c.placeholder || ""}" /></label>`;
  }

  function renderTypes() {
    els.typeGrid.innerHTML = TIPOS.map((t) => `
      <button type="button" class="type-card" data-id="${t.id}">
        <span class="type-icon">${t.icon}</span>
        <h3>${t.titulo}</h3>
        <p>${t.desc}</p>
      </button>
    `).join("");
  }

  function selectTipo(id) {
    const tipo = TIPOS.find((t) => t.id === id);
    if (!tipo) return;
    els.tipoQueja.value = tipo.id;
    els.tipoLabel.value = tipo.titulo;
    els.formHint.textContent = `Formato activo: ${tipo.titulo}. Complete todos los campos marcados con *.`;
    document.querySelectorAll(".type-card").forEach((b) => {
      b.classList.toggle("active", b.dataset.id === id);
    });
    els.campos.innerHTML = `<legend>3. Formato específico — ${tipo.titulo}</legend>
      <div class="grid-2">${tipo.campos.map(fieldHTML).join("")}</div>`;
    document.getElementById("formulario").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function fd() {
    return Object.fromEntries(new FormData(els.form).entries());
  }

  function radicado() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const marca = String(d.getTime());
    const uuid = crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "") : String(Math.random()).slice(2);
    return "QJ-" + y + m + day + "-" + marca.slice(-8) + "-" + uuid.slice(0, 6).toUpperCase();
  }

  function especificosHTML(data) {
    const tipo = TIPOS.find((t) => t.id === data.tipo_queja);
    if (!tipo) return "<p>Sin formato específico seleccionado.</p>";
    const rows = tipo.campos.map((c) => {
      const v = data[c.name] || "—";
      return `<tr><th>${c.label}</th><td>${escapeHtml(v)}</td></tr>`;
    }).join("");
    return `<table>${rows}</table>`;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildDocumento(data, num) {
    const ahora = new Date().toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" });
    return `
      <h1>FORMATO DE QUEJA Y SOLICITUD DE TRÁMITE SANCIONATORIO</h1>
      <p class="sub">${escapeHtml(cfg.nombre || "Conjunto Residencial")}<br>
      ${escapeHtml(cfg.direccion || "")} · ${escapeHtml(cfg.ciudad || "")}<br>
      NIT ${escapeHtml(cfg.nit || "—")} · Radicado <strong>${num}</strong></p>
      <p>Señores<br><strong>Administración / Consejo de Administración</strong><br>
      ${escapeHtml(cfg.nombre || "")}<br>
      ${escapeHtml(cfg.ciudad || "")}, ${ahora}</p>
      <p><strong>Asunto:</strong> Queja formal — ${escapeHtml(data.tipo_label || data.tipo_queja || "General")} — solicitud de ${escapeHtml(data.pretension || "gestión administrativa")}.</p>
      <p>Yo, <strong>${escapeHtml(data.nombre)}</strong>, identificado(a) con cédula No. <strong>${escapeHtml(data.cedula)}</strong>,
      actuando en calidad de <strong>${escapeHtml(data.calidad)}</strong> de la unidad <strong>${escapeHtml(data.unidad)}</strong>,
      presento la siguiente queja para que se dé el trámite previsto en el reglamento de propiedad horizontal
      y en los artículos 58, 59 y 60 de la Ley 675 de 2001.</p>
      <h3>I. Identificación</h3>
      <table>
        <tr><th>Radicado</th><td>${num}</td></tr>
        <tr><th>Tipo de queja / formato</th><td>${escapeHtml(data.tipo_label || "—")}</td></tr>
        <tr><th>Presentante</th><td>${escapeHtml(data.nombre)} · ${escapeHtml(data.calidad)} · ${escapeHtml(data.unidad)}</td></tr>
        <tr><th>Contacto</th><td>${escapeHtml(data.telefono)} · ${escapeHtml(data.email)}</td></tr>
        <tr><th>Reserva de identidad ante el infractor</th><td>${data.reserva_identidad ? "Sí, solicitada" : "No"}</td></tr>
        <tr><th>Presunto infractor</th><td>${escapeHtml(data.nombre_infractor || "No identificado")} · Unidad ${escapeHtml(data.unidad_infractor)}</td></tr>
        <tr><th>Fecha y hora de los hechos</th><td>${escapeHtml(data.fecha_hechos || "—")} ${escapeHtml(data.hora_hechos || "")}</td></tr>
        <tr><th>Reiteración</th><td>${escapeHtml(data.reiterado || "—")}</td></tr>
      </table>
      <h3>II. Campos del formato específico</h3>
      ${especificosHTML(data)}
      <h3>III. Hechos</h3>
      <p>${escapeHtml(data.hechos || "").replace(/\n/g, "<br>")}</p>
      <h3>IV. Pretensión</h3>
      <p>${escapeHtml(data.pretension || "—")}</p>
      <h3>V. Pruebas y testigos</h3>
      <p><strong>Pruebas descritas:</strong> ${escapeHtml(data.pruebas || "No se describieron.")}</p>
      <p><strong>Cómo se entregan las pruebas:</strong> ${escapeHtml(data.medio_prueba || "—")}</p>
      <p><strong>Enlace audiovisual:</strong> ${data.enlace_pruebas ? `<a href="${escapeHtml(data.enlace_pruebas)}">${escapeHtml(data.enlace_pruebas)}</a>` : "No se aportó enlace. Si hay video, el presentante lo enviará por Drive o WhatsApp citando este radicado."}</p>
      <p><strong>Testigos:</strong> ${escapeHtml(data.testigos || "No se indicaron.")}</p>
      <h3>VI. Fundamento y petición</h3>
      <p>Solicito a la administración:</p>
      <ol>
        <li>Radicar esta queja y acusar recibo al correo del presentante.</li>
        <li>Verificar los hechos y, de hallar mérito, emitir el <strong>requerimiento escrito</strong> al presunto infractor, con plazo para enmendar la conducta y presentar descargos (art. 60, Ley 675 de 2001).</li>
        <li>Si la pretensión lo indica, remitir el caso al <strong>Comité de Convivencia</strong> o al órgano competente para decidir sanciones del artículo 59 (publicación, multa sucesiva dentro de los topes legales, o restricción de bienes comunes no esenciales).</li>
        <li>Informar el resultado del trámite al presentante.</li>
      </ol>
      <p>Declaro que los hechos se narran de buena fe. Soy consciente de que las sanciones no son automáticas y que el presunto infractor tiene derecho de defensa.</p>
      <div class="firma">
        <div>
          <div class="linea">Firma del presentante<br>${escapeHtml(data.nombre)}<br>C.C. ${escapeHtml(data.cedula)}</div>
        </div>
        <div>
          <div class="linea">Espacio de recibido — Administración<br>Fecha, hora y sello</div>
        </div>
      </div>
      <p class="sub" style="margin-top:24px;font-size:12px">Documento generado por el portal de quejas del conjunto. Destinatario: ${escapeHtml(cfg.emailAdmin || "")}.</p>
    `;
  }

  function textoPlano(data, num) {
    const div = document.createElement("div");
    div.innerHTML = buildDocumento(data, num);
    return div.innerText.replace(/\n{3,}/g, "\n\n");
  }

  function mostrarAviso(ok, num) {
    if (!els.avisoEnvio) return;
    els.avisoEnvio.hidden = false;
    if (ok) {
      els.avisoEnvio.className = "aviso-envio ok";
      els.avisoEnvio.textContent = "Radicado " + num + ". Copia enviada sola al Hotmail de administración.";
    } else {
      els.avisoEnvio.className = "aviso-envio warn";
      els.avisoEnvio.textContent = "Radicado " + num + " listo. El envío automático no está disponible (cupo de Forms, falla de red o está pausado). Pulse Enviar por correo: es el mismo formato, solo cambia cómo le llega a administración.";
    }
  }

  function openModal(html, data, num) {
    els.documento.innerHTML = html;
    const subject = encodeURIComponent(`${cfg.asuntoCorreo || "Queja"} ${num} — ${data.tipo_label || ""}`);
    const body = encodeURIComponent(textoPlano(data, num).slice(0, 1800));
    els.mailtoBtn.href = `mailto:${cfg.emailAdmin || ""}?subject=${subject}&body=${body}`;
    els.modal.hidden = false;
    els.modal.dataset.num = num;
  }

  function closeModal() {
    els.modal.hidden = true;
  }

  async function enviarWeb3(data, num, html) {
    if (!cfg.web3formsAccessKey || cfg.envioAutomatico === false) return { sent: false, reason: "pausado" };
    const payload = {
      access_key: cfg.web3formsAccessKey,
      subject: `${cfg.asuntoCorreo || "Queja"} ${num} — ${data.tipo_label || ""}`,
      from_name: data.nombre,
      email: data.email,
      to: cfg.emailAdmin,
      radicado: num,
      conjunto: cfg.nombre,
      tipo: data.tipo_label,
      unidad: data.unidad,
      infractor: data.unidad_infractor,
      pretension: data.pretension,
      message: textoPlano(data, num)
    };
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await res.json().catch(() => ({}));
    return { sent: Boolean(json.success), raw: json };
  }

  els.typeGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".type-card");
    if (btn) selectTipo(btn.dataset.id);
  });

  els.previewBtn.addEventListener("click", () => {
    if (!els.tipoQueja.value) {
      alert("Seleccione primero un tipo de queja para cargar el formato.");
      return;
    }
    const data = fd();
    const num = "PREVIEW-" + radicado().slice(-4);
    openModal(buildDocumento(data, num), data, num);
  });

  els.form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!els.tipoQueja.value) {
      alert("Seleccione un tipo de queja. Cada una tiene un formato distinto.");
      document.getElementById("tipos").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!els.form.reportValidity()) return;
    const data = fd();
    const num = radicado();
    const html = buildDocumento(data, num);
    els.submitBtn.disabled = true;
    els.submitBtn.textContent = "Radicando…";
    try {
      const result = await enviarWeb3(data, num, html);
      openModal(html, data, num);
      mostrarAviso(result.sent, num);
    } catch (err) {
      openModal(html, data, num);
      mostrarAviso(false, num);
    } finally {
      els.submitBtn.disabled = false;
      els.submitBtn.textContent = "Radicar y generar formato";
    }
  });

  els.modal.addEventListener("click", (e) => {
    if (e.target.dataset.close !== undefined) closeModal();
  });
  els.printBtn.addEventListener("click", () => window.print());
  els.copyBtn.addEventListener("click", async () => {
    const text = els.documento.innerText;
    try {
      await navigator.clipboard.writeText(text);
      els.copyBtn.textContent = "Copiado";
      setTimeout(() => { els.copyBtn.textContent = "Copiar texto"; }, 1600);
    } catch {
      alert("No se pudo copiar. Seleccione el texto manualmente.");
    }
  });

  applyConfig();
  renderTypes();

  const previewSec = new URLSearchParams(location.search).get("sec");
  if (previewSec) {
    const bar = document.querySelector(".topbar");
    const foot = document.querySelector(".footer");
    if (bar) bar.style.display = "none";
    if (foot) foot.style.display = "none";
    document.querySelectorAll("main > section").forEach((s) => {
      s.style.display = s.id === previewSec ? "block" : "none";
    });
    if (previewSec === "formulario") {
      const first = TIPOS[0];
      els.tipoQueja.value = first.id;
      els.tipoLabel.value = first.titulo;
      els.formHint.textContent = "Formato activo: " + first.titulo;
      els.campos.innerHTML = "<legend>3. Formato específico — " + first.titulo + "</legend><div class=\"grid-2\">" + first.campos.map(fieldHTML).join("") + "</div>";
      els.form.nombre.value = "Maria Alejandra Gomez";
      els.form.cedula.value = "52.000.000";
      els.form.calidad.value = "Propietario";
      els.form.unidad.value = "Torre 3 Apto 502";
      els.form.telefono.value = "300 555 1234";
      els.form.email.value = "maria@correo.com";
      els.form.unidad_infractor.value = "Torre 2 Apto 301";
      els.form.nombre_infractor.value = "Juan Perez";
      els.form.fecha_hechos.value = "2026-08-26";
      els.form.hora_hechos.value = "23:15";
      els.form.hechos.value = "Musica a alto volumen desde el apartamento 301, de 11:15 p.m. a 1:40 a.m.";
      els.form.pretension.value = "Inicio de proceso sancionatorio (art. 59 Ley 675)";
      els.form.pruebas.value = "Video de 40 segundos y audio. Novedad en minuta de porteria.";
    }
    if (previewSec === "documento") {
      document.querySelectorAll("main > section").forEach((s) => { s.style.display = "none"; });
      const demo = {
        tipo_queja: "ruido",
        tipo_label: "Ruido y perturbacion",
        nombre: "Maria Alejandra Gomez",
        cedula: "52.000.000",
        calidad: "Propietario",
        unidad: "Torre 3 Apto 502",
        telefono: "300 555 1234",
        email: "maria@correo.com",
        reserva_identidad: "on",
        unidad_infractor: "Torre 2 Apto 301",
        nombre_infractor: "Juan Perez",
        fecha_hechos: "2026-08-26",
        hora_hechos: "23:15",
        reiterado: "Si, ya ocurrio antes",
        tipo_ruido: "Musica / parlantes",
        horario_norma: "Si",
        duracion: "2 horas 25 minutos",
        decibeles: "Video y audio adjuntos",
        hechos: "Musica a alto volumen desde el apartamento 301 durante la madrugada.",
        pretension: "Inicio de proceso sancionatorio (art. 59 Ley 675)",
        pruebas: "Video, audio y minuta de porteria.",
        testigos: "Porteria — turno noche"
      };
      openModal(buildDocumento(demo, "QJ-20260827-4581"), demo, "QJ-20260827-4581");
      const back = document.querySelector(".modal-backdrop");
      if (back) back.remove();
    }
  }
})();
