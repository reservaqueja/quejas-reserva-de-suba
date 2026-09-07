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
        { name: "lugar_mascota", label: "Lugar exacto", type: "text", placeholder: "Jardín torre 1, ascensor, parqueadero…" }
      ]
    },
    {
      id: "balcones",
      icon: "🧺",
      titulo: "Balcones, ventanas y fachada",
      desc: "Objetos amontonados, ropa tendida, elementos colgados o uso indebido visible desde zonas comunes.",
      campos: [
        { name: "tipo_balcon", label: "Tipo de infracción", type: "select", required: true, options: ["Ropa o ropa tendida visible", "Objetos amontonados o almacenados", "Elementos colgados (cuerdas, hamacas, toldos no autorizados)", "Basura, escombros o materiales", "Antenas, avisos o elementos no autorizados", "Plantas o materas que gotean o generan riesgo", "Otro"] },
        { name: "lugar_balcon", label: "Ubicación del balcón o ventana", type: "text", required: true, placeholder: "Torre, piso, lado que da a la zona común o a la calle" },
        { name: "visible_desde", label: "¿Es visible desde zona común o vía pública?", type: "select", options: ["Sí, zona común", "Sí, vía pública", "Sí, ambos", "No / no estoy seguro"] },
        { name: "riesgo_balcon", label: "¿Hay riesgo de caída de objetos?", type: "select", options: ["No", "Posible", "Sí, riesgo evidente"] }
      ]
    },
    {
      id: "parqueadero",
      icon: "🚗",
      titulo: "Parqueadero y movilidad",
      desc: "Ocupación indebida, bloqueo, visitantes en cupo de residente.",
      campos: [
        { name: "tipo_parqueo", label: "Tipo de infracción", type: "select", required: true, options: ["Ocupa cupo ajeno", "Visitante en parqueadero de residente", "Doble ocupación", "Bloquea vía o rampa", "Zona prohibida / Ambulancia", "Lavado no autorizado", "Exceso de velocidad interno", "Otro"] },
        { name: "placa", label: "Placa del vehículo", type: "text", placeholder: "ABC123", required: true },
        { name: "tipo_vehiculo", label: "Tipo de vehículo", type: "select", options: ["Automóvil", "Moto", "Camioneta", "Van", "Bicicleta / patineta", "No identificado"] },
        { name: "lugar_parqueo", label: "Ubicación", type: "text", placeholder: "Parqueadero 11, torre 3…" }
      ]
    },
    {
      id: "zonas",
      icon: "🏊",
      titulo: "Zonas comunes",
      desc: "Mal uso de piscina, salón, BBQ, gimnasio, juegos o pasillos.",
      campos: [
        { name: "zona", label: "Zona común", type: "select", required: true, options: ["Piscina", "Salón social", "BBQ / zona de parrillas", "Gimnasio", "Juegos infantiles", "Cancha / zona deportiva", "Pasillos / hall / ascensor", "Otra"] },
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
        { name: "lugar_residuo", label: "Lugar", type: "text", placeholder: "Cuarto de basura, torre, parqueadero…" },
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
        { name: "bien_danado", label: "Bien afectado", type: "text", required: true, placeholder: "Pared del hall, jardín, vehículo…" },
        { name: "origen_dano", label: "Origen aparente", type: "select", options: ["Acción u omisión de un residente", "Filtración / humedad", "Vehículo", "Obra", "Desconocido"] },
        { name: "urgencia", label: "Urgencia", type: "select", options: ["Baja", "Media", "Alta"] }
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
        { name: "tipo_seguridad", label: "Hecho", type: "select", required: true, options: ["Dejó puerta abierta", "Prestó o clonó control / tag", "Ingreso de persona no autorizada", "Hurto o sospecha de hurto", "Otro"] },
        { name: "lugar_seguridad", label: "Punto de acceso o zona", type: "text", placeholder: "Peatonal, torre…" }
      ]
    },
    {
      id: "otra",
      icon: "📋",
      titulo: "Otra infracción al reglamento",
      desc: "Cualquier conducta prevista en el reglamento o en la Ley 675.",
      campos: [
        { name: "norma_citada", label: "Norma o artículo que considera vulnerado (si lo conoce)", type: "text", placeholder: "Ej. Art. X del reglamento…" },
        { name: "categoria_libre", label: "Categoría breve", type: "text", placeholder: "Ej. Publicidad en fachada…" }
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
    const telEl = document.getElementById("infoTel");
    if (telEl) telEl.textContent = cfg.telefonoAdmin || "—";
    els.infoCiudad.textContent = cfg.ciudad || "Colombia";
    els.footerName.textContent = n;

    const inst = document.getElementById("btnInstructivos");
    if (inst) inst.href = cfg.instructivosUrl || "#";

    const wa = document.getElementById("btnWhatsapp");
    if (wa) {
      const num = String(cfg.whatsappPruebas || "").replace(/\D/g, "");
      const msg = encodeURIComponent(cfg.whatsappMensaje || "Hola, envío pruebas de mi queja. Radicado: ");
      wa.href = num ? ("https://wa.me/" + num + "?text=" + msg) : "#";
    }

    if (els.envioNota) {
      els.envioNota.textContent = "Nota: Al radicar, el formato se enviará al correo de la administración.";
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
    els.typeGrid.innerHTML = TIPOS.map((t, i) => `
      <button type="button" class="type-card" data-id="${t.id}">
        <span class="type-tag">Formato F-${String(i + 1).padStart(2, "0")}</span>
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
      <h1>FORMATO DE QUEJA ANTE LA COPROPIEDAD</h1>
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
      de Reserva de Suba y en los artículos 2 (numeral 5), 58, 59 y 60 de la Ley 675 de 2001.
      Este escrito <strong>no constituye sanción</strong> ni abre por sí solo el proceso del artículo 59.</p>
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
        <li>Radicar esta queja, dejar constancia en la carpeta de la unidad y acusar recibo al correo del presentante (Manual de Convivencia 2020, cap. XIX y art. 133).</li>
        <li>Verificar los hechos. Si no hay mérito, archivar de manera motivada e informar.</li>
        <li>Valorar la vía del Comité de Convivencia (RPH art. 96 y Ley 675 art. 58). El Comité no impone sanciones (RPH art. 96 §2).</li>
        <li>Si la pretensión es sancionatoria y hay mérito: <strong>requerimiento escrito del administrador</strong> con hechos, capítulo o artículo del Manual/RPH y <strong>ocho (8) días calendario</strong> para descargos y pruebas (Manual art. 133 num. 3; RPH arts. 97 y 99).</li>
        <li>Remitir al <strong>Consejo de Administración</strong>, único órgano que impone la sanción en esta copropiedad (RPH art. 98; Manual, nota 1). El administrador solo ejecuta lo ya decidido (RPH art. 100).</li>
        <li>Informar el resultado. El presunto infractor puede pedir ser oído (RPH art. 99), interponer <strong>reposición en 3 días hábiles</strong> (el Consejo resuelve en 8) e <strong>impugnar judicialmente dentro del mes</strong> siguiente a la comunicación (RPH art. 101).</li>
      </ol>
      <p>Declaro que los hechos se narran de buena fe. Las sanciones no son automáticas. Solo proceden por conductas del RPH art. 99 o del Manual cap. XIX, dentro de los topes de la Ley 675 (máx. 2 cuotas cada multa y 10 en total). Queda prohibido restringir bienes comunes esenciales, el acceso o bienes de uso exclusivo.</p>
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
    const tipo = TIPOS.find((x) => x.id === data.tipo_queja);
    const extras = tipo
      ? tipo.campos.map((c) => "  - " + c.label + ": " + (data[c.name] || "—")).join("\n")
      : "  —";
    const ahora = new Date().toLocaleString("es-CO", { dateStyle: "long", timeStyle: "short" });
    return [
      "FORMATO DE QUEJA ANTE LA COPROPIEDAD",
      cfg.nombre || "Reserva de Suba",
      (cfg.direccion || "") + " · " + (cfg.ciudad || ""),
      "NIT " + (cfg.nit || "—"),
      "",
      "Radicado: " + num,
      "Fecha de radicación: " + ahora,
      "",
      "Señores",
      "Administración / Consejo de Administración",
      cfg.nombre || "Reserva de Suba",
      "",
      "Asunto: Queja formal — " + (data.tipo_label || data.tipo_queja || "General") + " — " + (data.pretension || "gestión administrativa") + ".",
      "",
      "Yo, " + (data.nombre || "") + ", identificado(a) con cédula No. " + (data.cedula || "") + ",",
      "actuando en calidad de " + (data.calidad || "") + " de la unidad " + (data.unidad || "") + ",",
      "presento la siguiente queja para que se dé el trámite previsto en el reglamento de propiedad horizontal",
      "de Reserva de Suba y en los artículos 2 (numeral 5), 58, 59 y 60 de la Ley 675 de 2001,",
      "así como en los artículos 96 a 101 de la escritura 176 de 2016 y el Manual de Convivencia 2020.",
      "Este escrito no constituye sanción ni abre por sí solo el proceso del artículo 59.",
      "",
      "I. IDENTIFICACIÓN",
      "  Radicado: " + num,
      "  Tipo de queja / formato: " + (data.tipo_label || "—"),
      "  Presentante: " + (data.nombre || "") + " · " + (data.calidad || "") + " · " + (data.unidad || ""),
      "  Contacto: " + (data.telefono || "") + " · " + (data.email || ""),
      "  Reserva de identidad ante el vecino reportado: " + (data.reserva_identidad ? "Sí, solicitada (Art. 29 C.P.)" : "No"),
      "  Presunto infractor: " + (data.nombre_infractor || "No identificado") + " · Unidad " + (data.unidad_infractor || "—"),
      "  Fecha y hora de los hechos: " + (data.fecha_hechos || "—") + " " + (data.hora_hechos || ""),
      "  Reiteración: " + (data.reiterado || "—"),
      "",
      "II. CAMPOS DEL FORMATO ESPECÍFICO",
      extras,
      "",
      "III. HECHOS",
      data.hechos || "—",
      "",
      "IV. PRETENSIÓN",
      data.pretension || "—",
      "",
      "V. PRUEBAS Y TESTIGOS",
      "  Pruebas descritas: " + (data.pruebas || "No se describieron."),
      "  Cómo se entregan las pruebas: " + (data.medio_prueba || "—"),
      "  Enlace audiovisual: " + (data.enlace_pruebas || "No se aportó enlace. Si hay video, se enviará por Drive o WhatsApp citando este radicado."),
      "  Testigos: " + (data.testigos || "No se indicaron."),
      "",
      "VI. FUNDAMENTO Y PETICIÓN",
      "Solicito a la administración:",
      "  1. Radicar esta queja, dejar constancia en la carpeta de la unidad y acusar recibo al correo del presentante (Manual 2020, cap. XIX y art. 133).",
      "  2. Verificar los hechos. Si no hay mérito, archivar de manera motivada e informar.",
      "  3. Valorar la vía del Comité de Convivencia (RPH art. 96 y Ley 675 art. 58). El Comité no impone sanciones (RPH art. 96 parágrafo 2).",
      "  4. Si la pretensión es sancionatoria y hay mérito: requerimiento escrito del administrador con hechos, norma y ocho (8) días calendario para descargos (Manual art. 133; RPH arts. 97 y 99).",
      "  5. Remitir al Consejo de Administración, único órgano que impone la sanción en esta copropiedad (RPH art. 98). El administrador solo ejecuta (RPH art. 100).",
      "  6. Informar el resultado. El presunto infractor puede pedir ser oído (RPH art. 99), interponer reposición en 3 días hábiles (el Consejo resuelve en 8) e impugnar judicialmente dentro del mes siguiente (RPH art. 101).",
      "",
      "Declaro que los hechos se narran de buena fe. Las sanciones no son automáticas. Solo proceden por conductas del RPH art. 99 o del Manual cap. XIX, dentro de los topes de la Ley 675 (máximo 2 cuotas cada multa y 10 en total). Queda prohibido restringir bienes comunes esenciales, el acceso o bienes de uso exclusivo.",
      "",
      "Firma del presentante: " + (data.nombre || "") + "  C.C. " + (data.cedula || ""),
      "Espacio de recibido — Administración: fecha, hora y sello.",
      "",
      "Documento generado por el portal de quejas. Destinatario: " + (cfg.emailAdmin || "") + "."
    ].join("\n");
  }

  function mostrarAviso(ok, num) {
    if (!els.avisoEnvio) return;
    els.avisoEnvio.hidden = false;
    if (ok) {
      els.avisoEnvio.className = "aviso-envio ok";
      els.avisoEnvio.innerHTML = "<strong>Envío exitoso.</strong> Radicado " + num + ". Muy pronto le notificaremos que hemos recibido su solicitud.GUARDE el numero de RADICADO.";
    } else {
      els.avisoEnvio.className = "aviso-envio warn";
      els.avisoEnvio.textContent = "Radicado " + num + " listo. El envío automático no está disponible (cupo de Forms, falla de red o está pausado). Pulse Enviar por correo: es el mismo formato, solo cambia cómo le llega a administración.";
    }
  }

  function openModal(html, data, num) {
    els.documento.innerHTML = html;
    els.modal.hidden = false;
    els.modal.dataset.num = num;
    const wa = document.getElementById("btnWhatsapp");
    if (wa) {
      const n = String(cfg.whatsappPruebas || "").replace(/\D/g, "");
      const msg = encodeURIComponent((cfg.whatsappMensaje || "Hola, envío pruebas de mi queja. Radicado: ") + num);
      if (n) wa.href = "https://wa.me/" + n + "?text=" + msg;
    }
  }

  function closeModal() {
    els.modal.hidden = true;
  }

  async function enviarWeb3(data, num, html) {
    if (!cfg.web3formsAccessKey || cfg.envioAutomatico === false) return { sent: false, reason: "pausado" };
    const payload = {
      access_key: cfg.web3formsAccessKey,
      subject: (cfg.asuntoCorreo || "Radicado de queja — Reserva de Suba") + " " + num + " — " + (data.tipo_label || ""),
      from_name: "Portal de quejas Reserva de Suba",
      email: data.email,
      replyto: data.email,
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
