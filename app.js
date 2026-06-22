/* ============================================================
   maritribeOne — client-side app layer (localStorage)
   Auth (editor + visitor accounts), posts, bookmarks, highlights.
   No backend required. Swap the STORE.* methods for Firebase later.
   ============================================================ */
(function () {
  "use strict";

  var EDITOR = { name: "aniket", pass: "123" }; // hardcoded editor/developer account

  /* ---------------- storage helpers ---------------- */
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

  var STORE = {
    session: function () { return read("mt_session", null); },
    setSession: function (s) { s ? write("mt_session", s) : localStorage.removeItem("mt_session"); },
    users: function () { return read("mt_users", []); },
    setUsers: function (u) { write("mt_users", u); },
    posts: function () { return read("mt_posts", []); },
    setPosts: function (p) { write("mt_posts", p); },
    bookmarks: function (name) { return read("mt_bm_" + name, []); },
    setBookmarks: function (name, b) { write("mt_bm_" + name, b); },
    highlights: function (name) { return read("mt_hl_" + name, []); },
    setHighlights: function (name, h) { write("mt_hl_" + name, h); }
  };

  /* ---------------- auth ---------------- */
  function session() { return STORE.session(); }
  function isEditor() { var s = session(); return !!s && s.role === "editor"; }
  function currentName() { var s = session(); return s ? s.name : null; }

  function loginEditor(name, pass) {
    if (name.trim().toLowerCase() === EDITOR.name && pass === EDITOR.pass) {
      STORE.setSession({ role: "editor", name: "aniket" });
      return { ok: true };
    }
    return { ok: false, error: "Invalid editor credentials." };
  }
  function signupUser(name, pass) {
    name = name.trim();
    if (name.length < 2) return { ok: false, error: "Name too short." };
    if (pass.length < 3) return { ok: false, error: "Password too short." };
    var users = STORE.users();
    if (name.toLowerCase() === EDITOR.name) return { ok: false, error: "That name is reserved." };
    if (users.some(function (u) { return u.name.toLowerCase() === name.toLowerCase(); }))
      return { ok: false, error: "That account already exists — sign in instead." };
    users.push({ name: name, pass: pass });
    STORE.setUsers(users);
    STORE.setSession({ role: "user", name: name });
    return { ok: true };
  }
  function loginUser(name, pass) {
    name = name.trim();
    var u = STORE.users().find(function (x) { return x.name.toLowerCase() === name.toLowerCase(); });
    if (!u || u.pass !== pass) return { ok: false, error: "Wrong name or password." };
    STORE.setSession({ role: "user", name: u.name });
    return { ok: true };
  }
  function logout() { STORE.setSession(null); location.reload(); }

  /* ---------------- posts ---------------- */
  function getPosts() { return STORE.posts(); }
  function getPost(id) { return STORE.posts().find(function (p) { return p.id === id; }) || null; }
  function savePost(post) {
    var posts = STORE.posts();
    if (!post.id) {
      post.id = "p" + Date.now();
      post.created = Date.now();
      posts.unshift(post); // newest first → appears at top of the list
    } else {
      var i = posts.findIndex(function (p) { return p.id === post.id; });
      if (i >= 0) posts[i] = post; else posts.unshift(post);
    }
    STORE.setPosts(posts);
    return post;
  }
  function deletePost(id) {
    STORE.setPosts(STORE.posts().filter(function (p) { return p.id !== id; }));
  }

  /* ---------------- bookmarks ---------------- */
  function getBookmarks() { var n = currentName(); return n ? STORE.bookmarks(n) : []; }
  function isBookmarked(id) { return getBookmarks().some(function (b) { return b.id === id; }); }
  function toggleBookmark(meta) {
    if (!session()) { openAuth("signup"); return false; }
    var n = currentName(), bm = STORE.bookmarks(n);
    var i = bm.findIndex(function (b) { return b.id === meta.id; });
    if (i >= 0) { bm.splice(i, 1); STORE.setBookmarks(n, bm); toast("Removed bookmark"); return false; }
    bm.unshift(meta); STORE.setBookmarks(n, bm); toast("Bookmarked ⚓"); return true;
  }

  /* ---------------- highlights ---------------- */
  function getHighlights() { var n = currentName(); return n ? STORE.highlights(n) : []; }
  function addHighlight(h) {
    var n = currentName(); if (!n) return;
    var hl = STORE.highlights(n);
    h.id = "h" + Date.now(); h.ts = Date.now();
    hl.unshift(h); STORE.setHighlights(n, hl);
    toast("Saved to your highlights ✦");
  }
  function removeHighlight(id) {
    var n = currentName(); if (!n) return;
    STORE.setHighlights(n, STORE.highlights(n).filter(function (h) { return h.id !== id; }));
  }

  /* ---------------- toast ---------------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".mt-toast");
    if (!t) { t = document.createElement("div"); t.className = "mt-toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------------- auth modal ---------------- */
  function openAuth(mode) {
    closeAuth();
    var editorMode = mode === "editor";
    var overlay = document.createElement("div");
    overlay.className = "mt-modal-overlay";
    overlay.innerHTML =
      '<div class="mt-modal" role="dialog" aria-modal="true">' +
        '<button class="mt-modal-close" aria-label="Close">&times;</button>' +
        '<div class="mt-modal-tabs">' +
          '<button data-tab="signin" class="' + (mode === "signin" ? "active" : "") + '">Sign in</button>' +
          '<button data-tab="signup" class="' + (mode === "signup" || !mode ? "active" : "") + '">Create account</button>' +
          '<button data-tab="editor" class="' + (editorMode ? "active" : "") + '">Editor</button>' +
        '</div>' +
        '<div class="mt-modal-body">' +
          '<p class="mt-modal-sub"></p>' +
          '<form class="mt-auth-form">' +
            '<label>Name<input name="name" autocomplete="username" required></label>' +
            '<label>Password<input name="pass" type="password" autocomplete="current-password" required></label>' +
            '<p class="mt-auth-err"></p>' +
            '<button type="submit" class="mt-btn mt-btn-primary mt-btn-block"></button>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var current = mode || "signup";
    function renderTab(tab) {
      current = tab;
      overlay.querySelectorAll(".mt-modal-tabs button").forEach(function (b) {
        b.classList.toggle("active", b.dataset.tab === tab);
      });
      var sub = overlay.querySelector(".mt-modal-sub");
      var submit = overlay.querySelector('button[type="submit"]');
      overlay.querySelector(".mt-auth-err").textContent = "";
      if (tab === "editor") {
        sub.innerHTML = "Editor / developer access — for creating and publishing episodes.";
        submit.textContent = "Sign in as editor";
      } else if (tab === "signin") {
        sub.textContent = "Welcome back. Sign in to reach your bookmarks and highlights.";
        submit.textContent = "Sign in";
      } else {
        sub.textContent = "Create a free account to bookmark episodes and save highlights.";
        submit.textContent = "Create account";
      }
    }
    renderTab(current);

    overlay.querySelectorAll(".mt-modal-tabs button").forEach(function (b) {
      b.addEventListener("click", function () { renderTab(b.dataset.tab); });
    });
    overlay.querySelector(".mt-modal-close").addEventListener("click", closeAuth);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeAuth(); });
    document.addEventListener("keydown", escClose);

    overlay.querySelector(".mt-auth-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = e.target.name.value, pass = e.target.pass.value;
      var res = current === "editor" ? loginEditor(name, pass)
              : current === "signin" ? loginUser(name, pass)
              : signupUser(name, pass);
      if (res.ok) {
        closeAuth();
        if (current === "editor") { location.href = "create-post.html"; }
        else { location.reload(); }
      } else {
        overlay.querySelector(".mt-auth-err").textContent = res.error;
      }
    });
  }
  function escClose(e) { if (e.key === "Escape") closeAuth(); }
  function closeAuth() {
    var o = document.querySelector(".mt-modal-overlay");
    if (o) o.remove();
    document.removeEventListener("keydown", escClose);
  }

  /* ---------------- nav auth ---------------- */
  function mountNav() {
    // editor-only elements
    document.querySelectorAll("[data-mt-editoronly]").forEach(function (el) {
      el.style.display = isEditor() ? "" : "none";
    });
    // auth slot(s)
    document.querySelectorAll("[data-mt-auth]").forEach(function (slot) {
      var s = session();
      slot.innerHTML = "";
      if (!s) {
        var btn = document.createElement("button");
        btn.className = "mt-btn mt-btn-ghost mt-nav-signin";
        btn.textContent = "Sign in";
        btn.addEventListener("click", function () { openAuth("signin"); });
        slot.appendChild(btn);
      } else {
        var wrap = document.createElement("div");
        wrap.className = "mt-account";
        wrap.innerHTML =
          '<button class="mt-account-btn"><span class="mt-avatar">' +
          s.name.charAt(0).toUpperCase() + '</span><span class="mt-account-name">' +
          s.name + (s.role === "editor" ? ' <em>· editor</em>' : '') + '</span></button>' +
          '<div class="mt-account-menu">' +
            (s.role === "editor" ? '<a href="create-post.html">✎ Create post</a>' : '') +
            (s.role === "editor" ? '<a href="dashboard.html">📊 Dashboard</a>' : '') +
            '<a href="account.html">⚓ My account</a>' +
            '<button class="mt-signout">Sign out</button>' +
          '</div>';
        slot.appendChild(wrap);
        var btn = wrap.querySelector(".mt-account-btn");
        btn.addEventListener("click", function (e) { e.stopPropagation(); wrap.classList.toggle("open"); });
        document.addEventListener("click", function () { wrap.classList.remove("open"); });
        wrap.querySelector(".mt-signout").addEventListener("click", logout);
      }
    });
  }

  /* ---------------- text highlighting + sharing on posts ---------------- */
  function enableHighlighting(episodeId, episodeTitle, rootSelector) {
    var root = document.querySelector(rootSelector);
    if (!root) return;
    applySavedHighlights(root, episodeId);
    handleShareTarget(root);

    // selection popover: Highlight + Share
    var pop = document.createElement("div");
    pop.className = "mt-sel-pop";
    pop.innerHTML = '<button data-a="hl">✦ Highlight</button><button data-a="share">↗ Share</button>';
    document.body.appendChild(pop);
    var pendingText = "";
    function hidePop() { pop.classList.remove("show"); }

    root.addEventListener("mouseup", function () {
      setTimeout(function () {
        var sel = window.getSelection();
        var text = sel ? sel.toString().trim() : "";
        if (text.length < 4 || !sel.rangeCount || !root.contains(sel.anchorNode)) { hidePop(); return; }
        pendingText = text;
        var rect = sel.getRangeAt(0).getBoundingClientRect();
        pop.style.top = (window.scrollY + rect.top - 48) + "px";
        pop.style.left = (window.scrollX + rect.left + rect.width / 2) + "px";
        pop.classList.add("show");
      }, 10);
    });
    document.addEventListener("mousedown", function (e) { if (!pop.contains(e.target)) hidePop(); });

    pop.querySelector('[data-a="hl"]').addEventListener("click", function () {
      if (!session()) { hidePop(); openAuth("signup"); return; }
      addHighlight({ episodeId: episodeId, episodeTitle: episodeTitle, text: pendingText });
      var latest = STORE.highlights(currentName())[0];
      wrapFirst(root, pendingText, latest ? latest.id : null, "mt-mark");
      hidePop(); window.getSelection().removeAllRanges();
    });
    pop.querySelector('[data-a="share"]').addEventListener("click", function () {
      shareSnippet(pendingText, episodeTitle); hidePop();
    });

    // click an existing highlight → share / remove menu
    root.addEventListener("click", function (e) {
      var mark = e.target.closest ? e.target.closest("mark.mt-mark") : null;
      if (mark) showMarkMenu(mark, episodeTitle);
    });
  }

  function applySavedHighlights(root, episodeId) {
    getHighlights().filter(function (h) { return h.episodeId === episodeId; })
      .forEach(function (h) { wrapFirst(root, h.text, h.id, "mt-mark"); });
  }

  function handleShareTarget(root) {
    var m = location.hash.match(/hl=([^&]+)/);
    if (!m) return;
    var text;
    try { text = decodeURIComponent(m[1]); } catch (e) { return; }
    var mk = wrapFirst(root, text, null, "mt-shared");
    if (mk) setTimeout(function () { mk.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
  }

  function wrapFirst(root, text, hlId, cls) {
    if (!text) return null;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var pc = node.parentNode && node.parentNode.classList;
      if (pc && (pc.contains("mt-mark") || pc.contains("mt-shared"))) continue;
      var idx = node.nodeValue.indexOf(text);
      if (idx >= 0) {
        var range = document.createRange();
        range.setStart(node, idx); range.setEnd(node, idx + text.length);
        var mark = document.createElement("mark");
        mark.className = cls || "mt-mark";
        if (hlId) mark.dataset.hlId = hlId;
        mark.dataset.text = text;
        try { range.surroundContents(mark); return mark; } catch (e) { return null; }
      }
    }
    return null;
  }

  function showMarkMenu(mark, episodeTitle) {
    closeMarkMenu();
    var menu = document.createElement("div");
    menu.className = "mt-mark-menu";
    menu.innerHTML = '<button data-a="share">↗ Share</button><button data-a="del">✕ Remove</button>';
    document.body.appendChild(menu);
    var r = mark.getBoundingClientRect();
    menu.style.top = (window.scrollY + r.top - 46) + "px";
    menu.style.left = (window.scrollX + r.left + r.width / 2) + "px";
    menu.querySelector('[data-a="share"]').addEventListener("click", function () {
      shareSnippet(mark.dataset.text || mark.textContent, episodeTitle); closeMarkMenu();
    });
    menu.querySelector('[data-a="del"]').addEventListener("click", function () {
      if (mark.dataset.hlId) removeHighlight(mark.dataset.hlId);
      var p = mark.parentNode;
      while (mark.firstChild) p.insertBefore(mark.firstChild, mark);
      p.removeChild(mark); p.normalize();
      closeMarkMenu(); toast("Highlight removed");
    });
    setTimeout(function () { document.addEventListener("mousedown", outside); }, 0);
    function outside(e) { if (!menu.contains(e.target)) { closeMarkMenu(); document.removeEventListener("mousedown", outside); } }
  }
  function closeMarkMenu() { var m = document.querySelector(".mt-mark-menu"); if (m) m.remove(); }

  function shareSnippet(text, episodeTitle) {
    var url = location.origin + location.pathname + location.search + "#hl=" + encodeURIComponent(text);
    var shareText = "“" + text + "” — " + (episodeTitle || "maritribeOne");
    if (navigator.share) {
      navigator.share({ title: episodeTitle || "maritribeOne", text: shareText, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText + "\n" + url).then(function () { toast("Snippet + link copied ↗"); });
    } else {
      window.prompt("Copy this:", shareText + "\n" + url);
    }
  }

  /* ---------------- analytics ---------------- */
  function todayKey() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0"); }
  function getAnalytics() { return read("mt_analytics", { views: 0, visits: 0, byDay: {}, byPage: {} }); }
  function trackVisit() {
    var a = getAnalytics();
    var d = todayKey();
    var page = (location.pathname.split("/").pop() || "index.html");
    a.views = (a.views || 0) + 1;
    a.byDay[d] = a.byDay[d] || { views: 0, visits: 0 };
    a.byDay[d].views++;
    a.byPage[page] = (a.byPage[page] || 0) + 1;
    if (!sessionStorage.getItem("mt_visit_counted")) {
      a.visits = (a.visits || 0) + 1;
      a.byDay[d].visits++;
      sessionStorage.setItem("mt_visit_counted", "1");
    }
    write("mt_analytics", a);
  }
  function getAudienceStats() {
    var bm = 0, hl = 0;
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      try {
        if (k.indexOf("mt_bm_") === 0) bm += JSON.parse(localStorage.getItem(k)).length;
        if (k.indexOf("mt_hl_") === 0) hl += JSON.parse(localStorage.getItem(k)).length;
      } catch (e) {}
    }
    return { users: STORE.users().length, posts: STORE.posts().length, bookmarks: bm, highlights: hl };
  }

  /* ---------------- expose ---------------- */
  window.MT = {
    session: session, isEditor: isEditor, currentName: currentName,
    loginEditor: loginEditor, signupUser: signupUser, loginUser: loginUser, logout: logout,
    getPosts: getPosts, getPost: getPost, savePost: savePost, deletePost: deletePost,
    getBookmarks: getBookmarks, isBookmarked: isBookmarked, toggleBookmark: toggleBookmark,
    getHighlights: getHighlights, addHighlight: addHighlight, removeHighlight: removeHighlight,
    openAuth: openAuth, mountNav: mountNav, toast: toast, enableHighlighting: enableHighlighting,
    getAnalytics: getAnalytics, getAudienceStats: getAudienceStats
  };

  document.addEventListener("DOMContentLoaded", function () { mountNav(); trackVisit(); });

  /* ---------------- injected styles (work on every page) ---------------- */
  var css = document.createElement("style");
  css.textContent =
  ".mt-btn{font-family:inherit;font-weight:600;font-size:14px;border-radius:9px;border:none;cursor:pointer;padding:10px 18px;transition:all .18s ease;}" +
  ".mt-btn-primary{background:#C9A84C;color:#0A2E24;}.mt-btn-primary:hover{filter:brightness(1.07);}" +
  ".mt-btn-ghost{background:transparent;border:1.5px solid #C9A84C;color:#C9A84C;}.mt-btn-ghost:hover{background:#C9A84C;color:#0A2E24;}" +
  ".mt-btn-block{width:100%;padding:13px;font-size:15px;margin-top:6px;}" +
  ".mt-account{position:relative;}" +
  ".mt-account-btn{display:flex;align-items:center;gap:9px;background:transparent;border:none;cursor:pointer;color:inherit;font-family:inherit;font-size:14px;font-weight:600;}" +
  ".mt-avatar{width:32px;height:32px;border-radius:50%;background:#C9A84C;color:#0A2E24;display:grid;place-items:center;font-weight:700;font-size:14px;}" +
  ".mt-account-name em{opacity:.7;font-style:normal;font-weight:500;}" +
  ".mt-account-menu{position:absolute;right:0;top:46px;background:#fff;border:1px solid #e2e0d7;border-radius:12px;box-shadow:0 16px 40px rgba(0,0,0,.18);min-width:190px;padding:6px;display:none;flex-direction:column;z-index:1200;}" +
  ".mt-account.open .mt-account-menu{display:flex;}" +
  ".mt-account-menu a,.mt-account-menu button{text-align:left;background:none;border:none;cursor:pointer;font-family:inherit;font-size:14px;color:#16201c;text-decoration:none;padding:10px 12px;border-radius:8px;}" +
  ".mt-account-menu a:hover,.mt-account-menu button:hover{background:#eef1ee;}" +
  ".mt-signout{color:#9a2b2b!important;font-weight:600;}" +
  ".mt-modal-overlay{position:fixed;inset:0;background:rgba(10,30,24,.55);backdrop-filter:blur(4px);z-index:5000;display:grid;place-items:center;padding:20px;animation:mtfade .18s ease;}" +
  "@keyframes mtfade{from{opacity:0}to{opacity:1}}" +
  ".mt-modal{background:#F4F2EC;border-radius:18px;width:100%;max-width:420px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.4);position:relative;font-family:'Plus Jakarta Sans',-apple-system,sans-serif;}" +
  ".mt-modal-close{position:absolute;top:12px;right:14px;background:none;border:none;font-size:26px;line-height:1;color:#8a958f;cursor:pointer;z-index:2;}" +
  ".mt-modal-tabs{display:flex;background:#0A2E24;}" +
  ".mt-modal-tabs button{flex:1;background:none;border:none;color:rgba(255,255,255,.6);font-family:inherit;font-weight:600;font-size:13px;padding:15px 6px;cursor:pointer;border-bottom:2px solid transparent;}" +
  ".mt-modal-tabs button.active{color:#C9A84C;border-bottom-color:#C9A84C;}" +
  ".mt-modal-body{padding:24px;}" +
  ".mt-modal-sub{font-size:14px;color:#45524c;margin-bottom:18px;line-height:1.5;}" +
  ".mt-auth-form label{display:block;font-size:13px;font-weight:600;color:#16201c;margin-bottom:14px;}" +
  ".mt-auth-form input{display:block;width:100%;margin-top:6px;padding:11px 13px;border:1px solid #d7d4c8;border-radius:9px;font-family:inherit;font-size:15px;background:#fff;}" +
  ".mt-auth-form input:focus{outline:none;border-color:#0F4A3C;}" +
  ".mt-auth-err{color:#9a2b2b;font-size:13px;min-height:18px;margin:2px 0 4px;}" +
  ".mt-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);background:#0A2E24;color:#fff;padding:12px 22px;border-radius:30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;box-shadow:0 12px 30px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:all .25s ease;z-index:6000;}" +
  ".mt-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}" +
  ".mt-sel-pop,.mt-mark-menu{position:absolute;transform:translateX(-50%);display:flex;gap:2px;background:#0A2E24;border-radius:9px;padding:4px;box-shadow:0 8px 22px rgba(0,0,0,.32);z-index:4000;}" +
  ".mt-sel-pop{opacity:0;pointer-events:none;transition:opacity .14s ease;}" +
  ".mt-sel-pop.show{opacity:1;pointer-events:auto;}" +
  ".mt-sel-pop button,.mt-mark-menu button{background:none;border:none;color:#C9A84C;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;padding:6px 11px;border-radius:6px;white-space:nowrap;}" +
  ".mt-sel-pop button:hover,.mt-mark-menu button:hover{background:rgba(255,255,255,.10);}" +
  "mark.mt-mark{background:linear-gradient(transparent 55%,#f4e2a8 55%);color:inherit;padding:0 1px;border-radius:2px;cursor:pointer;}" +
  "mark.mt-shared{background:linear-gradient(transparent 50%,#ffd95e 50%);color:inherit;padding:0 1px;border-radius:2px;animation:mtflash 1.4s ease;}" +
  "@keyframes mtflash{0%,100%{background-color:transparent}30%{background-color:#ffe9a8}}";
  document.head.appendChild(css);
})();
